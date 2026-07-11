"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/papaparse/papaparse.min.js
var require_papaparse_min = __commonJS({
  "node_modules/papaparse/papaparse.min.js"(exports, module2) {
    ((e, t) => {
      "function" == typeof define && define.amd ? define([], t) : "object" == typeof module2 && "undefined" != typeof exports ? module2.exports = t() : e.Papa = t();
    })(exports, function r() {
      var n = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n ? n : {};
      var d, s = !n.document && !!n.postMessage, a = n.IS_PAPA_WORKER || false, o = {}, h = 0, v = {};
      function P(e) {
        return 65279 === e.charCodeAt(0) ? e.slice(1) : e;
      }
      function u(e) {
        this._handle = null, this._finished = false, this._completed = false, this._halted = false, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = true, this._completeResults = { data: [], errors: [], meta: {} }, function(e2) {
          var t = b(e2);
          t.chunkSize = parseInt(t.chunkSize), e2.step || e2.chunk || (t.chunkSize = null);
          this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }.call(this, e), this.parseChunk = function(t, e2) {
          var i2 = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < i2) {
            let e3 = this._config.newline;
            e3 || (r2 = this._config.quoteChar || '"', e3 = this._handle.guessLineEndings(t, r2)), t = [...t.split(e3).slice(i2)].join(e3);
          }
          this.isFirstChunk && q(this._config.beforeFirstChunk) && void 0 !== (r2 = this._config.beforeFirstChunk(t)) && (t = r2), this.isFirstChunk = false, this._halted = false;
          var i2 = this._partialLine + t, r2 = (this._partialLine = "", this._handle.parse(i2, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            t = r2.meta.cursor, i2 = (this._finished || (this._partialLine = i2.substring(t - this._baseIndex), this._baseIndex = t), r2 && r2.data && (this._rowCount += r2.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview);
            if (a)
              n.postMessage({ results: r2, workerId: v.WORKER_ID, finished: i2 });
            else if (q(this._config.chunk) && !e2) {
              if (this._config.chunk(r2, this._handle), this._handle.paused() || this._handle.aborted())
                return void (this._halted = true);
              this._completeResults = r2 = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(r2.data), this._completeResults.errors = this._completeResults.errors.concat(r2.errors), this._completeResults.meta = r2.meta), this._completed || !i2 || !q(this._config.complete) || r2 && r2.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = true), i2 || r2 && r2.meta.paused || this._nextChunk(), r2;
          }
          this._halted = true;
        }, this._sendError = function(e2) {
          q(this._config.error) ? this._config.error(e2) : a && this._config.error && n.postMessage({ workerId: v.WORKER_ID, error: e2, finished: false });
        };
      }
      function f(e) {
        var r2;
        (e = e || {}).chunkSize || (e.chunkSize = v.RemoteChunkSize), u.call(this, e), this._nextChunk = s ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(e2) {
          this._input = e2, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished)
            this._chunkLoaded();
          else {
            if (r2 = new XMLHttpRequest(), this._config.withCredentials && (r2.withCredentials = this._config.withCredentials), s || (r2.onload = y(this._chunkLoaded, this), r2.onerror = y(this._chunkError, this)), r2.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !s), this._config.downloadRequestHeaders) {
              var e2, t = this._config.downloadRequestHeaders;
              for (e2 in t)
                r2.setRequestHeader(e2, t[e2]);
            }
            var i2;
            this._config.chunkSize && (i2 = this._start + this._config.chunkSize - 1, r2.setRequestHeader("Range", "bytes=" + this._start + "-" + i2));
            try {
              r2.send(this._config.downloadRequestBody);
            } catch (e3) {
              this._chunkError(e3.message);
            }
            s && 0 === r2.status && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          4 === r2.readyState && (r2.status < 200 || 400 <= r2.status ? this._chunkError() : (this._start += this._config.chunkSize || r2.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((e2) => null !== (e2 = e2.getResponseHeader("Content-Range")) ? parseInt(e2.substring(e2.lastIndexOf("/") + 1)) : -1)(r2), this.parseChunk(r2.responseText)));
        }, this._chunkError = function(e2) {
          e2 = r2.statusText || e2;
          this._sendError(new Error(e2));
        };
      }
      function l(e) {
        (e = e || {}).chunkSize || (e.chunkSize = v.LocalChunkSize), u.call(this, e);
        var i2, r2, n2 = "undefined" != typeof FileReader;
        this.stream = function(e2) {
          this._input = e2, r2 = e2.slice || e2.webkitSlice || e2.mozSlice, n2 ? ((i2 = new FileReader()).onload = y(this._chunkLoaded, this), i2.onerror = y(this._chunkError, this)) : i2 = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var e2 = this._input, t = (this._config.chunkSize && (t = Math.min(this._start + this._config.chunkSize, this._input.size), e2 = r2.call(e2, this._start, t)), i2.readAsText(e2, this._config.encoding));
          n2 || this._chunkLoaded({ target: { result: t } });
        }, this._chunkLoaded = function(e2) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e2.target.result);
        }, this._chunkError = function() {
          this._sendError(i2.error);
        };
      }
      function c(e) {
        var i2;
        u.call(this, e = e || {}), this.stream = function(e2) {
          return i2 = e2, this._nextChunk();
        }, this._nextChunk = function() {
          var e2, t;
          if (!this._finished)
            return e2 = this._config.chunkSize, i2 = e2 ? (t = i2.substring(0, e2), i2.substring(e2)) : (t = i2, ""), this._finished = !i2, this.parseChunk(t);
        };
      }
      function p(e) {
        u.call(this, e = e || {});
        var t = [], i2 = true, r2 = false;
        this.pause = function() {
          u.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          u.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(e2) {
          this._input = e2, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          r2 && 1 === t.length && (this._finished = true);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i2 = true;
        }, this._streamData = y(function(e2) {
          try {
            t.push("string" == typeof e2 ? e2 : e2.toString(this._config.encoding)), i2 && (i2 = false, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e3) {
            this._streamError(e3);
          }
        }, this), this._streamError = y(function(e2) {
          this._streamCleanUp(), this._sendError(e2);
        }, this), this._streamEnd = y(function() {
          this._streamCleanUp(), r2 = true, this._streamData("");
        }, this), this._streamCleanUp = y(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function i(m2) {
        var n2, s2, a2, t, o2 = Math.pow(2, 53), h2 = -o2, u2 = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, d2 = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, i2 = this, r2 = 0, f2 = 0, l2 = false, e = false, c2 = [], p2 = { data: [], errors: [], meta: {} };
        function y2(e2) {
          return "greedy" === m2.skipEmptyLines ? "" === e2.join("").trim() : 1 === e2.length && 0 === e2[0].length;
        }
        function g2() {
          if (p2 && a2 && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + v.DefaultDelimiter + "'"), a2 = false), m2.skipEmptyLines && (p2.data = p2.data.filter(function(e3) {
            return !y2(e3);
          })), _2()) {
            let t3 = function(e3, t4) {
              e3 = P(e3), q(m2.transformHeader) && (e3 = m2.transformHeader(e3, t4)), c2.push(e3);
            };
            var t2 = t3;
            if (p2)
              if (Array.isArray(p2.data[0])) {
                for (var e2 = 0; _2() && e2 < p2.data.length; e2++)
                  p2.data[e2].forEach(t3);
                p2.data.splice(0, 1);
              } else
                p2.data.forEach(t3);
          }
          function i3(e3, t3) {
            for (var i4 = m2.header ? {} : [], r4 = 0; r4 < e3.length; r4++) {
              var n3 = r4, s3 = e3[r4], s3 = ((e4, t4) => ((e5) => (m2.dynamicTypingFunction && void 0 === m2.dynamicTyping[e5] && (m2.dynamicTyping[e5] = m2.dynamicTypingFunction(e5)), true === (m2.dynamicTyping[e5] || m2.dynamicTyping)))(e4) ? "true" === t4 || "TRUE" === t4 || "false" !== t4 && "FALSE" !== t4 && (((e5) => {
                if (u2.test(e5)) {
                  e5 = parseFloat(e5);
                  if (h2 < e5 && e5 < o2)
                    return 1;
                }
              })(t4) ? parseFloat(t4) : d2.test(t4) ? new Date(t4) : "" === t4 ? null : t4) : t4)(n3 = m2.header ? r4 >= c2.length ? "__parsed_extra" : c2[r4] : n3, s3 = m2.transform ? m2.transform(s3, n3) : s3);
              "__parsed_extra" === n3 ? (i4[n3] = i4[n3] || [], i4[n3].push(s3)) : i4[n3] = s3;
            }
            return m2.header && (r4 > c2.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3) : r4 < c2.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + c2.length + " fields but parsed " + r4, f2 + t3)), i4;
          }
          var r3;
          p2 && (m2.header || m2.dynamicTyping || m2.transform) && (r3 = 1, !p2.data.length || Array.isArray(p2.data[0]) ? (p2.data = p2.data.map(i3), r3 = p2.data.length) : p2.data = i3(p2.data, 0), m2.header && p2.meta && (p2.meta.fields = c2), f2 += r3);
        }
        function _2() {
          return m2.header && 0 === c2.length;
        }
        function k(e2, t2, i3, r3) {
          e2 = { type: e2, code: t2, message: i3 };
          void 0 !== r3 && (e2.row = r3), p2.errors.push(e2);
        }
        q(m2.step) && (t = m2.step, m2.step = function(e2) {
          p2 = e2, _2() ? g2() : (g2(), 0 !== p2.data.length && (r2 += e2.data.length, m2.preview && r2 > m2.preview ? s2.abort() : (p2.data = p2.data[0], t(p2, i2))));
        }), this.parse = function(e2, t2, i3) {
          var r3 = m2.quoteChar || '"', r3 = (m2.newline || (m2.newline = this.guessLineEndings(e2, r3)), a2 = false, m2.delimiter ? q(m2.delimiter) && (m2.delimiter = m2.delimiter(e2), p2.meta.delimiter = m2.delimiter) : ((r3 = ((e3, t3, i4, r4, n3) => {
            var s3, a3, o3, h3;
            n3 = n3 || [",", "	", "|", ";", v.RECORD_SEP, v.UNIT_SEP];
            for (var u3 = 0; u3 < n3.length; u3++) {
              for (var d3, f3 = n3[u3], l3 = 0, c3 = 0, p3 = 0, g3 = (o3 = void 0, new E({ comments: r4, delimiter: f3, newline: t3, preview: 10 }).parse(e3)), _3 = 0; _3 < g3.data.length; _3++)
                i4 && y2(g3.data[_3]) ? p3++ : (d3 = g3.data[_3].length, c3 += d3, void 0 === o3 ? o3 = d3 : 0 < d3 && (l3 += Math.abs(d3 - o3), o3 = d3));
              0 < g3.data.length && (c3 /= g3.data.length - p3), (void 0 === a3 || l3 <= a3) && (void 0 === h3 || h3 < c3) && 1.99 < c3 && (a3 = l3, s3 = f3, h3 = c3);
            }
            return { successful: !!(m2.delimiter = s3), bestDelimiter: s3 };
          })(e2, m2.newline, m2.skipEmptyLines, m2.comments, m2.delimitersToGuess)).successful ? m2.delimiter = r3.bestDelimiter : (a2 = true, m2.delimiter = v.DefaultDelimiter), p2.meta.delimiter = m2.delimiter), b(m2));
          return m2.preview && m2.header && r3.preview++, n2 = e2, s2 = new E(r3), p2 = s2.parse(n2, t2, i3), g2(), l2 ? { meta: { paused: true } } : p2 || { meta: { paused: false } };
        }, this.paused = function() {
          return l2;
        }, this.pause = function() {
          l2 = true, s2.abort(), n2 = q(m2.chunk) ? "" : n2.substring(s2.getCharIndex());
        }, this.resume = function() {
          i2.streamer._halted ? (l2 = false, i2.streamer.parseChunk(n2, true)) : setTimeout(i2.resume, 3);
        }, this.aborted = function() {
          return e;
        }, this.abort = function() {
          e = true, s2.abort(), p2.meta.aborted = true, q(m2.complete) && m2.complete(p2), n2 = "";
        }, this.guessLineEndings = function(e2, t2) {
          e2 = e2.substring(0, 1048576);
          var t2 = new RegExp(U(t2) + "([^]*?)" + U(t2), "gm"), i3 = (e2 = e2.replace(t2, "")).split("\r"), t2 = e2.split("\n"), e2 = 1 < t2.length && t2[0].length < i3[0].length;
          if (1 === i3.length || e2)
            return "\n";
          for (var r3 = 0, n3 = 0; n3 < i3.length; n3++)
            "\n" === i3[n3][0] && r3++;
          return r3 >= i3.length / 2 ? "\r\n" : "\r";
        };
      }
      function U(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function E(C) {
        var S = (C = C || {}).delimiter, O = C.newline, x = C.comments, I = C.step, A = C.preview, T = C.fastMode, D = null, L = false, F = null == C.quoteChar ? '"' : C.quoteChar, j = F;
        if (void 0 !== C.escapeChar && (j = C.escapeChar), ("string" != typeof S || -1 < v.BAD_DELIMITERS.indexOf(S)) && (S = ","), x === S)
          throw new Error("Comment character same as delimiter");
        true === x ? x = "#" : ("string" != typeof x || -1 < v.BAD_DELIMITERS.indexOf(x)) && (x = false), "\n" !== O && "\r" !== O && "\r\n" !== O && (O = "\n");
        var z = 0, M = false;
        this.parse = function(i2, t, r2) {
          if ("string" != typeof i2)
            throw new Error("Input must be a string");
          var n2 = i2.length, e = S.length, s2 = O.length, a2 = x.length, o2 = q(I), h2 = [], u2 = [], d2 = [], f2 = z = 0;
          if (!i2)
            return w();
          if (T || false !== T && -1 === i2.indexOf(F)) {
            for (var l2 = i2.split(O), c2 = 0; c2 < l2.length; c2++) {
              if (d2 = l2[c2], z += d2.length, c2 !== l2.length - 1)
                z += O.length;
              else if (r2)
                return w();
              if (!x || d2.substring(0, a2) !== x) {
                if (o2) {
                  if (h2 = [], k(d2.split(S)), R(), M)
                    return w();
                } else
                  k(d2.split(S));
                if (A && A <= c2)
                  return h2 = h2.slice(0, A), w(true);
              }
            }
            return w();
          }
          for (var p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z), _2 = new RegExp(U(j) + U(F), "g"), m2 = i2.indexOf(F, z); ; )
            if (i2[z] === F)
              for (m2 = z, z++; ; ) {
                if (-1 === (m2 = i2.indexOf(F, m2 + 1)))
                  return r2 || u2.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: h2.length, index: z }), E2();
                if (m2 === n2 - 1)
                  return E2(i2.substring(z, m2).replace(_2, F));
                if (F === j && i2[m2 + 1] === j)
                  m2++;
                else if (F === j || 0 === m2 || i2[m2 - 1] !== j) {
                  -1 !== p2 && p2 < m2 + 1 && (p2 = i2.indexOf(S, m2 + 1));
                  var y2 = v2(-1 === (g2 = -1 !== g2 && g2 < m2 + 1 ? i2.indexOf(O, m2 + 1) : g2) ? p2 : Math.min(p2, g2));
                  if (i2.substr(m2 + 1 + y2, e) === S) {
                    d2.push(i2.substring(z, m2).replace(_2, F)), i2[z = m2 + 1 + y2 + e] !== F && (m2 = i2.indexOf(F, z)), p2 = i2.indexOf(S, z), g2 = i2.indexOf(O, z);
                    break;
                  }
                  y2 = v2(g2);
                  if (i2.substring(m2 + 1 + y2, m2 + 1 + y2 + s2) === O) {
                    if (d2.push(i2.substring(z, m2).replace(_2, F)), b2(m2 + 1 + y2 + s2), p2 = i2.indexOf(S, z), m2 = i2.indexOf(F, z), o2 && (R(), M))
                      return w();
                    if (A && h2.length >= A)
                      return w(true);
                    break;
                  }
                  u2.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: h2.length, index: z }), m2++;
                }
              }
            else if (x && 0 === d2.length && i2.substring(z, z + a2) === x) {
              if (-1 === g2)
                return w();
              z = g2 + s2, g2 = i2.indexOf(O, z), p2 = i2.indexOf(S, z);
            } else if (-1 !== p2 && (p2 < g2 || -1 === g2))
              d2.push(i2.substring(z, p2)), z = p2 + e, p2 = i2.indexOf(S, z);
            else {
              if (-1 === g2)
                break;
              if (d2.push(i2.substring(z, g2)), b2(g2 + s2), o2 && (R(), M))
                return w();
              if (A && h2.length >= A)
                return w(true);
            }
          return E2();
          function k(e2) {
            h2.push(e2), f2 = z;
          }
          function v2(e2) {
            var t2 = 0;
            return t2 = -1 !== e2 && (e2 = i2.substring(m2 + 1, e2)) && "" === e2.trim() ? e2.length : t2;
          }
          function E2(e2) {
            return r2 || (void 0 === e2 && (e2 = i2.substring(z)), d2.push(e2), z = n2, k(d2), o2 && R()), w();
          }
          function b2(e2) {
            z = e2, k(d2), d2 = [], g2 = i2.indexOf(O, z);
          }
          function w(e2) {
            if (C.header && !t && h2.length && !L) {
              var s3 = h2[0], a3 = /* @__PURE__ */ Object.create(null), o3 = new Set(s3);
              let n3 = false;
              for (let r3 = 0; r3 < s3.length; r3++) {
                let i3 = P(s3[r3]);
                if (a3[i3 = q(C.transformHeader) ? C.transformHeader(i3, r3) : i3]) {
                  let e3, t2 = a3[i3];
                  for (; e3 = i3 + "_" + t2, t2++, o3.has(e3); )
                    ;
                  o3.add(e3), s3[r3] = e3, a3[i3]++, n3 = true, (D = null === D ? {} : D)[e3] = i3;
                } else
                  a3[i3] = 1, s3[r3] = i3;
                o3.add(i3);
              }
              n3 && console.warn("Duplicate headers found and renamed."), L = true;
            }
            return { data: h2, errors: u2, meta: { delimiter: S, linebreak: O, aborted: M, truncated: !!e2, cursor: f2 + (t || 0), renamedHeaders: D } };
          }
          function R() {
            I(w()), h2 = [], u2 = [];
          }
        }, this.abort = function() {
          M = true;
        }, this.getCharIndex = function() {
          return z;
        };
      }
      function g(e) {
        var t = e.data, i2 = o[t.workerId], r2 = false;
        if (t.error)
          i2.userError(t.error, t.file);
        else if (t.results && t.results.data) {
          var n2 = { abort: function() {
            r2 = true, _(t.workerId, { data: [], errors: [], meta: { aborted: true } });
          }, pause: m, resume: m };
          if (q(i2.userStep)) {
            for (var s2 = 0; s2 < t.results.data.length && (i2.userStep({ data: t.results.data[s2], errors: t.results.errors, meta: t.results.meta }, n2), !r2); s2++)
              ;
            delete t.results;
          } else
            q(i2.userChunk) && (i2.userChunk(t.results, n2, t.file), delete t.results);
        }
        t.finished && !r2 && _(t.workerId, t.results);
      }
      function _(e, t) {
        var i2 = o[e];
        q(i2.userComplete) && i2.userComplete(t), i2.terminate(), delete o[e];
      }
      function m() {
        throw new Error("Not implemented.");
      }
      function b(e) {
        if ("object" != typeof e || null === e)
          return e;
        var t, i2 = Array.isArray(e) ? [] : {};
        for (t in e)
          i2[t] = b(e[t]);
        return i2;
      }
      function y(e, t) {
        return function() {
          e.apply(t, arguments);
        };
      }
      function q(e) {
        return "function" == typeof e;
      }
      return v.parse = function(e, t) {
        var i2 = (t = t || {}).dynamicTyping || false;
        q(i2) && (t.dynamicTypingFunction = i2, i2 = {});
        if (t.dynamicTyping = i2, t.transform = !!q(t.transform) && t.transform, !t.worker || !v.WORKERS_SUPPORTED)
          return i2 = null, v.NODE_STREAM_INPUT, "string" == typeof e ? (e = P(e), i2 = new (t.download ? f : c)(t)) : true === e.readable && q(e.read) && q(e.on) ? i2 = new p(t) : (n.File && e instanceof File || e instanceof Object) && (i2 = new l(t)), i2.stream(e);
        (i2 = (() => {
          var e2;
          return !!v.WORKERS_SUPPORTED && (e2 = (() => {
            var e3 = n.URL || n.webkitURL || null, t2 = r.toString();
            return v.BLOB_URL || (v.BLOB_URL = e3.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", t2, ")();"], { type: "text/javascript" })));
          })(), (e2 = new n.Worker(e2)).onmessage = g, e2.id = h++, o[e2.id] = e2);
        })()).userStep = t.step, i2.userChunk = t.chunk, i2.userComplete = t.complete, i2.userError = t.error, t.step = q(t.step), t.chunk = q(t.chunk), t.complete = q(t.complete), t.error = q(t.error), delete t.worker, i2.postMessage({ input: e, config: t, workerId: i2.id });
      }, v.unparse = function(e, t) {
        var s2 = false, _2 = true, m2 = ",", y2 = "\r\n", a2 = '"', o2 = a2 + a2, i2 = false, r2 = null, h2 = false, u2 = ((() => {
          if ("object" == typeof t) {
            if ("string" != typeof t.delimiter || v.BAD_DELIMITERS.filter(function(e2) {
              return -1 !== t.delimiter.indexOf(e2);
            }).length || (m2 = t.delimiter), "boolean" != typeof t.quotes && "function" != typeof t.quotes && !Array.isArray(t.quotes) || (s2 = t.quotes), "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i2 = t.skipEmptyLines), "string" == typeof t.newline && (y2 = t.newline), "string" == typeof t.quoteChar && (a2 = t.quoteChar, o2 = a2 + a2), "boolean" == typeof t.header && (_2 = t.header), Array.isArray(t.columns)) {
              if (0 === t.columns.length)
                throw new Error("Option columns is empty");
              r2 = t.columns;
            }
            void 0 !== t.escapeChar && (o2 = t.escapeChar + a2), t.escapeFormulae instanceof RegExp ? h2 = t.escapeFormulae : "boolean" == typeof t.escapeFormulae && t.escapeFormulae && (h2 = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(U(a2), "g"));
        "string" == typeof e && (e = JSON.parse(e));
        if (Array.isArray(e)) {
          if (!e.length || Array.isArray(e[0]))
            return n2(null, e, i2);
          if ("object" == typeof e[0])
            return n2(r2 || Object.keys(e[0]), e, i2);
        } else if ("object" == typeof e)
          return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || r2), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : "object" == typeof e.data[0] ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), n2(e.fields || [], e.data || [], i2);
        throw new Error("Unable to serialize unrecognized input");
        function n2(e2, t2, i3) {
          var r3 = "", n3 = ("string" == typeof e2 && (e2 = JSON.parse(e2)), "string" == typeof t2 && (t2 = JSON.parse(t2)), Array.isArray(e2) && 0 < e2.length), s3 = !Array.isArray(t2[0]);
          if (n3 && _2) {
            for (var a3 = 0; a3 < e2.length; a3++)
              0 < a3 && (r3 += m2), r3 += k(e2[a3], a3);
            0 < t2.length && (r3 += y2);
          }
          for (var o3 = 0; o3 < t2.length; o3++) {
            var h3 = (n3 ? e2 : t2[o3]).length, u3 = false, d2 = n3 ? 0 === Object.keys(t2[o3]).length : 0 === t2[o3].length;
            if (i3 && !n3 && (u3 = "greedy" === i3 ? "" === t2[o3].join("").trim() : 1 === t2[o3].length && 0 === t2[o3][0].length), "greedy" === i3 && n3) {
              for (var f2 = [], l2 = 0; l2 < h3; l2++) {
                var c2 = s3 ? e2[l2] : l2;
                f2.push(t2[o3][c2]);
              }
              u3 = "" === f2.join("").trim();
            }
            if (!u3) {
              for (var p2 = 0; p2 < h3; p2++) {
                0 < p2 && !d2 && (r3 += m2);
                var g2 = n3 && s3 ? e2[p2] : p2;
                r3 += k(t2[o3][g2], p2);
              }
              o3 < t2.length - 1 && (!i3 || 0 < h3 && !d2) && (r3 += y2);
            }
          }
          return r3;
        }
        function k(e2, t2) {
          var i3, r3, n3;
          return null == e2 ? "" : e2.constructor === Date ? JSON.stringify(e2).slice(1, 25) : (n3 = false, h2 && "string" == typeof e2 && h2.test(e2) && (e2 = "'" + e2, n3 = true), r3 = (i3 = e2.toString()).replace(u2, o2), (n3 = n3 || true === s2 || "function" == typeof s2 && s2(e2, t2) || Array.isArray(s2) && s2[t2] || ((e3, t3) => {
            for (var i4 = 0; i4 < t3.length; i4++)
              if (-1 < e3.indexOf(t3[i4]))
                return true;
            return false;
          })(r3, v.BAD_DELIMITERS) || -1 < r3.indexOf(m2) || -1 < i3.indexOf(a2) || " " === r3.charAt(0) || " " === r3.charAt(r3.length - 1)) ? a2 + r3 + a2 : r3);
        }
      }, v.RECORD_SEP = String.fromCharCode(30), v.UNIT_SEP = String.fromCharCode(31), v.BYTE_ORDER_MARK = "\uFEFF", v.BAD_DELIMITERS = ["\r", "\n", '"', v.BYTE_ORDER_MARK], v.WORKERS_SUPPORTED = !s && !!n.Worker, v.NODE_STREAM_INPUT = 1, v.LocalChunkSize = 10485760, v.RemoteChunkSize = 5242880, v.DefaultDelimiter = ",", v.Parser = E, v.ParserHandle = i, v.NetworkStreamer = f, v.FileStreamer = l, v.StringStreamer = c, v.ReadableStreamStreamer = p, n.jQuery && ((d = n.jQuery).fn.parse = function(o2) {
        var i2 = o2.config || {}, h2 = [];
        return this.each(function(e2) {
          if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && n.FileReader) || !this.files || 0 === this.files.length)
            return true;
          for (var t = 0; t < this.files.length; t++)
            h2.push({ file: this.files[t], inputElem: this, instanceConfig: d.extend({}, i2) });
        }), e(), this;
        function e() {
          if (0 === h2.length)
            q(o2.complete) && o2.complete();
          else {
            var e2, t, i3, r2, n2 = h2[0];
            if (q(o2.before)) {
              var s2 = o2.before(n2.file, n2.inputElem);
              if ("object" == typeof s2) {
                if ("abort" === s2.action)
                  return e2 = "AbortError", t = n2.file, i3 = n2.inputElem, r2 = s2.reason, void (q(o2.error) && o2.error({ name: e2 }, t, i3, r2));
                if ("skip" === s2.action)
                  return void u2();
                "object" == typeof s2.config && (n2.instanceConfig = d.extend(n2.instanceConfig, s2.config));
              } else if ("skip" === s2)
                return void u2();
            }
            var a2 = n2.instanceConfig.complete;
            n2.instanceConfig.complete = function(e3) {
              q(a2) && a2(e3, n2.file, n2.inputElem), u2();
            }, v.parse(n2.file, n2.instanceConfig);
          }
        }
        function u2() {
          h2.splice(0, 1), e();
        }
      }), a && (n.onmessage = function(e) {
        e = e.data;
        void 0 === v.WORKER_ID && e && (v.WORKER_ID = e.workerId);
        "string" == typeof e.input ? n.postMessage({ workerId: v.WORKER_ID, results: v.parse(e.input, e.config), finished: true }) : (n.File && e.input instanceof File || e.input instanceof Object) && (e = v.parse(e.input, e.config)) && n.postMessage({ workerId: v.WORKER_ID, results: e, finished: true });
      }), (f.prototype = Object.create(u.prototype)).constructor = f, (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(c.prototype)).constructor = c, (p.prototype = Object.create(u.prototype)).constructor = p, v;
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GoodreadsCsvImporterPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");

