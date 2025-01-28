(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) n(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === 'childList')
        for (const o of i.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : r.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function n(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = s(r);
    fetch(r.href, i);
  }
})();
/**
 * @vue/shared v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function ws(e) {
  const t = Object.create(null);
  for (const s of e.split(',')) t[s] = 1;
  return (s) => s in t;
}
const k = {},
  Ze = [],
  Se = () => {},
  Or = () => !1,
  Wt = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Ss = (e) => e.startsWith('onUpdate:'),
  Z = Object.assign,
  Ts = (e, t) => {
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1);
  },
  Ir = Object.prototype.hasOwnProperty,
  H = (e, t) => Ir.call(e, t),
  P = Array.isArray,
  ut = (e) => Gt(e) === '[object Map]',
  Ar = (e) => Gt(e) === '[object Set]',
  R = (e) => typeof e == 'function',
  J = (e) => typeof e == 'string',
  Ye = (e) => typeof e == 'symbol',
  G = (e) => e !== null && typeof e == 'object',
  xn = (e) => (G(e) || R(e)) && R(e.then) && R(e.catch),
  Rr = Object.prototype.toString,
  Gt = (e) => Rr.call(e),
  Pr = (e) => Gt(e).slice(8, -1),
  Mr = (e) => Gt(e) === '[object Object]',
  Es = (e) => J(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  dt = ws(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
  ),
  Yt = (e) => {
    const t = Object.create(null);
    return (s) => t[s] || (t[s] = e(s));
  },
  Fr = /-(\w)/g,
  De = Yt((e) => e.replace(Fr, (t, s) => (s ? s.toUpperCase() : ''))),
  Lr = /\B([A-Z])/g,
  Je = Yt((e) => e.replace(Lr, '-$1').toLowerCase()),
  wn = Yt((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  ss = Yt((e) => (e ? `on${wn(e)}` : '')),
  He = (e, t) => !Object.is(e, t),
  ns = (e, ...t) => {
    for (let s = 0; s < e.length; s++) e[s](...t);
  },
  Sn = (e, t, s, n = !1) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: n, value: s });
  },
  Hr = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Gs;
const Jt = () =>
  Gs ||
  (Gs =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {});
function Cs(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s],
        r = J(n) ? Br(n) : Cs(n);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else if (J(e) || G(e)) return e;
}
const Dr = /;(?![^(]*\))/g,
  $r = /:([^]+)/,
  Nr = /\/\*[^]*?\*\//g;
function Br(e) {
  const t = {};
  return (
    e
      .replace(Nr, '')
      .split(Dr)
      .forEach((s) => {
        if (s) {
          const n = s.split($r);
          n.length > 1 && (t[n[0].trim()] = n[1].trim());
        }
      }),
    t
  );
}
function Os(e) {
  let t = '';
  if (J(e)) t = e;
  else if (P(e))
    for (let s = 0; s < e.length; s++) {
      const n = Os(e[s]);
      n && (t += n + ' ');
    }
  else if (G(e)) for (const s in e) e[s] && (t += s + ' ');
  return t.trim();
}
const jr = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  kr = ws(jr);
function Tn(e) {
  return !!e || e === '';
}
/**
 * @vue/reactivity v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ce;
class qr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = ce),
      !t && ce && (this.index = (ce.scopes || (ce.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes) for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes) for (t = 0, s = this.scopes.length; t < s; t++) this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = ce;
      try {
        return (ce = this), t();
      } finally {
        ce = s;
      }
    }
  }
  on() {
    ce = this;
  }
  off() {
    ce = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function Vr() {
  return ce;
}
let j;
const rs = new WeakSet();
class En {
  constructor(t) {
    (this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      ce && ce.active && ce.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && ((this.flags &= -65), rs.has(this) && (rs.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || On(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    (this.flags |= 2), Ys(this), In(this);
    const t = j,
      s = de;
    (j = this), (de = !0);
    try {
      return this.fn();
    } finally {
      An(this), (j = t), (de = s), (this.flags &= -3);
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Rs(t);
      (this.deps = this.depsTail = void 0),
        Ys(this),
        this.onStop && this.onStop(),
        (this.flags &= -2);
    }
  }
  trigger() {
    this.flags & 64 ? rs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    us(this) && this.run();
  }
  get dirty() {
    return us(this);
  }
}
let Cn = 0,
  pt,
  ht;
function On(e, t = !1) {
  if (((e.flags |= 8), t)) {
    (e.next = ht), (ht = e);
    return;
  }
  (e.next = pt), (pt = e);
}
function Is() {
  Cn++;
}
function As() {
  if (--Cn > 0) return;
  if (ht) {
    let t = ht;
    for (ht = void 0; t; ) {
      const s = t.next;
      (t.next = void 0), (t.flags &= -9), (t = s);
    }
  }
  let e;
  for (; pt; ) {
    let t = pt;
    for (pt = void 0; t; ) {
      const s = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function In(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t);
}
function An(e) {
  let t,
    s = e.depsTail,
    n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Rs(n), Ur(n)) : (t = n),
      (n.dep.activeLink = n.prevActiveLink),
      (n.prevActiveLink = void 0),
      (n = r);
  }
  (e.deps = t), (e.depsTail = s);
}
function us(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Rn(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Rn(e) {
  if ((e.flags & 4 && !(e.flags & 16)) || ((e.flags &= -17), e.globalVersion === bt)) return;
  e.globalVersion = bt;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !us(e))) {
    e.flags &= -3;
    return;
  }
  const s = j,
    n = de;
  (j = e), (de = !0);
  try {
    In(e);
    const r = e.fn(e._value);
    (t.version === 0 || He(r, e._value)) && ((e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    (j = s), (de = n), An(e), (e.flags &= -3);
  }
}
function Rs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (
    (n && ((n.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = n), (e.nextSub = void 0)),
    s.subs === e && ((s.subs = n), !n && s.computed))
  ) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep) Rs(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Ur(e) {
  const { prevDep: t, nextDep: s } = e;
  t && ((t.nextDep = s), (e.prevDep = void 0)), s && ((s.prevDep = t), (e.nextDep = void 0));
}
let de = !0;
const Pn = [];
function Ne() {
  Pn.push(de), (de = !1);
}
function Be() {
  const e = Pn.pop();
  de = e === void 0 ? !0 : e;
}
function Ys(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const s = j;
    j = void 0;
    try {
      t();
    } finally {
      j = s;
    }
  }
}
let bt = 0;
class Kr {
  constructor(t, s) {
    (this.sub = t),
      (this.dep = s),
      (this.version = s.version),
      (this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0);
  }
}
class Ps {
  constructor(t) {
    (this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0);
  }
  track(t) {
    if (!j || !de || j === this.computed) return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== j)
      (s = this.activeLink = new Kr(j, this)),
        j.deps
          ? ((s.prevDep = j.depsTail), (j.depsTail.nextDep = s), (j.depsTail = s))
          : (j.deps = j.depsTail = s),
        Mn(s);
    else if (s.version === -1 && ((s.version = this.version), s.nextDep)) {
      const n = s.nextDep;
      (n.prevDep = s.prevDep),
        s.prevDep && (s.prevDep.nextDep = n),
        (s.prevDep = j.depsTail),
        (s.nextDep = void 0),
        (j.depsTail.nextDep = s),
        (j.depsTail = s),
        j.deps === s && (j.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, bt++, this.notify(t);
  }
  notify(t) {
    Is();
    try {
      for (let s = this.subs; s; s = s.prevSub) s.sub.notify() && s.sub.dep.notify();
    } finally {
      As();
    }
  }
}
function Mn(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) Mn(n);
    }
    const s = e.dep.subs;
    s !== e && ((e.prevSub = s), s && (s.nextSub = e)), (e.dep.subs = e);
  }
}
const ds = new WeakMap(),
  We = Symbol(''),
  ps = Symbol(''),
  yt = Symbol('');
function z(e, t, s) {
  if (de && j) {
    let n = ds.get(e);
    n || ds.set(e, (n = new Map()));
    let r = n.get(s);
    r || (n.set(s, (r = new Ps())), (r.map = n), (r.key = s)), r.track();
  }
}
function Oe(e, t, s, n, r, i) {
  const o = ds.get(e);
  if (!o) {
    bt++;
    return;
  }
  const f = (c) => {
    c && c.trigger();
  };
  if ((Is(), t === 'clear')) o.forEach(f);
  else {
    const c = P(e),
      p = c && Es(s);
    if (c && s === 'length') {
      const u = Number(n);
      o.forEach((h, T) => {
        (T === 'length' || T === yt || (!Ye(T) && T >= u)) && f(h);
      });
    } else
      switch (((s !== void 0 || o.has(void 0)) && f(o.get(s)), p && f(o.get(yt)), t)) {
        case 'add':
          c ? p && f(o.get('length')) : (f(o.get(We)), ut(e) && f(o.get(ps)));
          break;
        case 'delete':
          c || (f(o.get(We)), ut(e) && f(o.get(ps)));
          break;
        case 'set':
          ut(e) && f(o.get(We));
          break;
      }
  }
  As();
}
function ze(e) {
  const t = L(e);
  return t === e ? t : (z(t, 'iterate', yt), pe(e) ? t : t.map(te));
}
function Ms(e) {
  return z((e = L(e)), 'iterate', yt), e;
}
const Wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return is(this, Symbol.iterator, te);
  },
  concat(...e) {
    return ze(this).concat(...e.map((t) => (P(t) ? ze(t) : t)));
  },
  entries() {
    return is(this, 'entries', (e) => ((e[1] = te(e[1])), e));
  },
  every(e, t) {
    return Ee(this, 'every', e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ee(this, 'filter', e, t, (s) => s.map(te), arguments);
  },
  find(e, t) {
    return Ee(this, 'find', e, t, te, arguments);
  },
  findIndex(e, t) {
    return Ee(this, 'findIndex', e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ee(this, 'findLast', e, t, te, arguments);
  },
  findLastIndex(e, t) {
    return Ee(this, 'findLastIndex', e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ee(this, 'forEach', e, t, void 0, arguments);
  },
  includes(...e) {
    return os(this, 'includes', e);
  },
  indexOf(...e) {
    return os(this, 'indexOf', e);
  },
  join(e) {
    return ze(this).join(e);
  },
  lastIndexOf(...e) {
    return os(this, 'lastIndexOf', e);
  },
  map(e, t) {
    return Ee(this, 'map', e, t, void 0, arguments);
  },
  pop() {
    return ft(this, 'pop');
  },
  push(...e) {
    return ft(this, 'push', e);
  },
  reduce(e, ...t) {
    return Js(this, 'reduce', e, t);
  },
  reduceRight(e, ...t) {
    return Js(this, 'reduceRight', e, t);
  },
  shift() {
    return ft(this, 'shift');
  },
  some(e, t) {
    return Ee(this, 'some', e, t, void 0, arguments);
  },
  splice(...e) {
    return ft(this, 'splice', e);
  },
  toReversed() {
    return ze(this).toReversed();
  },
  toSorted(e) {
    return ze(this).toSorted(e);
  },
  toSpliced(...e) {
    return ze(this).toSpliced(...e);
  },
  unshift(...e) {
    return ft(this, 'unshift', e);
  },
  values() {
    return is(this, 'values', te);
  },
};
function is(e, t, s) {
  const n = Ms(e),
    r = n[t]();
  return (
    n !== e &&
      !pe(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const i = r._next();
        return i.value && (i.value = s(i.value)), i;
      })),
    r
  );
}
const Gr = Array.prototype;
function Ee(e, t, s, n, r, i) {
  const o = Ms(e),
    f = o !== e && !pe(e),
    c = o[t];
  if (c !== Gr[t]) {
    const h = c.apply(e, i);
    return f ? te(h) : h;
  }
  let p = s;
  o !== e &&
    (f
      ? (p = function (h, T) {
          return s.call(this, te(h), T, e);
        })
      : s.length > 2 &&
        (p = function (h, T) {
          return s.call(this, h, T, e);
        }));
  const u = c.call(o, p, n);
  return f && r ? r(u) : u;
}
function Js(e, t, s, n) {
  const r = Ms(e);
  let i = s;
  return (
    r !== e &&
      (pe(e)
        ? s.length > 3 &&
          (i = function (o, f, c) {
            return s.call(this, o, f, c, e);
          })
        : (i = function (o, f, c) {
            return s.call(this, o, te(f), c, e);
          })),
    r[t](i, ...n)
  );
}
function os(e, t, s) {
  const n = L(e);
  z(n, 'iterate', yt);
  const r = n[t](...s);
  return (r === -1 || r === !1) && Hs(s[0]) ? ((s[0] = L(s[0])), n[t](...s)) : r;
}
function ft(e, t, s = []) {
  Ne(), Is();
  const n = L(e)[t].apply(e, s);
  return As(), Be(), n;
}
const Yr = ws('__proto__,__v_isRef,__isVue'),
  Fn = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Ye),
  );
function Jr(e) {
  Ye(e) || (e = String(e));
  const t = L(this);
  return z(t, 'has', e), t.hasOwnProperty(e);
}
class Ln {
  constructor(t = !1, s = !1) {
    (this._isReadonly = t), (this._isShallow = s);
  }
  get(t, s, n) {
    if (s === '__v_skip') return t.__v_skip;
    const r = this._isReadonly,
      i = this._isShallow;
    if (s === '__v_isReactive') return !r;
    if (s === '__v_isReadonly') return r;
    if (s === '__v_isShallow') return i;
    if (s === '__v_raw')
      return n === (r ? (i ? ii : Nn) : i ? $n : Dn).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(n)
        ? t
        : void 0;
    const o = P(t);
    if (!r) {
      let c;
      if (o && (c = Wr[s])) return c;
      if (s === 'hasOwnProperty') return Jr;
    }
    const f = Reflect.get(t, s, X(t) ? t : n);
    return (Ye(s) ? Fn.has(s) : Yr(s)) || (r || z(t, 'get', s), i)
      ? f
      : X(f)
        ? o && Es(s)
          ? f
          : f.value
        : G(f)
          ? r
            ? Bn(f)
            : Tt(f)
          : f;
  }
}
class Hn extends Ln {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let i = t[s];
    if (!this._isShallow) {
      const c = Ge(i);
      if ((!pe(n) && !Ge(n) && ((i = L(i)), (n = L(n))), !P(t) && X(i) && !X(n)))
        return c ? !1 : ((i.value = n), !0);
    }
    const o = P(t) && Es(s) ? Number(s) < t.length : H(t, s),
      f = Reflect.set(t, s, n, X(t) ? t : r);
    return t === L(r) && (o ? He(n, i) && Oe(t, 'set', s, n) : Oe(t, 'add', s, n)), f;
  }
  deleteProperty(t, s) {
    const n = H(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Oe(t, 'delete', s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ye(s) || !Fn.has(s)) && z(t, 'has', s), n;
  }
  ownKeys(t) {
    return z(t, 'iterate', P(t) ? 'length' : We), Reflect.ownKeys(t);
  }
}
class zr extends Ln {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Xr = new Hn(),
  Zr = new zr(),
  Qr = new Hn(!0);
const hs = (e) => e,
  Mt = (e) => Reflect.getPrototypeOf(e);
function ei(e, t, s) {
  return function (...n) {
    const r = this.__v_raw,
      i = L(r),
      o = ut(i),
      f = e === 'entries' || (e === Symbol.iterator && o),
      c = e === 'keys' && o,
      p = r[e](...n),
      u = s ? hs : t ? gs : te;
    return (
      !t && z(i, 'iterate', c ? ps : We),
      {
        next() {
          const { value: h, done: T } = p.next();
          return T ? { value: h, done: T } : { value: f ? [u(h[0]), u(h[1])] : u(h), done: T };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ft(e) {
  return function (...t) {
    return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
  };
}
function ti(e, t) {
  const s = {
    get(r) {
      const i = this.__v_raw,
        o = L(i),
        f = L(r);
      e || (He(r, f) && z(o, 'get', r), z(o, 'get', f));
      const { has: c } = Mt(o),
        p = t ? hs : e ? gs : te;
      if (c.call(o, r)) return p(i.get(r));
      if (c.call(o, f)) return p(i.get(f));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && z(L(r), 'iterate', We), Reflect.get(r, 'size', r);
    },
    has(r) {
      const i = this.__v_raw,
        o = L(i),
        f = L(r);
      return (
        e || (He(r, f) && z(o, 'has', r), z(o, 'has', f)), r === f ? i.has(r) : i.has(r) || i.has(f)
      );
    },
    forEach(r, i) {
      const o = this,
        f = o.__v_raw,
        c = L(f),
        p = t ? hs : e ? gs : te;
      return !e && z(c, 'iterate', We), f.forEach((u, h) => r.call(i, p(u), p(h), o));
    },
  };
  return (
    Z(
      s,
      e
        ? { add: Ft('add'), set: Ft('set'), delete: Ft('delete'), clear: Ft('clear') }
        : {
            add(r) {
              !t && !pe(r) && !Ge(r) && (r = L(r));
              const i = L(this);
              return Mt(i).has.call(i, r) || (i.add(r), Oe(i, 'add', r, r)), this;
            },
            set(r, i) {
              !t && !pe(i) && !Ge(i) && (i = L(i));
              const o = L(this),
                { has: f, get: c } = Mt(o);
              let p = f.call(o, r);
              p || ((r = L(r)), (p = f.call(o, r)));
              const u = c.call(o, r);
              return o.set(r, i), p ? He(i, u) && Oe(o, 'set', r, i) : Oe(o, 'add', r, i), this;
            },
            delete(r) {
              const i = L(this),
                { has: o, get: f } = Mt(i);
              let c = o.call(i, r);
              c || ((r = L(r)), (c = o.call(i, r))), f && f.call(i, r);
              const p = i.delete(r);
              return c && Oe(i, 'delete', r, void 0), p;
            },
            clear() {
              const r = L(this),
                i = r.size !== 0,
                o = r.clear();
              return i && Oe(r, 'clear', void 0, void 0), o;
            },
          },
    ),
    ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
      s[r] = ei(r, e, t);
    }),
    s
  );
}
function Fs(e, t) {
  const s = ti(e, t);
  return (n, r, i) =>
    r === '__v_isReactive'
      ? !e
      : r === '__v_isReadonly'
        ? e
        : r === '__v_raw'
          ? n
          : Reflect.get(H(s, r) && r in n ? s : n, r, i);
}
const si = { get: Fs(!1, !1) },
  ni = { get: Fs(!1, !0) },
  ri = { get: Fs(!0, !1) };
const Dn = new WeakMap(),
  $n = new WeakMap(),
  Nn = new WeakMap(),
  ii = new WeakMap();
function oi(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function li(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Pr(e));
}
function Tt(e) {
  return Ge(e) ? e : Ls(e, !1, Xr, si, Dn);
}
function fi(e) {
  return Ls(e, !1, Qr, ni, $n);
}
function Bn(e) {
  return Ls(e, !0, Zr, ri, Nn);
}
function Ls(e, t, s, n, r) {
  if (!G(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const o = li(e);
  if (o === 0) return e;
  const f = new Proxy(e, o === 2 ? n : s);
  return r.set(e, f), f;
}
function gt(e) {
  return Ge(e) ? gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ge(e) {
  return !!(e && e.__v_isReadonly);
}
function pe(e) {
  return !!(e && e.__v_isShallow);
}
function Hs(e) {
  return e ? !!e.__v_raw : !1;
}
function L(e) {
  const t = e && e.__v_raw;
  return t ? L(t) : e;
}
function ci(e) {
  return !H(e, '__v_skip') && Object.isExtensible(e) && Sn(e, '__v_skip', !0), e;
}
const te = (e) => (G(e) ? Tt(e) : e),
  gs = (e) => (G(e) ? Bn(e) : e);
function X(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Pe(e) {
  return ai(e, !1);
}
function ai(e, t) {
  return X(e) ? e : new ui(e, t);
}
class ui {
  constructor(t, s) {
    (this.dep = new Ps()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = s ? t : L(t)),
      (this._value = s ? t : te(t)),
      (this.__v_isShallow = s);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue,
      n = this.__v_isShallow || pe(t) || Ge(t);
    (t = n ? t : L(t)),
      He(t, s) && ((this._rawValue = t), (this._value = n ? t : te(t)), this.dep.trigger());
  }
}
function jn(e) {
  return X(e) ? e.value : e;
}
const di = {
  get: (e, t, s) => (t === '__v_raw' ? e : jn(Reflect.get(e, t, s))),
  set: (e, t, s, n) => {
    const r = e[t];
    return X(r) && !X(s) ? ((r.value = s), !0) : Reflect.set(e, t, s, n);
  },
};
function kn(e) {
  return gt(e) ? e : new Proxy(e, di);
}
class pi {
  constructor(t, s, n) {
    (this.fn = t),
      (this.setter = s),
      (this._value = void 0),
      (this.dep = new Ps(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = bt - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !s),
      (this.isSSR = n);
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && j !== this)) return On(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Rn(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function hi(e, t, s = !1) {
  let n, r;
  return R(e) ? (n = e) : ((n = e.get), (r = e.set)), new pi(n, r, s);
}
const Lt = {},
  Bt = new WeakMap();
let Ke;
function gi(e, t = !1, s = Ke) {
  if (s) {
    let n = Bt.get(s);
    n || Bt.set(s, (n = [])), n.push(e);
  }
}
function vi(e, t, s = k) {
  const { immediate: n, deep: r, once: i, scheduler: o, augmentJob: f, call: c } = s,
    p = (I) => (r ? I : pe(I) || r === !1 || r === 0 ? Le(I, 1) : Le(I));
  let u,
    h,
    T,
    w,
    C = !1,
    M = !1;
  if (
    (X(e)
      ? ((h = () => e.value), (C = pe(e)))
      : gt(e)
        ? ((h = () => p(e)), (C = !0))
        : P(e)
          ? ((M = !0),
            (C = e.some((I) => gt(I) || pe(I))),
            (h = () =>
              e.map((I) => {
                if (X(I)) return I.value;
                if (gt(I)) return p(I);
                if (R(I)) return c ? c(I, 2) : I();
              })))
          : R(e)
            ? t
              ? (h = c ? () => c(e, 2) : e)
              : (h = () => {
                  if (T) {
                    Ne();
                    try {
                      T();
                    } finally {
                      Be();
                    }
                  }
                  const I = Ke;
                  Ke = u;
                  try {
                    return c ? c(e, 3, [w]) : e(w);
                  } finally {
                    Ke = I;
                  }
                })
            : (h = Se),
    t && r)
  ) {
    const I = h,
      Y = r === !0 ? 1 / 0 : r;
    h = () => Le(I(), Y);
  }
  const W = Vr(),
    $ = () => {
      u.stop(), W && W.active && Ts(W.effects, u);
    };
  if (i && t) {
    const I = t;
    t = (...Y) => {
      I(...Y), $();
    };
  }
  let V = M ? new Array(e.length).fill(Lt) : Lt;
  const U = (I) => {
    if (!(!(u.flags & 1) || (!u.dirty && !I)))
      if (t) {
        const Y = u.run();
        if (r || C || (M ? Y.some((Ae, ge) => He(Ae, V[ge])) : He(Y, V))) {
          T && T();
          const Ae = Ke;
          Ke = u;
          try {
            const ge = [Y, V === Lt ? void 0 : M && V[0] === Lt ? [] : V, w];
            c ? c(t, 3, ge) : t(...ge), (V = Y);
          } finally {
            Ke = Ae;
          }
        }
      } else u.run();
  };
  return (
    f && f(U),
    (u = new En(h)),
    (u.scheduler = o ? () => o(U, !1) : U),
    (w = (I) => gi(I, !1, u)),
    (T = u.onStop =
      () => {
        const I = Bt.get(u);
        if (I) {
          if (c) c(I, 4);
          else for (const Y of I) Y();
          Bt.delete(u);
        }
      }),
    t ? (n ? U(!0) : (V = u.run())) : o ? o(U.bind(null, !0), !0) : u.run(),
    ($.pause = u.pause.bind(u)),
    ($.resume = u.resume.bind(u)),
    ($.stop = $),
    $
  );
}
function Le(e, t = 1 / 0, s) {
  if (t <= 0 || !G(e) || e.__v_skip || ((s = s || new Set()), s.has(e))) return e;
  if ((s.add(e), t--, X(e))) Le(e.value, t, s);
  else if (P(e)) for (let n = 0; n < e.length; n++) Le(e[n], t, s);
  else if (Ar(e) || ut(e))
    e.forEach((n) => {
      Le(n, t, s);
    });
  else if (Mr(e)) {
    for (const n in e) Le(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Le(e[n], t, s);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Et(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    zt(r, t, s);
  }
}
function Te(e, t, s, n) {
  if (R(e)) {
    const r = Et(e, t, s, n);
    return (
      r &&
        xn(r) &&
        r.catch((i) => {
          zt(i, t, s);
        }),
      r
    );
  }
  if (P(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++) r.push(Te(e[i], t, s, n));
    return r;
  }
}
function zt(e, t, s, n = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: i, throwUnhandledErrorInProduction: o } = (t && t.appContext.config) || k;
  if (t) {
    let f = t.parent;
    const c = t.proxy,
      p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; f; ) {
      const u = f.ec;
      if (u) {
        for (let h = 0; h < u.length; h++) if (u[h](e, c, p) === !1) return;
      }
      f = f.parent;
    }
    if (i) {
      Ne(), Et(i, null, 10, [e, c, p]), Be();
      return;
    }
  }
  mi(e, s, r, n, o);
}
function mi(e, t, s, n = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
const se = [];
let xe = -1;
const Qe = [];
let Me = null,
  Xe = 0;
const qn = Promise.resolve();
let jt = null;
function _i(e) {
  const t = jt || qn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function bi(e) {
  let t = xe + 1,
    s = se.length;
  for (; t < s; ) {
    const n = (t + s) >>> 1,
      r = se[n],
      i = xt(r);
    i < e || (i === e && r.flags & 2) ? (t = n + 1) : (s = n);
  }
  return t;
}
function Ds(e) {
  if (!(e.flags & 1)) {
    const t = xt(e),
      s = se[se.length - 1];
    !s || (!(e.flags & 2) && t >= xt(s)) ? se.push(e) : se.splice(bi(t), 0, e),
      (e.flags |= 1),
      Vn();
  }
}
function Vn() {
  jt || (jt = qn.then(Kn));
}
function yi(e) {
  P(e)
    ? Qe.push(...e)
    : Me && e.id === -1
      ? Me.splice(Xe + 1, 0, e)
      : e.flags & 1 || (Qe.push(e), (e.flags |= 1)),
    Vn();
}
function zs(e, t, s = xe + 1) {
  for (; s < se.length; s++) {
    const n = se[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      se.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Un(e) {
  if (Qe.length) {
    const t = [...new Set(Qe)].sort((s, n) => xt(s) - xt(n));
    if (((Qe.length = 0), Me)) {
      Me.push(...t);
      return;
    }
    for (Me = t, Xe = 0; Xe < Me.length; Xe++) {
      const s = Me[Xe];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), (s.flags &= -2);
    }
    (Me = null), (Xe = 0);
  }
}
const xt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Kn(e) {
  try {
    for (xe = 0; xe < se.length; xe++) {
      const t = se[xe];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2), Et(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; xe < se.length; xe++) {
      const t = se[xe];
      t && (t.flags &= -2);
    }
    (xe = -1), (se.length = 0), Un(), (jt = null), (se.length || Qe.length) && Kn();
  }
}
let ie = null,
  Wn = null;
function kt(e) {
  const t = ie;
  return (ie = e), (Wn = (e && e.type.__scopeId) || null), t;
}
function Gn(e, t = ie, s) {
  if (!t || e._n) return e;
  const n = (...r) => {
    n._d && on(-1);
    const i = kt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      kt(i), n._d && on(1);
    }
    return o;
  };
  return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function Ve(e, t, s, n) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const f = r[o];
    i && (f.oldValue = i[o].value);
    let c = f.dir[n];
    c && (Ne(), Te(c, s, 8, [e.el, f, e, t]), Be());
  }
}
const xi = Symbol('_vte'),
  wi = (e) => e.__isTeleport;
function $s(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), $s(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
/*! #__NO_SIDE_EFFECTS__ */ function Yn(e, t) {
  return R(e) ? Z({ name: e.name }, t, { setup: e }) : e;
}
function Jn(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function qt(e, t, s, n, r = !1) {
  if (P(e)) {
    e.forEach((C, M) => qt(C, t && (P(t) ? t[M] : t), s, n, r));
    return;
  }
  if (et(n) && !r) {
    n.shapeFlag & 512 &&
      n.type.__asyncResolved &&
      n.component.subTree.component &&
      qt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? ks(n.component) : n.el,
    o = r ? null : i,
    { i: f, r: c } = e,
    p = t && t.r,
    u = f.refs === k ? (f.refs = {}) : f.refs,
    h = f.setupState,
    T = L(h),
    w = h === k ? () => !1 : (C) => H(T, C);
  if (
    (p != null &&
      p !== c &&
      (J(p) ? ((u[p] = null), w(p) && (h[p] = null)) : X(p) && (p.value = null)),
    R(c))
  )
    Et(c, f, 12, [o, u]);
  else {
    const C = J(c),
      M = X(c);
    if (C || M) {
      const W = () => {
        if (e.f) {
          const $ = C ? (w(c) ? h[c] : u[c]) : c.value;
          r
            ? P($) && Ts($, i)
            : P($)
              ? $.includes(i) || $.push(i)
              : C
                ? ((u[c] = [i]), w(c) && (h[c] = u[c]))
                : ((c.value = [i]), e.k && (u[e.k] = c.value));
        } else C ? ((u[c] = o), w(c) && (h[c] = o)) : M && ((c.value = o), e.k && (u[e.k] = o));
      };
      o ? ((W.id = -1), fe(W, s)) : W();
    }
  }
}
Jt().requestIdleCallback;
Jt().cancelIdleCallback;
const et = (e) => !!e.type.__asyncLoader,
  zn = (e) => e.type.__isKeepAlive;
function Si(e, t) {
  Xn(e, 'a', t);
}
function Ti(e, t) {
  Xn(e, 'da', t);
}
function Xn(e, t, s = ne) {
  const n =
    e.__wdc ||
    (e.__wdc = () => {
      let r = s;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Xt(t, n, s), s)) {
    let r = s.parent;
    for (; r && r.parent; ) zn(r.parent.vnode) && Ei(n, t, s, r), (r = r.parent);
  }
}
function Ei(e, t, s, n) {
  const r = Xt(t, e, n, !0);
  Qn(() => {
    Ts(n[t], r);
  }, s);
}
function Xt(e, t, s = ne, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          Ne();
          const f = Ct(s),
            c = Te(t, s, e, o);
          return f(), Be(), c;
        });
    return n ? r.unshift(i) : r.push(i), i;
  }
}
const Ie =
    (e) =>
    (t, s = ne) => {
      (!St || e === 'sp') && Xt(e, (...n) => t(...n), s);
    },
  Ci = Ie('bm'),
  Zn = Ie('m'),
  Oi = Ie('bu'),
  Ii = Ie('u'),
  Ai = Ie('bum'),
  Qn = Ie('um'),
  Ri = Ie('sp'),
  Pi = Ie('rtg'),
  Mi = Ie('rtc');
