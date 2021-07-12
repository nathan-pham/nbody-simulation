// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3KdSp":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "b9167a940929bdec77a4418224e1d95d";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"71k5j":[function(require,module,exports) {
var _classesMathRandomGenerator = require("./classes/math/RandomGenerator");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _classesMathRandomGeneratorDefault = _parcelHelpers.interopDefault(_classesMathRandomGenerator);
var _classesMathVector = require("./classes/math/Vector");
var _classesMathVectorDefault = _parcelHelpers.interopDefault(_classesMathVector);
var _classesSketch = require("./classes/Sketch");
var _classesSketchDefault = _parcelHelpers.interopDefault(_classesSketch);
var _classesPlanet = require("./classes/Planet");
var _classesPlanetDefault = _parcelHelpers.interopDefault(_classesPlanet);
const sketch = new _classesSketchDefault.default({
  canvas: document.getElementById("app")
});
const generator = new _classesMathRandomGeneratorDefault.default();
const population = 20;
const generatePlanet = ({x, y} = {}) => {
  sketch.add(new _classesPlanetDefault.default({
    radius: 2,
    mass: 10,
    // mass: generator.integer(1, 10),
    pos: x && y ? new _classesMathVectorDefault.default(x, y) : new _classesMathVectorDefault.default(generator.integer(0, sketch.dimensions.width), generator.integer(0, sketch.dimensions.height))
  }));
};
for (let i = 0; i < population; i++) {
  generatePlanet();
}
// document.body.addEventListener("click", (e) => {
// generatePlanet(utils.mouse(sketch.canvas, e))
// })
sketch.render();

},{"./classes/math/RandomGenerator":"3jwsS","./classes/math/Vector":"6j4zL","./classes/Sketch":"4q5Wm","./classes/Planet":"5EWzS","@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT"}],"3jwsS":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class RandomGenerator {
  integer(min, max) {
    return Math.floor(this.float(min, max));
  }
  float(min, max) {
    return Math.random() * (max - min) + min;
  }
}
exports.default = RandomGenerator;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT"}],"7kyIT":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"6j4zL":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  mult(s) {
    this.x *= s;
    this.y *= s;
  }
  div(s) {
    this.x /= s;
    this.y /= s;
  }
  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  setMag(m) {
    this.normalize();
    this.mult(m);
  }
  limit(type, s) {
    if (!s) {
      if (this.mag() > type) {
        this.setMag(type);
      }
    } else {
      if (Math.abs(this[type]) > s) {
        this[type] = s * Math.sign(this[type]);
      }
    }
  }
  normalize() {
    let m = this.mag();
    if (m > 0) {
      this.div(m);
    }
  }
  clone() {
    return new Vector(this.x, this.y);
  }
}
exports.default = Vector;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT"}],"4q5Wm":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
require("./math/RandomGenerator");
require("./math/Vector");
var _mathUtils = require("./math/Utils");
var _mathUtilsDefault = _parcelHelpers.interopDefault(_mathUtils);
require("./Planet");
const utils = new _mathUtilsDefault.default();
class Sketch {
  constructor({canvas}) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.mouse = {
      down: false,
      moving: false,
      first: {},
      last: {}
    };
    this.objects = [];
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("mousedown", e => {
      const mouse = utils.mouse(this.canvas, e);
      Object.assign(this.mouse, {
        first: mouse,
        last: mouse,
        down: true
      });
    });
    this.canvas.addEventListener("mousemove", e => {
      if (this.mouse.down) {
        this.mouse.moving = true;
        this.mouse.last = utils.mouse(this.canvas, e);
      }
    });
    this.canvas.addEventListener("mouseup", e => {
      this.mouse.down = false;
      this.mouse.moving = false;
      const last = utils.mouse(this.canvas, e);
    });
  }
  get dimensions() {
    return {
      width: this.canvas.offsetWidth,
      height: this.canvas.offsetHeight
    };
  }
  resize() {
    Object.assign(this.canvas, this.dimensions);
    Object.assign(this.canvas.style, Object.keys(this.dimensions).reduce((acc, cur) => ({
      ...acc,
      [cur]: this.dimensions[cur] + "px"
    }), {}));
  }
  add(...objects) {
    for (const object of objects) {
      this.objects.push(object);
    }
  }
  update() {
    const scheduleForDeletion = [];
    for (const object1 of this.objects) {
      for (const object2 of this.objects) {
        if (object1 !== object2 && !(scheduleForDeletion.includes(object1) || scheduleForDeletion.includes(object2))) {
          if (utils.distance(object1.pos, object2.pos) < Math.min(object1.radius, object2.radius) / 2) {
            scheduleForDeletion.push(object1);
            const clone = object1.acc.clone();
            clone.add(object2.acc);
            object2.radius = Math.max(object2.radius, object1.radius) + 0.5;
            object2.mass = object1.mass + object2.mass;
            object2.vel.mult(0);
            object2.acc = clone;
          }
        }
      }
    }
    this.objects = this.objects.filter(object => !scheduleForDeletion.includes(object));
  }
  render() {
    this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    for (const object of this.objects) {
      object?.core?.(this);
    }
    this.update();
    window.requestAnimationFrame(this.render.bind(this));
    if (this.mouse.moving) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.mouse.first.x, this.mouse.first.y);
      this.ctx.lineTo(this.mouse.last.x, this.mouse.last.y);
      this.ctx.stroke();
    }
  }
}
exports.default = Sketch;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT","./math/Utils":"6d18A","./Planet":"5EWzS","./math/Vector":"6j4zL","./math/RandomGenerator":"3jwsS"}],"6d18A":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
const gravitationalConstant = 0.1;
class Utils {
  distance(vec1, vec2) {
    return Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2));
  }
  force(object1, object2) {
    const r = this.distance(object1.pos, object2.pos);
    const F = gravitationalConstant * (object1.mass * object2.mass) / Math.pow(r, 2);
    // F = m * a
    return F;
  }
  constrain(n, min, max) {
    if (n < min) {
      n = min;
    }
    if (n > max) {
      n = max;
    }
    return n;
  }
  mouse(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}