// src/modal.ts
var import_obsidian3 = require("obsidian");

// src/parser.ts
var import_papaparse = __toESM(require_papaparse_min());
function parseGoodreadsCsv(csvText) {
  const result = import_papaparse.default.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim()
  });
  if (result.errors.length > 0) {
    const fatal = result.errors.filter((e) => e.type !== "FieldMismatch");
    if (fatal.length > 0) {
      throw new Error(`CSV illisible : ${fatal[0].message}`);
    }
  }
  const fields = result.meta.fields ?? [];
  if (!fields.includes("Book Id") || !fields.includes("Title")) {
    throw new Error(
      "Ce fichier ne ressemble pas \xE0 un export Goodreads. Utilisez My Books \u2192 Tools \u2192 Import and export \u2192 Export Library."
    );
  }
  return result.data.filter((row) => row["Book Id"] && row["Title"]).map(rowToBook);
}
function rowToBook(row) {
  const id = clean(row["Book Id"]);
  return {
    id,
    title: clean(row["Title"]),
    author: clean(row["Author"]),
    additionalAuthors: splitList(row["Additional Authors"]),
    isbn10: cleanIsbn(row["ISBN"]),
    isbn13: cleanIsbn(row["ISBN13"]),
    myRating: ratingOrNull(row["My Rating"]),
    averageRating: floatOrNull(row["Average Rating"]),
    publisher: clean(row["Publisher"]),
    binding: clean(row["Binding"]),
    numPages: intOrNull(row["Number of Pages"]),
    yearPublished: intOrNull(row["Year Published"]),
    originalYear: intOrNull(row["Original Publication Year"]),
    dateRead: toIsoDate(row["Date Read"]),
    dateAdded: toIsoDate(row["Date Added"]),
    shelves: splitList(row["Bookshelves"]),
    exclusiveShelf: clean(row["Exclusive Shelf"]),
    myReview: textOrNull(row["My Review"]),
    privateNotes: textOrNull(row["Private Notes"]),
    readCount: intOrNull(row["Read Count"]) ?? 0,
    ownedCopies: intOrNull(row["Owned Copies"]) ?? 0,
    goodreadsUrl: `https://www.goodreads.com/book/show/${id}`
  };
}
function clean(value) {
  return (value ?? "").trim();
}
function cleanIsbn(value) {
  return clean(value).replace(/[="]/g, "");
}
function splitList(value) {
  return clean(value).split(",").map((s) => s.trim()).filter(Boolean);
}
function ratingOrNull(value) {
  const n = parseInt(clean(value), 10);
  return Number.isFinite(n) && n >= 1 && n <= 5 ? n : null;
}
function intOrNull(value) {
  const n = parseInt(clean(value), 10);
  return Number.isFinite(n) ? n : null;
}
function floatOrNull(value) {
  const n = parseFloat(clean(value));
  return Number.isFinite(n) ? n : null;
}
function toIsoDate(value) {
  const v = clean(value);
  const match = v.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (!match)
    return v || null;
  return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
}
function textOrNull(value) {
  const v = clean(value);
  return v ? v : null;
}

// src/noteGenerator.ts
var import_obsidian = require("obsidian");

// src/template.ts
var DEFAULT_TEMPLATE = `---
title: "{{title}}"
author: "{{author}}"
additional_authors: [{{additionalAuthorsQuoted}}]
isbn13: "{{isbn13}}"
publisher: "{{publisher}}"
binding: "{{binding}}"
pages: {{numPages}}
year_published: {{yearPublished}}
original_year: {{originalYear}}
my_rating: {{myRating}}
average_rating: {{averageRating}}
shelf: "{{exclusiveShelf}}"
shelves: [{{shelvesQuoted}}]
date_read: {{dateRead}}
date_added: {{dateAdded}}
read_count: {{readCount}}
goodreads_url: {{goodreadsUrl}}
cover: "{{coverLocal}}"
cover_url: {{coverUrl}}
tags: [book, goodreads]
---

# {{title}}

{{coverEmbed}}

**Auteur :** {{authors}}
**Ma note :** {{myRatingStars}}
**Note moyenne Goodreads :** {{averageRating}}/5
**Statut :** {{exclusiveShelf}}
**Lu le :** {{dateRead}}

{{reviewSection}}
{{notesSection}}

---
[Voir sur Goodreads]({{goodreadsUrl}})
`;
function renderTemplate(template, book) {
  const vars = buildVariables(book);
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, key) => vars[key] ?? "");
}
function buildVariables(book) {
  const allAuthors = [book.author, ...book.additionalAuthors].filter(Boolean);
  const coverEmbed = book.coverLocalPath ? `![[${book.coverLocalPath}|250]]` : book.coverUrl ? `![cover|250](${book.coverUrl})` : "";
  const stars = book.myRating != null ? "\u2605".repeat(book.myRating) + "\u2606".repeat(5 - book.myRating) + ` (${book.myRating}/5)` : "Non not\xE9";
  const reviewSection = book.myReview ? `## Ma critique

${book.myReview}` : "";
  const notesSection = book.privateNotes ? `## Notes priv\xE9es

${book.privateNotes}` : "";
  return {
    id: book.id,
    title: yamlEscape(book.title),
    author: yamlEscape(book.author),
    authors: allAuthors.join(", "),
    additionalAuthors: book.additionalAuthors.join(", "),
    additionalAuthorsQuoted: book.additionalAuthors.map((a) => `"${yamlEscape(a)}"`).join(", "),
    isbn10: book.isbn10,
    isbn13: book.isbn13,
    myRating: book.myRating != null ? String(book.myRating) : "",
    myRatingStars: stars,
    averageRating: book.averageRating != null ? String(book.averageRating) : "",
    publisher: yamlEscape(book.publisher),
    binding: book.binding,
    numPages: book.numPages != null ? String(book.numPages) : "",
    yearPublished: book.yearPublished != null ? String(book.yearPublished) : "",
    originalYear: book.originalYear != null ? String(book.originalYear) : "",
    dateRead: book.dateRead ?? "",
    dateAdded: book.dateAdded ?? "",
    shelves: book.shelves.join(", "),
    shelvesQuoted: book.shelves.map((s) => `"${yamlEscape(s)}"`).join(", "),
    exclusiveShelf: book.exclusiveShelf,
    myReview: book.myReview ?? "",
    privateNotes: book.privateNotes ?? "",
    readCount: String(book.readCount),
    ownedCopies: String(book.ownedCopies),
    goodreadsUrl: book.goodreadsUrl,
    coverUrl: book.coverUrl ?? "",
    coverLocal: book.coverLocalPath ?? "",
    coverEmbed,
    reviewSection,
    notesSection,
    today: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  };
}
function yamlEscape(value) {
  return value.replace(/"/g, '\\"');
}
function sanitizeFilename(name) {
  return name.replace(/[\\/:*?"<>|#^[\]]/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
}

// src/noteGenerator.ts
async function createNote(app, book, settings, template) {
  const baseName = sanitizeFilename(
    book.author ? `${book.title} - ${book.author}` : book.title
  );
  const path = (0, import_obsidian.normalizePath)(`${settings.vaultDir}/${baseName}.md`);
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing instanceof import_obsidian.TFile && !settings.overwriteExisting) {
    return "skipped";
  }
  const content = renderTemplate(template, book);
  if (existing instanceof import_obsidian.TFile) {
    await app.vault.modify(existing, content);
    return "updated";
  }
  await app.vault.create(path, content);
  return "created";
}
async function loadTemplate(app, settings) {
  const templatePath = settings.templatePath?.trim();
  if (templatePath) {
    const file = app.vault.getAbstractFileByPath((0, import_obsidian.normalizePath)(templatePath));
    if (file instanceof import_obsidian.TFile) {
      try {
        return await app.vault.read(file);
      } catch (e) {
        console.warn("[Goodreads CSV Importer] Template illisible \u2192 template int\xE9gr\xE9.", e);
      }
    }
  }
  return DEFAULT_TEMPLATE;
}

// src/covers.ts
var import_obsidian2 = require("obsidian");
function coverUrlForIsbn(isbn) {
  if (!isbn)
    return void 0;
  return `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-L.jpg`;
}
async function downloadCoverByIsbn(app, isbn, bookId, coverFolder) {
  if (!isbn)
    return void 0;
  try {
    const folder = (0, import_obsidian2.normalizePath)(coverFolder);
    await ensureFolder(app, folder);
    const path = (0, import_obsidian2.normalizePath)(`${folder}/${bookId}.jpg`);
    const existing = app.vault.getAbstractFileByPath(path);
    if (existing instanceof import_obsidian2.TFile)
      return path;
    const url = `${coverUrlForIsbn(isbn)}?default=false`;
    const response = await (0, import_obsidian2.requestUrl)({ url, method: "GET", throw: false });
    if (response.status !== 200 || !response.arrayBuffer || response.arrayBuffer.byteLength < 2e3) {
      return void 0;
    }
    await app.vault.createBinary(path, response.arrayBuffer);
    return path;
  } catch (e) {
    console.warn(`[Goodreads CSV Importer] Couverture indisponible (ISBN ${isbn})`, e);
    return void 0;
  }
}
async function ensureFolder(app, path) {
  const normalized = (0, import_obsidian2.normalizePath)(path);
  if (app.vault.getAbstractFileByPath(normalized))
    return;
  const parts = normalized.split("/");
  let current = "";
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) {
      try {
        await app.vault.createFolder(current);
      } catch (e) {
        if (!app.vault.getAbstractFileByPath(current))
          throw e;
      }
    }
  }
}