function Fi(e, t = ne) {
  Xt('ec', e, t);
}
const Li = Symbol.for('v-ndc');
function Hi(e, t, s = {}, n, r) {
  if (ie.ce || (ie.parent && et(ie.parent) && ie.parent.ce))
    return st(), Ut(ue, null, [he('slot', s, n)], 64);
  let i = e[t];
  i && i._c && (i._d = !1), st();
  const o = i && er(i(s)),
    f = s.key || (o && o.key),
    c = Ut(ue, { key: (f && !Ye(f) ? f : `_${t}`) + '' }, o || [], o && e._ === 1 ? 64 : -2);
  return c.scopeId && (c.slotScopeIds = [c.scopeId + '-s']), i && i._c && (i._d = !0), c;
}
function er(e) {
  return e.some((t) => (Bs(t) ? !(t.type === $e || (t.type === ue && !er(t.children))) : !0))
    ? e
    : null;
}
const vs = (e) => (e ? (wr(e) ? ks(e) : vs(e.parent)) : null),
  vt = Z(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => vs(e.parent),
    $root: (e) => vs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => sr(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Ds(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = _i.bind(e.proxy)),
    $watch: (e) => no.bind(e),
  }),
  ls = (e, t) => e !== k && !e.__isScriptSetup && H(e, t),
  Di = {
    get({ _: e }, t) {
      if (t === '__v_skip') return !0;
      const {
        ctx: s,
        setupState: n,
        data: r,
        props: i,
        accessCache: o,
        type: f,
        appContext: c,
      } = e;
      let p;
      if (t[0] !== '$') {
        const w = o[t];
        if (w !== void 0)
          switch (w) {
            case 1:
              return n[t];
            case 2:
              return r[t];
            case 4:
              return s[t];
            case 3:
              return i[t];
          }
        else {
          if (ls(n, t)) return (o[t] = 1), n[t];
          if (r !== k && H(r, t)) return (o[t] = 2), r[t];
          if ((p = e.propsOptions[0]) && H(p, t)) return (o[t] = 3), i[t];
          if (s !== k && H(s, t)) return (o[t] = 4), s[t];
          ms && (o[t] = 0);
        }
      }
      const u = vt[t];
      let h, T;
      if (u) return t === '$attrs' && z(e.attrs, 'get', ''), u(e);
      if ((h = f.__cssModules) && (h = h[t])) return h;
      if (s !== k && H(s, t)) return (o[t] = 4), s[t];
      if (((T = c.config.globalProperties), H(T, t))) return T[t];
    },
    set({ _: e }, t, s) {
      const { data: n, setupState: r, ctx: i } = e;
      return ls(r, t)
        ? ((r[t] = s), !0)
        : n !== k && H(n, t)
          ? ((n[t] = s), !0)
          : H(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((i[t] = s), !0);
    },
    has(
      { _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: i } },
      o,
    ) {
      let f;
      return (
        !!s[o] ||
        (e !== k && H(e, o)) ||
        ls(t, o) ||
        ((f = i[0]) && H(f, o)) ||
        H(n, o) ||
        H(vt, o) ||
        H(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, s) {
      return (
        s.get != null ? (e._.accessCache[t] = 0) : H(s, 'value') && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
      );
    },
  };
function Xs(e) {
  return P(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let ms = !0;
function $i(e) {
  const t = sr(e),
    s = e.proxy,
    n = e.ctx;
  (ms = !1), t.beforeCreate && Zs(t.beforeCreate, e, 'bc');
  const {
    data: r,
    computed: i,
    methods: o,
    watch: f,
    provide: c,
    inject: p,
    created: u,
    beforeMount: h,
    mounted: T,
    beforeUpdate: w,
    updated: C,
    activated: M,
    deactivated: W,
    beforeDestroy: $,
    beforeUnmount: V,
    destroyed: U,
    unmounted: I,
    render: Y,
    renderTracked: Ae,
    renderTriggered: ge,
    errorCaptured: Re,
    serverPrefetch: Ot,
    expose: je,
    inheritAttrs: rt,
    components: It,
    directives: At,
    filters: es,
  } = t;
  if ((p && Ni(p, n, null), o))
    for (const q in o) {
      const N = o[q];
      R(N) && (n[q] = N.bind(s));
    }
  if (r) {
    const q = r.call(s, s);
    G(q) && (e.data = Tt(q));
  }
  if (((ms = !0), i))
    for (const q in i) {
      const N = i[q],
        ke = R(N) ? N.bind(s, s) : R(N.get) ? N.get.bind(s, s) : Se,
        Rt = !R(N) && R(N.set) ? N.set.bind(s) : Se,
        qe = Oo({ get: ke, set: Rt });
      Object.defineProperty(n, q, {
        enumerable: !0,
        configurable: !0,
        get: () => qe.value,
        set: (ve) => (qe.value = ve),
      });
    }
  if (f) for (const q in f) tr(f[q], n, s, q);
  if (c) {
    const q = R(c) ? c.call(s) : c;
    Reflect.ownKeys(q).forEach((N) => {
      Ui(N, q[N]);
    });
  }
  u && Zs(u, e, 'c');
  function Q(q, N) {
    P(N) ? N.forEach((ke) => q(ke.bind(s))) : N && q(N.bind(s));
  }
  if (
    (Q(Ci, h),
    Q(Zn, T),
    Q(Oi, w),
    Q(Ii, C),
    Q(Si, M),
    Q(Ti, W),
    Q(Fi, Re),
    Q(Mi, Ae),
    Q(Pi, ge),
    Q(Ai, V),
    Q(Qn, I),
    Q(Ri, Ot),
    P(je))
  )
    if (je.length) {
      const q = e.exposed || (e.exposed = {});
      je.forEach((N) => {
        Object.defineProperty(q, N, { get: () => s[N], set: (ke) => (s[N] = ke) });
      });
    } else e.exposed || (e.exposed = {});
  Y && e.render === Se && (e.render = Y),
    rt != null && (e.inheritAttrs = rt),
    It && (e.components = It),
    At && (e.directives = At),
    Ot && Jn(e);
}
function Ni(e, t, s = Se) {
  P(e) && (e = _s(e));
  for (const n in e) {
    const r = e[n];
    let i;
    G(r)
      ? 'default' in r
        ? (i = Ht(r.from || n, r.default, !0))
        : (i = Ht(r.from || n))
      : (i = Ht(r)),
      X(i)
        ? Object.defineProperty(t, n, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (t[n] = i);
  }
}
function Zs(e, t, s) {
  Te(P(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function tr(e, t, s, n) {
  let r = n.includes('.') ? vr(s, n) : () => s[n];
  if (J(e)) {
    const i = t[e];
    R(i) && mt(r, i);
  } else if (R(e)) mt(r, e.bind(s));
  else if (G(e))
    if (P(e)) e.forEach((i) => tr(i, t, s, n));
    else {
      const i = R(e.handler) ? e.handler.bind(s) : t[e.handler];
      R(i) && mt(r, i, e);
    }
}
function sr(e) {
  const t = e.type,
    { mixins: s, extends: n } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    f = i.get(t);
  let c;
  return (
    f
      ? (c = f)
      : !r.length && !s && !n
        ? (c = t)
        : ((c = {}), r.length && r.forEach((p) => Vt(c, p, o, !0)), Vt(c, t, o)),
    G(t) && i.set(t, c),
    c
  );
}
function Vt(e, t, s, n = !1) {
  const { mixins: r, extends: i } = t;
  i && Vt(e, i, s, !0), r && r.forEach((o) => Vt(e, o, s, !0));
  for (const o in t)
    if (!(n && o === 'expose')) {
      const f = Bi[o] || (s && s[o]);
      e[o] = f ? f(e[o], t[o]) : t[o];
    }
  return e;
}
const Bi = {
  data: Qs,
  props: en,
  emits: en,
  methods: at,
  computed: at,
  beforeCreate: ee,
  created: ee,
  beforeMount: ee,
  mounted: ee,
  beforeUpdate: ee,
  updated: ee,
  beforeDestroy: ee,
  beforeUnmount: ee,
  destroyed: ee,
  unmounted: ee,
  activated: ee,
  deactivated: ee,
  errorCaptured: ee,
  serverPrefetch: ee,
  components: at,
  directives: at,
  watch: ki,
  provide: Qs,
  inject: ji,
};
function Qs(e, t) {
  return t
    ? e
      ? function () {
          return Z(R(e) ? e.call(this, this) : e, R(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function ji(e, t) {
  return at(_s(e), _s(t));
}
function _s(e) {
  if (P(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function at(e, t) {
  return e ? Z(Object.create(null), e, t) : t;
}
function en(e, t) {
  return e
    ? P(e) && P(t)
      ? [...new Set([...e, ...t])]
      : Z(Object.create(null), Xs(e), Xs(t ?? {}))
    : t;
}
function ki(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = Z(Object.create(null), e);
  for (const n in t) s[n] = ee(e[n], t[n]);
  return s;
}
function nr() {
  return {
    app: null,
    config: {
      isNativeTag: Or,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let qi = 0;
function Vi(e, t) {
  return function (n, r = null) {
    R(n) || (n = Z({}, n)), r != null && !G(r) && (r = null);
    const i = nr(),
      o = new WeakSet(),
      f = [];
    let c = !1;
    const p = (i.app = {
      _uid: qi++,
      _component: n,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Io,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...h) {
        return (
          o.has(u) ||
            (u && R(u.install) ? (o.add(u), u.install(p, ...h)) : R(u) && (o.add(u), u(p, ...h))),
          p
        );
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), p;
      },
      component(u, h) {
        return h ? ((i.components[u] = h), p) : i.components[u];
      },
      directive(u, h) {
        return h ? ((i.directives[u] = h), p) : i.directives[u];
      },
      mount(u, h, T) {
        if (!c) {
          const w = p._ceVNode || he(n, r);
          return (
            (w.appContext = i),
            T === !0 ? (T = 'svg') : T === !1 && (T = void 0),
            e(w, u, T),
            (c = !0),
            (p._container = u),
            (u.__vue_app__ = p),
            ks(w.component)
          );
        }
      },
      onUnmount(u) {
        f.push(u);
      },
      unmount() {
        c && (Te(f, p._instance, 16), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(u, h) {
        return (i.provides[u] = h), p;
      },
      runWithContext(u) {
        const h = tt;
        tt = p;
        try {
          return u();
        } finally {
          tt = h;
        }
      },
    });
    return p;
  };
}
let tt = null;
function Ui(e, t) {
  if (ne) {
    let s = ne.provides;
    const n = ne.parent && ne.parent.provides;
    n === s && (s = ne.provides = Object.create(n)), (s[e] = t);
  }
}
function Ht(e, t, s = !1) {
  const n = ne || ie;
  if (n || tt) {
    const r = tt
      ? tt._context.provides
      : n
        ? n.parent == null
          ? n.vnode.appContext && n.vnode.appContext.provides
          : n.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return s && R(t) ? t.call(n && n.proxy) : t;
  }
}
const rr = {},
  ir = () => Object.create(rr),
  or = (e) => Object.getPrototypeOf(e) === rr;
function Ki(e, t, s, n = !1) {
  const r = {},
    i = ir();
  (e.propsDefaults = Object.create(null)), lr(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  s ? (e.props = n ? r : fi(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i);
}
function Wi(e, t, s, n) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    f = L(r),
    [c] = e.propsOptions;
  let p = !1;
  if ((n || o > 0) && !(o & 16)) {
    if (o & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let T = u[h];
        if (Zt(e.emitsOptions, T)) continue;
        const w = t[T];
        if (c)
          if (H(i, T)) w !== i[T] && ((i[T] = w), (p = !0));
          else {
            const C = De(T);
            r[C] = bs(c, f, C, w, e, !1);
          }
        else w !== i[T] && ((i[T] = w), (p = !0));
      }
    }
  } else {
    lr(e, t, r, i) && (p = !0);
    let u;
    for (const h in f)
      (!t || (!H(t, h) && ((u = Je(h)) === h || !H(t, u)))) &&
        (c
          ? s && (s[h] !== void 0 || s[u] !== void 0) && (r[h] = bs(c, f, h, void 0, e, !0))
          : delete r[h]);
    if (i !== f) for (const h in i) (!t || !H(t, h)) && (delete i[h], (p = !0));
  }
  p && Oe(e.attrs, 'set', '');
}
function lr(e, t, s, n) {
  const [r, i] = e.propsOptions;
  let o = !1,
    f;
  if (t)
    for (let c in t) {
      if (dt(c)) continue;
      const p = t[c];
      let u;
      r && H(r, (u = De(c)))
        ? !i || !i.includes(u)
          ? (s[u] = p)
          : ((f || (f = {}))[u] = p)
        : Zt(e.emitsOptions, c) || ((!(c in n) || p !== n[c]) && ((n[c] = p), (o = !0)));
    }
  if (i) {
    const c = L(s),
      p = f || k;
    for (let u = 0; u < i.length; u++) {
      const h = i[u];
      s[h] = bs(r, c, h, p[h], e, !H(p, h));
    }
  }
  return o;
}
function bs(e, t, s, n, r, i) {
  const o = e[s];
  if (o != null) {
    const f = H(o, 'default');
    if (f && n === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && R(c)) {
        const { propsDefaults: p } = r;
        if (s in p) n = p[s];
        else {
          const u = Ct(r);
          (n = p[s] = c.call(null, t)), u();
        }
      } else n = c;
      r.ce && r.ce._setProp(s, n);
    }
    o[0] && (i && !f ? (n = !1) : o[1] && (n === '' || n === Je(s)) && (n = !0));
  }
  return n;
}
const Gi = new WeakMap();
function fr(e, t, s = !1) {
  const n = s ? Gi : t.propsCache,
    r = n.get(e);
  if (r) return r;
  const i = e.props,
    o = {},
    f = [];
  let c = !1;
  if (!R(e)) {
    const u = (h) => {
      c = !0;
      const [T, w] = fr(h, t, !0);
      Z(o, T), w && f.push(...w);
    };
    !s && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  if (!i && !c) return G(e) && n.set(e, Ze), Ze;
  if (P(i))
    for (let u = 0; u < i.length; u++) {
      const h = De(i[u]);
      tn(h) && (o[h] = k);
    }
  else if (i)
    for (const u in i) {
      const h = De(u);
      if (tn(h)) {
        const T = i[u],
          w = (o[h] = P(T) || R(T) ? { type: T } : Z({}, T)),
          C = w.type;
        let M = !1,
          W = !0;
        if (P(C))
          for (let $ = 0; $ < C.length; ++$) {
            const V = C[$],
              U = R(V) && V.name;
            if (U === 'Boolean') {
              M = !0;
              break;
            } else U === 'String' && (W = !1);
          }
        else M = R(C) && C.name === 'Boolean';
        (w[0] = M), (w[1] = W), (M || H(w, 'default')) && f.push(h);
      }
    }
  const p = [o, f];
  return G(e) && n.set(e, p), p;
}
function tn(e) {
  return e[0] !== '$' && !dt(e);
}
const cr = (e) => e[0] === '_' || e === '$stable',
  Ns = (e) => (P(e) ? e.map(we) : [we(e)]),
  Yi = (e, t, s) => {
    if (t._n) return t;
    const n = Gn((...r) => Ns(t(...r)), s);
    return (n._c = !1), n;
  },
  ar = (e, t, s) => {
    const n = e._ctx;
    for (const r in e) {
      if (cr(r)) continue;
      const i = e[r];
      if (R(i)) t[r] = Yi(r, i, n);
      else if (i != null) {
        const o = Ns(i);
        t[r] = () => o;
      }
    }
  },
  ur = (e, t) => {
    const s = Ns(t);
    e.slots.default = () => s;
  },
  dr = (e, t, s) => {
    for (const n in t) (s || n !== '_') && (e[n] = t[n]);
  },
  Ji = (e, t, s) => {
    const n = (e.slots = ir());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (dr(n, t, s), s && Sn(n, '_', r, !0)) : ar(t, n);
    } else t && ur(e, t);
  },
  zi = (e, t, s) => {
    const { vnode: n, slots: r } = e;
    let i = !0,
      o = k;
    if (n.shapeFlag & 32) {
      const f = t._;
      f ? (s && f === 1 ? (i = !1) : dr(r, t, s)) : ((i = !t.$stable), ar(t, r)), (o = t);
    } else t && (ur(e, t), (o = { default: 1 }));
    if (i) for (const f in r) !cr(f) && o[f] == null && delete r[f];
  },
  fe = ao;
function Xi(e) {
  return Zi(e);
}
function Zi(e, t) {
  const s = Jt();
  s.__VUE__ = !0;
  const {
      insert: n,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: f,
      createComment: c,
      setText: p,
      setElementText: u,
      parentNode: h,
      nextSibling: T,
      setScopeId: w = Se,
      insertStaticContent: C,
    } = e,
    M = (l, a, d, m = null, g = null, v = null, x = void 0, y = null, b = !!a.dynamicChildren) => {
      if (l === a) return;
      l && !ct(l, a) && ((m = Pt(l)), ve(l, g, v, !0), (l = null)),
        a.patchFlag === -2 && ((b = !1), (a.dynamicChildren = null));
      const { type: _, ref: O, shapeFlag: S } = a;
      switch (_) {
        case Qt:
          W(l, a, d, m);
          break;
        case $e:
          $(l, a, d, m);
          break;
        case Dt:
          l == null && V(a, d, m, x);
          break;
        case ue:
          It(l, a, d, m, g, v, x, y, b);
          break;
        default:
          S & 1
            ? Y(l, a, d, m, g, v, x, y, b)
            : S & 6
              ? At(l, a, d, m, g, v, x, y, b)
              : (S & 64 || S & 128) && _.process(l, a, d, m, g, v, x, y, b, ot);
      }
      O != null && g && qt(O, l && l.ref, v, a || l, !a);
    },
    W = (l, a, d, m) => {
      if (l == null) n((a.el = f(a.children)), d, m);
      else {
        const g = (a.el = l.el);
        a.children !== l.children && p(g, a.children);
      }
    },
    $ = (l, a, d, m) => {
      l == null ? n((a.el = c(a.children || '')), d, m) : (a.el = l.el);
    },
    V = (l, a, d, m) => {
      [l.el, l.anchor] = C(l.children, a, d, m, l.el, l.anchor);
    },
    U = ({ el: l, anchor: a }, d, m) => {
      let g;
      for (; l && l !== a; ) (g = T(l)), n(l, d, m), (l = g);
      n(a, d, m);
    },
    I = ({ el: l, anchor: a }) => {
      let d;
      for (; l && l !== a; ) (d = T(l)), r(l), (l = d);
      r(a);
    },
    Y = (l, a, d, m, g, v, x, y, b) => {
      a.type === 'svg' ? (x = 'svg') : a.type === 'math' && (x = 'mathml'),
        l == null ? Ae(a, d, m, g, v, x, y, b) : Ot(l, a, g, v, x, y, b);
    },
    Ae = (l, a, d, m, g, v, x, y) => {
      let b, _;
      const { props: O, shapeFlag: S, transition: E, dirs: A } = l;
      if (
        ((b = l.el = o(l.type, v, O && O.is, O)),
        S & 8 ? u(b, l.children) : S & 16 && Re(l.children, b, null, m, g, fs(l, v), x, y),
        A && Ve(l, null, m, 'created'),
        ge(b, l, l.scopeId, x, m),
        O)
      ) {
        for (const B in O) B !== 'value' && !dt(B) && i(b, B, null, O[B], v, m);
        'value' in O && i(b, 'value', null, O.value, v), (_ = O.onVnodeBeforeMount) && ye(_, m, l);
      }
      A && Ve(l, null, m, 'beforeMount');
      const F = Qi(g, E);
      F && E.beforeEnter(b),
        n(b, a, d),
        ((_ = O && O.onVnodeMounted) || F || A) &&
          fe(() => {
            _ && ye(_, m, l), F && E.enter(b), A && Ve(l, null, m, 'mounted');
          }, g);
    },
    ge = (l, a, d, m, g) => {
      if ((d && w(l, d), m)) for (let v = 0; v < m.length; v++) w(l, m[v]);
      if (g) {
        let v = g.subTree;
        if (a === v || (_r(v.type) && (v.ssContent === a || v.ssFallback === a))) {
          const x = g.vnode;
          ge(l, x, x.scopeId, x.slotScopeIds, g.parent);
        }
      }
    },
    Re = (l, a, d, m, g, v, x, y, b = 0) => {
      for (let _ = b; _ < l.length; _++) {
        const O = (l[_] = y ? Fe(l[_]) : we(l[_]));
        M(null, O, a, d, m, g, v, x, y);
      }
    },
    Ot = (l, a, d, m, g, v, x) => {
      const y = (a.el = l.el);
      let { patchFlag: b, dynamicChildren: _, dirs: O } = a;
      b |= l.patchFlag & 16;
      const S = l.props || k,
        E = a.props || k;
      let A;
      if (
        (d && Ue(d, !1),
        (A = E.onVnodeBeforeUpdate) && ye(A, d, a, l),
        O && Ve(a, l, d, 'beforeUpdate'),
        d && Ue(d, !0),
        ((S.innerHTML && E.innerHTML == null) || (S.textContent && E.textContent == null)) &&
          u(y, ''),
        _
          ? je(l.dynamicChildren, _, y, d, m, fs(a, g), v)
          : x || N(l, a, y, null, d, m, fs(a, g), v, !1),
        b > 0)
      ) {
        if (b & 16) rt(y, S, E, d, g);
        else if (
          (b & 2 && S.class !== E.class && i(y, 'class', null, E.class, g),
          b & 4 && i(y, 'style', S.style, E.style, g),
          b & 8)
        ) {
          const F = a.dynamicProps;
          for (let B = 0; B < F.length; B++) {
            const D = F[B],
              oe = S[D],
              re = E[D];
            (re !== oe || D === 'value') && i(y, D, oe, re, g, d);
          }
        }
        b & 1 && l.children !== a.children && u(y, a.children);
      } else !x && _ == null && rt(y, S, E, d, g);
      ((A = E.onVnodeUpdated) || O) &&
        fe(() => {
          A && ye(A, d, a, l), O && Ve(a, l, d, 'updated');
        }, m);
    },
    je = (l, a, d, m, g, v, x) => {
      for (let y = 0; y < a.length; y++) {
        const b = l[y],
          _ = a[y],
          O = b.el && (b.type === ue || !ct(b, _) || b.shapeFlag & 70) ? h(b.el) : d;
        M(b, _, O, null, m, g, v, x, !0);
      }
    },
    rt = (l, a, d, m, g) => {
      if (a !== d) {
        if (a !== k) for (const v in a) !dt(v) && !(v in d) && i(l, v, a[v], null, g, m);
        for (const v in d) {
          if (dt(v)) continue;
          const x = d[v],
            y = a[v];
          x !== y && v !== 'value' && i(l, v, y, x, g, m);
        }
        'value' in d && i(l, 'value', a.value, d.value, g);
      }
    },
    It = (l, a, d, m, g, v, x, y, b) => {
      const _ = (a.el = l ? l.el : f('')),
        O = (a.anchor = l ? l.anchor : f(''));
      let { patchFlag: S, dynamicChildren: E, slotScopeIds: A } = a;
      A && (y = y ? y.concat(A) : A),
        l == null
          ? (n(_, d, m), n(O, d, m), Re(a.children || [], d, O, g, v, x, y, b))
          : S > 0 && S & 64 && E && l.dynamicChildren
            ? (je(l.dynamicChildren, E, d, g, v, x, y),
              (a.key != null || (g && a === g.subTree)) && pr(l, a, !0))
            : N(l, a, d, O, g, v, x, y, b);
    },
    At = (l, a, d, m, g, v, x, y, b) => {
      (a.slotScopeIds = y),
        l == null
          ? a.shapeFlag & 512
            ? g.ctx.activate(a, d, m, x, b)
            : es(a, d, m, g, v, x, b)
          : qs(l, a, b);
    },
    es = (l, a, d, m, g, v, x) => {
      const y = (l.component = xo(l, m, g));
      if ((zn(l) && (y.ctx.renderer = ot), wo(y, !1, x), y.asyncDep)) {
        if ((g && g.registerDep(y, Q, x), !l.el)) {
          const b = (y.subTree = he($e));
          $(null, b, a, d);
        }
      } else Q(y, l, a, d, g, v, x);
    },
    qs = (l, a, d) => {
      const m = (a.component = l.component);
      if (fo(l, a, d))
        if (m.asyncDep && !m.asyncResolved) {
          q(m, a, d);
          return;
        } else (m.next = a), m.update();
      else (a.el = l.el), (m.vnode = a);
    },
    Q = (l, a, d, m, g, v, x) => {
      const y = () => {
        if (l.isMounted) {
          let { next: S, bu: E, u: A, parent: F, vnode: B } = l;
          {
            const _e = hr(l);
            if (_e) {
              S && ((S.el = B.el), q(l, S, x)),
                _e.asyncDep.then(() => {
                  l.isUnmounted || y();
                });
              return;
            }
          }
          let D = S,
            oe;
          Ue(l, !1),
            S ? ((S.el = B.el), q(l, S, x)) : (S = B),
            E && ns(E),
            (oe = S.props && S.props.onVnodeBeforeUpdate) && ye(oe, F, S, B),
            Ue(l, !0);
          const re = nn(l),
            me = l.subTree;
          (l.subTree = re),
            M(me, re, h(me.el), Pt(me), l, g, v),
            (S.el = re.el),
            D === null && co(l, re.el),
            A && fe(A, g),
            (oe = S.props && S.props.onVnodeUpdated) && fe(() => ye(oe, F, S, B), g);
        } else {
          let S;
          const { el: E, props: A } = a,
            { bm: F, m: B, parent: D, root: oe, type: re } = l,
            me = et(a);
          Ue(l, !1), F && ns(F), !me && (S = A && A.onVnodeBeforeMount) && ye(S, D, a), Ue(l, !0);
          {
            oe.ce && oe.ce._injectChildStyle(re);
            const _e = (l.subTree = nn(l));
            M(null, _e, d, m, l, g, v), (a.el = _e.el);
          }
          if ((B && fe(B, g), !me && (S = A && A.onVnodeMounted))) {
            const _e = a;
            fe(() => ye(S, D, _e), g);
          }
          (a.shapeFlag & 256 || (D && et(D.vnode) && D.vnode.shapeFlag & 256)) && l.a && fe(l.a, g),
            (l.isMounted = !0),
            (a = d = m = null);
        }
      };
      l.scope.on();
      const b = (l.effect = new En(y));
      l.scope.off();
      const _ = (l.update = b.run.bind(b)),
        O = (l.job = b.runIfDirty.bind(b));
      (O.i = l), (O.id = l.uid), (b.scheduler = () => Ds(O)), Ue(l, !0), _();
    },
    q = (l, a, d) => {
      a.component = l;
      const m = l.vnode.props;
      (l.vnode = a), (l.next = null), Wi(l, a.props, m, d), zi(l, a.children, d), Ne(), zs(l), Be();
    },
    N = (l, a, d, m, g, v, x, y, b = !1) => {
      const _ = l && l.children,
        O = l ? l.shapeFlag : 0,
        S = a.children,
        { patchFlag: E, shapeFlag: A } = a;
      if (E > 0) {
        if (E & 128) {
          Rt(_, S, d, m, g, v, x, y, b);
          return;
        } else if (E & 256) {
          ke(_, S, d, m, g, v, x, y, b);
          return;
        }
      }
      A & 8
        ? (O & 16 && it(_, g, v), S !== _ && u(d, S))
        : O & 16
          ? A & 16
            ? Rt(_, S, d, m, g, v, x, y, b)
            : it(_, g, v, !0)
          : (O & 8 && u(d, ''), A & 16 && Re(S, d, m, g, v, x, y, b));
    },
    ke = (l, a, d, m, g, v, x, y, b) => {
      (l = l || Ze), (a = a || Ze);
      const _ = l.length,
        O = a.length,
        S = Math.min(_, O);
      let E;
      for (E = 0; E < S; E++) {
        const A = (a[E] = b ? Fe(a[E]) : we(a[E]));
        M(l[E], A, d, null, g, v, x, y, b);
      }
      _ > O ? it(l, g, v, !0, !1, S) : Re(a, d, m, g, v, x, y, b, S);
    },
    Rt = (l, a, d, m, g, v, x, y, b) => {
      let _ = 0;
      const O = a.length;
      let S = l.length - 1,
        E = O - 1;
      for (; _ <= S && _ <= E; ) {
        const A = l[_],
          F = (a[_] = b ? Fe(a[_]) : we(a[_]));
        if (ct(A, F)) M(A, F, d, null, g, v, x, y, b);
        else break;
        _++;
      }
      for (; _ <= S && _ <= E; ) {
        const A = l[S],
          F = (a[E] = b ? Fe(a[E]) : we(a[E]));
        if (ct(A, F)) M(A, F, d, null, g, v, x, y, b);
        else break;
        S--, E--;
      }
      if (_ > S) {
        if (_ <= E) {
          const A = E + 1,
            F = A < O ? a[A].el : m;
          for (; _ <= E; ) M(null, (a[_] = b ? Fe(a[_]) : we(a[_])), d, F, g, v, x, y, b), _++;
        }
      } else if (_ > E) for (; _ <= S; ) ve(l[_], g, v, !0), _++;
      else {
        const A = _,
          F = _,
          B = new Map();
        for (_ = F; _ <= E; _++) {
          const le = (a[_] = b ? Fe(a[_]) : we(a[_]));
          le.key != null && B.set(le.key, _);
        }
        let D,
          oe = 0;
        const re = E - F + 1;
        let me = !1,
          _e = 0;
        const lt = new Array(re);
        for (_ = 0; _ < re; _++) lt[_] = 0;
        for (_ = A; _ <= S; _++) {
          const le = l[_];
          if (oe >= re) {
            ve(le, g, v, !0);
            continue;
          }
          let be;
          if (le.key != null) be = B.get(le.key);
          else
            for (D = F; D <= E; D++)
              if (lt[D - F] === 0 && ct(le, a[D])) {
                be = D;
                break;
              }
          be === void 0
            ? ve(le, g, v, !0)
            : ((lt[be - F] = _ + 1),
              be >= _e ? (_e = be) : (me = !0),
              M(le, a[be], d, null, g, v, x, y, b),
              oe++);
        }
        const Ks = me ? eo(lt) : Ze;
        for (D = Ks.length - 1, _ = re - 1; _ >= 0; _--) {
          const le = F + _,
            be = a[le],
            Ws = le + 1 < O ? a[le + 1].el : m;
          lt[_] === 0
            ? M(null, be, d, Ws, g, v, x, y, b)
            : me && (D < 0 || _ !== Ks[D] ? qe(be, d, Ws, 2) : D--);
        }
      }
    },
    qe = (l, a, d, m, g = null) => {
      const { el: v, type: x, transition: y, children: b, shapeFlag: _ } = l;
      if (_ & 6) {
        qe(l.component.subTree, a, d, m);
        return;
      }
      if (_ & 128) {
        l.suspense.move(a, d, m);
        return;
      }
      if (_ & 64) {
        x.move(l, a, d, ot);
        return;
      }
      if (x === ue) {
        n(v, a, d);
        for (let S = 0; S < b.length; S++) qe(b[S], a, d, m);
        n(l.anchor, a, d);
        return;
      }
      if (x === Dt) {
        U(l, a, d);
        return;
      }
      if (m !== 2 && _ & 1 && y)
        if (m === 0) y.beforeEnter(v), n(v, a, d), fe(() => y.enter(v), g);
        else {
          const { leave: S, delayLeave: E, afterLeave: A } = y,
            F = () => n(v, a, d),
            B = () => {
              S(v, () => {
                F(), A && A();
              });
            };
          E ? E(v, F, B) : B();
        }
      else n(v, a, d);
    },
    ve = (l, a, d, m = !1, g = !1) => {
      const {
        type: v,
        props: x,
        ref: y,
        children: b,
        dynamicChildren: _,
        shapeFlag: O,
        patchFlag: S,
        dirs: E,
        cacheIndex: A,
      } = l;
      if (
        (S === -2 && (g = !1),
        y != null && qt(y, null, d, l, !0),
        A != null && (a.renderCache[A] = void 0),
        O & 256)
      ) {
        a.ctx.deactivate(l);
        return;
      }
      const F = O & 1 && E,
        B = !et(l);
      let D;
      if ((B && (D = x && x.onVnodeBeforeUnmount) && ye(D, a, l), O & 6)) Cr(l.component, d, m);
      else {
        if (O & 128) {
          l.suspense.unmount(d, m);
          return;
        }
        F && Ve(l, null, a, 'beforeUnmount'),
          O & 64
            ? l.type.remove(l, a, d, ot, m)
            : _ && !_.hasOnce && (v !== ue || (S > 0 && S & 64))
              ? it(_, a, d, !1, !0)
              : ((v === ue && S & 384) || (!g && O & 16)) && it(b, a, d),
          m && Vs(l);
      }
      ((B && (D = x && x.onVnodeUnmounted)) || F) &&
        fe(() => {
          D && ye(D, a, l), F && Ve(l, null, a, 'unmounted');
        }, d);
    },
    Vs = (l) => {
      const { type: a, el: d, anchor: m, transition: g } = l;
      if (a === ue) {
        Er(d, m);
        return;
      }
      if (a === Dt) {
        I(l);
        return;
      }
      const v = () => {
        r(d), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (l.shapeFlag & 1 && g && !g.persisted) {
        const { leave: x, delayLeave: y } = g,
          b = () => x(d, v);
        y ? y(l.el, v, b) : b();
      } else v();
    },
    Er = (l, a) => {
      let d;
      for (; l !== a; ) (d = T(l)), r(l), (l = d);
      r(a);
    },
    Cr = (l, a, d) => {
      const { bum: m, scope: g, job: v, subTree: x, um: y, m: b, a: _ } = l;
      sn(b),
        sn(_),
        m && ns(m),
        g.stop(),
        v && ((v.flags |= 8), ve(x, l, a, d)),
        y && fe(y, a),
        fe(() => {
          l.isUnmounted = !0;
        }, a),
        a &&
          a.pendingBranch &&
          !a.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === a.pendingId &&
          (a.deps--, a.deps === 0 && a.resolve());
    },
    it = (l, a, d, m = !1, g = !1, v = 0) => {
      for (let x = v; x < l.length; x++) ve(l[x], a, d, m, g);
    },
    Pt = (l) => {
      if (l.shapeFlag & 6) return Pt(l.component.subTree);
      if (l.shapeFlag & 128) return l.suspense.next();
      const a = T(l.anchor || l.el),
        d = a && a[xi];
      return d ? T(d) : a;
    };
  let ts = !1;
  const Us = (l, a, d) => {
      l == null
        ? a._vnode && ve(a._vnode, null, null, !0)
        : M(a._vnode || null, l, a, null, null, null, d),
        (a._vnode = l),
        ts || ((ts = !0), zs(), Un(), (ts = !1));
    },
    ot = { p: M, um: ve, m: qe, r: Vs, mt: es, mc: Re, pc: N, pbc: je, n: Pt, o: e };
  return { render: Us, hydrate: void 0, createApp: Vi(Us) };
}
function fs({ type: e, props: t }, s) {
  return (s === 'svg' && e === 'foreignObject') ||
    (s === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : s;
}
function Ue({ effect: e, job: t }, s) {
  s ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Qi(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function pr(e, t, s = !1) {
  const n = e.children,
    r = t.children;
  if (P(n) && P(r))
    for (let i = 0; i < n.length; i++) {
      const o = n[i];
      let f = r[i];
      f.shapeFlag & 1 &&
        !f.dynamicChildren &&
        ((f.patchFlag <= 0 || f.patchFlag === 32) && ((f = r[i] = Fe(r[i])), (f.el = o.el)),
        !s && f.patchFlag !== -2 && pr(o, f)),
        f.type === Qt && (f.el = o.el);
    }
}
function eo(e) {
  const t = e.slice(),
    s = [0];
  let n, r, i, o, f;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const p = e[n];
    if (p !== 0) {
      if (((r = s[s.length - 1]), e[r] < p)) {
        (t[n] = r), s.push(n);
        continue;
      }
      for (i = 0, o = s.length - 1; i < o; )
        (f = (i + o) >> 1), e[s[f]] < p ? (i = f + 1) : (o = f);
      p < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
    }
  }
  for (i = s.length, o = s[i - 1]; i-- > 0; ) (s[i] = o), (o = t[o]);
  return s;
}
function hr(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : hr(t);
}
function sn(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const to = Symbol.for('v-scx'),
  so = () => Ht(to);
function mt(e, t, s) {
  return gr(e, t, s);
}
function gr(e, t, s = k) {
  const { immediate: n, deep: r, flush: i, once: o } = s,
    f = Z({}, s),
    c = (t && n) || (!t && i !== 'post');
  let p;
  if (St) {
    if (i === 'sync') {
      const w = so();
      p = w.__watcherHandles || (w.__watcherHandles = []);
    } else if (!c) {
      const w = () => {};
      return (w.stop = Se), (w.resume = Se), (w.pause = Se), w;
    }
  }
  const u = ne;
  f.call = (w, C, M) => Te(w, u, C, M);
  let h = !1;
  i === 'post'
    ? (f.scheduler = (w) => {
        fe(w, u && u.suspense);
      })
    : i !== 'sync' &&
      ((h = !0),
      (f.scheduler = (w, C) => {
        C ? w() : Ds(w);
      })),
    (f.augmentJob = (w) => {
      t && (w.flags |= 4), h && ((w.flags |= 2), u && ((w.id = u.uid), (w.i = u)));
    });
  const T = vi(e, t, f);
  return St && (p ? p.push(T) : c && T()), T;
}
function no(e, t, s) {
  const n = this.proxy,
    r = J(e) ? (e.includes('.') ? vr(n, e) : () => n[e]) : e.bind(n, n);
  let i;
  R(t) ? (i = t) : ((i = t.handler), (s = t));
  const o = Ct(this),
    f = gr(r, i.bind(n), s);
  return o(), f;
}
function vr(e, t) {
  const s = t.split('.');
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++) n = n[s[r]];
    return n;
  };
}
const ro = (e, t) =>
  t === 'modelValue' || t === 'model-value'
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${Je(t)}Modifiers`];
function io(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || k;
  let r = s;
  const i = t.startsWith('update:'),
    o = i && ro(n, t.slice(7));
  o && (o.trim && (r = s.map((u) => (J(u) ? u.trim() : u))), o.number && (r = s.map(Hr)));
  let f,
    c = n[(f = ss(t))] || n[(f = ss(De(t)))];
  !c && i && (c = n[(f = ss(Je(t)))]), c && Te(c, e, 6, r);
  const p = n[f + 'Once'];
  if (p) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[f]) return;
    (e.emitted[f] = !0), Te(p, e, 6, r);
  }
}
function mr(e, t, s = !1) {
  const n = t.emitsCache,
    r = n.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {},
    f = !1;
  if (!R(e)) {
    const c = (p) => {
      const u = mr(p, t, !0);
      u && ((f = !0), Z(o, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !i && !f
    ? (G(e) && n.set(e, null), null)
    : (P(i) ? i.forEach((c) => (o[c] = null)) : Z(o, i), G(e) && n.set(e, o), o);
}
function Zt(e, t) {
  return !e || !Wt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      H(e, t[0].toLowerCase() + t.slice(1)) || H(e, Je(t)) || H(e, t));
}
function nn(e) {
  const {
      type: t,
      vnode: s,
      proxy: n,
      withProxy: r,
      propsOptions: [i],
      slots: o,
      attrs: f,
      emit: c,
      render: p,
      renderCache: u,
      props: h,
      data: T,
      setupState: w,
      ctx: C,
      inheritAttrs: M,
    } = e,
    W = kt(e);
  let $, V;
  try {
    if (s.shapeFlag & 4) {
      const I = r || n,
        Y = I;
      ($ = we(p.call(Y, I, u, h, w, T, C))), (V = f);
    } else {
      const I = t;
      ($ = we(I.length > 1 ? I(h, { attrs: f, slots: o, emit: c }) : I(h, null))),
        (V = t.props ? f : oo(f));
    }
  } catch (I) {
    (_t.length = 0), zt(I, e, 1), ($ = he($e));
  }
  let U = $;
  if (V && M !== !1) {
    const I = Object.keys(V),
      { shapeFlag: Y } = U;
    I.length && Y & 7 && (i && I.some(Ss) && (V = lo(V, i)), (U = nt(U, V, !1, !0)));
  }
  return (
    s.dirs && ((U = nt(U, null, !1, !0)), (U.dirs = U.dirs ? U.dirs.concat(s.dirs) : s.dirs)),
    s.transition && $s(U, s.transition),
    ($ = U),
    kt(W),
    $
  );
}
const oo = (e) => {
    let t;
    for (const s in e) (s === 'class' || s === 'style' || Wt(s)) && ((t || (t = {}))[s] = e[s]);
    return t;
  },
  lo = (e, t) => {
    const s = {};
    for (const n in e) (!Ss(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
    return s;
  };
function fo(e, t, s) {
  const { props: n, children: r, component: i } = e,
    { props: o, children: f, patchFlag: c } = t,
    p = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (s && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return n ? rn(n, o, p) : !!o;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const T = u[h];
        if (o[T] !== n[T] && !Zt(p, T)) return !0;
      }
    }
  } else
    return (r || f) && (!f || !f.$stable) ? !0 : n === o ? !1 : n ? (o ? rn(n, o, p) : !0) : !!o;
  return !1;
}
function rn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    if (t[i] !== e[i] && !Zt(s, i)) return !0;
  }
  return !1;
}
function co({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if ((n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e))
      ((e = t.vnode).el = s), (t = t.parent);
    else break;
  }
}
const _r = (e) => e.__isSuspense;
function ao(e, t) {
  t && t.pendingBranch ? (P(e) ? t.effects.push(...e) : t.effects.push(e)) : yi(e);
}
const ue = Symbol.for('v-fgt'),
  Qt = Symbol.for('v-txt'),
  $e = Symbol.for('v-cmt'),
  Dt = Symbol.for('v-stc'),
  _t = [];
let ae = null;
function st(e = !1) {
  _t.push((ae = e ? null : []));
}
function uo() {
  _t.pop(), (ae = _t[_t.length - 1] || null);
}
let wt = 1;
function on(e, t = !1) {
  (wt += e), e < 0 && ae && t && (ae.hasOnce = !0);
}
function br(e) {
  return (e.dynamicChildren = wt > 0 ? ae || Ze : null), uo(), wt > 0 && ae && ae.push(e), e;
}
function yr(e, t, s, n, r, i) {
  return br(K(e, t, s, n, r, i, !0));
}
function Ut(e, t, s, n, r) {
  return br(he(e, t, s, n, r, !0));
}
function Bs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const xr = ({ key: e }) => e ?? null,
  $t = ({ ref: e, ref_key: t, ref_for: s }) => (
    typeof e == 'number' && (e = '' + e),
    e != null ? (J(e) || X(e) || R(e) ? { i: ie, r: e, k: t, f: !!s } : e) : null
  );
function K(e, t = null, s = null, n = 0, r = null, i = e === ue ? 0 : 1, o = !1, f = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xr(t),
    ref: t && $t(t),
    scopeId: Wn,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ie,
  };
  return (
    f ? (js(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= J(s) ? 8 : 16),
    wt > 0 && !o && ae && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && ae.push(c),
    c
  );
}
const he = po;
function po(e, t = null, s = null, n = 0, r = null, i = !1) {
  if (((!e || e === Li) && (e = $e), Bs(e))) {
    const f = nt(e, t, !0);
    return (
      s && js(f, s),
      wt > 0 && !i && ae && (f.shapeFlag & 6 ? (ae[ae.indexOf(e)] = f) : ae.push(f)),
      (f.patchFlag = -2),
      f
    );
  }
  if ((Co(e) && (e = e.__vccOpts), t)) {
    t = ho(t);
    let { class: f, style: c } = t;
    f && !J(f) && (t.class = Os(f)), G(c) && (Hs(c) && !P(c) && (c = Z({}, c)), (t.style = Cs(c)));
  }
  const o = J(e) ? 1 : _r(e) ? 128 : wi(e) ? 64 : G(e) ? 4 : R(e) ? 2 : 0;
  return K(e, t, s, n, r, o, i, !0);
}
function ho(e) {
  return e ? (Hs(e) || or(e) ? Z({}, e) : e) : null;
}
function nt(e, t, s = !1, n = !1) {
  const { props: r, ref: i, patchFlag: o, children: f, transition: c } = e,
    p = t ? _o(r || {}, t) : r,
    u = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: p,
      key: p && xr(p),
      ref: t && t.ref ? (s && i ? (P(i) ? i.concat($t(t)) : [i, $t(t)]) : $t(t)) : i,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: f,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== ue ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && nt(e.ssContent),
      ssFallback: e.ssFallback && nt(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return c && n && $s(u, c.clone(u)), u;
}
function go(e = ' ', t = 0) {
  return he(Qt, null, e, t);
}
function vo(e, t) {
  const s = he(Dt, null, e);
  return (s.staticCount = t), s;
}
function mo(e = '', t = !1) {
  return t ? (st(), Ut($e, null, e)) : he($e, null, e);
}
function we(e) {
  return e == null || typeof e == 'boolean'
    ? he($e)
    : P(e)
      ? he(ue, null, e.slice())
      : Bs(e)
        ? Fe(e)
        : he(Qt, null, String(e));
}
function Fe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : nt(e);
}
function js(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (P(t)) s = 16;
  else if (typeof t == 'object')
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), js(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !or(t)
        ? (t._ctx = ie)
        : r === 3 && ie && (ie.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    R(t)
      ? ((t = { default: t, _ctx: ie }), (s = 32))
      : ((t = String(t)), n & 64 ? ((s = 16), (t = [go(t)])) : (s = 8));
  (e.children = t), (e.shapeFlag |= s);
}
function _o(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === 'class') t.class !== n.class && (t.class = Os([t.class, n.class]));
      else if (r === 'style') t.style = Cs([t.style, n.style]);
      else if (Wt(r)) {
        const i = t[r],
          o = n[r];
        o && i !== o && !(P(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== '' && (t[r] = n[r]);
  }
  return t;
}
function ye(e, t, s, n = null) {
  Te(e, t, 7, [s, n]);
}
const bo = nr();
let yo = 0;
function xo(e, t, s) {
  const n = e.type,
    r = (t ? t.appContext : e.appContext) || bo,
    i = {
      uid: yo++,
      vnode: e,
      type: n,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new qr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ['', 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: fr(n, r),
      emitsOptions: mr(n, r),
      emit: null,
      emitted: null,
      propsDefaults: k,
      inheritAttrs: n.inheritAttrs,
      ctx: k,
      data: k,
      props: k,
      attrs: k,
      slots: k,
      refs: k,
      setupState: k,
      setupContext: null,
      suspense: s,
      suspenseId: s ? s.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = io.bind(null, i)), e.ce && e.ce(i), i
  );
}
let ne = null,
  Kt,
  ys;
{
  const e = Jt(),
    t = (s, n) => {
      let r;
      return (
        (r = e[s]) || (r = e[s] = []),
        r.push(n),
        (i) => {
          r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
        }
      );
    };
  (Kt = t('__VUE_INSTANCE_SETTERS__', (s) => (ne = s))),
    (ys = t('__VUE_SSR_SETTERS__', (s) => (St = s)));
}
const Ct = (e) => {
    const t = ne;
    return (
      Kt(e),
      e.scope.on(),
      () => {
        e.scope.off(), Kt(t);
      }
    );
  },
  ln = () => {
    ne && ne.scope.off(), Kt(null);
  };
function wr(e) {
  return e.vnode.shapeFlag & 4;
}
let St = !1;
function wo(e, t = !1, s = !1) {
  t && ys(t);
  const { props: n, children: r } = e.vnode,
    i = wr(e);
  Ki(e, n, i, t), Ji(e, r, s);
  const o = i ? So(e, t) : void 0;
  return t && ys(!1), o;
}
function So(e, t) {
  const s = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Di));
  const { setup: n } = s;
  if (n) {
    Ne();
    const r = (e.setupContext = n.length > 1 ? Eo(e) : null),
      i = Ct(e),
      o = Et(n, e, 0, [e.props, r]),
      f = xn(o);
    if ((Be(), i(), (f || e.sp) && !et(e) && Jn(e), f)) {
      if ((o.then(ln, ln), t))
        return o
          .then((c) => {
            fn(e, c);
          })
          .catch((c) => {
            zt(c, e, 0);
          });
      e.asyncDep = o;
    } else fn(e, o);
  } else Sr(e);
}
function fn(e, t, s) {
  R(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : G(t) && (e.setupState = kn(t)),
    Sr(e);
}
function Sr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Se);
  {
    const r = Ct(e);
    Ne();
    try {
      $i(e);
    } finally {
      Be(), r();
    }
  }
}
const To = {
  get(e, t) {
    return z(e, 'get', ''), e[t];
  },
};
function Eo(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return { attrs: new Proxy(e.attrs, To), slots: e.slots, emit: e.emit, expose: t };
}
function ks(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(kn(ci(e.exposed)), {
          get(t, s) {
            if (s in t) return t[s];
            if (s in vt) return vt[s](e);
          },
          has(t, s) {
            return s in t || s in vt;
          },
        }))
    : e.proxy;
}
function Co(e) {
  return R(e) && '__vccOpts' in e;
}
const Oo = (e, t) => hi(e, t, St),
  Io = '3.5.13';
/**
 * @vue/runtime-dom v3.5.13
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let xs;
const cn = typeof window < 'u' && window.trustedTypes;
if (cn)
  try {
    xs = cn.createPolicy('vue', { createHTML: (e) => e });
  } catch {}
const Tr = xs ? (e) => xs.createHTML(e) : (e) => e,
  Ao = 'http://www.w3.org/2000/svg',
  Ro = 'http://www.w3.org/1998/Math/MathML',
  Ce = typeof document < 'u' ? document : null,
  an = Ce && Ce.createElement('template'),
  Po = {
    insert: (e, t, s) => {
      t.insertBefore(e, s || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, s, n) => {
      const r =
        t === 'svg'
          ? Ce.createElementNS(Ao, e)
          : t === 'mathml'
            ? Ce.createElementNS(Ro, e)
            : s
              ? Ce.createElement(e, { is: s })
              : Ce.createElement(e);
      return e === 'select' && n && n.multiple != null && r.setAttribute('multiple', n.multiple), r;
    },
    createText: (e) => Ce.createTextNode(e),
    createComment: (e) => Ce.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ce.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, s, n, r, i) {
      const o = s ? s.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (; t.insertBefore(r.cloneNode(!0), s), !(r === i || !(r = r.nextSibling)); );
      else {
        an.innerHTML = Tr(
          n === 'svg' ? `<svg>${e}</svg>` : n === 'mathml' ? `<math>${e}</math>` : e,
        );
        const f = an.content;
        if (n === 'svg' || n === 'mathml') {
          const c = f.firstChild;
          for (; c.firstChild; ) f.appendChild(c.firstChild);
          f.removeChild(c);
        }
        t.insertBefore(f, s);
      }
      return [o ? o.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
    },
  },
  Mo = Symbol('_vtc');
function Fo(e, t, s) {
  const n = e[Mo];
  n && (t = (t ? [t, ...n] : [...n]).join(' ')),
    t == null ? e.removeAttribute('class') : s ? e.setAttribute('class', t) : (e.className = t);
}
const un = Symbol('_vod'),
  Lo = Symbol('_vsh'),
  Ho = Symbol(''),
  Do = /(^|;)\s*display\s*:/;
function $o(e, t, s) {
  const n = e.style,
    r = J(s);
  let i = !1;
  if (s && !r) {
    if (t)
      if (J(t))
        for (const o of t.split(';')) {
          const f = o.slice(0, o.indexOf(':')).trim();
          s[f] == null && Nt(n, f, '');
        }
      else for (const o in t) s[o] == null && Nt(n, o, '');
    for (const o in s) o === 'display' && (i = !0), Nt(n, o, s[o]);
  } else if (r) {
    if (t !== s) {
      const o = n[Ho];
      o && (s += ';' + o), (n.cssText = s), (i = Do.test(s));
    }
  } else t && e.removeAttribute('style');
  un in e && ((e[un] = i ? n.display : ''), e[Lo] && (n.display = 'none'));
}
const dn = /\s*!important$/;
function Nt(e, t, s) {
  if (P(s)) s.forEach((n) => Nt(e, t, n));
  else if ((s == null && (s = ''), t.startsWith('--'))) e.setProperty(t, s);
  else {
    const n = No(e, t);
    dn.test(s) ? e.setProperty(Je(n), s.replace(dn, ''), 'important') : (e[n] = s);
  }
}
const pn = ['Webkit', 'Moz', 'ms'],
  cs = {};
function No(e, t) {
  const s = cs[t];
  if (s) return s;
  let n = De(t);
  if (n !== 'filter' && n in e) return (cs[t] = n);
  n = wn(n);
  for (let r = 0; r < pn.length; r++) {
    const i = pn[r] + n;
    if (i in e) return (cs[t] = i);
  }
  return t;
}
const hn = 'http://www.w3.org/1999/xlink';
function gn(e, t, s, n, r, i = kr(t)) {
  n && t.startsWith('xlink:')
    ? s == null
      ? e.removeAttributeNS(hn, t.slice(6, t.length))
      : e.setAttributeNS(hn, t, s)
    : s == null || (i && !Tn(s))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? '' : Ye(s) ? String(s) : s);
}
function vn(e, t, s, n, r) {
  if (t === 'innerHTML' || t === 'textContent') {
    s != null && (e[t] = t === 'innerHTML' ? Tr(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
    const f = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
      c = s == null ? (e.type === 'checkbox' ? 'on' : '') : String(s);
    (f !== c || !('_value' in e)) && (e.value = c),
      s == null && e.removeAttribute(t),
      (e._value = s);
    return;
  }
  let o = !1;
  if (s === '' || s == null) {
    const f = typeof e[t];
    f === 'boolean'
      ? (s = Tn(s))
      : s == null && f === 'string'
        ? ((s = ''), (o = !0))
        : f === 'number' && ((s = 0), (o = !0));
  }
  try {
    e[t] = s;
  } catch {}
  o && e.removeAttribute(r || t);
}
function Bo(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function jo(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const mn = Symbol('_vei');
function ko(e, t, s, n, r = null) {
  const i = e[mn] || (e[mn] = {}),
    o = i[t];
  if (n && o) o.value = n;
  else {
    const [f, c] = qo(t);
    if (n) {
      const p = (i[t] = Ko(n, r));
      Bo(e, f, p, c);
    } else o && (jo(e, f, o, c), (i[t] = void 0));
  }
}
const _n = /(?:Once|Passive|Capture)$/;
function qo(e) {
  let t;
  if (_n.test(e)) {
    t = {};
    let n;
    for (; (n = e.match(_n)); )
      (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Je(e.slice(2)), t];
}
let as = 0;
const Vo = Promise.resolve(),
  Uo = () => as || (Vo.then(() => (as = 0)), (as = Date.now()));
function Ko(e, t) {
  const s = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= s.attached) return;
    Te(Wo(n, s.value), t, 5, [n]);
  };
  return (s.value = e), (s.attached = Uo()), s;
}
function Wo(e, t) {
  if (P(t)) {
    const s = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        s.call(e), (e._stopped = !0);
      }),
      t.map((n) => (r) => !r._stopped && n && n(r))
    );
  } else return t;
}
const bn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Go = (e, t, s, n, r, i) => {
    const o = r === 'svg';
    t === 'class'
      ? Fo(e, n, o)
      : t === 'style'
        ? $o(e, s, n)
        : Wt(t)
          ? Ss(t) || ko(e, t, s, n, i)
          : (
                t[0] === '.'
                  ? ((t = t.slice(1)), !0)
                  : t[0] === '^'
                    ? ((t = t.slice(1)), !1)
                    : Yo(e, t, n, o)
              )
            ? (vn(e, t, n),
              !e.tagName.includes('-') &&
                (t === 'value' || t === 'checked' || t === 'selected') &&
                gn(e, t, n, o, i, t !== 'value'))
            : e._isVueCE && (/[A-Z]/.test(t) || !J(n))
              ? vn(e, De(t), n, i, t)
              : (t === 'true-value'
                  ? (e._trueValue = n)
                  : t === 'false-value' && (e._falseValue = n),
                gn(e, t, n, o));
  };
function Yo(e, t, s, n) {
  if (n) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && bn(t) && R(s)));
  if (
    t === 'spellcheck' ||
    t === 'draggable' ||
    t === 'translate' ||
    t === 'form' ||
    (t === 'list' && e.tagName === 'INPUT') ||
    (t === 'type' && e.tagName === 'TEXTAREA')
  )
    return !1;
  if (t === 'width' || t === 'height') {
    const r = e.tagName;
    if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1;
  }
  return bn(t) && J(s) ? !1 : t in e;
}
const Jo = Z({ patchProp: Go }, Po);
let yn;
function zo() {
  return yn || (yn = Xi(Jo));
}
const Xo = (...e) => {
  const t = zo().createApp(...e),
    { mount: s } = t;
  return (
    (t.mount = (n) => {
      const r = Qo(n);
      if (!r) return;
      const i = t._component;
      !R(i) && !i.render && !i.template && (i.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = '');
      const o = s(r, !1, Zo(r));
      return (
        r instanceof Element && (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')), o
      );
    }),
    t
  );
};
function Zo(e) {
  if (e instanceof SVGElement) return 'svg';
  if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
}
function Qo(e) {
  return J(e) ? document.querySelector(e) : e;
}
const el = '/assets/vue-sticky-box-logo-Bvh5CIe1.png',
  tl = { class: 'sticky-box' },
  sl = { class: 'sticky-box-wrapper' },
  nl = Yn({
    __name: 'StickyBox',
    props: {
      offsetTop: { type: Number, required: !1, default: 0 },
      offsetBottom: { type: Number, required: !1, default: 0 },
      scrollInsideABox: { type: Boolean, required: !1, default: !1 },
      scrolledBoxRef: { type: HTMLElement, required: !1, default: null },
    },
    setup(e) {
      const t = e,
        s = Tt({
          isScrollDown: !1,
          isScrollUp: !1,
          currentScroll: 0,
          topLock: !1,
          bottomLock: !1,
          scrolledBoxElement: t.scrolledBoxRef,
          innerHeight: window.innerHeight,
        }),
        n = (w) => {
          const C = t.scrollInsideABox ? w.target.scrollTop : window.scrollY;
          C <= s.currentScroll
            ? ((s.isScrollUp = !0), (s.isScrollDown = !1))
            : ((s.isScrollUp = !1), (s.isScrollDown = !0));
          let M = s.currentScroll - C;
          if (
            ((C < c.value.parentElement.offsetTop ||
              c.value.parentElement.clientHeight + c.value.parentElement.offsetTop <
                C + s.innerHeight) &&
              (M = 0),
            (s.currentScroll = C),
            c.value.clientHeight + p.value < s.innerHeight)
          ) {
            (c.value.style.top = `${p.value}px`),
              (c.value.style.position = 'sticky'),
              (s.topLock = !0),
              (s.bottomLock = !1);
            return;
          }
          if (s.isScrollUp && s.bottomLock) {
            s.bottomLock = !1;
            const W = c.value.offsetTop + M;
            (c.value.style.top = `${W}px`), (c.value.style.position = 'relative');
          }
          if (s.isScrollDown && s.topLock) {
            s.topLock = !1;
            const W = c.value.offsetTop + M;
            (c.value.style.top = `${W}px`), (c.value.style.position = 'relative');
          }
        },
        r = Pe(),
        i = Pe(),
        o = Pe(),
        f = Pe(),
        c = Pe(),
        p = Pe(t.offsetTop),
        u = Pe(t.offsetBottom);
      mt(
        () => t.offsetTop,
        (w) => {
          (p.value = w), (o.value.style.top = `-${w}px`);
        },
      ),
        mt(
          () => t.offsetBottom,
          (w) => {
            (u.value = w), (f.value.style.bottom = `-${w}px`);
          },
        );
      const h = (w) => {
          w.forEach((C) => {
            if (s.isScrollDown && C.isIntersecting && C.target.classList.contains('end')) {
              (s.bottomLock = !0), (s.topLock = !1), (c.value.style.position = 'sticky');
              const M = -(c.value.clientHeight + u.value - s.innerHeight);
              c.value.style.top = `${M}px`;
            }
            s.isScrollUp &&
              (C.isIntersecting &&
                C.target.classList.contains('start') &&
                ((s.topLock = !0),
                (s.bottomLock = !1),
                (c.value.style.position = 'sticky'),
                (c.value.style.top = `${p.value}px`)),
              C.isIntersecting &&
                C.target.classList.contains('end') &&
                ((s.topLock = !1), (s.bottomLock = !0)));
          });
        },
        T = () => {
          var w;
          t.scrollInsideABox
            ? ((s.currentScroll = (w = s.scrolledBoxElement) == null ? void 0 : w.offsetTop),
              s.scrolledBoxElement.addEventListener('scroll', (C) => n(C)),
              (s.innerHeight = s.scrolledBoxElement.clientHeight))
            : ((s.currentScroll = scrollY), document.addEventListener('scroll', (C) => n(C))),
            (o.value.style.top = `-${p.value}px`),
            (f.value.style.bottom = `-${u.value}px`),
            (r.value = new IntersectionObserver(h, {})),
            (i.value = new IntersectionObserver(h, {})),
            r.value.observe(o.value),
            i.value.observe(f.value),
            (c.value.style.position = 'sticky'),
            (c.value.style.top = `${p.value}px`),
            (s.topLock = !0);
        };
      return (
        Zn(() => {
          T();
        }),
        (w, C) => (
          st(),
          yr('div', tl, [
            K(
              'div',
              { ref_key: 'stickyRef', ref: c, class: 'sticky-content' },
              [
                K(
                  'span',
                  { ref_key: 'topRef', ref: o, class: 'start marked-sticky-point' },
                  null,
                  512,
                ),
                K('div', sl, [Hi(w.$slots, 'default')]),
                K(
                  'span',
                  { ref_key: 'bottomRef', ref: f, class: 'end marked-sticky-point' },
                  null,
                  512,
                ),
              ],
              512,
            ),
          ])
        )
      );
    },
  }),
  rl = { class: 'container-w-sm' },
  il = { class: 'intro py-8' },
  ol = { class: 'flex-col flex-center' },
  ll = { class: 'intro-heading flex-center h1' },
  fl = ['src'],
  cl = { class: 'container px-2' },
  al = Yn({
    __name: 'App',
    setup(e) {
      Tt({
        boxes: [
          { isOpen: !0, title: 'title-1', body: 'qwerqwrqwerwrwr' },
          { isOpen: !0, title: 'title-2', body: 'qwerqwrqwerwrwr' },
          { isOpen: !0, title: 'title-3', body: 'qwerqwrqwerwrwr' },
          { isOpen: !0, title: 'title-4', body: 'qwerqwrqwerwrwr' },
          { isOpen: !0, title: 'title-5', body: 'qwerqwrqwerwrwr' },
          { isOpen: !1, title: 'title-6', body: 'qwerqwrqwerwrwr' },
          { isOpen: !1, title: 'title-7', body: 'qwerqwrqwerwrwr' },
          { isOpen: !1, title: 'title-8', body: 'qwerqwrqwerwrwr' },
        ],
      });
      const t = Pe(null),
        s = (n) => {
          n == null || n.scrollIntoView({ block: 'center', behavior: 'smooth' });
        };
      return (n, r) => (
        st(),
        yr('div', rl, [
          K('div', il, [
            K('div', ol, [
              K('div', ll, [
                K('img', { src: jn(el), alt: 'vue-sticky-box-logo', width: '100px' }, null, 8, fl),
                r[1] || (r[1] = K('h1', { class: 'text-center mb-0' }, 'Vue Sticky Box', -1)),
              ]),
              r[2] ||
                (r[2] = K(
                  'h3',
                  { class: 'text-center mx-auto mb-3' },
                  ' A simple and lightweight Vue 3 component for creating sticky containers with ease. It provides flexible options to control the sticky behavior and supports offsets from the viewport. ',
                  -1,
                )),
              K(
                'button',
                { class: 'example-btn', onClick: r[0] || (r[0] = (i) => s(t.value)) },
                ' Scroll and See how it works! ',
              ),
            ]),
            r[3] ||
              (r[3] = vo(
                `<div data-v-e7d5fd15><h3 data-v-e7d5fd15>🚀 Features</h3><ul data-v-e7d5fd15><li data-v-e7d5fd15>Lightweight and easy to use.</li><li data-v-e7d5fd15>Customizable offsets from the top and bottom of the viewport.</li><li data-v-e7d5fd15>Reactive state for sticky positioning.</li><li data-v-e7d5fd15>Compatible with modern Vue 3 applications.</li></ul></div><div data-v-e7d5fd15><h3 data-v-e7d5fd15>Requirements</h3><div class="mb-3" data-v-e7d5fd15><h4 data-v-e7d5fd15>🎨 Styling</h4><p data-v-e7d5fd15> You should import the default styles provided by the package for work then add your own customized style. To use the default styles, import them into your project: </p><pre data-v-e7d5fd15>import &#39;vue-sticky-box/style.css&#39;</pre></div><div data-v-e7d5fd15><h4 data-v-e7d5fd15>🔧 Package</h4><p data-v-e7d5fd15> This package requires Vue 3 as a peer dependency. Ensure Vue is installed in your project: </p><pre data-v-e7d5fd15>npm install vue@^3.0.0</pre></div></div><div data-v-e7d5fd15><h3 data-v-e7d5fd15>🔑 Props</h3><p data-v-e7d5fd15>The <code data-v-e7d5fd15>VueStickyBox</code> component accepts the following props:</p><table data-v-e7d5fd15><thead data-v-e7d5fd15><tr data-v-e7d5fd15><th data-v-e7d5fd15><strong data-v-e7d5fd15>Prop</strong></th><th data-v-e7d5fd15><strong data-v-e7d5fd15>Type</strong></th><th data-v-e7d5fd15><strong data-v-e7d5fd15>Default</strong></th><th data-v-e7d5fd15><strong data-v-e7d5fd15>Description</strong></th></tr></thead><tbody data-v-e7d5fd15><tr data-v-e7d5fd15><td data-v-e7d5fd15><code data-v-e7d5fd15>offsetTop</code></td><td data-v-e7d5fd15><code data-v-e7d5fd15>number</code></td><td data-v-e7d5fd15><code data-v-e7d5fd15>0</code></td><td data-v-e7d5fd15>The offset in pixels from the top of the viewport.</td></tr><tr data-v-e7d5fd15><td data-v-e7d5fd15><code data-v-e7d5fd15>offsetBottom</code></td><td data-v-e7d5fd15><code data-v-e7d5fd15>number</code></td><td data-v-e7d5fd15><code data-v-e7d5fd15>0</code></td><td data-v-e7d5fd15>The offset in pixels from the bottom of the viewport.</td></tr></tbody></table></div><div data-v-e7d5fd15><h3 data-v-e7d5fd15>📖 Example</h3><pre class="pre-code" style="position:relative;" data-v-e7d5fd15><span class="pl-k" data-v-e7d5fd15>&lt;</span>script setup<span class="pl-k" data-v-e7d5fd15>&gt;</span>
import VueStickyBox from <span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&#39;</span>vue-sticky-box<span class="pl-pds" data-v-e7d5fd15>&#39;</span></span><span class="pl-k" data-v-e7d5fd15>;</span>
import <span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&#39;</span>vue-sticky-box/style.css<span class="pl-pds" data-v-e7d5fd15>&#39;</span></span><span class="pl-k" data-v-e7d5fd15>;</span>
<span class="pl-k" data-v-e7d5fd15>&lt;</span>/script<span class="pl-k" data-v-e7d5fd15>&gt;</span>

<span class="pl-k" data-v-e7d5fd15>&lt;</span>template<span class="pl-k" data-v-e7d5fd15>&gt;</span>
  <span class="pl-k" data-v-e7d5fd15>&lt;</span>div style=<span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&quot;</span>height: 2000px<span class="pl-pds" data-v-e7d5fd15>&quot;</span></span><span class="pl-k" data-v-e7d5fd15>&gt;</span>
    <span class="pl-k" data-v-e7d5fd15>&lt;</span>VueStickyBox :offsetTop=<span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&quot;</span>50<span class="pl-pds" data-v-e7d5fd15>&quot;</span></span> :offsetBottom=<span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&quot;</span>30<span class="pl-pds" data-v-e7d5fd15>&quot;</span></span><span class="pl-k" data-v-e7d5fd15>&gt;</span>
      <span class="pl-k" data-v-e7d5fd15>&lt;</span>div style=<span class="pl-s" data-v-e7d5fd15><span class="pl-pds" data-v-e7d5fd15>&quot;</span>background: lightgray; padding: 20px; border-radius: 5px;<span class="pl-pds" data-v-e7d5fd15>&quot;</span></span><span class="pl-k" data-v-e7d5fd15>&gt;</span>
        This box will stay sticky<span class="pl-k" data-v-e7d5fd15>!</span>
      <span class="pl-k" data-v-e7d5fd15>&lt;</span>/div<span class="pl-k" data-v-e7d5fd15>&gt;</span>
    <span class="pl-k" data-v-e7d5fd15>&lt;</span>/VueStickyBox<span class="pl-k" data-v-e7d5fd15>&gt;</span>
  <span class="pl-k" data-v-e7d5fd15>&lt;</span>/div<span class="pl-k" data-v-e7d5fd15>&gt;</span>
<span class="pl-k" data-v-e7d5fd15>&lt;</span>/template<span class="pl-k" data-v-e7d5fd15>&gt;</span><div class="open_grepper_editor" title="Edit &amp; Save To Grepper" data-v-e7d5fd15></div>
</pre></div>`,
                4,
              )),
          ]),
          K(
            'div',
            { class: 'example-box', ref_key: 'exampleRef', ref: t },
            [
              r[6] || (r[6] = K('div', { class: 'main-box' }, 'First box view', -1)),
              K('div', cl, [
                t.value
                  ? (st(),
                    Ut(
                      nl,
                      {
                        key: 0,
                        'offset-top': 20,
                        'offset-bottom': 20,
                        scrollInsideABox: !0,
                        scrolledBoxRef: t.value,
                      },
                      {
                        default: Gn(
                          () =>
                            r[4] ||
                            (r[4] = [
                              K('div', { class: 'simple-box text-center' }, 'Sticky box', -1),
                            ]),
                        ),
                        _: 1,
                      },
                      8,
                      ['scrolledBoxRef'],
                    ))
                  : mo('', !0),
                r[5] || (r[5] = K('div', { class: 'main-box' }, 'Main box', -1)),
              ]),
              r[7] || (r[7] = K('div', { class: 'main-box' }, '2nd box view', -1)),
              r[8] || (r[8] = K('div', { class: 'main-box' }, '3rd box view', -1)),
              r[9] || (r[9] = K('div', { class: 'main-box' }, '4th box view', -1)),
            ],
            512,
          ),
        ])
      );
    },
  }),
  ul = (e, t) => {
    const s = e.__vccOpts || e;
    for (const [n, r] of t) s[n] = r;
    return s;
  },
  dl = ul(al, [['__scopeId', 'data-v-e7d5fd15']]);
Xo(dl).mount('#app');