exports.default = Utils;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT"}],"5EWzS":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _mathRandomGenerator = require("./math/RandomGenerator");
var _mathRandomGeneratorDefault = _parcelHelpers.interopDefault(_mathRandomGenerator);
var _mathVector = require("./math/Vector");
var _mathVectorDefault = _parcelHelpers.interopDefault(_mathVector);
var _mathUtils = require("./math/Utils");
var _mathUtilsDefault = _parcelHelpers.interopDefault(_mathUtils);
const generator = new _mathRandomGeneratorDefault.default();
const utils = new _mathUtilsDefault.default();
const max = 1;
class Planet {
  vel = new _mathVectorDefault.default(generator.float(-1, 1), generator.float(-1, 1));
  acc = new _mathVectorDefault.default(0, 0);
  pos = new _mathVectorDefault.default(0, 0);
  constructor({radius = 5, mass = 5, pos}) {
    this.radius = radius;
    this.mass = mass;
    if (pos) {
      this.pos = pos;
    }
  }
  boundary({width, height}) {
    if (this.pos.x < -this.radius) {
      this.pos.x = width + this.radius;
    }
    if (this.pos.x > width + this.radius) {
      this.pos.x = -this.radius;
    }
    if (this.pos.y > height + this.radius) {
      this.pos.y = -this.radius;
    }
    if (this.pos.y < -this.radius) {
      this.pos.y = height + this.radius;
    }
  }
  update(objects) {
    for (const object of objects) {
      if (object !== this) {
        // calculate force
        const direction = new _mathVectorDefault.default(object.pos.x - this.pos.x, object.pos.y - this.pos.y);
        direction.setMag(utils.force(object, this));
        direction.div(this.mass);
        // F = m * acc
        // 
        this.acc.add(direction);
      }
    }
    this.vel.add(this.acc);
    this.vel.limit(max);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
  }
  core({ctx, objects, dimensions}) {
    this.boundary(dimensions);
    this.update(objects);
    this.render(ctx);
  }
}
exports.default = Planet;

},{"./math/RandomGenerator":"3jwsS","./math/Vector":"6j4zL","./math/Utils":"6d18A","@parcel/transformer-js/lib/esmodule-helpers.js":"7kyIT"}]},["3KdSp","71k5j"], "71k5j", "parcelRequired861")

//# sourceMappingURL=index.24e1d95d.js.map
