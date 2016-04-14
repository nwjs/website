(function() {

var matched = navigator.platform.match(/Win|Mac|Linux/i);
var os = matched ? matched[0].toLowerCase() : 'linux';
if (os === 'mac') {
    os = 'osx';
}
matched = navigator.userAgent.match(/x86_64|Win64|WOW64/i);
var arch = matched || os === 'osx' ? 'x64' : 'ia32';

var os2name = {
    'win': 'Windows',
    'osx': 'Mac OS X',
    'linux': 'Linux'
};

var os2ext = {
    'win': '.zip',
    'osx': '.zip',
    'linux': '.tar.gz'
}

function isMas(flavor) {
    return flavor === 'mas' || flavor === 'macappstore';
}

var DownloadButton = React.createClass({
    render: function() {
        var props = this.props;
        var url = props.base + '/' + props.version + '/nwjs'
         + (props.flavor === 'normal' ? '': ('-' + props.flavor))
         + '-' + props.version
         + '-' + props.os + '-' + props.arch
         + os2ext[props.os];
        var flavorName = props.flavor.toUpperCase();

        return <div className={props.arch === 'ia32' ? 'd32bit': 'd64bit'}>
            <a href={url}>{props.version}<br/><strong>{flavorName}</strong></a>
        </div>;
    }
});

var DownloadArea = React.createClass({
    render: function() {
        var props = this.props;
        var btnList = this.props.flavors.filter(function(flavor){
            return (!isMas(flavor) || props.os === 'osx') && props.files.indexOf(props.os + '-' + props.arch) >= 0;
        }).map(function(flavor, i) {
            return <DownloadButton key={i} os={props.os} base={props.base} arch={props.arch} version={props.version} flavor={flavor} />;
        });
        var use = props.use.charAt(0).toUpperCase() + props.use.substring(1);
        return <div className="os">
            <h1>Download <em>{use}</em> for {os2name[props.os]} ({props.arch})</h1>
            <div className="dlbtnlist">
            {btnList}
            </div>
            <a className="release-notes" href={'/blog/' + props.version + '/'}>Release Notes</a>
        </div>;
    }
});

function render(downAreaElem, versions) {
    var baseUrl = downAreaElem.getAttribute('data-base-url');
    var use = downAreaElem.getAttribute('data-use');
    var version = versions[use];
    var idx = -1;

    versions.versions.some(function(v, i) {
        if (v.version === version) {
            idx = i;
            return true;
        }
        return false;
    });

    if (idx >= 0) {
        var flavors = versions.versions[idx].flavors;
        ReactDOM.render(
            <DownloadArea use={use} files={versions.versions[idx].files} flavors={flavors} version={version} os={os} arch={arch} base={baseUrl}/>,
            downAreaElem
        );
    }

}

getVersionsJSON(function(err, versions) {
    if (err) {
        console.error(err);
        return;
    }
    var downAreaElems = document.getElementsByClassName('download-area');

    [].slice.call(downAreaElems, 0).forEach(function(downAreaElem) {
        render(downAreaElem, versions);
    });
});


}())