// src/modal.ts
var ImportModal = class extends import_obsidian3.Modal {
  constructor(app, settings) {
    super(app);
    this.settings = settings;
    this.books = [];
    this.fileName = "";
    this.cancelled = false;
    this.progressBar = null;
    this.progressLabel = null;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("goodreads-csv-modal");
    contentEl.createEl("h2", { text: "Importer un export CSV Goodreads" });
    contentEl.createEl("p", {
      cls: "goodreads-csv-hint",
      text: "Sur Goodreads : My Books \u2192 Tools \u2192 Import and export \u2192 Export Library."
    });
    const fileSetting = new import_obsidian3.Setting(contentEl).setName("Fichier CSV");
    const fileInput = fileSetting.controlEl.createEl("input", {
      type: "file",
      attr: { accept: ".csv,text/csv" }
    });
    const previewEl = contentEl.createDiv({ cls: "goodreads-csv-preview" });
    const statusEl = contentEl.createDiv({ cls: "goodreads-csv-status" });
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      this.books = [];
      previewEl.empty();
      statusEl.setText("");
      if (!file)
        return;
      try {
        const text = await file.text();
        this.books = parseGoodreadsCsv(text);
        this.fileName = file.name;
        this.renderPreview(previewEl);
      } catch (e) {
        statusEl.setText(e instanceof Error ? e.message : String(e));
      }
    });
    new import_obsidian3.Setting(contentEl).setName("Filtrer par \xE9tag\xE8re").setDesc("Vide = tout importer. Sinon : read, to-read, currently-reading\u2026").addText((text) => {
      text.setPlaceholder("(toutes)");
      text.setValue(this.settings.shelfFilter);
      text.onChange((value) => this.settings.shelfFilter = value.trim());
    });
    new import_obsidian3.Setting(contentEl).setName("Couvertures via Open Library").setDesc("Le CSV ne contient pas d'images : r\xE9cup\xE9ration par ISBN (~1 requ\xEAte/livre).").addToggle((toggle) => {
      toggle.setValue(this.settings.downloadCovers);
      toggle.onChange((value) => this.settings.downloadCovers = value);
    });
    const progressWrapper = contentEl.createDiv({ cls: "goodreads-csv-progress is-hidden" });
    this.progressLabel = progressWrapper.createDiv({ cls: "goodreads-csv-progress-label" });
    const track = progressWrapper.createDiv({ cls: "goodreads-csv-progress-track" });
    this.progressBar = track.createDiv({ cls: "goodreads-csv-progress-bar" });
    let importButton;
    let cancelButton;
    new import_obsidian3.Setting(contentEl).addButton((btn) => {
      importButton = btn;
      btn.setButtonText("Importer").setCta().onClick(async () => {
        if (this.books.length === 0) {
          statusEl.setText("S\xE9lectionnez d\u2019abord un fichier CSV valide.");
          return;
        }
        importButton.setDisabled(true);
        cancelButton.setDisabled(false);
        progressWrapper.removeClass("is-hidden");
        this.cancelled = false;
        try {
          const report = await this.runImport(statusEl);
          const summary = `Import termin\xE9 : ${report.created} cr\xE9\xE9e(s), ${report.updated} mise(s) \xE0 jour, ${report.skipped} ignor\xE9e(s), ${report.failed} \xE9chec(s).`;
          new import_obsidian3.Notice(summary, 8e3);
          statusEl.setText(summary + (report.errors.length ? `
${report.errors.join("\n")}` : ""));
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          statusEl.setText(msg);
          new import_obsidian3.Notice(`Goodreads CSV Importer : ${msg}`, 8e3);
        } finally {
          importButton.setDisabled(false);
          cancelButton.setDisabled(true);
        }
      });
    }).addButton((btn) => {
      cancelButton = btn;
      btn.setButtonText("Annuler").setDisabled(true).onClick(() => this.cancelled = true);
    });
  }
  onClose() {
    this.cancelled = true;
    this.contentEl.empty();
  }
  // -------------------------------------------------------------------------
  renderPreview(previewEl) {
    previewEl.empty();
    const byShelf = /* @__PURE__ */ new Map();
    for (const book of this.books) {
      const shelf = book.exclusiveShelf || "(sans \xE9tag\xE8re)";
      byShelf.set(shelf, (byShelf.get(shelf) ?? 0) + 1);
    }
    const parts = Array.from(byShelf.entries()).map(([shelf, count]) => `${shelf} : ${count}`).join(" \xB7 ");
    previewEl.createEl("p", {
      text: `${this.fileName} \u2014 ${this.books.length} livre(s) (${parts})`
    });
    const list = previewEl.createEl("ul");
    for (const book of this.books.slice(0, 5)) {
      list.createEl("li", { text: `${book.title} \u2014 ${book.author}` });
    }
    if (this.books.length > 5) {
      previewEl.createEl("p", { cls: "goodreads-csv-hint", text: `\u2026 et ${this.books.length - 5} autres.` });
    }
  }
  async runImport(statusEl) {
    const report = { created: 0, updated: 0, skipped: 0, failed: 0, errors: [] };
    const filter = this.settings.shelfFilter.trim().toLowerCase();
    const books = filter ? this.books.filter(
      (b) => b.exclusiveShelf.toLowerCase() === filter || b.shelves.some((s) => s.toLowerCase() === filter)
    ) : this.books;
    if (books.length === 0) {
      throw new Error(`Aucun livre sur l'\xE9tag\xE8re \xAB ${this.settings.shelfFilter} \xBB.`);
    }
    const template = await loadTemplate(this.app, this.settings);
    await ensureFolder(this.app, this.settings.vaultDir);
    for (let i = 0; i < books.length; i++) {
      if (this.cancelled)
        throw new Error("Import annul\xE9.");
      const book = books[i];
      this.setProgress((i + 1) / books.length, `${i + 1}/${books.length} \u2014 ${book.title}`);
      try {
        const isbn = book.isbn13 || book.isbn10;
        book.coverUrl = coverUrlForIsbn(isbn);
        if (this.settings.downloadCovers) {
          book.coverLocalPath = await downloadCoverByIsbn(
            this.app,
            isbn,
            book.id,
            this.settings.coverFolder
          );
        }
        const result = await createNote(this.app, book, this.settings, template);
        report[result === "created" ? "created" : result === "updated" ? "updated" : "skipped"]++;
      } catch (e) {
        report.failed++;
        const msg = e instanceof Error ? e.message : String(e);
        report.errors.push(`${book.title} : ${msg}`);
        console.error(`[Goodreads CSV Importer] \xC9chec pour "${book.title}"`, e);
      }
    }
    return report;
  }
  setProgress(ratio, label) {
    if (this.progressBar) {
      this.progressBar.style.width = `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%`;
    }
    this.progressLabel?.setText(label);
  }
};

