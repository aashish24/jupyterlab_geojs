import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import './index.css';

// import StructureComponent from './structure'
// import VibrationalModesComponent from './vibrational'
// import { rootSaga, configureStore } from 'mongochemclient'

// const store = configureStore()
// store.runSaga(rootSaga)

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();


export default class GeoJSComponent extends React.Component {

  constructor(props) {
    super(props);
    // this.onBarClick = this.onBarClick.bind(this);
    // this.state = {
    //     animateMode: this.props.metadata.animateMode,
    // }

  }

  // onBarClick(data) {
  //   this.setState({
  //     animateMode: data.index,
  //   })
  // }

  render() {
    const { data, metadata } = this.props;
    return (
     <div>
        <p> Hello World </p>
      </div>
    );
  }
}

function objectIncludes(data, query) {
  return JSON.stringify(data).includes(query);
}
