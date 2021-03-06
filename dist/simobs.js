'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Simobs = function () {
  function Simobs() {
    _classCallCheck(this, Simobs);
  }

  _createClass(Simobs, [{
    key: 'sub',
    value: function sub(f) {
      if (this.subs) this.subs.push(f);else this.subs = [f];
    }
  }, {
    key: 'v',
    value: function v(s) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (deep ? this._deepdiff(s) : this._diff(s)) {
        if (typeof this.s !== 'undefined') this._notify();this.s = s;
      }
    }
  }, {
    key: '_notify',
    value: function _notify() {
      this.subs.forEach(function (f) {
        f();
      });
    }
  }, {
    key: '_diff',
    value: function _diff(s) {
      return this.s !== s;
    }
  }, {
    key: '_deepdiff',
    value: function _deepdiff(s) {
      var _this = this;

      if ([this.s, s].map(function (o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object';
      }).every(Boolean)) return this.s !== s;
      var props = [this.s, s].map(function (o) {
        return o ? Object.getOwnPropertyNames(o) : [];
      });
      if (!props.map(function (p) {
        return p.length;
      }).reduce(function (a, v) {
        return a === v ? a : NaN;
      })) return true;
      if (!props[0].map(function (p, i) {
        return p === props[1][i];
      }).every(Boolean)) return true;
      return !props[0].map(function (p, i) {
        return _this.s[p] === s[props[1][i]];
      }).every(Boolean);
    }
  }]);

  return Simobs;
}();

exports.default = Simobs;
