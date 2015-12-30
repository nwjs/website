(function() {

  var OSNav = React.createClass({
    render: function() {

    }
  });

  var ArchNav = React.createClass({
    render: function() {

    }
  });

  var FlavorsNav = React.createClass({
    render: function() {

    }
  });

  function ext(file, symbol) {
    if (symbol) {
      switch(file) {
      case 'win-x64':
      case 'win-ia32':
        return '.7z';
      case 'mac-x64':
        return '.zip';
      case 'linux-x64':
      case 'linux-ia32':
        return '.tar.gz';
      }
    } else {
      switch(file) {
      case 'win-x64':
      case 'win-ia32':
        return '.zip';
      case 'mac-x64':
        return '.zip';
      case 'linux-x64':
      case 'linux-ia32':
        return '.tar.gz';
      }
    }
  }

  function name(type) {
    switch(type) {
    case 'chromedriver':
      return 'ChromeDriver';
    case 'symbol':
      return 'Symbol';
    case 'header':
      return 'Header';
    case 'lib':
      return 'Lib';
    default:
      return 'NW.js';
    }
  }

  var flavors = [];

  var DownloadItem = React.createClass({
    render: function() {
      var baseUrl = this.props.base;
      var version = this.props.version;
      var flavors = this.props.flavors;
      var cols = flavors.map(function(flavor) {
        var url = baseUrl + '/nwjs-' + (flavor === 'normal' ? '': '-' + flavor)
         + '-' + version.version
         + '-' + file
         + ext(file);
        return <td><a href={url}>{name()}</a></td>
      });
      return <tr><th>{version.version}</th>{cols}</tr>;
    }
  });

  var Downloads = React.createClass({
    render: function() {
      var versions = this.props.versions;
      var baseUrl = this.props.base;
      return <div>
      <div class="nav">
        <OSNav versions={versions}/>
        <ArchNav versions={versions}/>
        <FlavorsNav versions={versions}/>
      </div>
      <DownloadItem base={baseUrl} versions={versions}/>
      </div>;
    }
  });

  getJSON('/versions.json', function(err, versions) {
    if (err) {
      console.error(err);
      return;
    }

    var contentElem = document.getElementsByClassName('content')[0];
    var baseUrl = contentElem.getAttribute('data-base-url');

    ReactDOM.render(
      <Downloads versions={versions} base={baseUrl}/>,
      contentElem
    );

  });
}());