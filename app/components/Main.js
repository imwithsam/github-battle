var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group')
// We can require the css file below like it's a JS file thanks to the
// style-loader and css-loader loaders in our Webpack config.
require('../main.css')

var Main = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        <ReactCSSTransitionGroup
          transitionName='appear'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { /* ReactCSSTransitionGroup requires its child elements to have a key */ }
          {React.cloneElement(this.props.children, {key: this.props.location.pathname})}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

module.exports = Main;
