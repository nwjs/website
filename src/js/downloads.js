(function() {

    function ext(file) {
        switch(file) {
        case 'win-x64':
        case 'win-ia32':
            return '.zip';
        case 'osx-x64':
        case 'osx-ia32':
            return '.zip';
        case 'linux-x64':
        case 'linux-ia32':
            return '.tar.gz';
        }
    }

    var file2name = {
        'win-ia32'  : 'Windows 32-bit',
        'win-x64'   : 'Windows 64-bit',
        'osx-ia32'  : 'Mac OS X 32-bit',
        'osx-x64'   : 'Mac OS X 64-bit',
        'linux-x64' : 'Linux 64-bit',
        'linux-ia32': 'Linux 32-bit'
    };

    function name(file) {
        return file2name[file];
    }

    function findVersion(versions, v) {
        var verList = versions.versions;
        var idx = -1;
        verList.some(function(item, i) {
            if (item.version === v) {
                idx = i;
                return true;
            }
        });
        if (idx >= 0) {
            return verList[idx];
        } else {
            return false;
        }
    }

    var DownloadMatrix = React.createClass({
        render: function() {
            var baseUrl = this.props.base;
            var version = this.props.version;
            var flavors = version.flavors;
            var widthStyle = {width:(100 / (flavors.length + 1)) + '%'};
            var rows = version.files.map(function(file, rI) {
                var cols = flavors.filter(function(flavor) {
                    if (flavor === 'macappstore' || flavor === 'mas') {
                        if (!file.match(/osx/i)) {
                            return false;
                        }
                    }
                    return true;
                })
                .map(function(flavor, cI) {
                    var url = baseUrl + '/' + version.version + '/nwjs' + (flavor === 'normal' ? '': ('-' + flavor))
                     + '-' + version.version
                     + '-' + file
                     + ext(file);
                    return (<td key={cI} style={widthStyle}><a href={url}>{flavor.toUpperCase()}</a></td>);
                });
                cols.unshift(<th key={-1} style={widthStyle}>{name(file)}</th>);

                return (<tr key={rI}>{cols}</tr>);
            });
            return (<table><tbody>{rows}</tbody></table>);
        }
    });

    var Downloads = React.createClass({
        getInitialState: function() {
            return {version: 'stable'};
        },
        render: function() {
            var self = this;
            var versions = this.props.versions;
            var baseUrl = this.props.base;
            var ltsNotes = '(Windows XP / Vista and Mac OS X 10.6 ~ 10.8)';
            var versionList = [['stable', 'Stable'], ['latest', 'Latest']]
            .filter(function(pair) {
                return !!versions[pair[0]];
            })
            .map(function(pair) {
                var use = pair[0];
                var text = pair[1];
                var idx = -1;
                versions.versions.some(function(val, i) {
                    if (val.version === versions[use]) {
                        idx = i;
                        return true;
                    }
                    return false;
                });
                var lines = [];
                lines.push(<h3 key="version">{text} {versions[use]}</h3>);
                if (idx !== -1) {
                    var c = versions.versions[idx].components;
                    lines.push(<div key="components">Chromium {c.chromium.split('.')[0]} + Node {c.node}</div>);
                }
                if (use === 'lts') {
                    lines.push(<div key="lts-notes">{ltsNotes}</div>);
                }
                return (<a key={use} title={use==='lts'?ltsNotes:''} href="#" className={self.state.version === use ? 'selected': ''} onClick={self.toggleVersion.bind(self, use)}>
                    {lines}
                </a>);
            });
            return <div>
                <nav>{versionList}</nav>
                <DownloadMatrix base={baseUrl} version={findVersion(versions, versions[this.state.version])}/>
                <ul>
                    <li><a href={baseUrl + '/' + versions[this.state.version] + '/'}>Other downloads</a> for {versions[this.state.version]}</li>
                    <li><a href={baseUrl}>Previous releases</a></li>
                    <li><a href={baseUrl + '/live-build/'}>Nightly builds</a></li>
                    <li><a href={baseUrl + '/' + versions['lts']} onClick={self.ltsWarning}>LTS release</a> for legacy Windows XP and Mac OS X 10.6 support</li>
                </ul>
            </div>;
        },
        toggleVersion: function(version, e) {
            this.setState({version: version});
            e.preventDefault();
        },
        ltsWarning: function(e) {
            var ok = confirm('NOTE: Chromium and Node.js of LTS release stick to a fixed version. You won\'t get security updates for LTS release. Please upgrade to latest stable version if you concern the security.');
            if (!ok) e.preventDefault();
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
