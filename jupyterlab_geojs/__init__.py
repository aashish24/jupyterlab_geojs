from IPython.display import display, JSON

# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).

def _jupyter_labextension_paths():
    return [{
        'name': 'jupyterlab_geojs',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyterlab_geojs',
        'require': 'jupyterlab_geojs/extension'
    }]

# A display class that can be used within a notebook.
#   from jupyterlab_cjson import CJSON
#   CJSON(data)

DEFAULT_ISO = 43 / 2000.0;
DEFAULT_ISO_SURFACES = [{
    'value': DEFAULT_ISO,
    'color': 'blue',
    'opacity': 0.9,
  }, {
    'value': -DEFAULT_ISO,
    'color': 'red',
    'opacity': 0.9
  }]

class GEOJSON(JSON):
    """A display class for displaying GEOJSON visualizations in the Jupyter Notebook and IPython kernel.

    GEOJSON expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """



    def __init__(self, data=None, url=None, filename=None, vibrational=True, structure=True,
                 iso_surfaces=DEFAULT_ISO_SURFACES, animate_mode=None, calculation_id=None,
                 mo=None):
        super(GEOJSON, self).__init__(data, url, filename)

    def _ipython_display_(self):
        bundle = {
            'application/geojson': self.data,
            'text/plain': '<jupyterlab_geojs.GEOJSON object>'
        }
        metadata = {
            'application/geojson': self.metadata
        }
        display(bundle, metadata=metadata, raw=True)