// src/types.ts
var DEFAULT_SETTINGS = {
  vaultDir: "Books",
  templatePath: "",
  overwriteExisting: false,
  downloadCovers: true,
  coverFolder: "Books/covers",
  shelfFilter: ""
};

// src/main.ts
var GoodreadsCsvImporterPlugin = class extends import_obsidian4.Plugin {
  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("book-open", "Importer un CSV Goodreads", () => {
      new ImportModal(this.app, this.settings).open();
    });
    this.addCommand({
      id: "import-goodreads-csv",
      name: "Import Goodreads CSV export",
      callback: () => new ImportModal(this.app, this.settings).open()
    });
    this.addSettingTab(new GoodreadsCsvSettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() ?? {});
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var GoodreadsCsvSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian4.Setting(containerEl).setName("Dossier des notes").setDesc("Dossier du vault o\xF9 cr\xE9er les notes de livres.").addText((text) => {
      text.setPlaceholder("Books");
      text.setValue(this.plugin.settings.vaultDir);
      text.onChange(async (value) => {
        this.plugin.settings.vaultDir = value.trim() || "Books";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("Template personnalis\xE9").setDesc(
      "Chemin vers une note-template (vide = template int\xE9gr\xE9). Variables : {{title}}, {{author}}, {{authors}}, {{myRating}}, {{myRatingStars}}, {{dateRead}}, {{shelves}}, {{coverEmbed}}, {{reviewSection}}, {{goodreadsUrl}}\u2026"
    ).addText((text) => {
      text.setPlaceholder("Templates/Goodreads Book.md");
      text.setValue(this.plugin.settings.templatePath);
      text.onChange(async (value) => {
        this.plugin.settings.templatePath = value.trim();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("\xC9craser les notes existantes").setDesc("Si d\xE9sactiv\xE9, les livres d\xE9j\xE0 import\xE9s sont ignor\xE9s (r\xE9-import s\xFBr).").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.overwriteExisting);
      toggle.onChange(async (value) => {
        this.plugin.settings.overwriteExisting = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("T\xE9l\xE9charger les couvertures (Open Library)").setDesc("L'export CSV ne contient pas d'images : elles sont r\xE9cup\xE9r\xE9es par ISBN.").addToggle((toggle) => {
      toggle.setValue(this.plugin.settings.downloadCovers);
      toggle.onChange(async (value) => {
        this.plugin.settings.downloadCovers = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian4.Setting(containerEl).setName("Dossier des couvertures").addText((text) => {
      text.setPlaceholder("Books/covers");
      text.setValue(this.plugin.settings.coverFolder);
      text.onChange(async (value) => {
        this.plugin.settings.coverFolder = value.trim() || "Books/covers";
        await this.plugin.saveSettings();
      });
    });
  }
};
/*! Bundled license information:

papaparse/papaparse.min.js:
  (* @license
  Papa Parse
  v5.5.4
  https://github.com/mholt/PapaParse
  License: MIT
  *)
*/
