import { Widget } from '@phosphor/widgets';
import React from 'react';
import ReactDOM from 'react-dom';
import GEOJSComponent from '../../components/geojs';

const MIME_TYPE = 'application/geojson';
const CLASS_NAME = 'jp-OutputWidgetGeoJS';

/**
 * A Phosphor widget for rendering CJSON
 */
export class GeoJSOutputWidget extends Widget {
  constructor(options) {
    super();
    this._mimeType = options.mimeType;
    this._data = options.model.data;
    this._metadata = options.model.metadata;
    this.addClass(CLASS_NAME);
  }

  /**
   * A message handler invoked on an `'after-attach'` message
   */
  onAfterAttach(msg) {
    /* Render initial data */
    this._render();
  }

  /**
   * A message handler invoked on a `'before-detach'` message
   */
  onBeforeDetach(msg) {
    /* Dispose of resources used by this widget */
    // renderLibrary.dispose(this.node);
  }

  /**
   * A message handler invoked on a `'child-added'` message
   */
  onChildAdded(msg) {
    /* e.g. Inject a static image representation into the mime bundle for
     *  endering on Github, etc.
     */
    // renderLibrary.toPng(this.node).then(url => {
    //   const data = url.split(',')[1];
    //   this._data.set('image/png', data);
    // })
  }

  /**
   * A message handler invoked on a `'resize'` message
   */
  onResize(msg) {
    /* Re-render on resize */
    this._render();
  }

  /**
   * Render data to DOM node
   */
  _render() {
    const props = {
      data: this._data.get(this._mimeType),
      metadata: this._metadata.get(this._mimeType),
      width: this.node.offsetWidth,
      height: this.node.offsetHeight
    };

    ReactDOM.render(<GEOJSComponent {...props} />, this.node);
  }
}

export class GeoJSOutputRenderer {
  /**
   * The mime types that this OutputRenderer accepts
   */
  mimeTypes = [MIME_TYPE];

  /**
   * Whether the renderer can render given the render options
   */
  canRender(options) {
    return this.mimeTypes.indexOf(options.mimeType) !== -1;
  }

  /**
   * Render the transformed mime bundle
   */
  render(options) {
    return new GeoJSOutputWidget(options);
  }
}
