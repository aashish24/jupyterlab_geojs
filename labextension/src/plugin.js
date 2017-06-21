import { IRenderMime } from '@jupyterlab/rendermime';
import { IDocumentRegistry } from '@jupyterlab/docregistry';
import { ILayoutRestorer, InstanceTracker } from '@jupyterlab/apputils';
import { toArray, ArrayExt } from '@phosphor/algorithm';
import { GeoJSOutputRenderer } from './widgets/geojs/output';
import { GeoJSDocWidgetFactory } from './widgets/geojs/doc';


import '../index.css';

/**
 * The name of the factory
 */
const GEOJS_FACTORY = 'GEOJSON';

/**
 * Set the extensions associated with application/cjson
 */
const GEOJS_EXTENSIONS = ['.geojson'];
const GEOJS_DEFAULT_EXTENSIONS = ['.geojson'];


function activateGeoJS(app, rendermime, registry, restorer, index) {
  /**
   * Add output renderer for application/cjson data
   */
  rendermime.addRenderer(
    {
      mimeType: 'application/geojson',
      renderer: new GeoJSOutputRenderer()
    },
    index
  );

  const geojsFactory = new GeoJSDocWidgetFactory({
    fileExtensions: GEOJS_EXTENSIONS,
    defaultFor: GEOJS_DEFAULT_EXTENSIONS,
    name: GEOJS_FACTORY
  });


  /**
   * Add document renderer for files
   */
  registry.addWidgetFactory(geojsFactory);

  const tracker = new InstanceTracker({
    namespace: 'GEOJSON',
    shell: app.shell
  });

  /**
   * Handle widget state deserialization
   */
  restorer.restore(tracker, {
    command: 'file-operations:open',
    args: widget => ({ path: widget.context.path, factory: GEOJS_FACTORY }),
    name: widget => widget.context.path
  });

  /**
   * Serialize widget state
   */
  geojsFactory.widgetCreated.connect((sender, widget) => {
    tracker.add(widget);
    /* Notify the instance tracker if restore data needs to update */
    widget.context.pathChanged.connect(() => {
      tracker.save(widget);
    });
  });
}


/**
 * Activate the extension.
 */
function activatePlugin(app, rendermime, registry, restorer) {
  /**
   * Calculate the index of the renderer in the array renderers
   * e.g. Insert this renderer after any renderers with mime type that matches
   * "+json"
   */
  // const index = ArrayExt.findLastIndex(
  //   toArray(rendermime.mimeTypes()),
  //   mime => mime.endsWith('+json')
  // ) + 1;
  /* ...or just insert it at the top */
  let index = 0;

  activateGeoJS(app, rendermime, registry, restorer, index);
}

/**
 * Configure jupyterlab plugin
 */
const Plugin = {
  id: 'jupyter.extensions.GEOJS',
  requires: [IRenderMime, IDocumentRegistry, ILayoutRestorer],
  activate: activatePlugin,
  autoStart: true
};

export default Plugin;
