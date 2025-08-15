(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const fu="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(fu);const ei=1,ti=2,Tl=4,pu=8,vu=16,mu=1,hu=4,gu=8,_u=16,yu=1,bu=2,Ot=Symbol(),xu="http://www.w3.org/1999/xhtml",wu="http://www.w3.org/2000/svg",Fl="@attach",Su=!0,Rl=!1;var ri=Array.isArray,ku=Array.prototype.indexOf,us=Array.from,Ii=Object.defineProperty,zr=Object.getOwnPropertyDescriptor,Pu=Object.getOwnPropertyDescriptors,Au=Object.prototype,Eu=Array.prototype,Ol=Object.getPrototypeOf,yo=Object.isExtensible;function $n(t){return typeof t=="function"}const ye=()=>{};function Il(t){for(var e=0;e<t.length;e++)t[e]()}function Cu(){var t,e,r=new Promise((n,a)=>{t=n,e=a});return{promise:r,resolve:t,reject:e}}function fs(t,e){if(Array.isArray(t))return t;if(!(Symbol.iterator in t))return Array.from(t);const r=[];for(const n of t)if(r.push(n),r.length===e)break;return r}const Jt=2,ps=4,ni=8,pa=16,Or=32,Gr=64,Nl=128,tr=256,La=512,Lt=1024,rr=2048,Wr=4096,or=8192,mn=16384,vs=32768,On=65536,bo=1<<17,Tu=1<<18,ms=1<<19,hs=1<<20,Ni=1<<21,gs=1<<22,an=1<<23,Br=Symbol("$state"),Dl=Symbol("legacy props"),Fu=Symbol(""),_s=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"};function Ru(){throw new Error("https://svelte.dev/e/await_outside_boundary")}function Ml(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Ou(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Iu(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Nu(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Du(t){throw new Error("https://svelte.dev/e/effect_orphan")}function Mu(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Lu(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function zu(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Bu(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Uu(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function ju(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}let $u=!1;function Ll(t){return t===this.v}function qu(t,e){return t!=t?e==e:t!==e||t!==null&&typeof t=="object"||typeof t=="function"}function Vu(t,e){return t!==e}function zl(t){return!qu(t,this.v)}let Gu=!1,Bt=null;function za(t){Bt=t}function Di(t){return ai().get(t)}function Bl(t,e){return ai().set(t,e),e}function Wu(t){return ai().has(t)}function Hu(){return ai()}function ie(t,e=!1,r){Bt={p:Bt,c:null,e:null,s:t,x:null,l:null}}function se(t){var e=Bt,r=e.e;if(r!==null){e.e=null;for(var n of r)rc(n)}return Bt=e.p,{}}function Ul(){return!0}function ai(t){return Bt===null&&Ml(),Bt.c??=new Map(Yu(Bt)||void 0)}function Yu(t){let e=t.p;for(;e!==null;){const r=e.c;if(r!==null)return r;e=e.p}return null}const Ku=new WeakMap;function Xu(t){var e=ot;if(e===null)return st.f|=an,t;if((e.f&vs)===0){if((e.f&Nl)===0)throw!e.parent&&t instanceof Error&&jl(t),t;e.b.error(t)}else ys(t,e)}function ys(t,e){for(;e!==null;){if((e.f&Nl)!==0)try{e.b.error(t);return}catch(r){t=r}e=e.parent}throw t instanceof Error&&jl(t),t}function jl(t){const e=Ku.get(t);e&&(Ii(t,"message",{value:e.message}),Ii(t,"stack",{value:e.stack}))}let na=[],Mi=[];function $l(){var t=na;na=[],Il(t)}function Qu(){var t=Mi;Mi=[],Il(t)}function va(t){na.length===0&&queueMicrotask($l),na.push(t)}function Ju(){na.length>0&&$l(),Mi.length>0&&Qu()}function bs(t){let e=0,r=fn(0),n;return()=>{uf()&&(l(r),ci(()=>(e===0&&(n=Tr(()=>t(()=>hr(r)))),e+=1,()=>{va(()=>{e-=1,e===0&&(n?.(),n=void 0,hr(r))})})))}}function Zu(){for(var t=ot.b;t!==null&&!t.has_pending_snippet();)t=t.parent;return t===null&&Ru(),t}function ii(t){var e=Jt|rr,r=st!==null&&(st.f&Jt)!==0?st:null;return ot===null||r!==null&&(r.f&tr)!==0?e|=tr:ot.f|=ms,{ctx:Bt,deps:null,effects:null,equals:Ll,f:e,fn:t,reactions:null,rv:0,v:Ot,wv:0,parent:r??ot,ac:null}}function ef(t,e){let r=ot;r===null&&Ou();var n=r.b,a=void 0,s=fn(Ot),i=null,o=!st;return mf(()=>{try{var c=t()}catch(m){c=Promise.reject(m)}var d=()=>c;a=i?.then(d,d)??Promise.resolve(c),i=a;var f=dt,v=n.pending;o&&(n.update_pending_count(1),v||f.increment());const h=(m,g=void 0)=>{i=null,v||f.activate(),g?g!==_s&&(s.f|=an,aa(s,g)):((s.f&an)!==0&&(s.f^=an),aa(s,m)),o&&(n.update_pending_count(-1),v||f.decrement()),Hl()};if(a.then(h,m=>h(null,m||"unknown")),f)return()=>{queueMicrotask(()=>f.neuter())}}),new Promise(c=>{function d(f){function v(){f===a?c(s):d(a)}f.then(v,v)}d(a)})}function $(t){const e=ii(t);return lc(e),e}function ql(t){const e=ii(t);return e.equals=zl,e}function Vl(t){var e=t.effects;if(e!==null){t.effects=null;for(var r=0;r<e.length;r+=1)Ut(e[r])}}function tf(t){for(var e=t.parent;e!==null;){if((e.f&Jt)===0)return e;e=e.parent}return null}function xs(t){var e,r=ot;Ur(tf(t));try{Vl(t),e=fc(t)}finally{Ur(r)}return e}function Gl(t){var e=xs(t);if(t.equals(e)||(t.v=e,t.wv=dc()),!hn)if(An!==null)An.set(t,t.v);else{var r=(Lr||(t.f&tr)!==0)&&t.deps!==null?Wr:Lt;qt(t,r)}}function Wl(t,e,r){const n=ii;if(e.length===0){r(t.map(n));return}var a=dt,s=ot,i=rf(),o=Zu();Promise.all(e.map(c=>ef(c))).then(c=>{a?.activate(),i();try{r([...t.map(n),...c])}catch(d){(s.f&mn)===0&&ys(d,s)}a?.deactivate(),Hl()}).catch(c=>{o.error(c)})}function rf(){var t=ot,e=st,r=Bt;return function(){Ur(t),yr(e),za(r)}}function Hl(){Ur(null),yr(null),za(null)}const qn=new Set;let dt=null,Ia=null,An=null,xo=new Set,Ba=[];function Yl(){const t=Ba.shift();Ba.length>0&&queueMicrotask(Yl),t()}let cn=[],si=null,Li=!1,Na=!1;class dn{current=new Map;#e=new Map;#t=new Set;#r=0;#n=null;#a=!1;#i=[];#l=[];#s=[];#o=[];#c=[];#d=[];#u=[];skipped_effects=new Set;process(e){cn=[],Ia=null;var r=null;if(qn.size>1){r=new Map,An=new Map;for(const[s,i]of this.current)r.set(s,{v:s.v,wv:s.wv}),s.v=i;for(const s of qn)if(s!==this)for(const[i,o]of s.#e)r.has(i)||(r.set(i,{v:i.v,wv:i.wv}),i.v=o)}for(const s of e)this.#v(s);if(this.#i.length===0&&this.#r===0){this.#p();var n=this.#s,a=this.#o;this.#s=[],this.#o=[],this.#c=[],Ia=dt,dt=null,wo(n),wo(a),dt===null?dt=this:qn.delete(this),this.#n?.resolve()}else this.#f(this.#s),this.#f(this.#o),this.#f(this.#c);if(r){for(const[s,{v:i,wv:o}]of r)s.wv<=o&&(s.v=i);An=null}for(const s of this.#i)ea(s);for(const s of this.#l)ea(s);this.#i=[],this.#l=[]}#v(e){e.f^=Lt;for(var r=e.first;r!==null;){var n=r.f,a=(n&(Or|Gr))!==0,s=a&&(n&Lt)!==0,i=s||(n&or)!==0||this.skipped_effects.has(r);if(!i&&r.fn!==null){if(a)r.f^=Lt;else if((n&Lt)===0)if((n&ps)!==0)this.#o.push(r);else if((n&gs)!==0){var o=r.b?.pending?this.#l:this.#i;o.push(r)}else ui(r)&&((r.f&pa)!==0&&this.#c.push(r),ea(r));var c=r.first;if(c!==null){r=c;continue}}var d=r.parent;for(r=r.next;r===null&&d!==null;)r=d.next,d=d.parent}}#f(e){for(const r of e)((r.f&rr)!==0?this.#d:this.#u).push(r),qt(r,Lt);e.length=0}capture(e,r){this.#e.has(e)||this.#e.set(e,r),this.current.set(e,e.v)}activate(){dt=this}deactivate(){dt=null,Ia=null;for(const e of xo)if(xo.delete(e),e(),dt!==null)break}neuter(){this.#a=!0}flush(){cn.length>0?Kl():this.#p(),dt===this&&(this.#r===0&&qn.delete(this),this.deactivate())}#p(){if(!this.#a)for(const e of this.#t)e();this.#t.clear()}increment(){this.#r+=1}decrement(){if(this.#r-=1,this.#r===0){for(const e of this.#d)qt(e,rr),un(e);for(const e of this.#u)qt(e,Wr),un(e);this.#s=[],this.#o=[],this.flush()}else this.deactivate()}add_callback(e){this.#t.add(e)}settled(){return(this.#n??=Cu()).promise}static ensure(){if(dt===null){const e=dt=new dn;qn.add(dt),Na||dn.enqueue(()=>{dt===e&&e.flush()})}return dt}static enqueue(e){Ba.length===0&&queueMicrotask(Yl),Ba.unshift(e)}}function nf(t){var e=Na;Na=!0;try{for(var r;;){if(Ju(),cn.length===0&&(dt?.flush(),cn.length===0))return si=null,r;Kl()}}finally{Na=e}}function Kl(){var t=kn;Li=!0;try{var e=0;for(ko(!0);cn.length>0;){var r=dn.ensure();if(e++>1e3){var n,a;af()}r.process(cn),sn.clear()}}finally{Li=!1,ko(t),si=null}}function af(){try{Mu()}catch(t){ys(t,si)}}function wo(t){var e=t.length;if(e!==0){for(var r=0;r<e;){var n=t[r++];if((n.f&(mn|or))===0&&ui(n)){var a=dt?dt.current.size:0;if(ea(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null&&n.ac===null?ic(n):n.fn=null),dt!==null&&dt.current.size>a&&(n.f&hs)!==0)break}}for(;r<e;)un(t[r++])}}function un(t){for(var e=si=t;e.parent!==null;){e=e.parent;var r=e.f;if(Li&&e===ot&&(r&pa)!==0)return;if((r&(Gr|Or))!==0){if((r&Lt)===0)return;e.f^=Lt}}cn.push(e)}const sn=new Map;function fn(t,e){var r={f:0,v:t,reactions:null,equals:Ll,rv:0,wv:0};return r}function Se(t,e){const r=fn(t);return lc(r),r}function sf(t,e=!1,r=!0){const n=fn(t);return e||(n.equals=zl),n}function V(t,e,r=!1){st!==null&&(!ir||(st.f&bo)!==0)&&Ul()&&(st.f&(Jt|pa|gs|bo))!==0&&!Er?.includes(t)&&Uu();let n=r?pt(e):e;return aa(t,n)}function aa(t,e){if(!t.equals(e)){var r=t.v;hn?sn.set(t,e):sn.set(t,r),t.v=e;var n=dn.ensure();n.capture(t,r),(t.f&Jt)!==0&&((t.f&rr)!==0&&xs(t),qt(t,(t.f&tr)===0?Lt:Wr)),t.wv=dc(),Xl(t,rr),ot!==null&&(ot.f&Lt)!==0&&(ot.f&(Or|Gr))===0&&(Zt===null?_f([t]):Zt.push(t))}return e}function hr(t){V(t,t.v+1)}function Xl(t,e){var r=t.reactions;if(r!==null)for(var n=r.length,a=0;a<n;a++){var s=r[a],i=s.f,o=(i&rr)===0;o&&qt(s,e),(i&Jt)!==0?Xl(s,Wr):o&&un(s)}}function pt(t){if(typeof t!="object"||t===null||Br in t)return t;const e=Ol(t);if(e!==Au&&e!==Eu)return t;var r=new Map,n=ri(t),a=Se(0),s=Cr,i=o=>{if(Cr===s)return o();var c=st,d=Cr;yr(null),Ao(s);var f=o();return yr(c),Ao(d),f};return n&&r.set("length",Se(t.length)),new Proxy(t,{defineProperty(o,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&zu();var f=r.get(c);return f===void 0?f=i(()=>{var v=Se(d.value);return r.set(c,v),v}):V(f,d.value,!0),!0},deleteProperty(o,c){var d=r.get(c);if(d===void 0){if(c in o){const f=i(()=>Se(Ot));r.set(c,f),hr(a)}}else V(d,Ot),hr(a);return!0},get(o,c,d){if(c===Br)return t;var f=r.get(c),v=c in o;if(f===void 0&&(!v||zr(o,c)?.writable)&&(f=i(()=>{var m=pt(v?o[c]:Ot),g=Se(m);return g}),r.set(c,f)),f!==void 0){var h=l(f);return h===Ot?void 0:h}return Reflect.get(o,c,d)},getOwnPropertyDescriptor(o,c){var d=Reflect.getOwnPropertyDescriptor(o,c);if(d&&"value"in d){var f=r.get(c);f&&(d.value=l(f))}else if(d===void 0){var v=r.get(c),h=v?.v;if(v!==void 0&&h!==Ot)return{enumerable:!0,configurable:!0,value:h,writable:!0}}return d},has(o,c){if(c===Br)return!0;var d=r.get(c),f=d!==void 0&&d.v!==Ot||Reflect.has(o,c);if(d!==void 0||ot!==null&&(!f||zr(o,c)?.writable)){d===void 0&&(d=i(()=>{var h=f?pt(o[c]):Ot,m=Se(h);return m}),r.set(c,d));var v=l(d);if(v===Ot)return!1}return f},set(o,c,d,f){var v=r.get(c),h=c in o;if(n&&c==="length")for(var m=d;m<v.v;m+=1){var g=r.get(m+"");g!==void 0?V(g,Ot):m in o&&(g=i(()=>Se(Ot)),r.set(m+"",g))}if(v===void 0)(!h||zr(o,c)?.writable)&&(v=i(()=>Se(void 0)),V(v,pt(d)),r.set(c,v));else{h=v.v!==Ot;var y=i(()=>pt(d));V(v,y)}var E=Reflect.getOwnPropertyDescriptor(o,c);if(E?.set&&E.set.call(f,d),!h){if(n&&typeof c=="string"){var S=r.get("length"),b=Number(c);Number.isInteger(b)&&b>=S.v&&V(S,b+1)}hr(a)}return!0},ownKeys(o){l(a);var c=Reflect.ownKeys(o).filter(v=>{var h=r.get(v);return h===void 0||h.v!==Ot});for(var[d,f]of r)f.v!==Ot&&!(d in o)&&c.push(d);return c},setPrototypeOf(){Bu()}})}function So(t){try{if(t!==null&&typeof t=="object"&&Br in t)return t[Br]}catch{}return t}function of(t,e){return Object.is(So(t),So(e))}var zi,Ql,Jl,Zl;function lf(){if(zi===void 0){zi=window,Ql=/Firefox/.test(navigator.userAgent);var t=Element.prototype,e=Node.prototype,r=Text.prototype;Jl=zr(e,"firstChild").get,Zl=zr(e,"nextSibling").get,yo(t)&&(t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__style=void 0,t.__e=void 0),yo(r)&&(r.__t=void 0)}}function Ir(t=""){return document.createTextNode(t)}function En(t){return Jl.call(t)}function oi(t){return Zl.call(t)}function p(t,e){return En(t)}function A(t,e){{var r=En(t);return r instanceof Comment&&r.data===""?oi(r):r}}function _(t,e=1,r=!1){let n=t;for(;e--;)n=oi(n);return n}function cf(t){t.textContent=""}function li(){return!1}function ec(t){ot===null&&st===null&&Du(),st!==null&&(st.f&tr)!==0&&ot===null&&Nu(),hn&&Iu()}function df(t,e){var r=e.last;r===null?e.last=e.first=t:(r.next=t,t.prev=r,e.last=t)}function pr(t,e,r,n=!0){var a=ot;a!==null&&(a.f&or)!==0&&(t|=or);var s={ctx:Bt,deps:null,nodes_start:null,nodes_end:null,f:t|rr,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,transitions:null,wv:0,ac:null};if(r)try{ea(s),s.f|=vs}catch(c){throw Ut(s),c}else e!==null&&un(s);var i=r&&s.deps===null&&s.first===null&&s.nodes_start===null&&s.teardown===null&&(s.f&ms)===0;if(!i&&n&&(a!==null&&df(s,a),st!==null&&(st.f&Jt)!==0&&(t&Gr)===0)){var o=st;(o.effects??=[]).push(s)}return s}function uf(){return st!==null&&!ir}function tc(t){const e=pr(ni,null,!1);return qt(e,Lt),e.teardown=t,e}function Ct(t){ec();var e=ot.f,r=!st&&(e&Or)!==0&&(e&vs)===0;if(r){var n=Bt;(n.e??=[]).push(t)}else return rc(t)}function rc(t){return pr(ps|hs,t,!1)}function ff(t){return ec(),pr(ni|hs,t,!0)}function pf(t){dn.ensure();const e=pr(Gr,t,!0);return()=>{Ut(e)}}function vf(t){dn.ensure();const e=pr(Gr,t,!0);return(r={})=>new Promise(n=>{r.outro?In(e,()=>{Ut(e),n(void 0)}):(Ut(e),n(void 0))})}function ws(t){return pr(ps,t,!1)}function mf(t){return pr(gs|ms,t,!0)}function ci(t,e=0){return pr(ni|e,t,!0)}function G(t,e=[],r=[]){Wl(e,r,n=>{pr(ni,()=>t(...n.map(l)),!0)})}function Hr(t,e=0){var r=pr(pa|e,t,!0);return r}function cr(t,e=!0){return pr(Or,t,!0,e)}function nc(t){var e=t.teardown;if(e!==null){const r=hn,n=st;Po(!0),yr(null);try{e.call(null)}finally{Po(r),yr(n)}}}function ac(t,e=!1){var r=t.first;for(t.first=t.last=null;r!==null;){r.ac?.abort(_s);var n=r.next;(r.f&Gr)!==0?r.parent=null:Ut(r,e),r=n}}function hf(t){for(var e=t.first;e!==null;){var r=e.next;(e.f&Or)===0&&Ut(e),e=r}}function Ut(t,e=!0){var r=!1;(e||(t.f&Tu)!==0)&&t.nodes_start!==null&&t.nodes_end!==null&&(gf(t.nodes_start,t.nodes_end),r=!0),ac(t,e&&!r),Ua(t,0),qt(t,mn);var n=t.transitions;if(n!==null)for(const s of n)s.stop();nc(t);var a=t.parent;a!==null&&a.first!==null&&ic(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=t.ac=null}function gf(t,e){for(;t!==null;){var r=t===e?null:oi(t);t.remove(),t=r}}function ic(t){var e=t.parent,r=t.prev,n=t.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),e!==null&&(e.first===t&&(e.first=n),e.last===t&&(e.last=r))}function In(t,e){var r=[];Ss(t,r,!0),sc(r,()=>{Ut(t),e&&e()})}function sc(t,e){var r=t.length;if(r>0){var n=()=>--r||e();for(var a of t)a.out(n)}else e()}function Ss(t,e,r){if((t.f&or)===0){if(t.f^=or,t.transitions!==null)for(const i of t.transitions)(i.is_global||r)&&e.push(i);for(var n=t.first;n!==null;){var a=n.next,s=(n.f&On)!==0||(n.f&Or)!==0;Ss(n,e,s?r:!1),n=a}}}function di(t){oc(t,!0)}function oc(t,e){if((t.f&or)!==0){t.f^=or,(t.f&Lt)===0&&(qt(t,rr),un(t));for(var r=t.first;r!==null;){var n=r.next,a=(r.f&On)!==0||(r.f&Or)!==0;oc(r,a?e:!1),r=n}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||e)&&s.in()}}let kn=!1;function ko(t){kn=t}let hn=!1;function Po(t){hn=t}let st=null,ir=!1;function yr(t){st=t}let ot=null;function Ur(t){ot=t}let Er=null;function lc(t){st!==null&&(Er===null?Er=[t]:Er.push(t))}let zt=null,Yt=0,Zt=null;function _f(t){Zt=t}let cc=1,ia=0,Cr=ia;function Ao(t){Cr=t}let Lr=!1;function dc(){return++cc}function ui(t){var e=t.f;if((e&rr)!==0)return!0;if((e&Wr)!==0){var r=t.deps,n=(e&tr)!==0;if(r!==null){var a,s,i=(e&La)!==0,o=n&&ot!==null&&!Lr,c=r.length;if((i||o)&&(ot===null||(ot.f&mn)===0)){var d=t,f=d.parent;for(a=0;a<c;a++)s=r[a],(i||!s?.reactions?.includes(d))&&(s.reactions??=[]).push(d);i&&(d.f^=La),o&&f!==null&&(f.f&tr)===0&&(d.f^=tr)}for(a=0;a<c;a++)if(s=r[a],ui(s)&&Gl(s),s.wv>t.wv)return!0}(!n||ot!==null&&!Lr)&&qt(t,Lt)}return!1}function uc(t,e,r=!0){var n=t.reactions;if(n!==null&&!Er?.includes(t))for(var a=0;a<n.length;a++){var s=n[a];(s.f&Jt)!==0?uc(s,e,!1):e===s&&(r?qt(s,rr):(s.f&Lt)!==0&&qt(s,Wr),un(s))}}function fc(t){var e=zt,r=Yt,n=Zt,a=st,s=Lr,i=Er,o=Bt,c=ir,d=Cr,f=t.f;zt=null,Yt=0,Zt=null,Lr=(f&tr)!==0&&(ir||!kn||st===null),st=(f&(Or|Gr))===0?t:null,Er=null,za(t.ctx),ir=!1,Cr=++ia,t.ac!==null&&(t.ac.abort(_s),t.ac=null);try{t.f|=Ni;var v=(0,t.fn)(),h=t.deps;if(zt!==null){var m;if(Ua(t,Yt),h!==null&&Yt>0)for(h.length=Yt+zt.length,m=0;m<zt.length;m++)h[Yt+m]=zt[m];else t.deps=h=zt;if(!Lr||(f&Jt)!==0&&t.reactions!==null)for(m=Yt;m<h.length;m++)(h[m].reactions??=[]).push(t)}else h!==null&&Yt<h.length&&(Ua(t,Yt),h.length=Yt);if(Ul()&&Zt!==null&&!ir&&h!==null&&(t.f&(Jt|Wr|rr))===0)for(m=0;m<Zt.length;m++)uc(Zt[m],t);return a!==null&&a!==t&&(ia++,Zt!==null&&(n===null?n=Zt:n.push(...Zt))),(t.f&an)!==0&&(t.f^=an),v}catch(g){return Xu(g)}finally{t.f^=Ni,zt=e,Yt=r,Zt=n,st=a,Lr=s,Er=i,za(o),ir=c,Cr=d}}function yf(t,e){let r=e.reactions;if(r!==null){var n=ku.call(r,t);if(n!==-1){var a=r.length-1;a===0?r=e.reactions=null:(r[n]=r[a],r.pop())}}r===null&&(e.f&Jt)!==0&&(zt===null||!zt.includes(e))&&(qt(e,Wr),(e.f&(tr|La))===0&&(e.f^=La),Vl(e),Ua(e,0))}function Ua(t,e){var r=t.deps;if(r!==null)for(var n=e;n<r.length;n++)yf(t,r[n])}function ea(t){var e=t.f;if((e&mn)===0){qt(t,Lt);var r=ot,n=kn;ot=t,kn=!0;try{(e&pa)!==0?hf(t):ac(t),nc(t);var a=fc(t);t.teardown=typeof a=="function"?a:null,t.wv=cc;var s;Rl&&Gu&&(t.f&rr)!==0&&t.deps}finally{kn=n,ot=r}}}async function bf(){await Promise.resolve(),nf()}function l(t){var e=t.f,r=(e&Jt)!==0;if(st!==null&&!ir){var n=ot!==null&&(ot.f&mn)!==0;if(!n&&!Er?.includes(t)){var a=st.deps;if((st.f&Ni)!==0)t.rv<ia&&(t.rv=ia,zt===null&&a!==null&&a[Yt]===t?Yt++:zt===null?zt=[t]:(!Lr||!zt.includes(t))&&zt.push(t));else{(st.deps??=[]).push(t);var s=t.reactions;s===null?t.reactions=[st]:s.includes(st)||s.push(st)}}}else if(r&&t.deps===null&&t.effects===null){var i=t,o=i.parent;o!==null&&(o.f&tr)===0&&(i.f^=tr)}if(hn){if(sn.has(t))return sn.get(t);if(r){i=t;var c=i.v;return((i.f&Lt)===0&&i.reactions!==null||pc(i))&&(c=xs(i)),sn.set(i,c),c}}else if(r){if(i=t,An?.has(i))return An.get(i);ui(i)&&Gl(i)}if((t.f&an)!==0)throw t.v;return t.v}function pc(t){if(t.v===Ot)return!0;if(t.deps===null)return!1;for(const e of t.deps)if(sn.has(e)||(e.f&Jt)!==0&&pc(e))return!0;return!1}function Tr(t){var e=ir;try{return ir=!0,t()}finally{ir=e}}const xf=-7169;function qt(t,e){t.f=t.f&xf|e}function wf(t,e){if(e){const r=document.body;t.autofocus=!0,va(()=>{document.activeElement===r&&t.focus()})}}let Eo=!1;function Sf(){Eo||(Eo=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{if(!t.defaultPrevented)for(const e of t.target.elements)e.__on_r?.()})},{capture:!0}))}function vc(t){var e=st,r=ot;yr(null),Ur(null);try{return t()}finally{yr(e),Ur(r)}}function mc(t,e,r,n=r){t.addEventListener(e,()=>vc(r));const a=t.__on_r;a?t.__on_r=()=>{a(),n(!0)}:t.__on_r=()=>n(!0),Sf()}const hc=new Set,Bi=new Set;function ks(t,e,r,n={}){function a(s){if(n.capture||Xn.call(e,s),!s.cancelBubble)return vc(()=>r?.call(this,s))}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?va(()=>{e.addEventListener(t,a,n)}):e.addEventListener(t,a,n),a}function Nt(t,e,r,n={}){var a=ks(e,t,r,n);return()=>{t.removeEventListener(e,a,n)}}function kf(t,e,r,n,a){var s={capture:n,passive:a},i=ks(t,e,r,s);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&tc(()=>{e.removeEventListener(t,i,s)})}function ma(t){for(var e=0;e<t.length;e++)hc.add(t[e]);for(var r of Bi)r(t)}function Xn(t){var e=this,r=e.ownerDocument,n=t.type,a=t.composedPath?.()||[],s=a[0]||t.target,i=0,o=t.__root;if(o){var c=a.indexOf(o);if(c!==-1&&(e===document||e===window)){t.__root=e;return}var d=a.indexOf(e);if(d===-1)return;c<=d&&(i=c)}if(s=a[i]||t.target,s!==e){Ii(t,"currentTarget",{configurable:!0,get(){return s||r}});var f=st,v=ot;yr(null),Ur(null);try{for(var h,m=[];s!==null;){var g=s.assignedSlot||s.parentNode||s.host||null;try{var y=s["__"+n];if(y!=null&&(!s.disabled||t.target===s))if(ri(y)){var[E,...S]=y;E.apply(s,[t,...S])}else y.call(s,t)}catch(b){h?m.push(b):h=b}if(t.cancelBubble||g===e||g===null)break;s=g}if(h){for(let b of m)queueMicrotask(()=>{throw b});throw h}}finally{t.__root=e,delete t.currentTarget,yr(f),Ur(v)}}}function gc(t){var e=document.createElement("template");return e.innerHTML=t.replaceAll("<!>","<!---->"),e.content}function Cn(t,e){var r=ot;r.nodes_start===null&&(r.nodes_start=t,r.nodes_end=e)}function k(t,e){var r=(e&yu)!==0,n=(e&bu)!==0,a,s=!t.startsWith("<!>");return()=>{a===void 0&&(a=gc(s?t:"<!>"+t),r||(a=En(a)));var i=n||Ql?document.importNode(a,!0):a.cloneNode(!0);if(r){var o=En(i),c=i.lastChild;Cn(o,c)}else Cn(i,i);return i}}function Pf(t,e,r="svg"){var n=!t.startsWith("<!>"),a=`<${r}>${n?t:"<!>"+t}</${r}>`,s;return()=>{if(!s){var i=gc(a),o=En(i);s=En(o)}var c=s.cloneNode(!0);return Cn(c,c),c}}function _c(t,e){return Pf(t,e,"svg")}function $e(t=""){{var e=Ir(t+"");return Cn(e,e),e}}function q(){var t=document.createDocumentFragment(),e=document.createComment(""),r=Ir();return t.append(e,r),Cn(e,r),t}function u(t,e){t!==null&&t.before(e)}function Yr(){return(window.__svelte??={}).uid??=1,`c${window.__svelte.uid++}`}function Af(t){return t.endsWith("capture")&&t!=="gotpointercapture"&&t!=="lostpointercapture"}const Ef=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Cf(t){return Ef.includes(t)}const Tf={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Ff(t){return t=t.toLowerCase(),Tf[t]??t}const Rf=["touchstart","touchmove"];function Of(t){return Rf.includes(t)}function B(t,e){var r=e==null?"":typeof e=="object"?e+"":e;r!==(t.__t??=t.nodeValue)&&(t.__t=r,t.nodeValue=r+"")}function yc(t,e){return If(t,e)}const _n=new Map;function If(t,{target:e,anchor:r,props:n={},events:a,context:s,intro:i=!0}){lf();var o=new Set,c=v=>{for(var h=0;h<v.length;h++){var m=v[h];if(!o.has(m)){o.add(m);var g=Of(m);e.addEventListener(m,Xn,{passive:g});var y=_n.get(m);y===void 0?(document.addEventListener(m,Xn,{passive:g}),_n.set(m,1)):_n.set(m,y+1)}}};c(us(hc)),Bi.add(c);var d=void 0,f=vf(()=>{var v=r??e.appendChild(Ir());return cr(()=>{if(s){ie({});var h=Bt;h.c=s}a&&(n.$$events=a),d=t(v,n)||{},s&&se()}),()=>{for(var h of o){e.removeEventListener(h,Xn);var m=_n.get(h);--m===0?(document.removeEventListener(h,Xn),_n.delete(h)):_n.set(h,m)}Bi.delete(c),v!==r&&v.parentNode?.removeChild(v)}});return Ui.set(d,f),d}let Ui=new WeakMap;function Nf(t,e){const r=Ui.get(t);return r?(Ui.delete(t),r(e)):Promise.resolve()}function fe(t,e,...r){var n=t,a=ye,s;Hr(()=>{a!==(a=e())&&(s&&(Ut(s),s=null),s=cr(()=>a(n,...r)))},On)}function Ps(t){Bt===null&&Ml(),Ct(()=>{const e=Tr(t);if(typeof e=="function")return e})}function Df(){return Symbol(Fl)}function L(t,e,r=!1){var n=t,a=null,s=null,i=Ot,o=r?On:0,c=!1;const d=(m,g=!0)=>{c=!0,h(g,m)};var f=null;function v(){f!==null&&(f.lastChild.remove(),n.before(f),f=null);var m=i?a:s,g=i?s:a;m&&di(m),g&&In(g,()=>{i?s=null:a=null})}const h=(m,g)=>{if(i!==(i=m)){var y=li(),E=n;if(y&&(f=document.createDocumentFragment(),f.append(E=Ir())),i?a??=g&&cr(()=>g(E)):s??=g&&cr(()=>g(E)),y){var S=dt,b=i?a:s,O=i?s:a;b&&S.skipped_effects.delete(b),O&&S.skipped_effects.add(O),S.add_callback(v)}else v()}};Hr(()=>{c=!1,e(d),c||h(null,null)},o)}function Mf(t,e,r){var n=t,a=Ot,s,i,o=null,c=Vu;function d(){s&&In(s),o!==null&&(o.lastChild.remove(),n.before(o),o=null),s=i}Hr(()=>{if(c(a,a=e())){var f=n,v=li();v&&(o=document.createDocumentFragment(),o.append(f=Ir())),i=cr(()=>r(f)),v?dt.add_callback(d):d()}})}function St(t,e){return e}function Lf(t,e,r){for(var n=t.items,a=[],s=e.length,i=0;i<s;i++)Ss(e[i].e,a,!0);var o=s>0&&a.length===0&&r!==null;if(o){var c=r.parentNode;cf(c),c.append(r),n.clear(),mr(t,e[0].prev,e[s-1].next)}sc(a,()=>{for(var d=0;d<s;d++){var f=e[d];o||(n.delete(f.k),mr(t,f.prev,f.next)),Ut(f.e,!o)}})}function vt(t,e,r,n,a,s=null){var i=t,o={flags:e,items:new Map,first:null},c=(e&Tl)!==0;if(c){var d=t;i=d.appendChild(Ir())}var f=null,v=!1,h=new Map,m=ql(()=>{var S=r();return ri(S)?S:S==null?[]:us(S)}),g,y;function E(){zf(y,g,o,h,i,a,e,n,r),s!==null&&(g.length===0?f?di(f):f=cr(()=>s(i)):f!==null&&In(f,()=>{f=null}))}Hr(()=>{y??=ot,g=l(m);var S=g.length;if(!(v&&S===0)){v=S===0;var b,O,z,M;if(li()){var T=new Set,R=dt;for(O=0;O<S;O+=1){z=g[O],M=n(z,O);var I=o.items.get(M)??h.get(M);I?(e&(ei|ti))!==0&&bc(I,z,O,e):(b=xc(null,o,null,null,z,M,O,a,e,r,!0),h.set(M,b)),T.add(M)}for(const[K,W]of o.items)T.has(K)||R.skipped_effects.add(W.e);R.add_callback(E)}else E();l(m)}})}function zf(t,e,r,n,a,s,i,o,c){var d=(i&pu)!==0,f=(i&(ei|ti))!==0,v=e.length,h=r.items,m=r.first,g=m,y,E=null,S,b=[],O=[],z,M,T,R;if(d)for(R=0;R<v;R+=1)z=e[R],M=o(z,R),T=h.get(M),T!==void 0&&(T.a?.measure(),(S??=new Set).add(T));for(R=0;R<v;R+=1){if(z=e[R],M=o(z,R),T=h.get(M),T===void 0){var I=n.get(M);if(I!==void 0){n.delete(M),h.set(M,I);var K=E?E.next:g;mr(r,E,I),mr(r,I,K),bi(I,K,a),E=I}else{var W=g?g.e.nodes_start:a;E=xc(W,r,E,E===null?r.first:E.next,z,M,R,s,i,c)}h.set(M,E),b=[],O=[],g=E.next;continue}if(f&&bc(T,z,R,i),(T.e.f&or)!==0&&(di(T.e),d&&(T.a?.unfix(),(S??=new Set).delete(T))),T!==g){if(y!==void 0&&y.has(T)){if(b.length<O.length){var J=O[0],j;E=J.prev;var N=b[0],P=b[b.length-1];for(j=0;j<b.length;j+=1)bi(b[j],J,a);for(j=0;j<O.length;j+=1)y.delete(O[j]);mr(r,N.prev,P.next),mr(r,E,N),mr(r,P,J),g=J,E=P,R-=1,b=[],O=[]}else y.delete(T),bi(T,g,a),mr(r,T.prev,T.next),mr(r,T,E===null?r.first:E.next),mr(r,E,T),E=T;continue}for(b=[],O=[];g!==null&&g.k!==M;)(g.e.f&or)===0&&(y??=new Set).add(g),O.push(g),g=g.next;if(g===null)continue;T=g}b.push(T),E=T,g=T.next}if(g!==null||y!==void 0){for(var x=y===void 0?[]:us(y);g!==null;)(g.e.f&or)===0&&x.push(g),g=g.next;var w=x.length;if(w>0){var F=(i&Tl)!==0&&v===0?a:null;if(d){for(R=0;R<w;R+=1)x[R].a?.measure();for(R=0;R<w;R+=1)x[R].a?.fix()}Lf(r,x,F)}}d&&va(()=>{if(S!==void 0)for(T of S)T.a?.apply()}),t.first=r.first&&r.first.e,t.last=E&&E.e;for(var C of n.values())Ut(C.e);n.clear()}function bc(t,e,r,n){(n&ei)!==0&&aa(t.v,e),(n&ti)!==0?aa(t.i,r):t.i=r}function xc(t,e,r,n,a,s,i,o,c,d,f){var v=(c&ei)!==0,h=(c&vu)===0,m=v?h?sf(a,!1,!1):fn(a):a,g=(c&ti)===0?i:fn(i),y={i:g,v:m,k:s,a:null,e:null,prev:r,next:n};try{if(t===null){var E=document.createDocumentFragment();E.append(t=Ir())}return y.e=cr(()=>o(t,m,g,d),$u),y.e.prev=r&&r.e,y.e.next=n&&n.e,r===null?f||(e.first=y):(r.next=y,r.e.next=y.e),n!==null&&(n.prev=y,n.e.prev=y.e),y}finally{}}function bi(t,e,r){for(var n=t.next?t.next.e.nodes_start:r,a=e?e.e.nodes_start:r,s=t.e.nodes_start;s!==null&&s!==n;){var i=oi(s);a.before(s),s=i}}function mr(t,e,r){e===null?t.first=r:(e.next=r,e.e.next=r&&r.e),r!==null&&(r.prev=e,r.e.prev=e&&e.e)}function Ce(t,e,r){var n=t,a,s,i=null,o=null;function c(){s&&(In(s),s=null),i&&(i.lastChild.remove(),n.before(i),i=null),s=o,o=null}Hr(()=>{if(a!==(a=e())){var d=li();if(a){var f=n;d&&(i=document.createDocumentFragment(),i.append(f=Ir())),o=cr(()=>r(f,a))}d?dt.add_callback(c):c()}},On)}function wc(t,e,r,n,a,s){var i,o,c=null,d=t,f;Hr(()=>{const v=e()||null;var h=r||v==="svg"?wu:null;v!==i&&(f&&(v===null?In(f,()=>{f=null,o=null}):v===o?di(f):Ut(f)),v&&v!==o&&(f=cr(()=>{if(c=h?document.createElementNS(h,v):document.createElement(v),Cn(c,c),n){var m=c.appendChild(Ir());n(c,m)}ot.nodes_end=c,d.before(c)})),i=v,i&&(o=i))},On)}function Bf(t,e){var r=void 0,n;Hr(()=>{r!==(r=e())&&(n&&(Ut(n),n=null),r&&(n=cr(()=>{ws(()=>r(t))})))})}function Sc(t){var e,r,n="";if(typeof t=="string"||typeof t=="number")n+=t;else if(typeof t=="object")if(Array.isArray(t)){var a=t.length;for(e=0;e<a;e++)t[e]&&(r=Sc(t[e]))&&(n&&(n+=" "),n+=r)}else for(r in t)t[r]&&(n&&(n+=" "),n+=r);return n}function ta(){for(var t,e,r=0,n="",a=arguments.length;r<a;r++)(t=arguments[r])&&(e=Sc(t))&&(n&&(n+=" "),n+=e);return n}function jr(t){return typeof t=="object"?ta(t):t??""}const Co=[...` 	
\r\f \v\uFEFF`];function Uf(t,e,r){var n=t==null?"":""+t;if(r){for(var a in r)if(r[a])n=n?n+" "+a:a;else if(n.length)for(var s=a.length,i=0;(i=n.indexOf(a,i))>=0;){var o=i+s;(i===0||Co.includes(n[i-1]))&&(o===n.length||Co.includes(n[o]))?n=(i===0?"":n.substring(0,i))+n.substring(o+1):i=o}}return n===""?null:n}function To(t,e=!1){var r=e?" !important;":";",n="";for(var a in t){var s=t[a];s!=null&&s!==""&&(n+=" "+a+": "+s+r)}return n}function xi(t){return t[0]!=="-"||t[1]!=="-"?t.toLowerCase():t}function jf(t,e){if(e){var r="",n,a;if(Array.isArray(e)?(n=e[0],a=e[1]):n=e,t){t=String(t).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var s=!1,i=0,o=!1,c=[];n&&c.push(...Object.keys(n).map(xi)),a&&c.push(...Object.keys(a).map(xi));var d=0,f=-1;const y=t.length;for(var v=0;v<y;v++){var h=t[v];if(o?h==="/"&&t[v-1]==="*"&&(o=!1):s?s===h&&(s=!1):h==="/"&&t[v+1]==="*"?o=!0:h==='"'||h==="'"?s=h:h==="("?i++:h===")"&&i--,!o&&s===!1&&i===0){if(h===":"&&f===-1)f=v;else if(h===";"||v===y-1){if(f!==-1){var m=xi(t.substring(d,f).trim());if(!c.includes(m)){h!==";"&&v++;var g=t.substring(d,v).trim();r+=" "+g+";"}}d=v+1,f=-1}}}}return n&&(r+=To(n)),a&&(r+=To(a,!0)),r=r.trim(),r===""?null:r}return t==null?null:String(t)}function dr(t,e,r,n,a,s){var i=t.__className;if(i!==r||i===void 0){var o=Uf(r,n,s);o==null?t.removeAttribute("class"):e?t.className=o:t.setAttribute("class",o),t.__className=r}else if(s&&a!==s)for(var c in s){var d=!!s[c];(a==null||d!==!!a[c])&&t.classList.toggle(c,d)}return s}function wi(t,e={},r,n){for(var a in r){var s=r[a];e[a]!==s&&(r[a]==null?t.style.removeProperty(a):t.style.setProperty(a,s,n))}}function $f(t,e,r,n){var a=t.__style;if(a!==e){var s=jf(e,n);s==null?t.removeAttribute("style"):t.style.cssText=s,t.__style=e}else n&&(Array.isArray(n)?(wi(t,r?.[0],n[0]),wi(t,r?.[1],n[1],"important")):wi(t,r,n));return n}function ji(t,e,r=!1){if(t.multiple){if(e==null)return;if(!ri(e))return ju();for(var n of t.options)n.selected=e.includes(Fo(n));return}for(n of t.options){var a=Fo(n);if(of(a,e)){n.selected=!0;return}}(!r||e!==void 0)&&(t.selectedIndex=-1)}function qf(t){var e=new MutationObserver(()=>{ji(t,t.__value)});e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),tc(()=>{e.disconnect()})}function Fo(t){return"__value"in t?t.__value:t.value}const Vn=Symbol("class"),Gn=Symbol("style"),kc=Symbol("is custom element"),Pc=Symbol("is html");function Vf(t,e){e?t.hasAttribute("selected")||t.setAttribute("selected",""):t.removeAttribute("selected")}function ht(t,e,r,n){var a=Ac(t);a[e]!==(a[e]=r)&&(e==="loading"&&(t[Fu]=r),r==null?t.removeAttribute(e):typeof r!="string"&&Ec(t).includes(e)?t[e]=r:t.setAttribute(e,r))}function Gf(t,e,r,n,a=!1){var s=Ac(t),i=s[kc],o=!s[Pc],c=e||{},d=t.tagName==="OPTION";for(var f in e)f in r||(r[f]=null);r.class?r.class=jr(r.class):r[Vn]&&(r.class=null),r[Gn]&&(r.style??=null);var v=Ec(t);for(const O in r){let z=r[O];if(d&&O==="value"&&z==null){t.value=t.__value="",c[O]=z;continue}if(O==="class"){var h=t.namespaceURI==="http://www.w3.org/1999/xhtml";dr(t,h,z,n,e?.[Vn],r[Vn]),c[O]=z,c[Vn]=r[Vn];continue}if(O==="style"){$f(t,z,e?.[Gn],r[Gn]),c[O]=z,c[Gn]=r[Gn];continue}var m=c[O];if(!(z===m&&!(z===void 0&&t.hasAttribute(O)))){c[O]=z;var g=O[0]+O[1];if(g!=="$$")if(g==="on"){const M={},T="$$"+O;let R=O.slice(2);var y=Cf(R);if(Af(R)&&(R=R.slice(0,-7),M.capture=!0),!y&&m){if(z!=null)continue;t.removeEventListener(R,c[T],M),c[T]=null}if(z!=null)if(y)t[`__${R}`]=z,ma([R]);else{let I=function(K){c[O].call(this,K)};var b=I;c[T]=ks(R,t,I,M)}else y&&(t[`__${R}`]=void 0)}else if(O==="style")ht(t,O,z);else if(O==="autofocus")wf(t,!!z);else if(!i&&(O==="__value"||O==="value"&&z!=null))t.value=t.__value=z;else if(O==="selected"&&d)Vf(t,z);else{var E=O;o||(E=Ff(E));var S=E==="defaultValue"||E==="defaultChecked";if(z==null&&!i&&!S)if(s[O]=null,E==="value"||E==="checked"){let M=t;const T=e===void 0;if(E==="value"){let R=M.defaultValue;M.removeAttribute(E),M.defaultValue=R,M.value=M.__value=T?R:null}else{let R=M.defaultChecked;M.removeAttribute(E),M.defaultChecked=R,M.checked=T?R:!1}}else t.removeAttribute(O);else S||v.includes(E)&&(i||typeof z!="string")?t[E]=z:typeof z!="function"&&ht(t,E,z)}}}return c}function Xe(t,e,r=[],n=[],a,s=!1){Wl(r,n,i=>{var o=void 0,c={},d=t.nodeName==="SELECT",f=!1;if(Hr(()=>{var h=e(...i.map(l)),m=Gf(t,o,h,a,s);f&&d&&"value"in h&&ji(t,h.value);for(let y of Object.getOwnPropertySymbols(c))h[y]||Ut(c[y]);for(let y of Object.getOwnPropertySymbols(h)){var g=h[y];y.description===Fl&&(!o||g!==o[y])&&(c[y]&&Ut(c[y]),c[y]=cr(()=>Bf(t,()=>g))),m[y]=g}o=m}),d){var v=t;ws(()=>{ji(v,o.value,!0),qf(v)})}f=!0})}function Ac(t){return t.__attributes??={[kc]:t.nodeName.includes("-"),[Pc]:t.namespaceURI===xu}}var Ro=new Map;function Ec(t){var e=Ro.get(t.nodeName);if(e)return e;Ro.set(t.nodeName,e=[]);for(var r,n=t,a=Element.prototype;a!==n;){r=Pu(n);for(var s in r)r[s].set&&e.push(s);n=Ol(n)}return e}function Oo(t,e,r=e){var n=new WeakSet;mc(t,"input",a=>{var s=a?t.defaultValue:t.value;if(s=Si(t)?ki(s):s,r(s),dt!==null&&n.add(dt),s!==(s=e())){var i=t.selectionStart,o=t.selectionEnd;t.value=s??"",o!==null&&(t.selectionStart=i,t.selectionEnd=Math.min(o,t.value.length))}}),Tr(e)==null&&t.value&&(r(Si(t)?ki(t.value):t.value),dt!==null&&n.add(dt)),ci(()=>{var a=e();if(t===document.activeElement){var s=Ia??dt;if(n.has(s))return}Si(t)&&a===ki(t.value)||t.type==="date"&&!a&&!t.value||a!==t.value&&(t.value=a??"")})}function Si(t){var e=t.type;return e==="number"||e==="range"}function ki(t){return t===""?null:+t}function Wf(t,e,r=e){mc(t,"change",()=>{r(t.files)}),ci(()=>{t.files=e()})}function Io(t,e){return t===e||t?.[Br]===e}function ut(t={},e,r,n){return ws(()=>{var a,s;return ci(()=>{a=s,s=[],Tr(()=>{t!==r(...s)&&(e(t,...s),a&&Io(r(...a),t)&&e(null,...a))})}),()=>{va(()=>{s&&Io(r(...s),t)&&e(null,...s)})}}),t}let wa=!1;function Hf(t){var e=wa;try{return wa=!1,[t(),wa]}finally{wa=e}}const Yf={get(t,e){if(!t.exclude.includes(e))return t.props[e]},set(t,e){return!1},getOwnPropertyDescriptor(t,e){if(!t.exclude.includes(e)&&e in t.props)return{enumerable:!0,configurable:!0,value:t.props[e]}},has(t,e){return t.exclude.includes(e)?!1:e in t.props},ownKeys(t){return Reflect.ownKeys(t.props).filter(e=>!t.exclude.includes(e))}};function xe(t,e,r){return new Proxy({props:t,exclude:e},Yf)}const Kf={get(t,e){let r=t.props.length;for(;r--;){let n=t.props[r];if($n(n)&&(n=n()),typeof n=="object"&&n!==null&&e in n)return n[e]}},set(t,e,r){let n=t.props.length;for(;n--;){let a=t.props[n];$n(a)&&(a=a());const s=zr(a,e);if(s&&s.set)return s.set(r),!0}return!1},getOwnPropertyDescriptor(t,e){let r=t.props.length;for(;r--;){let n=t.props[r];if($n(n)&&(n=n()),typeof n=="object"&&n!==null&&e in n){const a=zr(n,e);return a&&!a.configurable&&(a.configurable=!0),a}}},has(t,e){if(e===Br||e===Dl)return!1;for(let r of t.props)if($n(r)&&(r=r()),r!=null&&e in r)return!0;return!1},ownKeys(t){const e=[];for(let r of t.props)if($n(r)&&(r=r()),!!r){for(const n in r)e.includes(n)||e.push(n);for(const n of Object.getOwnPropertySymbols(r))e.includes(n)||e.push(n)}return e}};function Ke(...t){return new Proxy({props:t},Kf)}function U(t,e,r,n){var a=(r&gu)!==0,s=(r&_u)!==0,i=n,o=!0,c=()=>(o&&(o=!1,i=s?Tr(n):n),i),d;if(a){var f=Br in t||Dl in t;d=zr(t,e)?.set??(f&&e in t?b=>t[e]=b:void 0)}var v,h=!1;a?[v,h]=Hf(()=>t[e]):v=t[e],v===void 0&&n!==void 0&&(v=c(),d&&(Lu(),d(v)));var m;if(m=()=>{var b=t[e];return b===void 0?c():(o=!0,b)},(r&hu)===0)return m;if(d){var g=t.$$legacy;return function(b,O){return arguments.length>0?((!O||g||h)&&d(O?m():b),b):m()}}var y=!1,E=((r&mu)!==0?ii:ql)(()=>(y=!1,m()));a&&l(E);var S=ot;return function(b,O){if(arguments.length>0){const z=O?l(E):a?pt(b):b;return V(E,z),y=!0,i!==void 0&&(i=z),b}return hn&&y||(S.f&mn)!==0?E.v:l(E)}}/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */const Xf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Qf=_c("<svg><!><!></svg>");function _t(t,e){ie(e,!0);const r=U(e,"color",3,"currentColor"),n=U(e,"size",3,24),a=U(e,"strokeWidth",3,2),s=U(e,"absoluteStrokeWidth",3,!1),i=U(e,"iconNode",19,()=>[]),o=xe(e,["$$slots","$$events","$$legacy","name","color","size","strokeWidth","absoluteStrokeWidth","iconNode","children"]);var c=Qf();Xe(c,v=>({...Xf,...o,width:n(),height:n(),stroke:r(),"stroke-width":v,class:["lucide-icon lucide",e.name&&`lucide-${e.name}`,e.class]}),[()=>s()?Number(a())*24/Number(n()):a()]);var d=p(c);vt(d,17,i,St,(v,h)=>{var m=$(()=>fs(l(h),2));let g=()=>l(m)[0],y=()=>l(m)[1];var E=q(),S=A(E);wc(S,g,!0,(b,O)=>{Xe(b,()=>({...y()}))}),u(v,E)});var f=_(d);fe(f,()=>e.children??ye),u(t,c),se()}function Cc(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];_t(t,Ke({name:"database"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function Tc(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"m16 18 6-6-6-6"}],["path",{d:"m8 6-6 6 6 6"}]];_t(t,Ke({name:"code"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function Jf(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["line",{x1:"12",x2:"12",y1:"20",y2:"10"}],["line",{x1:"18",x2:"18",y1:"20",y2:"4"}],["line",{x1:"6",x2:"6",y1:"20",y2:"16"}]];_t(t,Ke({name:"chart-no-axes-column-increasing"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function pn(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];_t(t,Ke({name:"shield-check"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function ra(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}]];_t(t,Ke({name:"file"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}const sr=[{id:"random_data",title:"Random Data File",description:"Upload data file for Python script testing and data analysis. Supports CSV, Parquet, and GeoPackage formats.",defaultFilename:"random_data.parquet",required:!0,acceptedTypes:[".parquet",".csv",".gpkg"],maxSize:10},{id:"identity",title:"Sample Dataset",description:"Sample dataset for testing and preview. Supports CSV, Parquet, and GeoPackage formats, plus documents and images.",defaultFilename:"sample_data.csv",required:!0,acceptedTypes:[".pdf",".jpg",".jpeg",".png",".parquet",".csv",".gpkg"],maxSize:5},{id:"financial",title:"Financial Data",description:"Financial datasets for analysis and visualization. Supports CSV, Parquet formats, plus documents.",defaultFilename:"financial_data.parquet",required:!0,acceptedTypes:[".pdf",".parquet",".csv"],maxSize:8},{id:"insurance",title:"Experimental Data",description:"Experimental or research data files. Supports CSV, Parquet, and GeoPackage formats, plus documents.",defaultFilename:"experiment_data.parquet",required:!1,acceptedTypes:[".pdf",".parquet",".csv",".gpkg"],maxSize:5},{id:"references",title:"Reference Data",description:"Reference datasets or documentation files. Supports CSV, Parquet, and GeoPackage formats, plus documents.",defaultFilename:"reference_data.parquet",required:!1,acceptedTypes:[".pdf",".doc",".docx",".parquet",".csv",".gpkg"],maxSize:7}];var No=t=>typeof t=="boolean"?`${t}`:t===0?"0":t,jt=t=>!t||typeof t!="object"||Object.keys(t).length===0,Zf=(t,e)=>JSON.stringify(t)===JSON.stringify(e);function Fc(t,e){t.forEach(function(r){Array.isArray(r)?Fc(r,e):e.push(r)})}function Rc(t){let e=[];return Fc(t,e),e}var Oc=(...t)=>Rc(t).filter(Boolean),Ic=(t,e)=>{let r={},n=Object.keys(t),a=Object.keys(e);for(let s of n)if(a.includes(s)){let i=t[s],o=e[s];Array.isArray(i)||Array.isArray(o)?r[s]=Oc(o,i):typeof i=="object"&&typeof o=="object"?r[s]=Ic(i,o):r[s]=o+" "+i}else r[s]=t[s];for(let s of a)n.includes(s)||(r[s]=e[s]);return r},Do=t=>!t||typeof t!="string"?t:t.replace(/\s+/g," ").trim();const As="-",ep=t=>{const e=rp(t),{conflictingClassGroups:r,conflictingClassGroupModifiers:n}=t;return{getClassGroupId:i=>{const o=i.split(As);return o[0]===""&&o.length!==1&&o.shift(),Nc(o,e)||tp(i)},getConflictingClassGroupIds:(i,o)=>{const c=r[i]||[];return o&&n[i]?[...c,...n[i]]:c}}},Nc=(t,e)=>{if(t.length===0)return e.classGroupId;const r=t[0],n=e.nextPart.get(r),a=n?Nc(t.slice(1),n):void 0;if(a)return a;if(e.validators.length===0)return;const s=t.join(As);return e.validators.find(({validator:i})=>i(s))?.classGroupId},Mo=/^\[(.+)\]$/,tp=t=>{if(Mo.test(t)){const e=Mo.exec(t)[1],r=e?.substring(0,e.indexOf(":"));if(r)return"arbitrary.."+r}},rp=t=>{const{theme:e,classGroups:r}=t,n={nextPart:new Map,validators:[]};for(const a in r)$i(r[a],n,a,e);return n},$i=(t,e,r,n)=>{t.forEach(a=>{if(typeof a=="string"){const s=a===""?e:Lo(e,a);s.classGroupId=r;return}if(typeof a=="function"){if(np(a)){$i(a(n),e,r,n);return}e.validators.push({validator:a,classGroupId:r});return}Object.entries(a).forEach(([s,i])=>{$i(i,Lo(e,s),r,n)})})},Lo=(t,e)=>{let r=t;return e.split(As).forEach(n=>{r.nextPart.has(n)||r.nextPart.set(n,{nextPart:new Map,validators:[]}),r=r.nextPart.get(n)}),r},np=t=>t.isThemeGetter,ap=t=>{if(t<1)return{get:()=>{},set:()=>{}};let e=0,r=new Map,n=new Map;const a=(s,i)=>{r.set(s,i),e++,e>t&&(e=0,n=r,r=new Map)};return{get(s){let i=r.get(s);if(i!==void 0)return i;if((i=n.get(s))!==void 0)return a(s,i),i},set(s,i){r.has(s)?r.set(s,i):a(s,i)}}},qi="!",Vi=":",ip=Vi.length,sp=t=>{const{prefix:e,experimentalParseClassName:r}=t;let n=a=>{const s=[];let i=0,o=0,c=0,d;for(let g=0;g<a.length;g++){let y=a[g];if(i===0&&o===0){if(y===Vi){s.push(a.slice(c,g)),c=g+ip;continue}if(y==="/"){d=g;continue}}y==="["?i++:y==="]"?i--:y==="("?o++:y===")"&&o--}const f=s.length===0?a:a.substring(c),v=op(f),h=v!==f,m=d&&d>c?d-c:void 0;return{modifiers:s,hasImportantModifier:h,baseClassName:v,maybePostfixModifierPosition:m}};if(e){const a=e+Vi,s=n;n=i=>i.startsWith(a)?s(i.substring(a.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:i,maybePostfixModifierPosition:void 0}}if(r){const a=n;n=s=>r({className:s,parseClassName:a})}return n},op=t=>t.endsWith(qi)?t.substring(0,t.length-1):t.startsWith(qi)?t.substring(1):t,lp=t=>{const e=Object.fromEntries(t.orderSensitiveModifiers.map(n=>[n,!0]));return n=>{if(n.length<=1)return n;const a=[];let s=[];return n.forEach(i=>{i[0]==="["||e[i]?(a.push(...s.sort(),i),s=[]):s.push(i)}),a.push(...s.sort()),a}},cp=t=>({cache:ap(t.cacheSize),parseClassName:sp(t),sortModifiers:lp(t),...ep(t)}),dp=/\s+/,up=(t,e)=>{const{parseClassName:r,getClassGroupId:n,getConflictingClassGroupIds:a,sortModifiers:s}=e,i=[],o=t.trim().split(dp);let c="";for(let d=o.length-1;d>=0;d-=1){const f=o[d],{isExternal:v,modifiers:h,hasImportantModifier:m,baseClassName:g,maybePostfixModifierPosition:y}=r(f);if(v){c=f+(c.length>0?" "+c:c);continue}let E=!!y,S=n(E?g.substring(0,y):g);if(!S){if(!E){c=f+(c.length>0?" "+c:c);continue}if(S=n(g),!S){c=f+(c.length>0?" "+c:c);continue}E=!1}const b=s(h).join(":"),O=m?b+qi:b,z=O+S;if(i.includes(z))continue;i.push(z);const M=a(S,E);for(let T=0;T<M.length;++T){const R=M[T];i.push(O+R)}c=f+(c.length>0?" "+c:c)}return c};function fp(){let t=0,e,r,n="";for(;t<arguments.length;)(e=arguments[t++])&&(r=Dc(e))&&(n&&(n+=" "),n+=r);return n}const Dc=t=>{if(typeof t=="string")return t;let e,r="";for(let n=0;n<t.length;n++)t[n]&&(e=Dc(t[n]))&&(r&&(r+=" "),r+=e);return r};function Gi(t,...e){let r,n,a,s=i;function i(c){const d=e.reduce((f,v)=>v(f),t());return r=cp(d),n=r.cache.get,a=r.cache.set,s=o,o(c)}function o(c){const d=n(c);if(d)return d;const f=up(c,r);return a(c,f),f}return function(){return s(fp.apply(null,arguments))}}const Rt=t=>{const e=r=>r[t]||[];return e.isThemeGetter=!0,e},Mc=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Lc=/^\((?:(\w[\w-]*):)?(.+)\)$/i,pp=/^\d+\/\d+$/,vp=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,mp=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,hp=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,gp=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,_p=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,yn=t=>pp.test(t),it=t=>!!t&&!Number.isNaN(Number(t)),Jr=t=>!!t&&Number.isInteger(Number(t)),zo=t=>t.endsWith("%")&&it(t.slice(0,-1)),Nr=t=>vp.test(t),yp=()=>!0,bp=t=>mp.test(t)&&!hp.test(t),Es=()=>!1,xp=t=>gp.test(t),wp=t=>_p.test(t),Sp=t=>!De(t)&&!Me(t),kp=t=>Nn(t,Uc,Es),De=t=>Mc.test(t),Zr=t=>Nn(t,jc,bp),Pi=t=>Nn(t,Dp,it),Pp=t=>Nn(t,zc,Es),Ap=t=>Nn(t,Bc,wp),Ep=t=>Nn(t,Es,xp),Me=t=>Lc.test(t),Sa=t=>Dn(t,jc),Cp=t=>Dn(t,Mp),Tp=t=>Dn(t,zc),Fp=t=>Dn(t,Uc),Rp=t=>Dn(t,Bc),Op=t=>Dn(t,Lp,!0),Nn=(t,e,r)=>{const n=Mc.exec(t);return n?n[1]?e(n[1]):r(n[2]):!1},Dn=(t,e,r=!1)=>{const n=Lc.exec(t);return n?n[1]?e(n[1]):r:!1},zc=t=>t==="position",Ip=new Set(["image","url"]),Bc=t=>Ip.has(t),Np=new Set(["length","size","percentage"]),Uc=t=>Np.has(t),jc=t=>t==="length",Dp=t=>t==="number",Mp=t=>t==="family-name",Lp=t=>t==="shadow",Wi=()=>{const t=Rt("color"),e=Rt("font"),r=Rt("text"),n=Rt("font-weight"),a=Rt("tracking"),s=Rt("leading"),i=Rt("breakpoint"),o=Rt("container"),c=Rt("spacing"),d=Rt("radius"),f=Rt("shadow"),v=Rt("inset-shadow"),h=Rt("drop-shadow"),m=Rt("blur"),g=Rt("perspective"),y=Rt("aspect"),E=Rt("ease"),S=Rt("animate"),b=()=>["auto","avoid","all","avoid-page","page","left","right","column"],O=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],z=()=>["auto","hidden","clip","visible","scroll"],M=()=>["auto","contain","none"],T=()=>[Me,De,c],R=()=>[yn,"full","auto",...T()],I=()=>[Jr,"none","subgrid",Me,De],K=()=>["auto",{span:["full",Jr,Me,De]},Me,De],W=()=>[Jr,"auto",Me,De],J=()=>["auto","min","max","fr",Me,De],j=()=>["start","end","center","between","around","evenly","stretch","baseline"],N=()=>["start","end","center","stretch"],P=()=>["auto",...T()],x=()=>[yn,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...T()],w=()=>[t,Me,De],F=()=>[zo,Zr],C=()=>["","none","full",d,Me,De],D=()=>["",it,Sa,Zr],H=()=>["solid","dashed","dotted","double"],Y=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],X=()=>["","none",m,Me,De],Z=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",Me,De],Q=()=>["none",it,Me,De],pe=()=>["none",it,Me,De],ae=()=>[it,Me,De],te=()=>[yn,"full",...T()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Nr],breakpoint:[Nr],color:[yp],container:[Nr],"drop-shadow":[Nr],ease:["in","out","in-out"],font:[Sp],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Nr],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Nr],shadow:[Nr],spacing:["px",it],text:[Nr],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",yn,De,Me,y]}],container:["container"],columns:[{columns:[it,De,Me,o]}],"break-after":[{"break-after":b()}],"break-before":[{"break-before":b()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...O(),De,Me]}],overflow:[{overflow:z()}],"overflow-x":[{"overflow-x":z()}],"overflow-y":[{"overflow-y":z()}],overscroll:[{overscroll:M()}],"overscroll-x":[{"overscroll-x":M()}],"overscroll-y":[{"overscroll-y":M()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:R()}],"inset-x":[{"inset-x":R()}],"inset-y":[{"inset-y":R()}],start:[{start:R()}],end:[{end:R()}],top:[{top:R()}],right:[{right:R()}],bottom:[{bottom:R()}],left:[{left:R()}],visibility:["visible","invisible","collapse"],z:[{z:[Jr,"auto",Me,De]}],basis:[{basis:[yn,"full","auto",o,...T()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[it,yn,"auto","initial","none",De]}],grow:[{grow:["",it,Me,De]}],shrink:[{shrink:["",it,Me,De]}],order:[{order:[Jr,"first","last","none",Me,De]}],"grid-cols":[{"grid-cols":I()}],"col-start-end":[{col:K()}],"col-start":[{"col-start":W()}],"col-end":[{"col-end":W()}],"grid-rows":[{"grid-rows":I()}],"row-start-end":[{row:K()}],"row-start":[{"row-start":W()}],"row-end":[{"row-end":W()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":J()}],"auto-rows":[{"auto-rows":J()}],gap:[{gap:T()}],"gap-x":[{"gap-x":T()}],"gap-y":[{"gap-y":T()}],"justify-content":[{justify:[...j(),"normal"]}],"justify-items":[{"justify-items":[...N(),"normal"]}],"justify-self":[{"justify-self":["auto",...N()]}],"align-content":[{content:["normal",...j()]}],"align-items":[{items:[...N(),"baseline"]}],"align-self":[{self:["auto",...N(),"baseline"]}],"place-content":[{"place-content":j()}],"place-items":[{"place-items":[...N(),"baseline"]}],"place-self":[{"place-self":["auto",...N()]}],p:[{p:T()}],px:[{px:T()}],py:[{py:T()}],ps:[{ps:T()}],pe:[{pe:T()}],pt:[{pt:T()}],pr:[{pr:T()}],pb:[{pb:T()}],pl:[{pl:T()}],m:[{m:P()}],mx:[{mx:P()}],my:[{my:P()}],ms:[{ms:P()}],me:[{me:P()}],mt:[{mt:P()}],mr:[{mr:P()}],mb:[{mb:P()}],ml:[{ml:P()}],"space-x":[{"space-x":T()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":T()}],"space-y-reverse":["space-y-reverse"],size:[{size:x()}],w:[{w:[o,"screen",...x()]}],"min-w":[{"min-w":[o,"screen","none",...x()]}],"max-w":[{"max-w":[o,"screen","none","prose",{screen:[i]},...x()]}],h:[{h:["screen",...x()]}],"min-h":[{"min-h":["screen","none",...x()]}],"max-h":[{"max-h":["screen",...x()]}],"font-size":[{text:["base",r,Sa,Zr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[n,Me,Pi]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",zo,De]}],"font-family":[{font:[Cp,De,e]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[a,Me,De]}],"line-clamp":[{"line-clamp":[it,"none",Me,Pi]}],leading:[{leading:[s,...T()]}],"list-image":[{"list-image":["none",Me,De]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Me,De]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:w()}],"text-color":[{text:w()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...H(),"wavy"]}],"text-decoration-thickness":[{decoration:[it,"from-font","auto",Me,Zr]}],"text-decoration-color":[{decoration:w()}],"underline-offset":[{"underline-offset":[it,"auto",Me,De]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:T()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Me,De]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Me,De]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...O(),Tp,Pp]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",Fp,kp]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Jr,Me,De],radial:["",Me,De],conic:[Jr,Me,De]},Rp,Ap]}],"bg-color":[{bg:w()}],"gradient-from-pos":[{from:F()}],"gradient-via-pos":[{via:F()}],"gradient-to-pos":[{to:F()}],"gradient-from":[{from:w()}],"gradient-via":[{via:w()}],"gradient-to":[{to:w()}],rounded:[{rounded:C()}],"rounded-s":[{"rounded-s":C()}],"rounded-e":[{"rounded-e":C()}],"rounded-t":[{"rounded-t":C()}],"rounded-r":[{"rounded-r":C()}],"rounded-b":[{"rounded-b":C()}],"rounded-l":[{"rounded-l":C()}],"rounded-ss":[{"rounded-ss":C()}],"rounded-se":[{"rounded-se":C()}],"rounded-ee":[{"rounded-ee":C()}],"rounded-es":[{"rounded-es":C()}],"rounded-tl":[{"rounded-tl":C()}],"rounded-tr":[{"rounded-tr":C()}],"rounded-br":[{"rounded-br":C()}],"rounded-bl":[{"rounded-bl":C()}],"border-w":[{border:D()}],"border-w-x":[{"border-x":D()}],"border-w-y":[{"border-y":D()}],"border-w-s":[{"border-s":D()}],"border-w-e":[{"border-e":D()}],"border-w-t":[{"border-t":D()}],"border-w-r":[{"border-r":D()}],"border-w-b":[{"border-b":D()}],"border-w-l":[{"border-l":D()}],"divide-x":[{"divide-x":D()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":D()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...H(),"hidden","none"]}],"divide-style":[{divide:[...H(),"hidden","none"]}],"border-color":[{border:w()}],"border-color-x":[{"border-x":w()}],"border-color-y":[{"border-y":w()}],"border-color-s":[{"border-s":w()}],"border-color-e":[{"border-e":w()}],"border-color-t":[{"border-t":w()}],"border-color-r":[{"border-r":w()}],"border-color-b":[{"border-b":w()}],"border-color-l":[{"border-l":w()}],"divide-color":[{divide:w()}],"outline-style":[{outline:[...H(),"none","hidden"]}],"outline-offset":[{"outline-offset":[it,Me,De]}],"outline-w":[{outline:["",it,Sa,Zr]}],"outline-color":[{outline:[t]}],shadow:[{shadow:["","none",f,Op,Ep]}],"shadow-color":[{shadow:w()}],"inset-shadow":[{"inset-shadow":["none",Me,De,v]}],"inset-shadow-color":[{"inset-shadow":w()}],"ring-w":[{ring:D()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:w()}],"ring-offset-w":[{"ring-offset":[it,Zr]}],"ring-offset-color":[{"ring-offset":w()}],"inset-ring-w":[{"inset-ring":D()}],"inset-ring-color":[{"inset-ring":w()}],opacity:[{opacity:[it,Me,De]}],"mix-blend":[{"mix-blend":[...Y(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":Y()}],filter:[{filter:["","none",Me,De]}],blur:[{blur:X()}],brightness:[{brightness:[it,Me,De]}],contrast:[{contrast:[it,Me,De]}],"drop-shadow":[{"drop-shadow":["","none",h,Me,De]}],grayscale:[{grayscale:["",it,Me,De]}],"hue-rotate":[{"hue-rotate":[it,Me,De]}],invert:[{invert:["",it,Me,De]}],saturate:[{saturate:[it,Me,De]}],sepia:[{sepia:["",it,Me,De]}],"backdrop-filter":[{"backdrop-filter":["","none",Me,De]}],"backdrop-blur":[{"backdrop-blur":X()}],"backdrop-brightness":[{"backdrop-brightness":[it,Me,De]}],"backdrop-contrast":[{"backdrop-contrast":[it,Me,De]}],"backdrop-grayscale":[{"backdrop-grayscale":["",it,Me,De]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[it,Me,De]}],"backdrop-invert":[{"backdrop-invert":["",it,Me,De]}],"backdrop-opacity":[{"backdrop-opacity":[it,Me,De]}],"backdrop-saturate":[{"backdrop-saturate":[it,Me,De]}],"backdrop-sepia":[{"backdrop-sepia":["",it,Me,De]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":T()}],"border-spacing-x":[{"border-spacing-x":T()}],"border-spacing-y":[{"border-spacing-y":T()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Me,De]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[it,"initial",Me,De]}],ease:[{ease:["linear","initial",E,Me,De]}],delay:[{delay:[it,Me,De]}],animate:[{animate:["none",S,Me,De]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[g,Me,De]}],"perspective-origin":[{"perspective-origin":Z()}],rotate:[{rotate:Q()}],"rotate-x":[{"rotate-x":Q()}],"rotate-y":[{"rotate-y":Q()}],"rotate-z":[{"rotate-z":Q()}],scale:[{scale:pe()}],"scale-x":[{"scale-x":pe()}],"scale-y":[{"scale-y":pe()}],"scale-z":[{"scale-z":pe()}],"scale-3d":["scale-3d"],skew:[{skew:ae()}],"skew-x":[{"skew-x":ae()}],"skew-y":[{"skew-y":ae()}],transform:[{transform:[Me,De,"","none","gpu","cpu"]}],"transform-origin":[{origin:Z()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:te()}],"translate-x":[{"translate-x":te()}],"translate-y":[{"translate-y":te()}],"translate-z":[{"translate-z":te()}],"translate-none":["translate-none"],accent:[{accent:w()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:w()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Me,De]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":T()}],"scroll-mx":[{"scroll-mx":T()}],"scroll-my":[{"scroll-my":T()}],"scroll-ms":[{"scroll-ms":T()}],"scroll-me":[{"scroll-me":T()}],"scroll-mt":[{"scroll-mt":T()}],"scroll-mr":[{"scroll-mr":T()}],"scroll-mb":[{"scroll-mb":T()}],"scroll-ml":[{"scroll-ml":T()}],"scroll-p":[{"scroll-p":T()}],"scroll-px":[{"scroll-px":T()}],"scroll-py":[{"scroll-py":T()}],"scroll-ps":[{"scroll-ps":T()}],"scroll-pe":[{"scroll-pe":T()}],"scroll-pt":[{"scroll-pt":T()}],"scroll-pr":[{"scroll-pr":T()}],"scroll-pb":[{"scroll-pb":T()}],"scroll-pl":[{"scroll-pl":T()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Me,De]}],fill:[{fill:["none",...w()]}],"stroke-w":[{stroke:[it,Sa,Zr,Pi]}],stroke:[{stroke:["none",...w()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},zp=(t,{cacheSize:e,prefix:r,experimentalParseClassName:n,extend:a={},override:s={}})=>(Qn(t,"cacheSize",e),Qn(t,"prefix",r),Qn(t,"experimentalParseClassName",n),ka(t.theme,s.theme),ka(t.classGroups,s.classGroups),ka(t.conflictingClassGroups,s.conflictingClassGroups),ka(t.conflictingClassGroupModifiers,s.conflictingClassGroupModifiers),Qn(t,"orderSensitiveModifiers",s.orderSensitiveModifiers),Pa(t.theme,a.theme),Pa(t.classGroups,a.classGroups),Pa(t.conflictingClassGroups,a.conflictingClassGroups),Pa(t.conflictingClassGroupModifiers,a.conflictingClassGroupModifiers),$c(t,a,"orderSensitiveModifiers"),t),Qn=(t,e,r)=>{r!==void 0&&(t[e]=r)},ka=(t,e)=>{if(e)for(const r in e)Qn(t,r,e[r])},Pa=(t,e)=>{if(e)for(const r in e)$c(t,e,r)},$c=(t,e,r)=>{const n=e[r];n!==void 0&&(t[r]=t[r]?t[r].concat(n):n)},Bp=(t,...e)=>typeof t=="function"?Gi(Wi,t,...e):Gi(()=>zp(Wi(),t),...e),Up=Gi(Wi);var jp={twMerge:!0,twMergeConfig:{},responsiveVariants:!1},qc=t=>t||void 0,sa=(...t)=>qc(Rc(t).filter(Boolean).join(" ")),Ai=null,kr={},Hi=!1,Wn=(...t)=>e=>e.twMerge?((!Ai||Hi)&&(Hi=!1,Ai=jt(kr)?Up:Bp({...kr,extend:{theme:kr.theme,classGroups:kr.classGroups,conflictingClassGroupModifiers:kr.conflictingClassGroupModifiers,conflictingClassGroups:kr.conflictingClassGroups,...kr.extend}})),qc(Ai(sa(t)))):sa(t),Bo=(t,e)=>{for(let r in e)t.hasOwnProperty(r)?t[r]=sa(t[r],e[r]):t[r]=e[r];return t},fi=(t,e)=>{let{extend:r=null,slots:n={},variants:a={},compoundVariants:s=[],compoundSlots:i=[],defaultVariants:o={}}=t,c={...jp,...e},d=r!=null&&r.base?sa(r.base,t?.base):t?.base,f=r!=null&&r.variants&&!jt(r.variants)?Ic(a,r.variants):a,v=r!=null&&r.defaultVariants&&!jt(r.defaultVariants)?{...r.defaultVariants,...o}:o;!jt(c.twMergeConfig)&&!Zf(c.twMergeConfig,kr)&&(Hi=!0,kr=c.twMergeConfig);let h=jt(r?.slots),m=jt(n)?{}:{base:sa(t?.base,h&&r?.base),...n},g=h?m:Bo({...r?.slots},jt(m)?{base:t?.base}:m),y=jt(r?.compoundVariants)?s:Oc(r?.compoundVariants,s),E=b=>{if(jt(f)&&jt(n)&&h)return Wn(d,b?.class,b?.className)(c);if(y&&!Array.isArray(y))throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof y}`);if(i&&!Array.isArray(i))throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof i}`);let O=(j,N,P=[],x)=>{let w=P;if(typeof N=="string")w=w.concat(Do(N).split(" ").map(F=>`${j}:${F}`));else if(Array.isArray(N))w=w.concat(N.reduce((F,C)=>F.concat(`${j}:${C}`),[]));else if(typeof N=="object"&&typeof x=="string"){for(let F in N)if(N.hasOwnProperty(F)&&F===x){let C=N[F];if(C&&typeof C=="string"){let D=Do(C);w[x]?w[x]=w[x].concat(D.split(" ").map(H=>`${j}:${H}`)):w[x]=D.split(" ").map(H=>`${j}:${H}`)}else Array.isArray(C)&&C.length>0&&(w[x]=C.reduce((D,H)=>D.concat(`${j}:${H}`),[]))}}return w},z=(j,N=f,P=null,x=null)=>{var w;let F=N[j];if(!F||jt(F))return null;let C=(w=x?.[j])!=null?w:b?.[j];if(C===null)return null;let D=No(C),H=Array.isArray(c.responsiveVariants)&&c.responsiveVariants.length>0||c.responsiveVariants===!0,Y=v?.[j],X=[];if(typeof D=="object"&&H)for(let[pe,ae]of Object.entries(D)){let te=F[ae];if(pe==="initial"){Y=ae;continue}Array.isArray(c.responsiveVariants)&&!c.responsiveVariants.includes(pe)||(X=O(pe,te,X,P))}let Z=D!=null&&typeof D!="object"?D:No(Y),Q=F[Z||"false"];return typeof X=="object"&&typeof P=="string"&&X[P]?Bo(X,Q):X.length>0?(X.push(Q),P==="base"?X.join(" "):X):Q},M=()=>f?Object.keys(f).map(j=>z(j,f)):null,T=(j,N)=>{if(!f||typeof f!="object")return null;let P=new Array;for(let x in f){let w=z(x,f,j,N),F=j==="base"&&typeof w=="string"?w:w&&w[j];F&&(P[P.length]=F)}return P},R={};for(let j in b)b[j]!==void 0&&(R[j]=b[j]);let I=(j,N)=>{var P;let x=typeof b?.[j]=="object"?{[j]:(P=b[j])==null?void 0:P.initial}:{};return{...v,...R,...x,...N}},K=(j=[],N)=>{let P=[];for(let{class:x,className:w,...F}of j){let C=!0;for(let[D,H]of Object.entries(F)){let Y=I(D,N)[D];if(Array.isArray(H)){if(!H.includes(Y)){C=!1;break}}else{let X=Z=>Z==null||Z===!1;if(X(H)&&X(Y))continue;if(Y!==H){C=!1;break}}}C&&(x&&P.push(x),w&&P.push(w))}return P},W=j=>{let N=K(y,j);if(!Array.isArray(N))return N;let P={};for(let x of N)if(typeof x=="string"&&(P.base=Wn(P.base,x)(c)),typeof x=="object")for(let[w,F]of Object.entries(x))P[w]=Wn(P[w],F)(c);return P},J=j=>{if(i.length<1)return null;let N={};for(let{slots:P=[],class:x,className:w,...F}of i){if(!jt(F)){let C=!0;for(let D of Object.keys(F)){let H=I(D,j)[D];if(H===void 0||(Array.isArray(F[D])?!F[D].includes(H):F[D]!==H)){C=!1;break}}if(!C)continue}for(let C of P)N[C]=N[C]||[],N[C].push([x,w])}return N};if(!jt(n)||!h){let j={};if(typeof g=="object"&&!jt(g))for(let N of Object.keys(g))j[N]=P=>{var x,w;return Wn(g[N],T(N,P),((x=W(P))!=null?x:[])[N],((w=J(P))!=null?w:[])[N],P?.class,P?.className)(c)};return j}return Wn(d,M(),K(y),b?.class,b?.className)(c)},S=()=>{if(!(!f||typeof f!="object"))return Object.keys(f)};return E.variantKeys=S(),E.extend=r,E.base=d,E.slots=g,E.variants=f,E.defaultVariants=v,E.compoundSlots=i,E.compoundVariants=y,E};const Cs="-",$p=t=>{const e=Vp(t),{conflictingClassGroups:r,conflictingClassGroupModifiers:n}=t;return{getClassGroupId:i=>{const o=i.split(Cs);return o[0]===""&&o.length!==1&&o.shift(),Vc(o,e)||qp(i)},getConflictingClassGroupIds:(i,o)=>{const c=r[i]||[];return o&&n[i]?[...c,...n[i]]:c}}},Vc=(t,e)=>{if(t.length===0)return e.classGroupId;const r=t[0],n=e.nextPart.get(r),a=n?Vc(t.slice(1),n):void 0;if(a)return a;if(e.validators.length===0)return;const s=t.join(Cs);return e.validators.find(({validator:i})=>i(s))?.classGroupId},Uo=/^\[(.+)\]$/,qp=t=>{if(Uo.test(t)){const e=Uo.exec(t)[1],r=e?.substring(0,e.indexOf(":"));if(r)return"arbitrary.."+r}},Vp=t=>{const{theme:e,classGroups:r}=t,n={nextPart:new Map,validators:[]};for(const a in r)Yi(r[a],n,a,e);return n},Yi=(t,e,r,n)=>{t.forEach(a=>{if(typeof a=="string"){const s=a===""?e:jo(e,a);s.classGroupId=r;return}if(typeof a=="function"){if(Gp(a)){Yi(a(n),e,r,n);return}e.validators.push({validator:a,classGroupId:r});return}Object.entries(a).forEach(([s,i])=>{Yi(i,jo(e,s),r,n)})})},jo=(t,e)=>{let r=t;return e.split(Cs).forEach(n=>{r.nextPart.has(n)||r.nextPart.set(n,{nextPart:new Map,validators:[]}),r=r.nextPart.get(n)}),r},Gp=t=>t.isThemeGetter,Wp=t=>{if(t<1)return{get:()=>{},set:()=>{}};let e=0,r=new Map,n=new Map;const a=(s,i)=>{r.set(s,i),e++,e>t&&(e=0,n=r,r=new Map)};return{get(s){let i=r.get(s);if(i!==void 0)return i;if((i=n.get(s))!==void 0)return a(s,i),i},set(s,i){r.has(s)?r.set(s,i):a(s,i)}}},Ki="!",Xi=":",Hp=Xi.length,Yp=t=>{const{prefix:e,experimentalParseClassName:r}=t;let n=a=>{const s=[];let i=0,o=0,c=0,d;for(let g=0;g<a.length;g++){let y=a[g];if(i===0&&o===0){if(y===Xi){s.push(a.slice(c,g)),c=g+Hp;continue}if(y==="/"){d=g;continue}}y==="["?i++:y==="]"?i--:y==="("?o++:y===")"&&o--}const f=s.length===0?a:a.substring(c),v=Kp(f),h=v!==f,m=d&&d>c?d-c:void 0;return{modifiers:s,hasImportantModifier:h,baseClassName:v,maybePostfixModifierPosition:m}};if(e){const a=e+Xi,s=n;n=i=>i.startsWith(a)?s(i.substring(a.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:i,maybePostfixModifierPosition:void 0}}if(r){const a=n;n=s=>r({className:s,parseClassName:a})}return n},Kp=t=>t.endsWith(Ki)?t.substring(0,t.length-1):t.startsWith(Ki)?t.substring(1):t,Xp=t=>{const e=Object.fromEntries(t.orderSensitiveModifiers.map(n=>[n,!0]));return n=>{if(n.length<=1)return n;const a=[];let s=[];return n.forEach(i=>{i[0]==="["||e[i]?(a.push(...s.sort(),i),s=[]):s.push(i)}),a.push(...s.sort()),a}},Qp=t=>({cache:Wp(t.cacheSize),parseClassName:Yp(t),sortModifiers:Xp(t),...$p(t)}),Jp=/\s+/,Zp=(t,e)=>{const{parseClassName:r,getClassGroupId:n,getConflictingClassGroupIds:a,sortModifiers:s}=e,i=[],o=t.trim().split(Jp);let c="";for(let d=o.length-1;d>=0;d-=1){const f=o[d],{isExternal:v,modifiers:h,hasImportantModifier:m,baseClassName:g,maybePostfixModifierPosition:y}=r(f);if(v){c=f+(c.length>0?" "+c:c);continue}let E=!!y,S=n(E?g.substring(0,y):g);if(!S){if(!E){c=f+(c.length>0?" "+c:c);continue}if(S=n(g),!S){c=f+(c.length>0?" "+c:c);continue}E=!1}const b=s(h).join(":"),O=m?b+Ki:b,z=O+S;if(i.includes(z))continue;i.push(z);const M=a(S,E);for(let T=0;T<M.length;++T){const R=M[T];i.push(O+R)}c=f+(c.length>0?" "+c:c)}return c};function ev(){let t=0,e,r,n="";for(;t<arguments.length;)(e=arguments[t++])&&(r=Gc(e))&&(n&&(n+=" "),n+=r);return n}const Gc=t=>{if(typeof t=="string")return t;let e,r="";for(let n=0;n<t.length;n++)t[n]&&(e=Gc(t[n]))&&(r&&(r+=" "),r+=e);return r};function tv(t,...e){let r,n,a,s=i;function i(c){const d=e.reduce((f,v)=>v(f),t());return r=Qp(d),n=r.cache.get,a=r.cache.set,s=o,o(c)}function o(c){const d=n(c);if(d)return d;const f=Zp(c,r);return a(c,f),f}return function(){return s(ev.apply(null,arguments))}}const Et=t=>{const e=r=>r[t]||[];return e.isThemeGetter=!0,e},Wc=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Hc=/^\((?:(\w[\w-]*):)?(.+)\)$/i,rv=/^\d+\/\d+$/,nv=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,av=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,iv=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,sv=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ov=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,bn=t=>rv.test(t),rt=t=>!!t&&!Number.isNaN(Number(t)),Dr=t=>!!t&&Number.isInteger(Number(t)),Ei=t=>t.endsWith("%")&&rt(t.slice(0,-1)),Sr=t=>nv.test(t),lv=()=>!0,cv=t=>av.test(t)&&!iv.test(t),Yc=()=>!1,dv=t=>sv.test(t),uv=t=>ov.test(t),fv=t=>!Ie(t)&&!Ne(t),pv=t=>Mn(t,Qc,Yc),Ie=t=>Wc.test(t),en=t=>Mn(t,Jc,cv),Ci=t=>Mn(t,_v,rt),$o=t=>Mn(t,Kc,Yc),vv=t=>Mn(t,Xc,uv),Aa=t=>Mn(t,Zc,dv),Ne=t=>Hc.test(t),Hn=t=>Ln(t,Jc),mv=t=>Ln(t,yv),qo=t=>Ln(t,Kc),hv=t=>Ln(t,Qc),gv=t=>Ln(t,Xc),Ea=t=>Ln(t,Zc,!0),Mn=(t,e,r)=>{const n=Wc.exec(t);return n?n[1]?e(n[1]):r(n[2]):!1},Ln=(t,e,r=!1)=>{const n=Hc.exec(t);return n?n[1]?e(n[1]):r:!1},Kc=t=>t==="position"||t==="percentage",Xc=t=>t==="image"||t==="url",Qc=t=>t==="length"||t==="size"||t==="bg-size",Jc=t=>t==="length",_v=t=>t==="number",yv=t=>t==="family-name",Zc=t=>t==="shadow",bv=()=>{const t=Et("color"),e=Et("font"),r=Et("text"),n=Et("font-weight"),a=Et("tracking"),s=Et("leading"),i=Et("breakpoint"),o=Et("container"),c=Et("spacing"),d=Et("radius"),f=Et("shadow"),v=Et("inset-shadow"),h=Et("text-shadow"),m=Et("drop-shadow"),g=Et("blur"),y=Et("perspective"),E=Et("aspect"),S=Et("ease"),b=Et("animate"),O=()=>["auto","avoid","all","avoid-page","page","left","right","column"],z=()=>["center","top","bottom","left","right","top-left","left-top","top-right","right-top","bottom-right","right-bottom","bottom-left","left-bottom"],M=()=>[...z(),Ne,Ie],T=()=>["auto","hidden","clip","visible","scroll"],R=()=>["auto","contain","none"],I=()=>[Ne,Ie,c],K=()=>[bn,"full","auto",...I()],W=()=>[Dr,"none","subgrid",Ne,Ie],J=()=>["auto",{span:["full",Dr,Ne,Ie]},Dr,Ne,Ie],j=()=>[Dr,"auto",Ne,Ie],N=()=>["auto","min","max","fr",Ne,Ie],P=()=>["start","end","center","between","around","evenly","stretch","baseline","center-safe","end-safe"],x=()=>["start","end","center","stretch","center-safe","end-safe"],w=()=>["auto",...I()],F=()=>[bn,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...I()],C=()=>[t,Ne,Ie],D=()=>[...z(),qo,$o,{position:[Ne,Ie]}],H=()=>["no-repeat",{repeat:["","x","y","space","round"]}],Y=()=>["auto","cover","contain",hv,pv,{size:[Ne,Ie]}],X=()=>[Ei,Hn,en],Z=()=>["","none","full",d,Ne,Ie],Q=()=>["",rt,Hn,en],pe=()=>["solid","dashed","dotted","double"],ae=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],te=()=>[rt,Ei,qo,$o],Fe=()=>["","none",g,Ne,Ie],ue=()=>["none",rt,Ne,Ie],le=()=>["none",rt,Ne,Ie],re=()=>[rt,Ne,Ie],de=()=>[bn,"full",...I()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[Sr],breakpoint:[Sr],color:[lv],container:[Sr],"drop-shadow":[Sr],ease:["in","out","in-out"],font:[fv],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[Sr],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[Sr],shadow:[Sr],spacing:["px",rt],text:[Sr],"text-shadow":[Sr],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",bn,Ie,Ne,E]}],container:["container"],columns:[{columns:[rt,Ie,Ne,o]}],"break-after":[{"break-after":O()}],"break-before":[{"break-before":O()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:M()}],overflow:[{overflow:T()}],"overflow-x":[{"overflow-x":T()}],"overflow-y":[{"overflow-y":T()}],overscroll:[{overscroll:R()}],"overscroll-x":[{"overscroll-x":R()}],"overscroll-y":[{"overscroll-y":R()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:K()}],"inset-x":[{"inset-x":K()}],"inset-y":[{"inset-y":K()}],start:[{start:K()}],end:[{end:K()}],top:[{top:K()}],right:[{right:K()}],bottom:[{bottom:K()}],left:[{left:K()}],visibility:["visible","invisible","collapse"],z:[{z:[Dr,"auto",Ne,Ie]}],basis:[{basis:[bn,"full","auto",o,...I()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[rt,bn,"auto","initial","none",Ie]}],grow:[{grow:["",rt,Ne,Ie]}],shrink:[{shrink:["",rt,Ne,Ie]}],order:[{order:[Dr,"first","last","none",Ne,Ie]}],"grid-cols":[{"grid-cols":W()}],"col-start-end":[{col:J()}],"col-start":[{"col-start":j()}],"col-end":[{"col-end":j()}],"grid-rows":[{"grid-rows":W()}],"row-start-end":[{row:J()}],"row-start":[{"row-start":j()}],"row-end":[{"row-end":j()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":N()}],"auto-rows":[{"auto-rows":N()}],gap:[{gap:I()}],"gap-x":[{"gap-x":I()}],"gap-y":[{"gap-y":I()}],"justify-content":[{justify:[...P(),"normal"]}],"justify-items":[{"justify-items":[...x(),"normal"]}],"justify-self":[{"justify-self":["auto",...x()]}],"align-content":[{content:["normal",...P()]}],"align-items":[{items:[...x(),{baseline:["","last"]}]}],"align-self":[{self:["auto",...x(),{baseline:["","last"]}]}],"place-content":[{"place-content":P()}],"place-items":[{"place-items":[...x(),"baseline"]}],"place-self":[{"place-self":["auto",...x()]}],p:[{p:I()}],px:[{px:I()}],py:[{py:I()}],ps:[{ps:I()}],pe:[{pe:I()}],pt:[{pt:I()}],pr:[{pr:I()}],pb:[{pb:I()}],pl:[{pl:I()}],m:[{m:w()}],mx:[{mx:w()}],my:[{my:w()}],ms:[{ms:w()}],me:[{me:w()}],mt:[{mt:w()}],mr:[{mr:w()}],mb:[{mb:w()}],ml:[{ml:w()}],"space-x":[{"space-x":I()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":I()}],"space-y-reverse":["space-y-reverse"],size:[{size:F()}],w:[{w:[o,"screen",...F()]}],"min-w":[{"min-w":[o,"screen","none",...F()]}],"max-w":[{"max-w":[o,"screen","none","prose",{screen:[i]},...F()]}],h:[{h:["screen","lh",...F()]}],"min-h":[{"min-h":["screen","lh","none",...F()]}],"max-h":[{"max-h":["screen","lh",...F()]}],"font-size":[{text:["base",r,Hn,en]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[n,Ne,Ci]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Ei,Ie]}],"font-family":[{font:[mv,Ie,e]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[a,Ne,Ie]}],"line-clamp":[{"line-clamp":[rt,"none",Ne,Ci]}],leading:[{leading:[s,...I()]}],"list-image":[{"list-image":["none",Ne,Ie]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",Ne,Ie]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:C()}],"text-color":[{text:C()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...pe(),"wavy"]}],"text-decoration-thickness":[{decoration:[rt,"from-font","auto",Ne,en]}],"text-decoration-color":[{decoration:C()}],"underline-offset":[{"underline-offset":[rt,"auto",Ne,Ie]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:I()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",Ne,Ie]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],wrap:[{wrap:["break-word","anywhere","normal"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",Ne,Ie]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:D()}],"bg-repeat":[{bg:H()}],"bg-size":[{bg:Y()}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},Dr,Ne,Ie],radial:["",Ne,Ie],conic:[Dr,Ne,Ie]},gv,vv]}],"bg-color":[{bg:C()}],"gradient-from-pos":[{from:X()}],"gradient-via-pos":[{via:X()}],"gradient-to-pos":[{to:X()}],"gradient-from":[{from:C()}],"gradient-via":[{via:C()}],"gradient-to":[{to:C()}],rounded:[{rounded:Z()}],"rounded-s":[{"rounded-s":Z()}],"rounded-e":[{"rounded-e":Z()}],"rounded-t":[{"rounded-t":Z()}],"rounded-r":[{"rounded-r":Z()}],"rounded-b":[{"rounded-b":Z()}],"rounded-l":[{"rounded-l":Z()}],"rounded-ss":[{"rounded-ss":Z()}],"rounded-se":[{"rounded-se":Z()}],"rounded-ee":[{"rounded-ee":Z()}],"rounded-es":[{"rounded-es":Z()}],"rounded-tl":[{"rounded-tl":Z()}],"rounded-tr":[{"rounded-tr":Z()}],"rounded-br":[{"rounded-br":Z()}],"rounded-bl":[{"rounded-bl":Z()}],"border-w":[{border:Q()}],"border-w-x":[{"border-x":Q()}],"border-w-y":[{"border-y":Q()}],"border-w-s":[{"border-s":Q()}],"border-w-e":[{"border-e":Q()}],"border-w-t":[{"border-t":Q()}],"border-w-r":[{"border-r":Q()}],"border-w-b":[{"border-b":Q()}],"border-w-l":[{"border-l":Q()}],"divide-x":[{"divide-x":Q()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":Q()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...pe(),"hidden","none"]}],"divide-style":[{divide:[...pe(),"hidden","none"]}],"border-color":[{border:C()}],"border-color-x":[{"border-x":C()}],"border-color-y":[{"border-y":C()}],"border-color-s":[{"border-s":C()}],"border-color-e":[{"border-e":C()}],"border-color-t":[{"border-t":C()}],"border-color-r":[{"border-r":C()}],"border-color-b":[{"border-b":C()}],"border-color-l":[{"border-l":C()}],"divide-color":[{divide:C()}],"outline-style":[{outline:[...pe(),"none","hidden"]}],"outline-offset":[{"outline-offset":[rt,Ne,Ie]}],"outline-w":[{outline:["",rt,Hn,en]}],"outline-color":[{outline:C()}],shadow:[{shadow:["","none",f,Ea,Aa]}],"shadow-color":[{shadow:C()}],"inset-shadow":[{"inset-shadow":["none",v,Ea,Aa]}],"inset-shadow-color":[{"inset-shadow":C()}],"ring-w":[{ring:Q()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:C()}],"ring-offset-w":[{"ring-offset":[rt,en]}],"ring-offset-color":[{"ring-offset":C()}],"inset-ring-w":[{"inset-ring":Q()}],"inset-ring-color":[{"inset-ring":C()}],"text-shadow":[{"text-shadow":["none",h,Ea,Aa]}],"text-shadow-color":[{"text-shadow":C()}],opacity:[{opacity:[rt,Ne,Ie]}],"mix-blend":[{"mix-blend":[...ae(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ae()}],"mask-clip":[{"mask-clip":["border","padding","content","fill","stroke","view"]},"mask-no-clip"],"mask-composite":[{mask:["add","subtract","intersect","exclude"]}],"mask-image-linear-pos":[{"mask-linear":[rt]}],"mask-image-linear-from-pos":[{"mask-linear-from":te()}],"mask-image-linear-to-pos":[{"mask-linear-to":te()}],"mask-image-linear-from-color":[{"mask-linear-from":C()}],"mask-image-linear-to-color":[{"mask-linear-to":C()}],"mask-image-t-from-pos":[{"mask-t-from":te()}],"mask-image-t-to-pos":[{"mask-t-to":te()}],"mask-image-t-from-color":[{"mask-t-from":C()}],"mask-image-t-to-color":[{"mask-t-to":C()}],"mask-image-r-from-pos":[{"mask-r-from":te()}],"mask-image-r-to-pos":[{"mask-r-to":te()}],"mask-image-r-from-color":[{"mask-r-from":C()}],"mask-image-r-to-color":[{"mask-r-to":C()}],"mask-image-b-from-pos":[{"mask-b-from":te()}],"mask-image-b-to-pos":[{"mask-b-to":te()}],"mask-image-b-from-color":[{"mask-b-from":C()}],"mask-image-b-to-color":[{"mask-b-to":C()}],"mask-image-l-from-pos":[{"mask-l-from":te()}],"mask-image-l-to-pos":[{"mask-l-to":te()}],"mask-image-l-from-color":[{"mask-l-from":C()}],"mask-image-l-to-color":[{"mask-l-to":C()}],"mask-image-x-from-pos":[{"mask-x-from":te()}],"mask-image-x-to-pos":[{"mask-x-to":te()}],"mask-image-x-from-color":[{"mask-x-from":C()}],"mask-image-x-to-color":[{"mask-x-to":C()}],"mask-image-y-from-pos":[{"mask-y-from":te()}],"mask-image-y-to-pos":[{"mask-y-to":te()}],"mask-image-y-from-color":[{"mask-y-from":C()}],"mask-image-y-to-color":[{"mask-y-to":C()}],"mask-image-radial":[{"mask-radial":[Ne,Ie]}],"mask-image-radial-from-pos":[{"mask-radial-from":te()}],"mask-image-radial-to-pos":[{"mask-radial-to":te()}],"mask-image-radial-from-color":[{"mask-radial-from":C()}],"mask-image-radial-to-color":[{"mask-radial-to":C()}],"mask-image-radial-shape":[{"mask-radial":["circle","ellipse"]}],"mask-image-radial-size":[{"mask-radial":[{closest:["side","corner"],farthest:["side","corner"]}]}],"mask-image-radial-pos":[{"mask-radial-at":z()}],"mask-image-conic-pos":[{"mask-conic":[rt]}],"mask-image-conic-from-pos":[{"mask-conic-from":te()}],"mask-image-conic-to-pos":[{"mask-conic-to":te()}],"mask-image-conic-from-color":[{"mask-conic-from":C()}],"mask-image-conic-to-color":[{"mask-conic-to":C()}],"mask-mode":[{mask:["alpha","luminance","match"]}],"mask-origin":[{"mask-origin":["border","padding","content","fill","stroke","view"]}],"mask-position":[{mask:D()}],"mask-repeat":[{mask:H()}],"mask-size":[{mask:Y()}],"mask-type":[{"mask-type":["alpha","luminance"]}],"mask-image":[{mask:["none",Ne,Ie]}],filter:[{filter:["","none",Ne,Ie]}],blur:[{blur:Fe()}],brightness:[{brightness:[rt,Ne,Ie]}],contrast:[{contrast:[rt,Ne,Ie]}],"drop-shadow":[{"drop-shadow":["","none",m,Ea,Aa]}],"drop-shadow-color":[{"drop-shadow":C()}],grayscale:[{grayscale:["",rt,Ne,Ie]}],"hue-rotate":[{"hue-rotate":[rt,Ne,Ie]}],invert:[{invert:["",rt,Ne,Ie]}],saturate:[{saturate:[rt,Ne,Ie]}],sepia:[{sepia:["",rt,Ne,Ie]}],"backdrop-filter":[{"backdrop-filter":["","none",Ne,Ie]}],"backdrop-blur":[{"backdrop-blur":Fe()}],"backdrop-brightness":[{"backdrop-brightness":[rt,Ne,Ie]}],"backdrop-contrast":[{"backdrop-contrast":[rt,Ne,Ie]}],"backdrop-grayscale":[{"backdrop-grayscale":["",rt,Ne,Ie]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[rt,Ne,Ie]}],"backdrop-invert":[{"backdrop-invert":["",rt,Ne,Ie]}],"backdrop-opacity":[{"backdrop-opacity":[rt,Ne,Ie]}],"backdrop-saturate":[{"backdrop-saturate":[rt,Ne,Ie]}],"backdrop-sepia":[{"backdrop-sepia":["",rt,Ne,Ie]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":I()}],"border-spacing-x":[{"border-spacing-x":I()}],"border-spacing-y":[{"border-spacing-y":I()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",Ne,Ie]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[rt,"initial",Ne,Ie]}],ease:[{ease:["linear","initial",S,Ne,Ie]}],delay:[{delay:[rt,Ne,Ie]}],animate:[{animate:["none",b,Ne,Ie]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[y,Ne,Ie]}],"perspective-origin":[{"perspective-origin":M()}],rotate:[{rotate:ue()}],"rotate-x":[{"rotate-x":ue()}],"rotate-y":[{"rotate-y":ue()}],"rotate-z":[{"rotate-z":ue()}],scale:[{scale:le()}],"scale-x":[{"scale-x":le()}],"scale-y":[{"scale-y":le()}],"scale-z":[{"scale-z":le()}],"scale-3d":["scale-3d"],skew:[{skew:re()}],"skew-x":[{"skew-x":re()}],"skew-y":[{"skew-y":re()}],transform:[{transform:[Ne,Ie,"","none","gpu","cpu"]}],"transform-origin":[{origin:M()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:de()}],"translate-x":[{"translate-x":de()}],"translate-y":[{"translate-y":de()}],"translate-z":[{"translate-z":de()}],"translate-none":["translate-none"],accent:[{accent:C()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:C()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",Ne,Ie]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":I()}],"scroll-mx":[{"scroll-mx":I()}],"scroll-my":[{"scroll-my":I()}],"scroll-ms":[{"scroll-ms":I()}],"scroll-me":[{"scroll-me":I()}],"scroll-mt":[{"scroll-mt":I()}],"scroll-mr":[{"scroll-mr":I()}],"scroll-mb":[{"scroll-mb":I()}],"scroll-ml":[{"scroll-ml":I()}],"scroll-p":[{"scroll-p":I()}],"scroll-px":[{"scroll-px":I()}],"scroll-py":[{"scroll-py":I()}],"scroll-ps":[{"scroll-ps":I()}],"scroll-pe":[{"scroll-pe":I()}],"scroll-pt":[{"scroll-pt":I()}],"scroll-pr":[{"scroll-pr":I()}],"scroll-pb":[{"scroll-pb":I()}],"scroll-pl":[{"scroll-pl":I()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",Ne,Ie]}],fill:[{fill:["none",...C()]}],"stroke-w":[{stroke:[rt,Hn,en,Ci]}],stroke:[{stroke:["none",...C()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-x","border-w-y","border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-x","border-color-y","border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["*","**","after","backdrop","before","details-content","file","first-letter","first-line","marker","placeholder","selection"]}},xv=tv(bv),wv={id:"data-summary",title:"Random Data Summary",description:"Generate comprehensive summary statistics for the uploaded random_data.parquet file.",filename:"random_data_summary.py",dependencies:[{type:"uploaded",sourceId:"random_data"}],content:`import pandas as pd
import numpy as np
import os

def summarize_random_data():
    """Generate summary statistics for random_data.parquet."""
    file_path = "/data/random_data.parquet"
    
    try:
        # Check if the specific file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            print("Please upload random_data.parquet using the 'Random Data File' upload.")
            return None
            
        # Read the parquet file
        print(f"Loading: {file_path}")
        df = pd.read_parquet(file_path)
        
        # Basic info
        print(f"\\nDataset Shape: {df.shape}")
        print(f"Memory Usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        print("\\n" + "="*50)
        
        # Column information
        print("COLUMN INFORMATION")
        print("="*50)
        print(f"Total columns: {len(df.columns)}")
        print(f"Column names: {list(df.columns)}")
        
        # Data types
        print("\\n" + "="*30)
        print("DATA TYPES")
        print("="*30)
        for col, dtype in df.dtypes.items():
            print(f"{col}: {dtype}")
        
        # Summary statistics for numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            print("\\n" + "="*40)
            print("NUMERIC SUMMARY STATISTICS")
            print("="*40)
            print(df[numeric_cols].describe())
        
        # Missing values check
        print("\\n" + "="*30)
        print("MISSING VALUES")
        print("="*30)
        missing = df.isnull().sum()
        total_missing = missing.sum()
        if total_missing > 0:
            print(f"Total missing values: {total_missing}")
            for col, count in missing[missing > 0].items():
                print(f"  {col}: {count} missing ({count/len(df)*100:.1f}%)")
        else:
            print("✓ No missing values found!")
        
        # Sample data preview
        print("\\n" + "="*30)
        print("DATA PREVIEW (First 5 rows)")
        print("="*30)
        print(df.head())
        
        # Final summary
        print("\\n" + "="*50)
        print("ANALYSIS SUMMARY")
        print("="*50)
        print(f"✓ Successfully analyzed random_data.parquet")
        print(f"✓ Rows: {len(df):,}")
        print(f"✓ Columns: {len(df.columns)}")
        print(f"✓ Numeric columns: {len(numeric_cols)}")
        print(f"✓ Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        print(f"✓ Missing values: {total_missing:,}")
        
        # Create summary dataframe and save as parquet
        print("\\n" + "="*40)
        print("GENERATING SUMMARY REPORT")
        print("="*40)
        
        # Create comprehensive summary data with proper typing
        summary_data = {
            'metric': [],
            'numeric_value': [],
            'text_value': [],
            'description': []
        }
        
        # Add basic statistics
        basic_stats = [
            ('total_rows', len(df), None, 'Total number of rows in dataset'),
            ('total_columns', len(df.columns), None, 'Total number of columns in dataset'),
            ('numeric_columns', len(numeric_cols), None, 'Number of numeric columns'),
            ('memory_usage_mb', round(df.memory_usage(deep=True).sum() / 1024**2, 2), None, 'Memory usage in megabytes'),
            ('missing_values', int(total_missing), None, 'Total missing values across all columns')
        ]
        
        for metric, num_val, text_val, desc in basic_stats:
            summary_data['metric'].append(metric)
            summary_data['numeric_value'].append(num_val)
            summary_data['text_value'].append(text_val)
            summary_data['description'].append(desc)
        
        # Add column-specific statistics
        for col in df.columns:
            col_data = df[col]
            dtype_str = str(col_data.dtype)
            missing_count = int(col_data.isnull().sum())
            
            # Basic column info
            summary_data['metric'].append(f'column_{col}_type')
            summary_data['numeric_value'].append(None)
            summary_data['text_value'].append(dtype_str)
            summary_data['description'].append(f'Data type of column: {col}')
            
            summary_data['metric'].append(f'column_{col}_missing')
            summary_data['numeric_value'].append(missing_count)
            summary_data['text_value'].append(None)
            summary_data['description'].append(f'Missing values in column: {col}')
            
            # For numeric columns, add statistical measures
            if col in numeric_cols:
                stats = [
                    (f'column_{col}_mean', round(float(col_data.mean()), 4), f'Mean value of column: {col}'),
                    (f'column_{col}_std', round(float(col_data.std()), 4), f'Standard deviation of column: {col}'),
                    (f'column_{col}_min', round(float(col_data.min()), 4), f'Minimum value of column: {col}'),
                    (f'column_{col}_max', round(float(col_data.max()), 4), f'Maximum value of column: {col}')
                ]
                
                for metric, value, desc in stats:
                    summary_data['metric'].append(metric)
                    summary_data['numeric_value'].append(value)
                    summary_data['text_value'].append(None)
                    summary_data['description'].append(desc)
        
        # Create summary DataFrame with proper types
        summary_df = pd.DataFrame(summary_data)
        
        # Save summary as parquet file
        output_path = "/data/random_data_summary_report.parquet"
        summary_df.to_parquet(output_path, index=False)
        print(f"✓ Summary report saved to: {output_path}")
        print(f"✓ Report contains {len(summary_df)} metrics")
        
        return {
            'rows': len(df),
            'columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'memory_mb': df.memory_usage(deep=True).sum() / 1024**2,
            'missing_values': total_missing,
            'summary_report_path': output_path,
            'summary_metrics': len(summary_df)
        }
        
    except Exception as e:
        import traceback
        print(f"Error analyzing random_data.parquet: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the analysis
print("Random Data Analysis Script")
print("="*60)
result = summarize_random_data()

if result:
    print("\\n🎉 Analysis completed successfully!")
else:
    print("\\n❌ Analysis failed. Check error messages above.")`,category:"analysis"},Sv={id:"data-visualization",title:"Data Visualization",description:"Create an HTML visualization report with interactive charts and data analysis.",filename:"data_visualization.py",dependencies:[{type:"uploaded",sourceId:"random_data"}],content:`import pandas as pd
import numpy as np
import os

def create_html_visualization_report(file_path):
    """Create an HTML visualization report for the dataset."""
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None
            
        # Read the data
        if file_path.endswith('.parquet'):
            df = pd.read_parquet(file_path)
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.gpkg'):
            import geopandas as gpd
            gdf = gpd.read_file(file_path)
            # Convert to regular DataFrame for analysis (drop geometry)
            df = gdf.drop(columns=['geometry']) if 'geometry' in gdf.columns else gdf
        else:
            raise ValueError("Unsupported file format. Please use .parquet, .csv, or .gpkg files.")
        
        print(f"Creating HTML visualization report for: {os.path.basename(file_path)}")
        print("="*60)
        
        # Basic dataset info
        print(f"Dataset shape: {df.shape}")
        print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        
        # Analyze columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        
        # Generate HTML content
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Visualization Report - {os.path.basename(file_path)}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }}
        .container {{
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }}
        h2 {{
            color: #34495e;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .stat-card {{
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }}
        .stat-card:hover {{
            transform: translateY(-5px);
        }}
        .stat-number {{
            font-size: 2em;
            font-weight: bold;
            display: block;
        }}
        .stat-label {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .data-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }}
        .data-table th {{
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        .data-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
        }}
        .data-table tr:hover {{
            background: #f8f9fa;
        }}
        .chart-placeholder {{
            background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 10px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        .correlation-matrix {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 2px solid #e9ecef;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            color: #6c757d;
            font-style: italic;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Data Visualization Report</h1>
        <p style="text-align: center; font-size: 1.2em; color: #6c757d;">
            Analysis of <strong>{os.path.basename(file_path)}</strong>
        </p>
        
        <h2>📈 Dataset Overview</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">{len(df):,}</span>
                <span class="stat-label">Total Rows</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(df.columns)}</span>
                <span class="stat-label">Total Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(numeric_cols)}</span>
                <span class="stat-label">Numeric Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{df.memory_usage(deep=True).sum() / 1024**2:.1f} MB</span>
                <span class="stat-label">Memory Usage</span>
            </div>
        </div>
        
        <h2>📋 Column Information</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Column Name</th>
                    <th>Data Type</th>
                    <th>Non-Null Count</th>
                    <th>Null Count</th>
                    <th>Null %</th>
                </tr>
            </thead>
            <tbody>"""

        # Add column information
        for col in df.columns:
            non_null = df[col].count()
            null_count = df[col].isnull().sum()
            null_pct = (null_count / len(df)) * 100
            html_content += f"""
                <tr>
                    <td><strong>{col}</strong></td>
                    <td>{str(df[col].dtype)}</td>
                    <td>{non_null:,}</td>
                    <td>{null_count:,}</td>
                    <td>{null_pct:.1f}%</td>
                </tr>"""

        html_content += """
            </tbody>
        </table>"""

        # Add numeric statistics if we have numeric columns
        if len(numeric_cols) > 0:
            html_content += """
        <h2>🔢 Numeric Column Statistics</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Column</th>
                    <th>Mean</th>
                    <th>Std Dev</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Outliers</th>
                </tr>
            </thead>
            <tbody>"""

            for col in numeric_cols:
                mean_val = df[col].mean()
                std_val = df[col].std()
                min_val = df[col].min()
                max_val = df[col].max()
                
                # Calculate outliers using IQR method
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                outliers = ((df[col] < (Q1 - 1.5 * IQR)) | (df[col] > (Q3 + 1.5 * IQR))).sum()
                
                html_content += f"""
                <tr>
                    <td><strong>{col}</strong></td>
                    <td>{mean_val:.2f}</td>
                    <td>{std_val:.2f}</td>
                    <td>{min_val:.2f}</td>
                    <td>{max_val:.2f}</td>
                    <td>{outliers} ({outliers/len(df)*100:.1f}%)</td>
                </tr>"""

            html_content += """
            </tbody>
        </table>"""

        # Add correlation analysis
        if len(numeric_cols) > 1:
            corr_matrix = df[numeric_cols].corr()
            html_content += """
        <h2>🔗 Correlation Analysis</h2>
        <div class="correlation-matrix">
            <h3>Correlation Matrix (Numeric Columns)</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Column</th>"""
            
            for col in numeric_cols:
                html_content += f"<th>{col}</th>"
            
            html_content += """
                    </tr>
                </thead>
                <tbody>"""
            
            for i, col1 in enumerate(numeric_cols):
                html_content += f"<tr><td><strong>{col1}</strong></td>"
                for j, col2 in enumerate(numeric_cols):
                    corr_val = corr_matrix.iloc[i, j]
                    color_intensity = abs(corr_val)
                    if corr_val > 0:
                        bg_color = f"background: rgba(52, 152, 219, {color_intensity}); color: {'white' if color_intensity > 0.5 else 'black'};"
                    else:
                        bg_color = f"background: rgba(231, 76, 60, {color_intensity}); color: {'white' if color_intensity > 0.5 else 'black'};"
                    html_content += f'<td style="{bg_color}">{corr_val:.3f}</td>'
                html_content += "</tr>"
            
            html_content += """
                </tbody>
            </table>
        </div>"""

        # Add data preview
        html_content += f"""
        <h2>👀 Data Preview (First 10 Rows)</h2>
        <table class="data-table">
            <thead>
                <tr>"""
        
        for col in df.columns:
            html_content += f"<th>{col}</th>"
        
        html_content += """
                </tr>
            </thead>
            <tbody>"""
        
        for _, row in df.head(10).iterrows():
            html_content += "<tr>"
            for val in row:
                if pd.isna(val):
                    html_content += "<td style='color: #999; font-style: italic;'>null</td>"
                else:
                    html_content += f"<td>{val}</td>"
            html_content += "</tr>"

        # Add placeholder for future charts
        html_content += f"""
            </tbody>
        </table>
        
        <h2>📊 Interactive Charts</h2>
        <div class="chart-placeholder">
            <h3>🚀 Chart Area</h3>
            <p>This area is ready for interactive charts!</p>
            <p>Future enhancements could include:</p>
            <ul style="text-align: left; display: inline-block;">
                <li>Histograms for numeric columns</li>
                <li>Box plots for outlier visualization</li>
                <li>Scatter plots for correlation analysis</li>
                <li>Bar charts for categorical data</li>
                <li>Interactive filters and selections</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Report generated on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Dataset: {os.path.basename(file_path)} | Rows: {len(df):,} | Columns: {len(df.columns)}</p>
        </div>
    </div>
</body>
</html>"""

        # Save HTML file
        output_path = "/data/data_visualization_report.html"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ HTML visualization report saved: {output_path}")
        print(f"✓ Report includes {len(df.columns)} columns and {len(df):,} rows")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        if len(numeric_cols) > 1:
            print(f"✓ Generated correlation matrix")
        
        return {
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'categorical_columns': len(categorical_cols),
            'total_rows': len(df),
            'output_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and create visualizations for available data files
print("Looking for data files to visualize...")
data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv', '.gpkg'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Create visualization for the first file found
        file_path = os.path.join(data_dir, files[0])
        print(f"\\nCreating HTML visualization for: {files[0]}")
        print("="*60)
        
        result = create_html_visualization_report(file_path)
        if result:
            print(f"\\n🎉 HTML visualization report created successfully!")
            print(f"✓ File: data_visualization_report.html")
            print(f"✓ Analyzed {result['total_rows']:,} rows")
            print(f"✓ Processed {result['total_columns']} columns")
        else:
            print("\\n❌ Failed to create visualization report")
    else:
        print("No .parquet, .csv, or .gpkg files found in /data directory")
        print("Please upload a data file first!")
else:
    print("No /data directory found. Please upload some data files first!")
    print("Tip: Upload parquet files using the file upload feature")`,category:"visualization"},kv={id:"data-cleaning",title:"Data Cleaning & Preprocessing",description:"Clean and preprocess data by handling missing values, outliers, and data type conversions.",filename:"data_cleaning.py",dependencies:[{type:"uploaded",sourceId:"random_data"}],content:`import pandas as pd
import numpy as np
import os

def clean_data(file_path, output_path=None):
    """Clean and preprocess a dataset."""
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None
            
        # Read the data
        is_geopackage = False
        original_gdf = None
        
        if file_path.endswith('.parquet'):
            df = pd.read_parquet(file_path)
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.gpkg'):
            import geopandas as gpd
            gdf = gpd.read_file(file_path)
            is_geopackage = True
            original_gdf = gdf.copy()  # Keep original for geometry restoration
            # Convert to regular DataFrame for cleaning (drop geometry temporarily)
            df = gdf.drop(columns=['geometry']) if 'geometry' in gdf.columns else gdf
        else:
            raise ValueError("Unsupported file format. Please use .parquet, .csv, or .gpkg files.")
        
        print(f"Original dataset shape: {df.shape}")
        original_rows = len(df)
        
        # 1. Handle missing values
        print("\\nHandling missing values...")
        missing_before = df.isnull().sum().sum()
        
        # Fill numeric columns with median
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if df[col].isnull().sum() > 0:
                median_val = df[col].median()
                df[col].fillna(median_val, inplace=True)
                print(f"  Filled {col} missing values with median: {median_val:.2f}")
        
        # Fill categorical columns with mode
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if df[col].isnull().sum() > 0:
                mode_value = df[col].mode()
                if len(mode_value) > 0:
                    df[col].fillna(mode_value[0], inplace=True)
                    print(f"  Filled {col} missing values with mode: {mode_value[0]}")
        
        missing_after = df.isnull().sum().sum()
        print(f"Missing values: {missing_before} → {missing_after}")
        
        # 2. Remove duplicates
        print("\\nRemoving duplicates...")
        duplicates_before = df.duplicated().sum()
        df = df.drop_duplicates()
        duplicates_removed = duplicates_before
        print(f"Duplicates removed: {duplicates_removed}")
        
        # 3. Handle outliers (using IQR method)
        print("\\nHandling outliers...")
        outliers_capped = 0
        for col in numeric_cols:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers_count = ((df[col] < lower_bound) | (df[col] > upper_bound)).sum()
            if outliers_count > 0:
                # Cap outliers instead of removing them
                df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)
                outliers_capped += outliers_count
                print(f"  Capped {outliers_count} outliers in {col}")
        
        print(f"Total outliers capped: {outliers_capped}")
        
        # 4. Data summary after cleaning
        print("\\nCleaned data summary:")
        print(f"Final shape: {df.shape}")
        memory_usage = df.memory_usage(deep=True).sum() / 1024**2
        print(f"Memory usage: {memory_usage:.2f} MB")
        
        # Save cleaned data if output path provided
        if output_path:
            if is_geopackage and original_gdf is not None:
                # Restore geometry to cleaned data
                import geopandas as gpd
                # Get the cleaned indices
                cleaned_indices = df.index
                # Get corresponding geometries from original
                geometries = original_gdf.loc[cleaned_indices, 'geometry'] if 'geometry' in original_gdf.columns else None
                
                if geometries is not None:
                    # Create new GeoDataFrame with cleaned data and original geometries
                    cleaned_gdf = gpd.GeoDataFrame(df, geometry=geometries, crs=original_gdf.crs)
                    # Save as GeoPackage
                    output_path = output_path.replace('.parquet', '.gpkg')
                    cleaned_gdf.to_file(output_path, driver='GPKG')
                    print(f"\\nCleaned GeoPackage saved to: {output_path}")
                else:
                    # No geometry, save as regular parquet
                    df.to_parquet(output_path, index=False)
                    print(f"\\nCleaned data saved to: {output_path}")
            else:
                # Regular DataFrame
                df.to_parquet(output_path, index=False)
                print(f"\\nCleaned data saved to: {output_path}")
        
        return {
            'original_rows': original_rows,
            'final_rows': len(df),
            'missing_values_fixed': missing_before - missing_after,
            'duplicates_removed': duplicates_removed,
            'outliers_capped': outliers_capped,
            'memory_usage_mb': memory_usage
        }
        
    except Exception as e:
        import traceback
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and clean available data files
print("Looking for data files to clean...")
data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv', '.gpkg'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Clean the first file found
        file_to_clean = os.path.join(data_dir, files[0])
        print(f"\\nCleaning: {files[0]}")
        print("="*60)
        
        # Create output filename
        base_name = os.path.splitext(files[0])[0]
        output_file = os.path.join(data_dir, f"{base_name}_cleaned.parquet")
        
        result = clean_data(file_to_clean, output_file)
        if result:
            print(f"\\nData cleaning complete for {files[0]}!")
            print(f"✓ Processed {result['final_rows']:,} rows")
            print(f"✓ Fixed {result['missing_values_fixed']} missing values")
            print(f"✓ Removed {result['duplicates_removed']} duplicates")
            print(f"✓ Capped {result['outliers_capped']} outliers")
    else:
        print("No .parquet, .csv, or .gpkg files found in /data directory")
else:
    print("No /data directory found. Please upload some data files first!")
    print("Tip: Upload parquet files using the file upload feature")`,category:"preprocessing"},Pv={id:"advanced-analysis",title:"Advanced Analysis Report",description:"Generate an advanced analysis report using the summary data from the Random Data Summary script.",filename:"advanced_analysis.py",dependencies:[{type:"uploaded",sourceId:"random_data"},{type:"result",sourceId:"data-summary"}],content:`import pandas as pd
import numpy as np
import os

def advanced_analysis():
    """Perform advanced analysis using both original data and summary report."""
    print("Advanced Analysis Report")
    print("=" * 60)
    
    # Load original data
    original_data_path = "/data/random_data.parquet"
    summary_data_path = "/data/random_data_summary_report.parquet"
    
    try:
        # Check if files exist
        if not os.path.exists(original_data_path):
            print(f"Original data not found: {original_data_path}")
            print("Please run 'Random Data Summary' script first or upload random_data.parquet")
            return None
            
        if not os.path.exists(summary_data_path):
            print(f"Summary report not found: {summary_data_path}")
            print("Please run 'Random Data Summary' script first to generate random_data_summary_report.parquet")
            return None
        
        # Load both datasets
        print("Loading datasets...")
        df_original = pd.read_parquet(original_data_path)
        df_summary = pd.read_parquet(summary_data_path)
        
        print(f"✓ Original data shape: {df_original.shape}")
        print(f"✓ Summary report metrics: {len(df_summary)} entries")
        
        # Extract key metrics from summary
        print("\\nExtracting key metrics from summary...")
        metrics = {}
        for _, row in df_summary.iterrows():
            if row['numeric_value'] is not None:
                metrics[row['metric']] = row['numeric_value']
        
        # Perform advanced analysis
        print("\\nAdvanced Analysis:")
        print("-" * 40)
        
        # Data quality assessment
        total_rows = metrics.get('total_rows', len(df_original))
        missing_values = metrics.get('missing_values', 0)
        data_quality_score = max(0, (total_rows - missing_values) / total_rows * 100)
        
        print(f"Data Quality Score: {data_quality_score:.1f}%")
        print(f"  - Total rows: {total_rows:,}")
        print(f"  - Missing values: {missing_values:,}")
        print(f"  - Completeness: {((total_rows - missing_values) / total_rows * 100):.1f}%")
        
        # Analyze numeric columns from original data
        numeric_cols = df_original.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            print(f"\\nNumeric Analysis ({len(numeric_cols)} columns):")
            
            # Calculate coefficient of variation for each numeric column
            cv_analysis = {}
            for col in numeric_cols:
                mean_val = df_original[col].mean()
                std_val = df_original[col].std()
                cv = (std_val / mean_val) * 100 if mean_val != 0 else 0
                cv_analysis[col] = cv
                print(f"  {col}: CV = {cv:.2f}% (variability)")
            
            # Find most and least variable columns
            if cv_analysis:
                most_variable = max(cv_analysis, key=cv_analysis.get)
                least_variable = min(cv_analysis, key=cv_analysis.get)
                print(f"\\n  Most variable: {most_variable} ({cv_analysis[most_variable]:.1f}%)")
                print(f"  Least variable: {least_variable} ({cv_analysis[least_variable]:.1f}%)")
        
        # Data distribution analysis
        print("\\nData Distribution Analysis:")
        if len(numeric_cols) > 0:
            for col in numeric_cols:
                col_data = df_original[col].dropna()
                if len(col_data) > 0:
                    skewness = col_data.skew()
                    kurtosis = col_data.kurtosis()
                    print(f"  {col}:")
                    print(f"    Skewness: {skewness:.3f} ({'right' if skewness > 0 else 'left' if skewness < 0 else 'symmetric'} skewed)")
                    print(f"    Kurtosis: {kurtosis:.3f} ({'heavy' if kurtosis > 0 else 'light'} tailed)")
        
        # Generate comprehensive report
        print("\\nGenerating comprehensive analysis report...")
        
        analysis_results = {
            'metric': [],
            'value': [],
            'description': [],
            'category': []
        }
        
        # Add quality metrics
        quality_metrics = [
            ('data_quality_score', data_quality_score, 'Overall data quality percentage', 'quality'),
            ('completeness_ratio', (total_rows - missing_values) / total_rows, 'Data completeness ratio', 'quality'),
            ('numeric_column_count', len(numeric_cols), 'Number of numeric columns', 'structure'),
            ('total_data_points', total_rows * len(df_original.columns), 'Total data points in dataset', 'structure')
        ]
        
        for metric, value, desc, category in quality_metrics:
            analysis_results['metric'].append(metric)
            analysis_results['value'].append(value)
            analysis_results['description'].append(desc)
            analysis_results['category'].append(category)
        
        # Add variability metrics
        if cv_analysis:
            for col, cv in cv_analysis.items():
                analysis_results['metric'].append(f'{col}_coefficient_of_variation')
                analysis_results['value'].append(cv)
                analysis_results['description'].append(f'Coefficient of variation for {col}')
                analysis_results['category'].append('variability')
        
        # Create final report DataFrame
        report_df = pd.DataFrame(analysis_results)
        
        # Save advanced analysis report
        output_path = "/data/advanced_analysis_report.parquet"
        report_df.to_parquet(output_path, index=False)
        
        print(f"\\n✓ Advanced analysis report saved: {output_path}")
        print(f"✓ Generated {len(report_df)} analysis metrics")
        
        # Summary
        print("\\n" + "=" * 60)
        print("ADVANCED ANALYSIS SUMMARY")
        print("=" * 60)
        print(f"✓ Data Quality Score: {data_quality_score:.1f}%")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        print(f"✓ Generated {len(report_df)} advanced metrics")
        if cv_analysis:
            print(f"✓ Most variable column: {most_variable}")
            print(f"✓ Least variable column: {least_variable}")
        
        return {
            'quality_score': data_quality_score,
            'metrics_generated': len(report_df),
            'numeric_columns_analyzed': len(numeric_cols),
            'report_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error in advanced analysis: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the advanced analysis
print("Starting Advanced Analysis...")
result = advanced_analysis()

if result:
    print("\\n🎉 Advanced analysis completed successfully!")
else:
    print("\\n❌ Advanced analysis failed. Check error messages above.")`,category:"analysis"},Av={id:"linear-regression",title:"Linear Regression Analysis",description:"Generate synthetic data and perform linear regression analysis using scikit-learn with comprehensive reporting.",filename:"linear_regression_analysis.py",content:`import pandas as pd
import numpy as np
import os
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_regression

def linear_regression_analysis():
    """Perform comprehensive linear regression analysis with generated data."""
    print("Linear Regression Analysis with Scikit-Learn")
    print("=" * 60)
    
    try:
        # Generate synthetic regression dataset
        print("Generating synthetic regression dataset...")
        X, y = make_regression(
            n_samples=1000,
            n_features=5,
            n_informative=3,
            noise=10,
            bias=50,
            random_state=42
        )
        
        # Create feature names
        feature_names = [f'feature_{i+1}' for i in range(X.shape[1])]
        
        # Create DataFrame
        df = pd.DataFrame(X, columns=feature_names)
        df['target'] = y
        
        print(f"✓ Generated dataset with {len(df)} samples and {X.shape[1]} features")
        print(f"✓ Target variable range: {y.min():.2f} to {y.max():.2f}")
        
        # Save the generated dataset
        dataset_path = "/data/regression_dataset.parquet"
        df.to_parquet(dataset_path, index=False)
        print(f"✓ Dataset saved to: {dataset_path}")
        
        # Dataset overview
        print("\\nDataset Overview:")
        print("-" * 30)
        print(f"Shape: {df.shape}")
        print(f"Features: {feature_names}")
        print(f"Target statistics:")
        print(f"  Mean: {y.mean():.2f}")
        print(f"  Std: {y.std():.2f}")
        print(f"  Min: {y.min():.2f}")
        print(f"  Max: {y.max():.2f}")
        
        # Prepare data for modeling
        print("\\nPreparing data for modeling...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        print(f"✓ Training set: {X_train.shape[0]} samples")
        print(f"✓ Test set: {X_test.shape[0]} samples")
        
        # Feature scaling (optional but good practice)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        # Train linear regression model
        print("\\nTraining Linear Regression model...")
        lr_model = LinearRegression()
        lr_model.fit(X_train_scaled, y_train)
        
        # Make predictions
        y_train_pred = lr_model.predict(X_train_scaled)
        y_test_pred = lr_model.predict(X_test_scaled)
        
        # Calculate metrics
        train_r2 = r2_score(y_train, y_train_pred)
        test_r2 = r2_score(y_test, y_test_pred)
        train_mse = mean_squared_error(y_train, y_train_pred)
        test_mse = mean_squared_error(y_test, y_test_pred)
        train_mae = mean_absolute_error(y_train, y_train_pred)
        test_mae = mean_absolute_error(y_test, y_test_pred)
        
        print("\\nModel Performance:")
        print("-" * 30)
        print(f"Training R²: {train_r2:.4f}")
        print(f"Test R²: {test_r2:.4f}")
        print(f"Training MSE: {train_mse:.2f}")
        print(f"Test MSE: {test_mse:.2f}")
        print(f"Training MAE: {train_mae:.2f}")
        print(f"Test MAE: {test_mae:.2f}")
        print(f"Overfitting check: {(train_r2 - test_r2):.4f} (should be small)")
        
        # Feature importance (coefficients)
        print("\\nFeature Importance (Coefficients):")
        print("-" * 40)
        coefficients = lr_model.coef_
        intercept = lr_model.intercept_
        
        print(f"Intercept: {intercept:.4f}")
        for i, (feature, coef) in enumerate(zip(feature_names, coefficients)):
            print(f"{feature}: {coef:.4f}")
        
        # Feature importance ranking
        abs_coefficients = np.abs(coefficients)
        feature_importance = list(zip(feature_names, abs_coefficients))
        feature_importance.sort(key=lambda x: x[1], reverse=True)
        
        print("\\nFeature Importance Ranking:")
        print("-" * 35)
        for i, (feature, importance) in enumerate(feature_importance):
            print(f"{i+1}. {feature}: {importance:.4f}")
        
        # Generate predictions for analysis
        print("\\nGenerating prediction analysis...")
        
        # Create predictions DataFrame
        predictions_df = pd.DataFrame({
            'actual': y_test,
            'predicted': y_test_pred,
            'residual': y_test - y_test_pred,
            'abs_residual': np.abs(y_test - y_test_pred)
        })
        
        # Add feature values for test set
        for i, feature in enumerate(feature_names):
            predictions_df[f'feature_{feature}'] = X_test_scaled[:, i]
        
        # Residual analysis
        residual_mean = predictions_df['residual'].mean()
        residual_std = predictions_df['residual'].std()
        
        print(f"Residual Analysis:")
        print(f"  Mean residual: {residual_mean:.4f} (should be close to 0)")
        print(f"  Residual std: {residual_std:.4f}")
        print(f"  Max absolute residual: {predictions_df['abs_residual'].max():.2f}")
        
        # Save predictions
        predictions_path = "/data/regression_predictions.parquet"
        predictions_df.to_parquet(predictions_path, index=False)
        print(f"✓ Predictions saved to: {predictions_path}")
        
        # Create comprehensive results report
        print("\\nGenerating comprehensive results report...")
        
        results_data = {
            'metric': [],
            'value': [],
            'description': [],
            'category': []
        }
        
        # Model performance metrics
        performance_metrics = [
            ('train_r2_score', train_r2, 'R-squared score on training data', 'performance'),
            ('test_r2_score', test_r2, 'R-squared score on test data', 'performance'),
            ('train_mse', train_mse, 'Mean squared error on training data', 'performance'),
            ('test_mse', test_mse, 'Mean squared error on test data', 'performance'),
            ('train_mae', train_mae, 'Mean absolute error on training data', 'performance'),
            ('test_mae', test_mae, 'Mean absolute error on test data', 'performance'),
            ('overfitting_score', train_r2 - test_r2, 'Training R² minus Test R² (overfitting indicator)', 'performance'),
            ('model_intercept', intercept, 'Linear regression intercept term', 'model_params')
        ]
        
        for metric, value, desc, category in performance_metrics:
            results_data['metric'].append(metric)
            results_data['value'].append(float(value))
            results_data['description'].append(desc)
            results_data['category'].append(category)
        
        # Feature coefficients
        for feature, coef in zip(feature_names, coefficients):
            results_data['metric'].append(f'coef_{feature}')
            results_data['value'].append(float(coef))
            results_data['description'].append(f'Linear regression coefficient for {feature}')
            results_data['category'].append('model_params')
        
        # Dataset statistics
        dataset_stats = [
            ('dataset_samples', len(df), 'Total number of samples in dataset', 'dataset'),
            ('dataset_features', X.shape[1], 'Number of input features', 'dataset'),
            ('train_samples', X_train.shape[0], 'Number of training samples', 'dataset'),
            ('test_samples', X_test.shape[0], 'Number of test samples', 'dataset'),
            ('target_mean', float(y.mean()), 'Mean of target variable', 'dataset'),
            ('target_std', float(y.std()), 'Standard deviation of target variable', 'dataset'),
            ('residual_mean', float(residual_mean), 'Mean of prediction residuals', 'residuals'),
            ('residual_std', float(residual_std), 'Standard deviation of prediction residuals', 'residuals')
        ]
        
        for metric, value, desc, category in dataset_stats:
            results_data['metric'].append(metric)
            results_data['value'].append(value)
            results_data['description'].append(desc)
            results_data['category'].append(category)
        
        # Create results DataFrame
        results_df = pd.DataFrame(results_data)
        
        # Save results report
        results_path = "/data/linear_regression_results.parquet"
        results_df.to_parquet(results_path, index=False)
        print(f"✓ Results report saved to: {results_path}")
        
        # Generate HTML report
        print("\\nGenerating HTML report...")
        
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linear Regression Analysis Report</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }}
        .container {{
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }}
        h2 {{
            color: #34495e;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }}
        .metrics-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .metric-card {{
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        .metric-number {{
            font-size: 1.8em;
            font-weight: bold;
            display: block;
        }}
        .metric-label {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .performance-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }}
        .performance-table th {{
            background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }}
        .performance-table td {{
            padding: 12px 15px;
            border-bottom: 1px solid #f0f0f0;
        }}
        .feature-importance {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            color: #6c757d;
            font-style: italic;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Linear Regression Analysis Report</h1>
        
        <h2>📊 Model Performance</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <span class="metric-number">{test_r2:.3f}</span>
                <span class="metric-label">Test R² Score</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{test_mse:.1f}</span>
                <span class="metric-label">Test MSE</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{test_mae:.1f}</span>
                <span class="metric-label">Test MAE</span>
            </div>
            <div class="metric-card">
                <span class="metric-number">{(train_r2 - test_r2):.3f}</span>
                <span class="metric-label">Overfitting Score</span>
            </div>
        </div>
        
        <h2>📈 Detailed Performance Metrics</h2>
        <table class="performance-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Training</th>
                    <th>Test</th>
                    <th>Interpretation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>R² Score</strong></td>
                    <td>{train_r2:.4f}</td>
                    <td>{test_r2:.4f}</td>
                    <td>{'Excellent' if test_r2 > 0.9 else 'Good' if test_r2 > 0.7 else 'Fair' if test_r2 > 0.5 else 'Poor'} fit</td>
                </tr>
                <tr>
                    <td><strong>MSE</strong></td>
                    <td>{train_mse:.2f}</td>
                    <td>{test_mse:.2f}</td>
                    <td>Lower is better</td>
                </tr>
                <tr>
                    <td><strong>MAE</strong></td>
                    <td>{train_mae:.2f}</td>
                    <td>{test_mae:.2f}</td>
                    <td>Average prediction error</td>
                </tr>
            </tbody>
        </table>
        
        <h2>🎯 Feature Importance</h2>
        <div class="feature-importance">
            <h3>Model Coefficients</h3>
            <p><strong>Intercept:</strong> {intercept:.4f}</p>
            <table class="performance-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Feature</th>
                        <th>Coefficient</th>
                        <th>Absolute Importance</th>
                    </tr>
                </thead>
                <tbody>"""
        
        for i, (feature, importance) in enumerate(feature_importance):
            coef_value = next(coef for f, coef in zip(feature_names, coefficients) if f == feature)
            html_content += f"""
                    <tr>
                        <td>{i+1}</td>
                        <td><strong>{feature}</strong></td>
                        <td>{coef_value:.4f}</td>
                        <td>{importance:.4f}</td>
                    </tr>"""
        
        html_content += f"""
                </tbody>
            </table>
        </div>
        
        <h2>📋 Dataset Information</h2>
        <table class="performance-table">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Total Samples</strong></td>
                    <td>{len(df):,}</td>
                    <td>Generated synthetic regression dataset</td>
                </tr>
                <tr>
                    <td><strong>Features</strong></td>
                    <td>{X.shape[1]}</td>
                    <td>Input variables for prediction</td>
                </tr>
                <tr>
                    <td><strong>Training Set</strong></td>
                    <td>{X_train.shape[0]:,} ({X_train.shape[0]/len(df)*100:.0f}%)</td>
                    <td>Data used for model training</td>
                </tr>
                <tr>
                    <td><strong>Test Set</strong></td>
                    <td>{X_test.shape[0]:,} ({X_test.shape[0]/len(df)*100:.0f}%)</td>
                    <td>Data used for model evaluation</td>
                </tr>
                <tr>
                    <td><strong>Target Range</strong></td>
                    <td>{y.min():.1f} to {y.max():.1f}</td>
                    <td>Range of values to predict</td>
                </tr>
            </tbody>
        </table>
        
        <h2>🔍 Model Diagnostics</h2>
        <div class="feature-importance">
            <h3>Residual Analysis</h3>
            <p><strong>Mean Residual:</strong> {residual_mean:.6f} (should be close to 0)</p>
            <p><strong>Residual Standard Deviation:</strong> {residual_std:.4f}</p>
            <p><strong>Max Absolute Error:</strong> {predictions_df['abs_residual'].max():.2f}</p>
            
            <h3>Model Quality Assessment</h3>
            <ul>
                <li><strong>Goodness of Fit:</strong> {'Excellent' if test_r2 > 0.9 else 'Good' if test_r2 > 0.7 else 'Fair' if test_r2 > 0.5 else 'Needs Improvement'} (R² = {test_r2:.3f})</li>
                <li><strong>Overfitting:</strong> {'Low' if abs(train_r2 - test_r2) < 0.05 else 'Moderate' if abs(train_r2 - test_r2) < 0.1 else 'High'} (difference = {abs(train_r2 - test_r2):.3f})</li>
                <li><strong>Residuals:</strong> {'Well-centered' if abs(residual_mean) < 0.1 else 'May have bias'}</li>
            </ul>
        </div>
        
        <div class="footer">
            <p>Linear Regression Analysis completed on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Generated using scikit-learn with synthetic regression data</p>
        </div>
    </div>
</body>
</html>"""
        
        # Save HTML report
        html_path = "/data/linear_regression_report.html"
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ HTML report saved to: {html_path}")
        
        # Final summary
        print("\\n" + "=" * 60)
        print("LINEAR REGRESSION ANALYSIS SUMMARY")
        print("=" * 60)
        print(f"✓ Dataset: {len(df):,} samples, {X.shape[1]} features")
        print(f"✓ Model Performance: R² = {test_r2:.3f}, MSE = {test_mse:.1f}")
        print(f"✓ Most important feature: {feature_importance[0][0]}")
        print(f"✓ Generated 3 output files:")
        print(f"  - Dataset: {dataset_path}")
        print(f"  - Predictions: {predictions_path}")
        print(f"  - Results: {results_path}")
        print(f"  - HTML Report: {html_path}")
        
        return {
            'r2_score': test_r2,
            'mse': test_mse,
            'mae': test_mae,
            'overfitting_score': train_r2 - test_r2,
            'most_important_feature': feature_importance[0][0],
            'dataset_size': len(df),
            'files_generated': 4
        }
        
    except Exception as e:
        import traceback
        print(f"Error in linear regression analysis: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        return None

# Execute the linear regression analysis
print("Starting Linear Regression Analysis with Scikit-Learn...")
result = linear_regression_analysis()

if result:
    print("\\n🎉 Linear regression analysis completed successfully!")
    print(f"✓ Model R² Score: {result['r2_score']:.3f}")
    print(f"✓ Generated {result['files_generated']} output files")
else:
    print("\\n❌ Linear regression analysis failed. Check error messages above.")`,category:"machine_learning"},Ev={id:"geopandas-test",title:"GeoPandas Test",description:"Test geopandas functionality progressively to identify issues.",filename:"geopandas_test.py",category:"Geospatial",content:`import fiona # Explicitly import fiona for geopandas I/O fallback
import fastparquet # For parquet suppport
import geopandas as gpd
import pandas as pd
import numpy as np
import os

def test_geopandas():
    """Test geopandas functionality progressively."""
    
    print("Testing GeoPandas functionality...")
    print(f"GeoPandas version: {gpd.__version__}")
    print(f"Fiona version: {fiona.__version__}")
    
    try:
        # Step 1: Basic data creation
        print("\\n1. Creating basic data structures...")
        n_points = 10  # Start small
        np.random.seed(42)
        
        lons = np.random.uniform(-122.5, -122.3, n_points)
        lats = np.random.uniform(37.7, 37.8, n_points)
        print(f"✓ Generated {n_points} coordinate pairs")
        
        # Step 2: Create WKT strings and convert to geometries
        print("\\n2. Creating geometry objects...")
        from shapely import wkt
        points_wkt = [f'POINT({lon} {lat})' for lon, lat in zip(lons, lats)]
        print(f"✓ Created {len(points_wkt)} WKT point strings")
        
        # Convert WKT to actual geometry objects
        geometries = [wkt.loads(point_wkt) for point_wkt in points_wkt]
        print(f"✓ Converted to {len(geometries)} Shapely geometry objects")
        
        # Step 3: Create basic data dictionary
        print("\\n3. Creating data dictionary...")
        point_data = {
            'id': range(1, n_points + 1),
            'name': [f'Location_{i}' for i in range(1, n_points + 1)],
            'geometry': geometries
        }
        print("✓ Created data dictionary with geometry column")
        
        # Step 4: Create GeoDataFrame (this might be where it hangs)
        print("\\n4. Creating GeoDataFrame...")
        gdf_points = gpd.GeoDataFrame(point_data, crs='EPSG:4326')
        print(f"✓ Created GeoDataFrame with {len(gdf_points)} features")
        print(f"✓ CRS: {gdf_points.crs}")
        
        # Step 5: Test basic operations
        print("\\n5. Testing basic operations...")
        print(f"✓ Shape: {gdf_points.shape}")
        print(f"✓ Columns: {list(gdf_points.columns)}")
        print(f"✓ Geometry column: {gdf_points.geometry.name}")
        
        # Step 6: Test simple export using fastparquet engine
        print("\\n6. Testing file export...")
        test_file = "/data/simple_test.parquet"
        gdf_points.to_parquet(test_file, engine='fastparquet')
        print(f"✓ Exported to: {test_file}")
        
        if os.path.exists(test_file):
            size_kb = os.path.getsize(test_file) / 1024
            print(f"✓ File size: {size_kb:.1f} KB")
        
        print("\\n✅ All GeoPandas operations completed successfully!")
        
    except Exception as e:
        print(f"❌ Error at step: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
        
    return True

# Run the test
if __name__ == "__main__":
    result = test_geopandas()
    print(f"\\nTest result: {'SUCCESS' if result else 'FAILED'}")
`},Cv={id:"error-test",title:"Error Reporting Test",description:"Test script that produces output and then encounters an error to verify improved error reporting in Live Output.",filename:"error_test.py",content:`# Error Reporting Test Script
print("Starting error test script...")
print("This output should be visible even when an error occurs.")

# Some normal Python operations
import pandas as pd
import numpy as np

print("Successfully imported libraries.")
print("Creating some test data...")

# Create some test data
data = {"numbers": [1, 2, 3, 4, 5], "letters": ["a", "b", "c", "d", "e"]}
df = pd.DataFrame(data)
print("Test DataFrame created:")
print(df)

print("About to cause an intentional error...")

# This will cause a NameError - intentional for testing
print(undefined_variable)  # This variable doesn't exist
`,category:"testing"},Tv={id:"matplotlib-demo",title:"Matplotlib Demo",description:"Create beautiful data visualizations using matplotlib with sample data.",filename:"matplotlib_demo.py",dependencies:[{type:"uploaded",sourceId:"random_data"}],content:`import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os
import io
import base64

# Set matplotlib to use a non-interactive backend
matplotlib.use('Agg')

def create_matplotlib_visualizations(file_path):
    """Create matplotlib visualizations and save them as HTML report."""
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None
            
        # Read the data
        if file_path.endswith('.parquet'):
            df = pd.read_parquet(file_path)
        elif file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.gpkg'):
            import geopandas as gpd
            gdf = gpd.read_file(file_path)
            # Convert to regular DataFrame for analysis (drop geometry)
            df = gdf.drop(columns=['geometry']) if 'geometry' in gdf.columns else gdf
        else:
            raise ValueError("Unsupported file format. Please use .parquet, .csv, or .gpkg files.")
        
        print(f"Creating matplotlib visualizations for: {os.path.basename(file_path)}")
        print("="*60)
        print(f"Dataset shape: {df.shape}")
        
        # Get numeric columns for plotting
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns
        
        print(f"Found {len(numeric_cols)} numeric columns: {list(numeric_cols)}")
        print(f"Found {len(categorical_cols)} categorical columns: {list(categorical_cols)}")
        
        # Function to convert matplotlib figure to base64 string
        def fig_to_base64(fig):
            img_buffer = io.BytesIO()
            fig.savefig(img_buffer, format='png', dpi=100, bbox_inches='tight', 
                       facecolor='white', edgecolor='none')
            img_buffer.seek(0)
            img_base64 = base64.b64encode(img_buffer.getvalue()).decode()
            plt.close(fig)  # Close figure to free memory
            return img_base64
        
        # Store chart images
        charts = {}
        
        # Chart 1: Summary statistics visualization
        print("\\nCreating Chart 1: Dataset Overview...")
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle(f'Dataset Overview: {os.path.basename(file_path)}', fontsize=16, fontweight='bold')
        
        # Basic stats
        stats = {
            'Total Rows': len(df),
            'Total Columns': len(df.columns),
            'Numeric Columns': len(numeric_cols),
            'Categorical Columns': len(categorical_cols)
        }
        
        ax1.bar(stats.keys(), stats.values(), color=['#3498db', '#e74c3c', '#2ecc71', '#f39c12'])
        ax1.set_title('Dataset Statistics', fontweight='bold')
        ax1.set_ylabel('Count')
        for i, v in enumerate(stats.values()):
            ax1.text(i, v + max(stats.values())*0.01, str(v), ha='center', va='bottom', fontweight='bold')
        
        # Memory usage by column type
        memory_info = df.memory_usage(deep=True)
        ax2.pie([memory_info[numeric_cols].sum(), memory_info[categorical_cols].sum()], 
                labels=['Numeric', 'Categorical'], autopct='%1.1f%%', 
                colors=['#3498db', '#e74c3c'])
        ax2.set_title('Memory Usage by Column Type', fontweight='bold')
        
        # Null values
        null_counts = df.isnull().sum()
        top_nulls = null_counts.nlargest(10)
        if len(top_nulls) > 0 and top_nulls.max() > 0:
            ax3.barh(range(len(top_nulls)), top_nulls.values, color='#e74c3c')
            ax3.set_yticks(range(len(top_nulls)))
            ax3.set_yticklabels(top_nulls.index)
            ax3.set_title('Top 10 Columns with Missing Values', fontweight='bold')
            ax3.set_xlabel('Number of Missing Values')
        else:
            ax3.text(0.5, 0.5, 'No Missing Values\\nDetected! 🎉', 
                    ha='center', va='center', transform=ax3.transAxes,
                    fontsize=14, fontweight='bold', color='#2ecc71')
            ax3.set_title('Missing Values Check', fontweight='bold')
        
        # Data types distribution
        dtype_counts = df.dtypes.value_counts()
        ax4.pie(dtype_counts.values, labels=dtype_counts.index, autopct='%1.1f%%',
                colors=plt.cm.Set3(np.linspace(0, 1, len(dtype_counts))))
        ax4.set_title('Data Types Distribution', fontweight='bold')
        
        plt.tight_layout()
        charts['overview'] = fig_to_base64(fig)
        
        # Chart 2: Numeric columns analysis (if available)
        if len(numeric_cols) > 0:
            print("Creating Chart 2: Numeric Columns Analysis...")
            n_cols = min(4, len(numeric_cols))  # Show up to 4 columns
            fig, axes = plt.subplots(2, n_cols, figsize=(4*n_cols, 8))
            if n_cols == 1:
                axes = axes.reshape(2, 1)
            elif len(axes.shape) == 1:
                axes = axes.reshape(1, -1)
            
            fig.suptitle('Numeric Columns Analysis', fontsize=16, fontweight='bold')
            
            for i, col in enumerate(numeric_cols[:n_cols]):
                # Histogram
                axes[0, i].hist(df[col].dropna(), bins=30, alpha=0.7, color='#3498db', edgecolor='black')
                axes[0, i].set_title(f'{col} - Distribution', fontweight='bold')
                axes[0, i].set_xlabel('Value')
                axes[0, i].set_ylabel('Frequency')
                
                # Box plot
                axes[1, i].boxplot(df[col].dropna(), patch_artist=True, 
                                  boxprops=dict(facecolor='#2ecc71', alpha=0.7))
                axes[1, i].set_title(f'{col} - Box Plot', fontweight='bold')
                axes[1, i].set_ylabel('Value')
                
                # Add statistics text
                stats_text = f'Mean: {df[col].mean():.2f}\\nStd: {df[col].std():.2f}\\nMin: {df[col].min():.2f}\\nMax: {df[col].max():.2f}'
                axes[0, i].text(0.02, 0.98, stats_text, transform=axes[0, i].transAxes, 
                               verticalalignment='top', bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
            
            plt.tight_layout()
            charts['numeric_analysis'] = fig_to_base64(fig)
        
        # Chart 3: Correlation heatmap (if we have multiple numeric columns)
        if len(numeric_cols) > 1:
            print("Creating Chart 3: Correlation Heatmap...")
            fig, ax = plt.subplots(figsize=(10, 8))
            
            # Calculate correlation matrix
            corr_matrix = df[numeric_cols].corr()
            
            # Create heatmap
            im = ax.imshow(corr_matrix, cmap='RdBu_r', aspect='auto', vmin=-1, vmax=1)
            
            # Set ticks and labels
            ax.set_xticks(range(len(numeric_cols)))
            ax.set_yticks(range(len(numeric_cols)))
            ax.set_xticklabels(numeric_cols, rotation=45, ha='right')
            ax.set_yticklabels(numeric_cols)
            
            # Add correlation values as text
            for i in range(len(numeric_cols)):
                for j in range(len(numeric_cols)):
                    text = ax.text(j, i, f'{corr_matrix.iloc[i, j]:.2f}',
                                 ha="center", va="center", color="black" if abs(corr_matrix.iloc[i, j]) < 0.5 else "white",
                                 fontweight='bold')
            
            ax.set_title("Correlation Matrix - Numeric Columns", fontsize=14, fontweight='bold', pad=20)
            
            # Add colorbar
            cbar = plt.colorbar(im, ax=ax)
            cbar.set_label('Correlation Coefficient', rotation=270, labelpad=20)
            
            plt.tight_layout()
            charts['correlation'] = fig_to_base64(fig)
        
        # Chart 4: Sample data visualization (scatter plot or line plot)
        if len(numeric_cols) >= 2:
            print("Creating Chart 4: Data Relationship Plot...")
            fig, ax = plt.subplots(figsize=(10, 6))
            
            col1, col2 = numeric_cols[0], numeric_cols[1]
            
            # Create scatter plot
            scatter = ax.scatter(df[col1], df[col2], alpha=0.6, c=range(len(df)), 
                               cmap='viridis', s=50, edgecolors='black', linewidth=0.5)
            
            ax.set_xlabel(col1, fontsize=12, fontweight='bold')
            ax.set_ylabel(col2, fontsize=12, fontweight='bold')
            ax.set_title(f'Relationship: {col1} vs {col2}', fontsize=14, fontweight='bold')
            
            # Add colorbar
            cbar = plt.colorbar(scatter, ax=ax)
            cbar.set_label('Data Point Index', rotation=270, labelpad=20)
            
            # Add trend line
            z = np.polyfit(df[col1].dropna(), df[col2].dropna(), 1)
            p = np.poly1d(z)
            ax.plot(df[col1], p(df[col1]), "r--", alpha=0.8, linewidth=2, label=f'Trend Line')
            ax.legend()
            
            plt.tight_layout()
            charts['relationship'] = fig_to_base64(fig)
        
        # Generate HTML report with embedded charts
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matplotlib Visualization Report - {os.path.basename(file_path)}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }}
        .container {{
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }}
        h2 {{
            color: #34495e;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 40px;
        }}
        .chart-container {{
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border: 2px solid #e9ecef;
        }}
        .chart-container img {{
            max-width: 100%;
            height: auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .stat-card {{
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }}
        .stat-number {{
            font-size: 2em;
            font-weight: bold;
            display: block;
        }}
        .stat-label {{
            font-size: 0.9em;
            opacity: 0.9;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            color: #6c757d;
            font-style: italic;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Matplotlib Visualization Report</h1>
        <p style="text-align: center; font-size: 1.2em; color: #6c757d;">
            Interactive data analysis of <strong>{os.path.basename(file_path)}</strong>
        </p>
        
        <h2>📈 Dataset Quick Stats</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-number">{len(df):,}</span>
                <span class="stat-label">Total Rows</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(df.columns)}</span>
                <span class="stat-label">Total Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{len(numeric_cols)}</span>
                <span class="stat-label">Numeric Columns</span>
            </div>
            <div class="stat-card">
                <span class="stat-number">{df.memory_usage(deep=True).sum() / 1024**2:.1f} MB</span>
                <span class="stat-label">Memory Usage</span>
            </div>
        </div>"""
        
        # Add charts to HTML
        if 'overview' in charts:
            html_content += f"""
        <h2>📋 Dataset Overview</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['overview']}" alt="Dataset Overview Chart">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Comprehensive overview showing dataset statistics, memory usage, missing values, and data types.
            </p>
        </div>"""
        
        if 'numeric_analysis' in charts:
            html_content += f"""
        <h2>🔢 Numeric Columns Analysis</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['numeric_analysis']}" alt="Numeric Analysis Chart">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Distribution histograms and box plots for numeric columns showing data spread and outliers.
            </p>
        </div>"""
        
        if 'correlation' in charts:
            html_content += f"""
        <h2>🔗 Correlation Analysis</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['correlation']}" alt="Correlation Heatmap">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Correlation heatmap showing relationships between numeric variables (blue = positive, red = negative).
            </p>
        </div>"""
        
        if 'relationship' in charts:
            html_content += f"""
        <h2>📈 Data Relationships</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{charts['relationship']}" alt="Relationship Plot">
            <p style="margin-top: 10px; color: #6c757d; font-size: 0.9em;">
                Scatter plot with trend line showing the relationship between two key variables.
            </p>
        </div>"""
        
        html_content += f"""
        <div class="footer">
            <p>Report generated using matplotlib on {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            <p>Dataset: {os.path.basename(file_path)} | Rows: {len(df):,} | Columns: {len(df.columns)} | Charts: {len(charts)}</p>
            <p>🎨 Powered by matplotlib, pandas, and numpy</p>
        </div>
    </div>
</body>
</html>"""
        
        # Save HTML file
        output_path = "/data/matplotlib_visualization_report.html"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✓ Matplotlib HTML report saved: {output_path}")
        print(f"✓ Generated {len(charts)} interactive charts")
        print(f"✓ Analyzed {len(numeric_cols)} numeric columns")
        print("✓ Charts include: dataset overview, distributions, correlations, and relationships")
        
        return {
            'total_columns': len(df.columns),
            'numeric_columns': len(numeric_cols),
            'categorical_columns': len(categorical_cols),
            'total_rows': len(df),
            'charts_generated': len(charts),
            'output_path': output_path
        }
        
    except Exception as e:
        import traceback
        print(f"Error creating matplotlib visualizations: {str(e)}")
        print(traceback.format_exc())
        return None

# Auto-detect and create matplotlib visualizations for available data files
print("🎨 Matplotlib Demo Script Starting...")
print("Looking for data files to visualize...")

data_dir = "/data"
if os.path.exists(data_dir):
    files = [f for f in os.listdir(data_dir) if f.endswith(('.parquet', '.csv', '.gpkg'))]
    if files:
        print(f"Found {len(files)} data file(s): {files}")
        
        # Create matplotlib visualizations for the first file found
        file_path = os.path.join(data_dir, files[0])
        print(f"\\nCreating matplotlib visualizations for: {files[0]}")
        print("="*60)
        
        result = create_matplotlib_visualizations(file_path)
        if result:
            print(f"\\n🎉 Matplotlib visualization report created successfully!")
            print(f"✓ File: matplotlib_visualization_report.html")
            print(f"✓ Analyzed {result['total_rows']:,} rows across {result['total_columns']} columns")
            print(f"✓ Generated {result['charts_generated']} beautiful charts")
            print("✓ Charts saved as embedded PNG images in HTML report")
        else:
            print("\\n❌ Failed to create matplotlib visualization report")
    else:
        print("No .parquet, .csv, or .gpkg files found in /data directory")
        print("Please upload a data file first to see matplotlib in action!")
        print("\\n🎨 Creating sample matplotlib demo instead...")
        
        # Create sample plots with synthetic data
        print("Generating sample data and plots...")
        
        # Create sample data
        np.random.seed(42)
        sample_data = {
            'x': np.linspace(0, 4*np.pi, 100),
            'y1': np.sin(np.linspace(0, 4*np.pi, 100)) + np.random.normal(0, 0.1, 100),
            'y2': np.cos(np.linspace(0, 4*np.pi, 100)) + np.random.normal(0, 0.1, 100),
            'category': np.random.choice(['A', 'B', 'C'], 100)
        }
        sample_df = pd.DataFrame(sample_data)
        
        # Create sample plots
        fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(12, 10))
        fig.suptitle('Matplotlib Demo - Sample Visualizations', fontsize=16, fontweight='bold')
        
        # Line plot
        ax1.plot(sample_df['x'], sample_df['y1'], 'b-', label='sin(x) + noise', linewidth=2)
        ax1.plot(sample_df['x'], sample_df['y2'], 'r-', label='cos(x) + noise', linewidth=2)
        ax1.set_title('Line Plot Demo', fontweight='bold')
        ax1.set_xlabel('X values')
        ax1.set_ylabel('Y values')
        ax1.legend()
        ax1.grid(True, alpha=0.3)
        
        # Scatter plot
        colors = {'A': 'red', 'B': 'blue', 'C': 'green'}
        for category in ['A', 'B', 'C']:
            mask = sample_df['category'] == category
            ax2.scatter(sample_df[mask]['y1'], sample_df[mask]['y2'], 
                       c=colors[category], label=f'Category {category}', alpha=0.7, s=50)
        ax2.set_title('Scatter Plot Demo', fontweight='bold')
        ax2.set_xlabel('Y1 values')
        ax2.set_ylabel('Y2 values')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        
        # Histogram
        ax3.hist(sample_df['y1'], bins=20, alpha=0.7, color='skyblue', edgecolor='black')
        ax3.set_title('Histogram Demo', fontweight='bold')
        ax3.set_xlabel('Y1 values')
        ax3.set_ylabel('Frequency')
        ax3.grid(True, alpha=0.3)
        
        # Bar plot
        category_counts = sample_df['category'].value_counts()
        ax4.bar(category_counts.index, category_counts.values, 
                color=['red', 'blue', 'green'], alpha=0.7, edgecolor='black')
        ax4.set_title('Bar Plot Demo', fontweight='bold')
        ax4.set_xlabel('Category')
        ax4.set_ylabel('Count')
        ax4.grid(True, alpha=0.3, axis='y')
        
        plt.tight_layout()
        
        # Save the demo plot
        output_path = "/data/matplotlib_demo.png"
        plt.savefig(output_path, dpi=150, bbox_inches='tight', 
                   facecolor='white', edgecolor='none')
        plt.close()
        
        print(f"✓ Sample matplotlib demo saved: {output_path}")
        print("✓ Demo includes: line plot, scatter plot, histogram, and bar chart")
        print("🚀 Matplotlib is working perfectly! Upload data files to see real visualizations.")
else:
    print("No /data directory found.")
    print("🎨 Creating a simple matplotlib demo...")
    
    # Create a simple demo plot
    fig, ax = plt.subplots(figsize=(10, 6))
    x = np.linspace(0, 2*np.pi, 100)
    y1 = np.sin(x)
    y2 = np.cos(x)
    
    ax.plot(x, y1, 'b-', label='sin(x)', linewidth=3)
    ax.plot(x, y2, 'r-', label='cos(x)', linewidth=3)
    ax.set_title('Matplotlib is Working! 🎉', fontsize=16, fontweight='bold')
    ax.set_xlabel('X values', fontsize=12)
    ax.set_ylabel('Y values', fontsize=12)
    ax.legend(fontsize=12)
    ax.grid(True, alpha=0.3)
    
    # Create data directory and save
    os.makedirs('/data', exist_ok=True)
    output_path = "/data/matplotlib_demo_simple.png"
    plt.savefig(output_path, dpi=150, bbox_inches='tight', 
               facecolor='white', edgecolor='none')
    plt.close()
    
    print(f"✓ Simple matplotlib demo created: {output_path}")
    print("🎨 Matplotlib is ready! Upload data files to create beautiful visualizations.")

print("\\n" + "="*60)
print("🎨 Matplotlib Demo Complete!")
print("✅ Matplotlib library is fully functional")
print("📊 Ready to create beautiful data visualizations")
print("📁 Check /data directory for generated files")
print("="*60)`,category:"visualization"},oa=[wv,Sv,kv,Pv,Av,Ev,Cv,Tv],Fv={id:"random-data-schema",title:"Random Data Schema Validation",description:"Validate the structure and content of the random_data.parquet file against expected schema requirements.",filename:"random_data_schema_validation.py",expectations:{description:"Random dataset should contain numeric columns with reasonable ranges and proper data types",columns:{id:{type:"int64",required:!0,min_value:1,null_allowed:!1,description:"Unique identifier for each record"},age:{type:"int64",required:!0,min_value:0,max_value:150,null_allowed:!1,description:"Age in years"},income:{type:"float64",required:!0,min_value:0,max_value:1e6,null_allowed:!0,description:"Annual income in currency units"},category:{type:"string",required:!0,allowed_values:["A","B","C","D"],max_categories:4,null_allowed:!1,description:"Classification category"},score:{type:"float64",required:!1,min_value:0,max_value:100,null_allowed:!0,description:"Performance score (0-100)"}},expected_row_count:{min:100,max:1e5}},dependencies:[{type:"uploaded",sourceId:"random_data"}],content:`import pandas as pd
import numpy as np
import json
import os
from datetime import datetime

def validate_random_data_schema():
    """Validate random_data.parquet against expected schema."""
    file_path = "/data/random_data.parquet"
    
    # Schema expectations (matching TypeScript interface)
    expected_schema = {
        "id": {"type": "int64", "required": True, "min_value": 1, "null_allowed": False},
        "age": {"type": "int64", "required": True, "min_value": 0, "max_value": 150, "null_allowed": False},
        "income": {"type": "float64", "required": True, "min_value": 0, "max_value": 1000000, "null_allowed": True},
        "category": {"type": "string", "required": True, "allowed_values": ["A", "B", "C", "D"], "max_categories": 4, "null_allowed": False},
        "score": {"type": "float64", "required": False, "min_value": 0.0, "max_value": 100.0, "null_allowed": True}
    }
    
    expected_row_count = {"min": 100, "max": 100000}
    
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return {
                "overall_status": "fail",
                "column_validations": [],
                "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
                "validation_timestamp": datetime.now().isoformat(),
                "metadata": {"error": f"File not found: {file_path}"}
            }
        
        # Read the parquet file
        print(f"Loading and validating: {file_path}")
        df = pd.read_parquet(file_path)
        
        validation_result = {
            "overall_status": "pass",
            "column_validations": [],
            "summary": {"total_checks": 0, "passed": 0, "failed": 0, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {
                "total_rows": len(df),
                "total_columns": len(df.columns),
                "file_size": os.path.getsize(file_path)
            }
        }
        
        # Validate row count
        row_count = len(df)
        if row_count < expected_row_count["min"] or row_count > expected_row_count["max"]:
            validation_result["overall_status"] = "fail"
        
        # Validate each expected column
        for col_name, expectations in expected_schema.items():
            col_validation = {
                "column_name": col_name,
                "expected_type": expectations["type"],
                "actual_type": None,
                "status": "pass",
                "checks": []
            }
            
            # Check if column exists
            if col_name not in df.columns:
                if expectations["required"]:
                    col_validation["status"] = "fail"
                    col_validation["checks"].append({
                        "check": "column_exists",
                        "status": "fail",
                        "message": f"Required column '{col_name}' is missing"
                    })
                    validation_result["overall_status"] = "fail"
                else:
                    col_validation["status"] = "warning"
                    col_validation["checks"].append({
                        "check": "column_exists", 
                        "status": "warning",
                        "message": f"Optional column '{col_name}' is missing"
                    })
            else:
                col_data = df[col_name]
                col_validation["actual_type"] = str(col_data.dtype)
                
                # Type validation
                expected_dtype = expectations["type"]
                actual_dtype = str(col_data.dtype)
                
                type_check = {"check": "data_type", "expected": expected_dtype, "actual": actual_dtype}
                if expected_dtype == "int64" and "int" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "float64" and "float" in actual_dtype:
                    type_check["status"] = "pass" 
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "string" and "object" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                else:
                    type_check["status"] = "fail"
                    type_check["message"] = f"Expected {expected_dtype}, got {actual_dtype}"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                
                col_validation["checks"].append(type_check)
                
                # Null value validation
                null_count = col_data.isnull().sum()
                null_check = {
                    "check": "null_values",
                    "actual": int(null_count),
                    "message": f"Found {null_count} null values"
                }
                
                if null_count > 0 and not expectations.get("null_allowed", True):
                    null_check["status"] = "fail"
                    null_check["message"] += " (nulls not allowed)"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                else:
                    null_check["status"] = "pass"
                
                col_validation["checks"].append(null_check)
                
                # Numeric range validation
                if "min_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    min_val = float(col_data.min())
                    min_check = {
                        "check": "min_value",
                        "expected": expectations["min_value"],
                        "actual": min_val
                    }
                    
                    if min_val < expectations["min_value"]:
                        min_check["status"] = "fail"
                        min_check["message"] = f"Minimum value {min_val} below expected {expectations['min_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        min_check["status"] = "pass"
                        min_check["message"] = f"Minimum value {min_val} within range"
                    
                    col_validation["checks"].append(min_check)
                
                if "max_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    max_val = float(col_data.max())
                    max_check = {
                        "check": "max_value", 
                        "expected": expectations["max_value"],
                        "actual": max_val
                    }
                    
                    if max_val > expectations["max_value"]:
                        max_check["status"] = "fail"
                        max_check["message"] = f"Maximum value {max_val} above expected {expectations['max_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        max_check["status"] = "pass"
                        max_check["message"] = f"Maximum value {max_val} within range"
                    
                    col_validation["checks"].append(max_check)
                
                # Categorical validation
                if "allowed_values" in expectations:
                    unique_vals = col_data.dropna().unique()
                    violations = [val for val in unique_vals if val not in expectations["allowed_values"]]
                    
                    cat_check = {
                        "check": "allowed_values",
                        "expected": expectations["allowed_values"],
                        "violations": violations
                    }
                    
                    if violations:
                        cat_check["status"] = "fail"
                        cat_check["message"] = f"Found {len(violations)} invalid categorical values"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        cat_check["status"] = "pass"
                        cat_check["message"] = "All values within allowed categories"
                    
                    col_validation["checks"].append(cat_check)
            
            validation_result["column_validations"].append(col_validation)
        
        # Calculate summary statistics
        total_checks = sum(len(col["checks"]) for col in validation_result["column_validations"])
        passed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "pass")
        failed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "fail")
        warnings = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "warning")
        
        validation_result["summary"] = {
            "total_checks": total_checks,
            "passed": passed,
            "failed": failed,
            "warnings": warnings
        }
        
        # Save validation results as JSON
        output_path = "/data/random_data_schema_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        print("\\n" + "="*60)
        print("SCHEMA VALIDATION RESULTS")
        print("="*60)
        print(f"Overall Status: {validation_result['overall_status'].upper()}")
        print(f"Total Checks: {total_checks}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Warnings: {warnings}")
        print(f"\\nValidation results saved to: {output_path}")
        
        return validation_result
        
    except Exception as e:
        import traceback
        error_result = {
            "overall_status": "fail",
            "column_validations": [],
            "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {"error": str(e), "traceback": traceback.format_exc()}
        }
        
        print(f"Error during schema validation: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        
        return error_result

# Execute the validation
print("Random Data Schema Validation")
print("="*60)
result = validate_random_data_schema()

if result["overall_status"] == "pass":
    print("\\n✅ Schema validation passed!")
elif result["overall_status"] == "warning":
    print("\\n⚠️ Schema validation completed with warnings!")
else:
    print("\\n❌ Schema validation failed!")`,category:"validation"},Rv={id:"sample-data-schema",title:"Sample Data Schema Validation",description:"Validate the structure and content of the sample_data.parquet file against expected schema requirements.",filename:"sample_data_schema_validation.py",expectations:{description:"Sample dataset should contain mixed data types with proper structure and constraints",columns:{user_id:{type:"string",required:!0,null_allowed:!1,description:"Unique user identifier"},timestamp:{type:"datetime",required:!0,null_allowed:!1,description:"Event timestamp"},value:{type:"float64",required:!0,min_value:-1e3,max_value:1e3,null_allowed:!0,description:"Measured value"},status:{type:"string",required:!0,allowed_values:["active","inactive","pending","suspended"],max_categories:4,null_allowed:!1,description:"User status"},count:{type:"int64",required:!1,min_value:0,null_allowed:!0,description:"Count of events"}},expected_row_count:{min:50,max:5e4}},dependencies:[{type:"uploaded",sourceId:"identity"}],content:`import pandas as pd
import numpy as np
import json
import os
from datetime import datetime

def validate_sample_data_schema():
    """Validate sample_data.parquet against expected schema."""
    file_path = "/data/sample_data.parquet"
    
    # Schema expectations (matching TypeScript interface)
    expected_schema = {
        "user_id": {"type": "string", "required": True, "null_allowed": False},
        "timestamp": {"type": "datetime", "required": True, "null_allowed": False},
        "value": {"type": "float64", "required": True, "min_value": -1000, "max_value": 1000, "null_allowed": True},
        "status": {"type": "string", "required": True, "allowed_values": ["active", "inactive", "pending", "suspended"], "max_categories": 4, "null_allowed": False},
        "count": {"type": "int64", "required": False, "min_value": 0, "null_allowed": True}
    }
    
    expected_row_count = {"min": 50, "max": 50000}
    
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return {
                "overall_status": "fail",
                "column_validations": [],
                "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
                "validation_timestamp": datetime.now().isoformat(),
                "metadata": {"error": f"File not found: {file_path}"}
            }
        
        # Read the parquet file
        print(f"Loading and validating: {file_path}")
        df = pd.read_parquet(file_path)
        
        validation_result = {
            "overall_status": "pass",
            "column_validations": [],
            "summary": {"total_checks": 0, "passed": 0, "failed": 0, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {
                "total_rows": len(df),
                "total_columns": len(df.columns),
                "file_size": os.path.getsize(file_path)
            }
        }
        
        # Validate row count
        row_count = len(df)
        if row_count < expected_row_count["min"] or row_count > expected_row_count["max"]:
            validation_result["overall_status"] = "fail"
        
        # Validate each expected column
        for col_name, expectations in expected_schema.items():
            col_validation = {
                "column_name": col_name,
                "expected_type": expectations["type"],
                "actual_type": None,
                "status": "pass",
                "checks": []
            }
            
            # Check if column exists
            if col_name not in df.columns:
                if expectations["required"]:
                    col_validation["status"] = "fail"
                    col_validation["checks"].append({
                        "check": "column_exists",
                        "status": "fail",
                        "message": f"Required column '{col_name}' is missing"
                    })
                    validation_result["overall_status"] = "fail"
                else:
                    col_validation["status"] = "warning"
                    col_validation["checks"].append({
                        "check": "column_exists",
                        "status": "warning", 
                        "message": f"Optional column '{col_name}' is missing"
                    })
            else:
                col_data = df[col_name]
                col_validation["actual_type"] = str(col_data.dtype)
                
                # Type validation
                expected_dtype = expectations["type"]
                actual_dtype = str(col_data.dtype)
                
                type_check = {"check": "data_type", "expected": expected_dtype, "actual": actual_dtype}
                if expected_dtype == "int64" and "int" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "float64" and "float" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "string" and "object" in actual_dtype:
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                elif expected_dtype == "datetime" and ("datetime" in actual_dtype or "timestamp" in actual_dtype):
                    type_check["status"] = "pass"
                    type_check["message"] = "Data type matches"
                else:
                    type_check["status"] = "fail"
                    type_check["message"] = f"Expected {expected_dtype}, got {actual_dtype}"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                
                col_validation["checks"].append(type_check)
                
                # Null value validation
                null_count = col_data.isnull().sum()
                null_check = {
                    "check": "null_values",
                    "actual": int(null_count),
                    "message": f"Found {null_count} null values"
                }
                
                if null_count > 0 and not expectations.get("null_allowed", True):
                    null_check["status"] = "fail"
                    null_check["message"] += " (nulls not allowed)"
                    col_validation["status"] = "fail"
                    validation_result["overall_status"] = "fail"
                else:
                    null_check["status"] = "pass"
                
                col_validation["checks"].append(null_check)
                
                # Numeric range validation
                if "min_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    min_val = float(col_data.min())
                    min_check = {
                        "check": "min_value",
                        "expected": expectations["min_value"],
                        "actual": min_val
                    }
                    
                    if min_val < expectations["min_value"]:
                        min_check["status"] = "fail"
                        min_check["message"] = f"Minimum value {min_val} below expected {expectations['min_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        min_check["status"] = "pass"
                        min_check["message"] = f"Minimum value {min_val} within range"
                    
                    col_validation["checks"].append(min_check)
                
                if "max_value" in expectations and col_data.dtype in ['int64', 'float64']:
                    max_val = float(col_data.max())
                    max_check = {
                        "check": "max_value",
                        "expected": expectations["max_value"],
                        "actual": max_val
                    }
                    
                    if max_val > expectations["max_value"]:
                        max_check["status"] = "fail"
                        max_check["message"] = f"Maximum value {max_val} above expected {expectations['max_value']}"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        max_check["status"] = "pass"
                        max_check["message"] = f"Maximum value {max_val} within range"
                    
                    col_validation["checks"].append(max_check)
                
                # Categorical validation
                if "allowed_values" in expectations:
                    unique_vals = col_data.dropna().unique()
                    violations = [val for val in unique_vals if val not in expectations["allowed_values"]]
                    
                    cat_check = {
                        "check": "allowed_values",
                        "expected": expectations["allowed_values"],
                        "violations": violations
                    }
                    
                    if violations:
                        cat_check["status"] = "fail"
                        cat_check["message"] = f"Found {len(violations)} invalid categorical values"
                        col_validation["status"] = "fail"
                        validation_result["overall_status"] = "fail"
                    else:
                        cat_check["status"] = "pass"
                        cat_check["message"] = "All values within allowed categories"
                    
                    col_validation["checks"].append(cat_check)
            
            validation_result["column_validations"].append(col_validation)
        
        # Calculate summary statistics
        total_checks = sum(len(col["checks"]) for col in validation_result["column_validations"])
        passed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "pass")
        failed = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "fail")
        warnings = sum(1 for col in validation_result["column_validations"] for check in col["checks"] if check["status"] == "warning")
        
        validation_result["summary"] = {
            "total_checks": total_checks,
            "passed": passed,
            "failed": failed,
            "warnings": warnings
        }
        
        # Save validation results as JSON
        output_path = "/data/sample_data_schema_validation_results.json"
        with open(output_path, 'w') as f:
            json.dump(validation_result, f, indent=2)
        
        print("\\n" + "="*60)
        print("SCHEMA VALIDATION RESULTS")
        print("="*60)
        print(f"Overall Status: {validation_result['overall_status'].upper()}")
        print(f"Total Checks: {total_checks}")
        print(f"Passed: {passed}")
        print(f"Failed: {failed}")
        print(f"Warnings: {warnings}")
        print(f"\\nValidation results saved to: {output_path}")
        
        return validation_result
        
    except Exception as e:
        import traceback
        error_result = {
            "overall_status": "fail",
            "column_validations": [],
            "summary": {"total_checks": 1, "passed": 0, "failed": 1, "warnings": 0},
            "validation_timestamp": datetime.now().isoformat(),
            "metadata": {"error": str(e), "traceback": traceback.format_exc()}
        }
        
        print(f"Error during schema validation: {str(e)}")
        print("\\nFull traceback:")
        print(traceback.format_exc())
        
        return error_result

# Execute the validation
print("Sample Data Schema Validation")
print("="*60)
result = validate_sample_data_schema()

if result["overall_status"] == "pass":
    print("\\n✅ Schema validation passed!")
elif result["overall_status"] == "warning":
    print("\\n⚠️ Schema validation completed with warnings!")
else:
    print("\\n❌ Schema validation failed!")`,category:"validation"},Ts=[Fv,Rv],ft=pt({files:{},selectedFileId:null,uploadStates:Object.fromEntries(sr.map(t=>[t.id,"waiting"]))}),Ov=t=>ft.files[t],Iv=t=>ft.uploadStates[t]??"waiting",Nv=t=>ft.selectedFileId===t,Dv=(t,e)=>{if(!e.acceptedTypes||e.acceptedTypes.length===0)return!0;const r=t.toLowerCase();return e.acceptedTypes.some(n=>r.endsWith(n.toLowerCase()))},Vo=t=>{const e=t.lastIndexOf(".");return e>0?t.substring(e).toLowerCase():""},Fs={getFile:Ov,getUploadState:Iv,isFileSelected:Nv},er={selectFile(t){const e=t?ft.files[t]:null;if(t&&!e){console.warn(`Attempted to select non-existent file: ${t}`);return}ft.selectedFileId=t},startUpload(t){if(!sr.find(e=>e.id===t)){console.error(`Invalid file ID: ${t}`);return}ft.uploadStates[t]="uploading"},completeUpload(t,e){const r={...e,id:t,status:"completed"};ft.files[t]=r,ft.uploadStates[t]="completed"},errorUpload(t){ft.uploadStates[t]="error",ft.selectedFileId===t&&(ft.selectedFileId=null)},removeFile(t){delete ft.files[t],ft.uploadStates[t]="waiting",ft.selectedFileId===t&&(ft.selectedFileId=null)},async loadFile(t,e){er.startUpload(t);try{const r=sr.find(s=>s.id===t);if(!r)throw new Error(`Invalid file ID: ${t}`);if(!Dv(e.name,r)){const s=r.acceptedTypes||[];throw new Error(`File type not supported. Please select one of: ${s.join(", ")}`)}const n=r.defaultFilename||e.name,a=e.name!==n;er.completeUpload(t,{filename:n,originalName:e.name,size:_a(e.size),uploadedAt:new Date().toLocaleString(),file:e,wasRenamed:a})}catch(r){throw er.errorUpload(t),r}},async loadFilesFromFolder(t){const e=[];let r=0;const n=new Map;sr.forEach(i=>{n.set(i.defaultFilename.toLowerCase(),i.id)});const a=[".csv",".parquet",".gpkg"],s=t.filter(i=>{const o=Vo(i.name);return a.includes(o)});for(const i of s){const o=i.name.toLowerCase(),c=n.get(o);if(c)try{await er.loadFile(c,i),r++}catch(d){e.push(`Failed to load ${i.name}: ${d}`)}else{const d=Vo(i.name),f=sr.find(v=>v.acceptedTypes?.some(h=>h.toLowerCase()===d));if(f)try{await er.loadFile(f.id,i),r++}catch(v){e.push(`Failed to load ${i.name}: ${v}`)}}}return{matched:r,total:s.length,errors:e}}},yt=pt({resultFiles:{},selectedResultId:null,preExecutionFiles:new Set,isScanning:!1}),la={getResultFile:t=>yt.resultFiles[t],getResultsByScript:t=>Object.values(yt.resultFiles).filter(e=>e.scriptId===t),isResultSelected:t=>yt.selectedResultId===t,getResultsByType:t=>Object.values(yt.resultFiles).filter(e=>e.fileType.toLowerCase()===t.toLowerCase())},Sn={selectResult:t=>{yt.selectedResultId=t},addResult:t=>{const e=`result_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,r={...t,id:e};return yt.resultFiles[e]=r,e},removeResult:t=>{delete yt.resultFiles[t],yt.selectedResultId===t&&(yt.selectedResultId=null)},clearAllResults:()=>{yt.resultFiles={},yt.selectedResultId=null},clearResultsForScript:t=>{Object.keys(yt.resultFiles).filter(r=>yt.resultFiles[r].scriptId===t).forEach(r=>{delete yt.resultFiles[r],yt.selectedResultId===r&&(yt.selectedResultId=null)})},setPreExecutionBaseline:t=>{yt.preExecutionFiles=new Set(t)},scanForNewResults:async(t,e)=>{yt.isScanning=!0;try{const r=t.filter(n=>!yt.preExecutionFiles.has(n));for(const n of r){const a=n.split("/").pop()||n,s=a.split(".").pop()?.toLowerCase()||"";Mv(a,s)||Sn.addResult({filename:a,fileType:s,fileSize:0,createdAt:new Date().toISOString(),scriptId:e,pyodidePath:n,description:Lv(s)})}}finally{yt.isScanning=!1}}};function Mv(t,e){const r=["pyc","pyo","__pycache__","tmp","temp"],n=["__pycache__",".","tmp","temp"];return r.includes(e)||n.some(a=>t.startsWith(a))}function Lv(t){switch(t.toLowerCase()){case"html":case"htm":return"HTML report or visualization";case"parquet":case"pq":return"Parquet data file";case"csv":return"CSV data file";case"json":return"JSON data file";case"png":case"jpg":case"jpeg":return"Image file";case"pdf":return"PDF document";default:return"Generated file"}}function ha(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];_t(t,Ke({name:"circle-check-big"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function Tn(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["polygon",{points:"6 3 20 12 6 21 6 3"}]];_t(t,Ke({name:"play"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function ga(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];_t(t,Ke({name:"circle-x"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function ed(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];_t(t,Ke({name:"triangle-alert"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function td(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]];_t(t,Ke({name:"clock"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function He(...t){return xv(ta(t))}function rd(t){const e=oa.find(a=>a.id===t);if(!e||!e.dependencies)return{allMet:!0,dependencies:[]};const r=[];let n=!0;for(const a of e.dependencies)if(a.type==="uploaded"){const s=sr.find(c=>c.id===a.sourceId),o=!!Fs.getFile(a.sourceId);o||(n=!1),r.push({id:a.sourceId,type:"uploaded",filename:s?.defaultFilename||"Unknown file",title:s?.title||"Unknown file",description:s?.description,isAvailable:o})}else if(a.type==="result"){const s=la.getResultsByScript(a.sourceId),i=s.length>0?s[0]:null,o=!!i;o||(n=!1);const c=oa.find(v=>v.id===a.sourceId);let d="result.txt",f="Script Result";i?(d=i.filename,f=i.filename):(d={"data-summary":"random_data_summary_report.parquet","data-visualization":"visualization_charts.png","data-cleaning":"cleaned_data.parquet","advanced-analysis":"advanced_analysis_report.parquet","linear-regression":"linear_regression_results.parquet","geopandas-test":"geopandas_output.parquet"}[a.sourceId]||`${a.sourceId}_output.txt`,f=d),r.push({id:a.sourceId,type:"result",filename:d,title:f,description:`Generated output from ${c?.title||"script"}`,isAvailable:o})}return{allMet:n,dependencies:r}}function nd(t){const e=Ts.find(a=>a.id===t);if(!e||!e.dependencies)return{allMet:!0,dependencies:[]};const r=[];let n=!0;for(const a of e.dependencies)if(a.type==="uploaded"){const s=sr.find(c=>c.id===a.sourceId),o=!!Fs.getFile(a.sourceId);o||(n=!1),r.push({id:a.sourceId,type:"uploaded",filename:s?.defaultFilename||"Unknown file",title:s?.title||"Unknown file",description:s?.description,isAvailable:o})}else if(a.type==="result"){const s=la.getResultsByScript(a.sourceId),o=!!(s.length>0?s[0]:null);o||(n=!1);const c=oa.find(d=>d.id===a.sourceId);r.push({id:a.sourceId,type:"result",filename:c?.filename||"result.txt",title:c?.title||"Script Result",description:`Generated output from ${c?.title||"script"}`,isAvailable:o})}return{allMet:n,dependencies:r}}function zv(t,e){return e==="running"||e==="completed"||e==="error"?e:rd(t).allMet?"ready":"waiting"}function Bv(t,e){return e==="running"||e==="completed"||e==="error"?e:nd(t).allMet?"ready":"waiting"}const Uv={waiting:{badge:{variant:"outline",text:"Waiting"},icon:td,iconClass:"text-muted-foreground",cardClass:"border-dashed border-muted-foreground/50"},ready:{badge:{variant:"outline",text:"Ready"},icon:Tc,iconClass:"text-green-600",cardClass:"border-dashed border-green-300/50"},running:{badge:{variant:"secondary",text:"Running..."},icon:Tn,iconClass:"text-blue-500 animate-pulse",cardClass:"border-blue-200 bg-blue-50/50"},completed:{badge:{variant:"default",text:"Completed"},icon:ha,iconClass:"text-green-500",cardClass:"border-green-200 bg-green-50/50"},error:{badge:{variant:"destructive",text:"Error"},icon:ga,iconClass:"text-red-500",cardClass:"border-red-200 bg-red-50/50"}},jv={waiting:{badge:{variant:"outline",text:"Waiting"},icon:td,iconClass:"text-muted-foreground",cardClass:"border-dashed border-muted-foreground/50"},ready:{badge:{variant:"outline",text:"Ready"},icon:pn,iconClass:"text-green-600",cardClass:"border-dashed border-green-300/50"},running:{badge:{variant:"secondary",text:"Validating..."},icon:Tn,iconClass:"text-blue-500 animate-pulse",cardClass:"border-blue-200 bg-blue-50/50"},completed:{badge:{variant:"default",text:"Completed"},icon:ha,iconClass:"text-green-500",cardClass:"border-green-200 bg-green-50/50"},error:{badge:{variant:"destructive",text:"Error"},icon:ga,iconClass:"text-red-500",cardClass:"border-red-200 bg-red-50/50"}};function _a(t){const e=["Bytes","KB","MB","GB"];if(t===0)return"0 Bytes";const r=Math.floor(Math.log(t)/Math.log(1024));return Math.round(t/Math.pow(1024,r)*100)/100+" "+e[r]}async function $v(t){try{await navigator.clipboard.writeText(t)}catch(e){console.error("Failed to copy text: ",e)}}function Ca(t){const e=t.lastIndexOf(".");return e>0?t.substring(e).toLowerCase():""}function Go(t){switch(t){case"pass":return ha;case"fail":return ga;case"warning":return ed}}function Wo(t){switch(t){case"pass":return"text-green-500";case"fail":return"text-red-500";case"warning":return"text-yellow-500"}}function ad(t){switch(t){case"not-initialized":return"Pyodide not initialized";case"initializing":return"Loading Python runtime...";case"loading-packages":return"Installing Python packages (numpy, pandas, fastparquet)...";case"ready":return"Python runtime ready";case"error":return"Python runtime failed to initialize"}}const qv=fi({base:"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",variants:{variant:{default:"bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",secondary:"bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",destructive:"bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function bt(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"variant",3,"default"),a=xe(e,["$$slots","$$events","$$legacy","ref","href","class","variant","children"]);var s=q(),i=A(s);wc(i,()=>e.href?"a":"span",!1,(o,c)=>{ut(o,v=>r(v),()=>r()),Xe(o,v=>({"data-slot":"badge",href:e.href,class:v,...a}),[()=>He(qv({variant:n()}),e.class)]);var d=q(),f=A(d);fe(f,()=>e.children??ye),u(c,d)}),u(t,s),se()}const Ho=fi({base:"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",outline:"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});var Vv=k("<a><!></a>"),Gv=k("<button><!></button>");function It(t,e){ie(e,!0);let r=U(e,"variant",3,"default"),n=U(e,"size",3,"default"),a=U(e,"ref",15,null),s=U(e,"href",3,void 0),i=U(e,"type",3,"button"),o=xe(e,["$$slots","$$events","$$legacy","class","variant","size","ref","href","type","disabled","children"]);var c=q(),d=A(c);{var f=h=>{var m=Vv();Xe(m,y=>({"data-slot":"button",class:y,href:e.disabled?void 0:s(),"aria-disabled":e.disabled,role:e.disabled?"link":void 0,tabindex:e.disabled?-1:void 0,...o}),[()=>He(Ho({variant:r(),size:n()}),e.class)]);var g=p(m);fe(g,()=>e.children??ye),ut(m,y=>a(y),()=>a()),u(h,m)},v=h=>{var m=Gv();Xe(m,y=>({"data-slot":"button",class:y,type:i(),disabled:e.disabled,...o}),[()=>He(Ho({variant:r(),size:n()}),e.class)]);var g=p(m);fe(g,()=>e.children??ye),ut(m,y=>a(y),()=>a()),u(h,m)};L(d,h=>{s()?h(f):h(v,!1)})}u(t,c),se()}function Ta(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];_t(t,Ke({name:"upload"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}var Wv=k('<div class="flex items-center gap-1 text-xs"><!> <span class="text-muted-foreground">from original file</span></div>'),Hv=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Size:</span> </div>'),Yv=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Uploaded:</span> </div>'),Kv=k('<div class="text-xs"><span class="font-medium">File:</span> </div> <!> <!> <!>',1),Xv=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Expected:</span> </div>'),Qv=k("<!> Replace",1),Jv=k('<button><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><!></div> <div class="flex gap-2 mt-2"><!></div></button>'),Zv=k('<div class="flex items-center gap-1 text-xs"><!> <span class="text-muted-foreground">from original file</span></div>'),em=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Size:</span> </div>'),tm=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Uploaded:</span> </div>'),rm=k('<div class="text-xs"><span class="font-medium">File:</span> </div> <!> <!> <!>',1),nm=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Expected:</span> </div>'),am=k("<!> Upload",1),im=k("<!> Replace",1),sm=k('<div><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><!></div> <div class="flex gap-2 mt-2"><!></div></div>');function om(t,e){ie(e,!0);let r=U(e,"status",3,"waiting"),n=xe(e,["$$slots","$$events","$$legacy","id","title","description","defaultFilename","status","uploadedFilename","fileSize","uploadedAt","wasRenamed","onUpload","onRemove","onPreview"]);const a={waiting:{badge:{variant:"outline",text:"Required"},icon:ra,iconClass:"text-muted-foreground",cardClass:"border-dashed border-muted-foreground/50"},uploading:{badge:{variant:"secondary",text:"Uploading..."},icon:Ta,iconClass:"text-blue-500 animate-pulse",cardClass:"border-blue-200 bg-blue-50/50"},completed:{badge:{variant:"default",text:"Uploaded"},icon:ha,iconClass:"text-green-500",cardClass:"border-green-200 bg-green-50/50"},error:{badge:{variant:"destructive",text:"Error"},icon:ga,iconClass:"text-red-500",cardClass:"border-red-200 bg-red-50/50"}},s=$(()=>a[r()]),i=$(()=>l(s).icon),o=$(()=>Fs.isFileSelected(e.id));Ct(()=>{console.log(`FileCard ${e.id}: status="${r()}", isSelected=${l(o)}, onPreview=${!!e.onPreview}`),console.log("  - config:",l(s)),console.log("  - uploadedFilename:",e.uploadedFilename),console.log("  - rendering in:",r()==="completed"&&e.onPreview?"BUTTON (completed)":"DIV (other)")});var c=q(),d=A(c);{var f=h=>{var m=Jv();Xe(m,j=>({class:j,onclick:e.onPreview,...n}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",l(s).cardClass,"cursor-pointer hover:shadow-md hover:scale-[1.02]",l(o)&&"ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm")]);var g=p(m),y=p(g),E=p(y);{let j=$(()=>He("size-4",l(s).iconClass));Ce(E,()=>l(i),(N,P)=>{P(N,{get class(){return l(j)}})})}var S=_(E,2),b=p(S),O=_(y,2);bt(O,{get variant(){return l(s).badge.variant},class:"flex-shrink-0",children:(j,N)=>{var P=$e();G(()=>B(P,l(s).badge.text)),u(j,P)},$$slots:{default:!0}});var z=_(g,2),M=p(z),T=_(z,2),R=p(T);{var I=j=>{var N=Kv(),P=A(N),x=_(p(P)),w=_(P,2);{var F=X=>{var Z=Wv(),Q=p(Z);bt(Q,{variant:"secondary",class:"text-xs px-1 py-0 h-4",children:(pe,ae)=>{var te=$e("Renamed");u(pe,te)},$$slots:{default:!0}}),u(X,Z)};L(w,X=>{e.wasRenamed&&X(F)})}var C=_(w,2);{var D=X=>{var Z=Hv(),Q=_(p(Z));G(()=>B(Q,` ${e.fileSize??""}`)),u(X,Z)};L(C,X=>{e.fileSize&&X(D)})}var H=_(C,2);{var Y=X=>{var Z=Yv(),Q=_(p(Z));G(()=>B(Q,` ${e.uploadedAt??""}`)),u(X,Z)};L(H,X=>{e.uploadedAt&&X(Y)})}G(()=>B(x,` ${e.uploadedFilename??""}`)),u(j,N)},K=j=>{var N=Xv(),P=_(p(N));G(()=>B(P,` ${e.defaultFilename??""}`)),u(j,N)};L(R,j=>{r()==="completed"&&e.uploadedFilename?j(I):j(K,!1)})}var W=_(T,2),J=p(W);It(J,{size:"sm",variant:"outline",class:"flex-1 text-xs",onclick:j=>{j.stopPropagation(),e.onUpload?.()},children:(j,N)=>{var P=Qv(),x=A(P);Ta(x,{class:"size-3 mr-1"}),u(j,P)},$$slots:{default:!0}}),G(()=>{B(b,e.title),B(M,e.description)}),u(h,m)},v=h=>{var m=sm();Xe(m,P=>({class:P,...n}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm",l(s).cardClass)]);var g=p(m),y=p(g),E=p(y);{let P=$(()=>He("size-4",l(s).iconClass));Ce(E,()=>l(i),(x,w)=>{w(x,{get class(){return l(P)}})})}var S=_(E,2),b=p(S),O=_(y,2);bt(O,{get variant(){return l(s).badge.variant},class:"flex-shrink-0",children:(P,x)=>{var w=$e();G(()=>B(w,l(s).badge.text)),u(P,w)},$$slots:{default:!0}});var z=_(g,2),M=p(z),T=_(z,2),R=p(T);{var I=P=>{var x=rm(),w=A(x),F=_(p(w)),C=_(w,2);{var D=Q=>{var pe=Zv(),ae=p(pe);bt(ae,{variant:"secondary",class:"text-xs px-1 py-0 h-4",children:(te,Fe)=>{var ue=$e("Renamed");u(te,ue)},$$slots:{default:!0}}),u(Q,pe)};L(C,Q=>{e.wasRenamed&&Q(D)})}var H=_(C,2);{var Y=Q=>{var pe=em(),ae=_(p(pe));G(()=>B(ae,` ${e.fileSize??""}`)),u(Q,pe)};L(H,Q=>{e.fileSize&&Q(Y)})}var X=_(H,2);{var Z=Q=>{var pe=tm(),ae=_(p(pe));G(()=>B(ae,` ${e.uploadedAt??""}`)),u(Q,pe)};L(X,Q=>{e.uploadedAt&&Q(Z)})}G(()=>B(F,` ${e.uploadedFilename??""}`)),u(P,x)},K=P=>{var x=nm(),w=_(p(x));G(()=>B(w,` ${e.defaultFilename??""}`)),u(P,x)};L(R,P=>{r()==="completed"&&e.uploadedFilename?P(I):P(K,!1)})}var W=_(T,2),J=p(W);{var j=P=>{It(P,{size:"sm",variant:"outline",class:"flex-1 text-xs",get onclick(){return e.onUpload},children:(x,w)=>{var F=am(),C=A(F);Ta(C,{class:"size-3 mr-1"}),u(x,F)},$$slots:{default:!0}})},N=P=>{var x=q(),w=A(x);{var F=C=>{It(C,{size:"sm",variant:"outline",class:"flex-1 text-xs",get onclick(){return e.onUpload},children:(D,H)=>{var Y=im(),X=A(Y);Ta(X,{class:"size-3 mr-1"}),u(D,Y)},$$slots:{default:!0}})};L(w,C=>{r()==="completed"&&C(F)},!0)}u(P,x)};L(J,P=>{r()==="waiting"||r()==="error"?P(j):P(N,!1)})}G(()=>{B(b,e.title),B(M,e.description)}),u(h,m)};L(d,h=>{r()==="completed"&&e.onPreview?h(f):h(v,!1)})}u(t,c),se()}var lm=k('<span class="text-red-600"> </span>'),cm=k('<span class="text-yellow-600"> </span>'),dm=k('<div class="text-xs"><span class="font-medium">Results:</span> <span> </span> <!> <!></div>'),um=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Runtime:</span> </div>'),fm=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Last run:</span> </div>'),pm=k("<!> ",1),vm=k('<button><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><div class="text-xs"><span class="font-medium">Target File:</span> </div> <!> <!> <!></div> <div class="flex gap-2 mt-2"><!></div></button>'),mm=k('<span class="text-red-600"> </span>'),hm=k('<span class="text-yellow-600"> </span>'),gm=k('<div class="text-xs"><span class="font-medium">Results:</span> <span> </span> <!> <!></div>'),_m=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Runtime:</span> </div>'),ym=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Last run:</span> </div>'),bm=k("<!> ",1),xm=k('<div><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><div class="text-xs"><span class="font-medium">Target File:</span> </div> <!> <!> <!></div> <div class="flex gap-2 mt-2"><!></div></div>');function wm(t,e){ie(e,!0);let r=U(e,"status",3,"ready"),n=U(e,"isSelected",3,!1),a=xe(e,["$$slots","$$events","$$legacy","id","title","description","filename","status","executionTime","lastRun","validationSummary","isSelected","onValidate","onPreview"]);const s=$(()=>{const g={...jv};return l(i)==="completed"&&e.validationSummary&&(g.completed={badge:{variant:"default",text:"Completed"},icon:e.validationSummary.overall_status==="pass"?ha:e.validationSummary.overall_status==="warning"?ed:ga,iconClass:e.validationSummary.overall_status==="pass"?"text-green-500":e.validationSummary.overall_status==="warning"?"text-yellow-500":"text-red-500",cardClass:e.validationSummary.overall_status==="pass"?"border-green-200 bg-green-50/50":e.validationSummary.overall_status==="warning"?"border-yellow-200 bg-yellow-50/50":"border-red-200 bg-red-50/50"}),g}),i=$(()=>Bv(e.id,r())),o=$(()=>l(s)[l(i)]),c=$(()=>l(o).icon),d=$(()=>{const g=Ts.find(E=>E.id===e.id);if(!g?.dependencies?.[0])return e.filename;const y=g.dependencies[0];return y.type==="uploaded"&&sr.find(S=>S.id===y.sourceId)?.defaultFilename||e.filename});var f=q(),v=A(f);{var h=g=>{var y=vm();Xe(y,D=>({class:D,onclick:e.onPreview,...a}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",l(o).cardClass,"cursor-pointer hover:shadow-md hover:scale-[1.02]",n()&&"ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm")]);var E=p(y),S=p(E),b=p(S);{let D=$(()=>He("size-4",l(o).iconClass));Ce(b,()=>l(c),(H,Y)=>{Y(H,{get class(){return l(D)}})})}var O=_(b,2),z=p(O),M=_(S,2);bt(M,{get variant(){return l(o).badge.variant},class:"flex-shrink-0",children:(D,H)=>{var Y=$e();G(()=>B(Y,l(o).badge.text)),u(D,Y)},$$slots:{default:!0}});var T=_(E,2),R=p(T),I=_(T,2),K=p(I),W=_(p(K)),J=_(K,2);{var j=D=>{var H=dm(),Y=_(p(H),2),X=p(Y),Z=_(Y,2);{var Q=te=>{var Fe=lm(),ue=p(Fe);G(()=>B(ue,`• ${e.validationSummary.failed??""} failed`)),u(te,Fe)};L(Z,te=>{e.validationSummary.failed>0&&te(Q)})}var pe=_(Z,2);{var ae=te=>{var Fe=cm(),ue=p(Fe);G(()=>B(ue,`• ${e.validationSummary.warnings??""} warnings`)),u(te,Fe)};L(pe,te=>{e.validationSummary.warnings>0&&te(ae)})}G(()=>{dr(Y,1,jr(e.validationSummary.overall_status==="pass"?"text-green-600":e.validationSummary.overall_status==="warning"?"text-yellow-600":"text-red-600")),B(X,`${e.validationSummary.passed??""}/${e.validationSummary.total_checks??""} checks passed`)}),u(D,H)};L(J,D=>{r()==="completed"&&e.validationSummary&&D(j)})}var N=_(J,2);{var P=D=>{var H=um(),Y=_(p(H));G(()=>B(Y,` ${e.executionTime??""}`)),u(D,H)};L(N,D=>{r()==="completed"&&e.executionTime&&D(P)})}var x=_(N,2);{var w=D=>{var H=fm(),Y=_(p(H));G(()=>B(Y,` ${e.lastRun??""}`)),u(D,H)};L(x,D=>{r()==="completed"&&e.lastRun&&D(w)})}var F=_(I,2),C=p(F);{let D=$(()=>l(i)==="running"||l(i)==="waiting");It(C,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",onclick:H=>{H.stopPropagation(),e.onValidate?.()},get disabled(){return l(D)},children:(H,Y)=>{var X=pm(),Z=A(X);pn(Z,{class:"size-3 mr-1"});var Q=_(Z);G(()=>B(Q,` ${l(i)==="running"?"Validating...":l(i)==="waiting"?"Waiting...":"Validate"}`)),u(H,X)},$$slots:{default:!0}})}G(()=>{B(z,e.title),B(R,e.description),B(W,` ${l(d)??""}`)}),u(g,y)},m=g=>{var y=xm();Xe(y,D=>({class:D,...a}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm",l(o).cardClass)]);var E=p(y),S=p(E),b=p(S);{let D=$(()=>He("size-4",l(o).iconClass));Ce(b,()=>l(c),(H,Y)=>{Y(H,{get class(){return l(D)}})})}var O=_(b,2),z=p(O),M=_(S,2);bt(M,{get variant(){return l(o).badge.variant},class:"flex-shrink-0",children:(D,H)=>{var Y=$e();G(()=>B(Y,l(o).badge.text)),u(D,Y)},$$slots:{default:!0}});var T=_(E,2),R=p(T),I=_(T,2),K=p(I),W=_(p(K)),J=_(K,2);{var j=D=>{var H=gm(),Y=_(p(H),2),X=p(Y),Z=_(Y,2);{var Q=te=>{var Fe=mm(),ue=p(Fe);G(()=>B(ue,`• ${e.validationSummary.failed??""} failed`)),u(te,Fe)};L(Z,te=>{e.validationSummary.failed>0&&te(Q)})}var pe=_(Z,2);{var ae=te=>{var Fe=hm(),ue=p(Fe);G(()=>B(ue,`• ${e.validationSummary.warnings??""} warnings`)),u(te,Fe)};L(pe,te=>{e.validationSummary.warnings>0&&te(ae)})}G(()=>{dr(Y,1,jr(e.validationSummary.overall_status==="pass"?"text-green-600":e.validationSummary.overall_status==="warning"?"text-yellow-600":"text-red-600")),B(X,`${e.validationSummary.passed??""}/${e.validationSummary.total_checks??""} checks passed`)}),u(D,H)};L(J,D=>{r()==="completed"&&e.validationSummary&&D(j)})}var N=_(J,2);{var P=D=>{var H=_m(),Y=_(p(H));G(()=>B(Y,` ${e.executionTime??""}`)),u(D,H)};L(N,D=>{r()==="completed"&&e.executionTime&&D(P)})}var x=_(N,2);{var w=D=>{var H=ym(),Y=_(p(H));G(()=>B(Y,` ${e.lastRun??""}`)),u(D,H)};L(x,D=>{r()==="completed"&&e.lastRun&&D(w)})}var F=_(I,2),C=p(F);{let D=$(()=>l(i)==="running"||l(i)==="waiting");It(C,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",get onclick(){return e.onValidate},get disabled(){return l(D)},children:(H,Y)=>{var X=bm(),Z=A(X);pn(Z,{class:"size-3 mr-1"});var Q=_(Z);G(()=>B(Q,` ${l(i)==="running"?"Validating...":l(i)==="waiting"?"Waiting...":"Validate"}`)),u(H,X)},$$slots:{default:!0}})}G(()=>{B(z,e.title),B(R,e.description),B(W,` ${l(d)??""}`)}),u(g,y)};L(v,g=>{e.onPreview?g(h):g(m,!1)})}u(t,f),se()}var Sm=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Runtime:</span> </div>'),km=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Last run:</span> </div>'),Pm=k("<!> ",1),Am=k('<button><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><div class="text-xs"><span class="font-medium">Script:</span> </div> <!> <!></div> <div class="flex gap-2 mt-2"><!></div></button>'),Em=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Runtime:</span> </div>'),Cm=k('<div class="text-xs text-muted-foreground"><span class="font-medium">Last run:</span> </div>'),Tm=k("<!> ",1),Fm=k('<div><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><!> <span class="font-medium text-sm truncate"> </span></div> <!></div> <p class="text-xs text-muted-foreground line-clamp-2"> </p> <div class="space-y-1"><div class="text-xs"><span class="font-medium">Script:</span> </div> <!> <!></div> <div class="flex gap-2 mt-2"><!></div></div>');function Rm(t,e){ie(e,!0);let r=U(e,"status",3,"ready"),n=U(e,"isSelected",3,!1),a=xe(e,["$$slots","$$events","$$legacy","id","title","description","filename","status","executionTime","lastRun","isSelected","onRun","onPreview"]);const s=$(()=>zv(e.id,r())),i=$(()=>Uv[l(s)]),o=$(()=>l(i).icon);var c=q(),d=A(c);{var f=h=>{var m=Am();Xe(m,x=>({class:x,onclick:e.onPreview,...a}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",l(i).cardClass,"cursor-pointer hover:shadow-md hover:scale-[1.02]",n()&&"ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm")]);var g=p(m),y=p(g),E=p(y);{let x=$(()=>He("size-4",l(i).iconClass));Ce(E,()=>l(o),(w,F)=>{F(w,{get class(){return l(x)}})})}var S=_(E,2),b=p(S),O=_(y,2);bt(O,{get variant(){return l(i).badge.variant},class:"flex-shrink-0",children:(x,w)=>{var F=$e();G(()=>B(F,l(i).badge.text)),u(x,F)},$$slots:{default:!0}});var z=_(g,2),M=p(z),T=_(z,2),R=p(T),I=_(p(R)),K=_(R,2);{var W=x=>{var w=Sm(),F=_(p(w));G(()=>B(F,` ${e.executionTime??""}`)),u(x,w)};L(K,x=>{r()==="completed"&&e.executionTime&&x(W)})}var J=_(K,2);{var j=x=>{var w=km(),F=_(p(w));G(()=>B(F,` ${e.lastRun??""}`)),u(x,w)};L(J,x=>{r()==="completed"&&e.lastRun&&x(j)})}var N=_(T,2),P=p(N);{let x=$(()=>l(s)==="running"||l(s)==="waiting");It(P,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",onclick:w=>{w.stopPropagation(),e.onRun?.()},get disabled(){return l(x)},children:(w,F)=>{var C=Pm(),D=A(C);Tn(D,{class:"size-3 mr-1"});var H=_(D);G(()=>B(H,` ${l(s)==="running"?"Running...":l(s)==="waiting"?"Waiting...":"Run"}`)),u(w,C)},$$slots:{default:!0}})}G(()=>{B(b,e.title),B(M,e.description),B(I,` ${e.filename??""}`)}),u(h,m)},v=h=>{var m=Fm();Xe(m,x=>({class:x,...a}),[()=>He("flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm",l(i).cardClass)]);var g=p(m),y=p(g),E=p(y);{let x=$(()=>He("size-4",l(i).iconClass));Ce(E,()=>l(o),(w,F)=>{F(w,{get class(){return l(x)}})})}var S=_(E,2),b=p(S),O=_(y,2);bt(O,{get variant(){return l(i).badge.variant},class:"flex-shrink-0",children:(x,w)=>{var F=$e();G(()=>B(F,l(i).badge.text)),u(x,F)},$$slots:{default:!0}});var z=_(g,2),M=p(z),T=_(z,2),R=p(T),I=_(p(R)),K=_(R,2);{var W=x=>{var w=Em(),F=_(p(w));G(()=>B(F,` ${e.executionTime??""}`)),u(x,w)};L(K,x=>{r()==="completed"&&e.executionTime&&x(W)})}var J=_(K,2);{var j=x=>{var w=Cm(),F=_(p(w));G(()=>B(F,` ${e.lastRun??""}`)),u(x,w)};L(J,x=>{r()==="completed"&&e.lastRun&&x(j)})}var N=_(T,2),P=p(N);{let x=$(()=>l(s)==="running"||l(s)==="waiting");It(P,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",get onclick(){return e.onRun},get disabled(){return l(x)},children:(w,F)=>{var C=Tm(),D=A(C);Tn(D,{class:"size-3 mr-1"});var H=_(D);G(()=>B(H,` ${l(s)==="running"?"Running...":l(s)==="waiting"?"Waiting...":"Run"}`)),u(w,C)},$$slots:{default:!0}})}G(()=>{B(b,e.title),B(M,e.description),B(I,` ${e.filename??""}`)}),u(h,m)};L(d,h=>{e.onPreview?h(f):h(v,!1)})}u(t,c),se()}function pi(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];_t(t,Ke({name:"file-text"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function Qi(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];_t(t,Ke({name:"download"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}var Om=k('<p class="text-xs text-muted-foreground line-clamp-2"> </p>'),Im=k("<!> Download",1),Nm=k('<div class="flex gap-2 mt-2"><!></div>'),Dm=k('<button><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><div class="flex-shrink-0 p-1 rounded bg-muted/50"><!></div> <span class="font-medium text-sm truncate"> </span></div> <!></div> <!> <div class="flex items-center gap-4 text-xs text-muted-foreground"><span class="flex-shrink-0"> </span> <span class="truncate"> </span></div> <!></button>'),Mm=k('<p class="text-xs text-muted-foreground line-clamp-2"> </p>'),Lm=k("<!> Download",1),zm=k('<div class="flex gap-2 mt-2"><!></div>'),Bm=k('<div><div class="flex items-center justify-between min-w-0"><div class="flex items-center gap-2 min-w-0 flex-1"><div class="flex-shrink-0 p-1 rounded bg-muted/50"><!></div> <span class="font-medium text-sm truncate"> </span></div> <!></div> <!> <div class="flex items-center gap-4 text-xs text-muted-foreground"><span class="flex-shrink-0"> </span> <span class="truncate"> </span></div> <!></div>');function Um(t,e){ie(e,!0);let r=U(e,"isSelected",3,!1);const n=v=>{switch(v.toLowerCase()){case"html":case"htm":return pi;case"parquet":case"pq":return Cc;default:return ra}},a=v=>{const h=["Bytes","KB","MB","GB"];if(v===0)return"0 Bytes";const m=Math.floor(Math.log(v)/Math.log(1024));return Math.round(v/Math.pow(1024,m)*100)/100+" "+h[m]},s=v=>new Date(v).toLocaleString(),i=n(e.fileType);var o=q(),c=A(o);{var d=v=>{var h=Dm();h.__click=function(...N){e.onPreview?.apply(this,N)};var m=p(h),g=p(m),y=p(g),E=p(y);i(E,{class:"size-4 text-muted-foreground"});var S=_(y,2),b=p(S),O=_(g,2);bt(O,{variant:"outline",class:"text-xs flex-shrink-0",children:(N,P)=>{var x=$e();G(w=>B(x,w),[()=>e.fileType.toUpperCase()]),u(N,x)},$$slots:{default:!0}});var z=_(m,2);{var M=N=>{var P=Om(),x=p(P);G(()=>B(x,e.description)),u(N,P)};L(z,N=>{e.description&&N(M)})}var T=_(z,2),R=p(T),I=p(R),K=_(R,2),W=p(K),J=_(T,2);{var j=N=>{var P=Nm(),x=p(P);It(x,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",onclick:w=>{w.stopPropagation(),e.onDownload?.()},children:(w,F)=>{var C=Im(),D=A(C);Qi(D,{class:"size-3 mr-1"}),u(w,C)},$$slots:{default:!0}}),u(N,P)};L(J,N=>{e.onDownload&&N(j)})}G((N,P,x)=>{dr(h,1,N),B(b,e.filename),B(I,P),B(W,x)},[()=>jr(He("flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left","border-border bg-background","cursor-pointer hover:shadow-md hover:scale-[1.02]",r()&&"ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm")),()=>a(e.fileSize),()=>s(e.createdAt)]),u(v,h)},f=v=>{var h=Bm(),m=p(h),g=p(m),y=p(g),E=p(y);i(E,{class:"size-4 text-muted-foreground"});var S=_(y,2),b=p(S),O=_(g,2);bt(O,{variant:"outline",class:"text-xs flex-shrink-0",children:(N,P)=>{var x=$e();G(w=>B(x,w),[()=>e.fileType.toUpperCase()]),u(N,x)},$$slots:{default:!0}});var z=_(m,2);{var M=N=>{var P=Mm(),x=p(P);G(()=>B(x,e.description)),u(N,P)};L(z,N=>{e.description&&N(M)})}var T=_(z,2),R=p(T),I=p(R),K=_(R,2),W=p(K),J=_(T,2);{var j=N=>{var P=zm(),x=p(P);It(x,{size:"sm",variant:"outline",class:"flex-1 text-xs h-7",get onclick(){return e.onDownload},children:(w,F)=>{var C=Lm(),D=A(C);Qi(D,{class:"size-3 mr-1"}),u(w,C)},$$slots:{default:!0}}),u(N,P)};L(J,N=>{e.onDownload&&N(j)})}G((N,P,x)=>{dr(h,1,N),B(b,e.filename),B(I,P),B(W,x)},[()=>jr(He("flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm","border-border bg-background")),()=>a(e.fileSize),()=>s(e.createdAt)]),u(v,h)};L(c,v=>{e.onPreview?v(d):v(f,!1)})}u(t,o),se()}ma(["click"]);function jm(t){return typeof t=="function"}function ya(t){return t!==null&&typeof t=="object"}const $m=["string","number","bigint","boolean"];function Ji(t){return t==null||$m.includes(typeof t)?!0:Array.isArray(t)?t.every(e=>Ji(e)):typeof t=="object"?Object.getPrototypeOf(t)===Object.prototype:!1}const ca=Symbol("box"),Rs=Symbol("is-writable");function qm(t){return ya(t)&&ca in t}function Vm(t){return ee.isBox(t)&&Rs in t}function ee(t){let e=Se(pt(t));return{[ca]:!0,[Rs]:!0,get current(){return l(e)},set current(r){V(e,r,!0)}}}function Gm(t,e){const r=$(t);return e?{[ca]:!0,[Rs]:!0,get current(){return l(r)},set current(n){e(n)}}:{[ca]:!0,get current(){return t()}}}function Wm(t){return ee.isBox(t)?t:jm(t)?ee.with(t):ee(t)}function Hm(t){return Object.entries(t).reduce((e,[r,n])=>ee.isBox(n)?(ee.isWritableBox(n)?Object.defineProperty(e,r,{get(){return n.current},set(a){n.current=a}}):Object.defineProperty(e,r,{get(){return n.current}}),e):Object.assign(e,{[r]:n}),{})}function Ym(t){return ee.isWritableBox(t)?{[ca]:!0,get current(){return t.current}}:t}ee.from=Wm;ee.with=Gm;ee.flatten=Hm;ee.readonly=Ym;ee.isBox=qm;ee.isWritableBox=Vm;function id(...t){return function(e){for(const r of t)if(r){if(e.defaultPrevented)return;typeof r=="function"?r.call(this,e):r.current?.call(this,e)}}}function Km(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var xn={},Ti,Yo;function Xm(){if(Yo)return Ti;Yo=1;var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,e=/\n/g,r=/^\s*/,n=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,a=/^:\s*/,s=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,o=/^\s+|\s+$/g,c=`
`,d="/",f="*",v="",h="comment",m="declaration";Ti=function(y,E){if(typeof y!="string")throw new TypeError("First argument must be a string");if(!y)return[];E=E||{};var S=1,b=1;function O(N){var P=N.match(e);P&&(S+=P.length);var x=N.lastIndexOf(c);b=~x?N.length-x:b+N.length}function z(){var N={line:S,column:b};return function(P){return P.position=new M(N),I(),P}}function M(N){this.start=N,this.end={line:S,column:b},this.source=E.source}M.prototype.content=y;function T(N){var P=new Error(E.source+":"+S+":"+b+": "+N);if(P.reason=N,P.filename=E.source,P.line=S,P.column=b,P.source=y,!E.silent)throw P}function R(N){var P=N.exec(y);if(P){var x=P[0];return O(x),y=y.slice(x.length),P}}function I(){R(r)}function K(N){var P;for(N=N||[];P=W();)P!==!1&&N.push(P);return N}function W(){var N=z();if(!(d!=y.charAt(0)||f!=y.charAt(1))){for(var P=2;v!=y.charAt(P)&&(f!=y.charAt(P)||d!=y.charAt(P+1));)++P;if(P+=2,v===y.charAt(P-1))return T("End of comment missing");var x=y.slice(2,P-2);return b+=2,O(x),y=y.slice(P),b+=2,N({type:h,comment:x})}}function J(){var N=z(),P=R(n);if(P){if(W(),!R(a))return T("property missing ':'");var x=R(s),w=N({type:m,property:g(P[0].replace(t,v)),value:x?g(x[0].replace(t,v)):v});return R(i),w}}function j(){var N=[];K(N);for(var P;P=J();)P!==!1&&(N.push(P),K(N));return N}return I(),j()};function g(y){return y?y.replace(o,v):v}return Ti}var Ko;function Qm(){if(Ko)return xn;Ko=1;var t=xn&&xn.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(xn,"__esModule",{value:!0}),xn.default=r;var e=t(Xm());function r(n,a){var s=null;if(!n||typeof n!="string")return s;var i=(0,e.default)(n),o=typeof a=="function";return i.forEach(function(c){if(c.type==="declaration"){var d=c.property,f=c.value;o?a(d,f,c):f&&(s=s||{},s[d]=f)}}),s}return xn}var Jm=Qm();const Xo=Km(Jm),Zm=Xo.default||Xo,eh=/\d/,th=["-","_","/","."];function rh(t=""){if(!eh.test(t))return t!==t.toLowerCase()}function nh(t){const e=[];let r="",n,a;for(const s of t){const i=th.includes(s);if(i===!0){e.push(r),r="",n=void 0;continue}const o=rh(s);if(a===!1){if(n===!1&&o===!0){e.push(r),r=s,n=o;continue}if(n===!0&&o===!1&&r.length>1){const c=r.at(-1);e.push(r.slice(0,Math.max(0,r.length-1))),r=c+s,n=o;continue}}r+=s,n=o,a=i}return e.push(r),e}function sd(t){return t?nh(t).map(e=>ih(e)).join(""):""}function ah(t){return sh(sd(t||""))}function ih(t){return t?t[0].toUpperCase()+t.slice(1):""}function sh(t){return t?t[0].toLowerCase()+t.slice(1):""}function Jn(t){if(!t)return{};const e={};function r(n,a){if(n.startsWith("-moz-")||n.startsWith("-webkit-")||n.startsWith("-ms-")||n.startsWith("-o-")){e[sd(n)]=a;return}if(n.startsWith("--")){e[n]=a;return}e[ah(n)]=a}return Zm(t,r),e}function on(...t){return(...e)=>{for(const r of t)typeof r=="function"&&r(...e)}}function oh(t,e){const r=RegExp(t,"g");return n=>{if(typeof n!="string")throw new TypeError(`expected an argument of type string, but got ${typeof n}`);return n.match(r)?n.replace(r,e):n}}const lh=oh(/[A-Z]/,t=>`-${t.toLowerCase()}`);function ch(t){if(!t||typeof t!="object"||Array.isArray(t))throw new TypeError(`expected an argument of type object, but got ${typeof t}`);return Object.keys(t).map(e=>`${lh(e)}: ${t[e]};`).join(`
`)}function Os(t={}){return ch(t).replace(`
`," ")}const dh={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",transform:"translateX(-100%)"};Os(dh);const uh=["onabort","onanimationcancel","onanimationend","onanimationiteration","onanimationstart","onauxclick","onbeforeinput","onbeforetoggle","onblur","oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncompositionend","oncompositionstart","oncompositionupdate","oncontextlost","oncontextmenu","oncontextrestored","oncopy","oncuechange","oncut","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","onfocusin","onfocusout","onformdata","ongotpointercapture","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onlostpointercapture","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onpaste","onpause","onplay","onplaying","onpointercancel","onpointerdown","onpointerenter","onpointerleave","onpointermove","onpointerout","onpointerover","onpointerup","onprogress","onratechange","onreset","onresize","onscroll","onscrollend","onsecuritypolicyviolation","onseeked","onseeking","onselect","onselectionchange","onselectstart","onslotchange","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ontransitioncancel","ontransitionend","ontransitionrun","ontransitionstart","onvolumechange","onwaiting","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkittransitionend","onwheel"],fh=new Set(uh);function ph(t){return fh.has(t)}function Tt(...t){const e={...t[0]};for(let r=1;r<t.length;r++){const n=t[r];if(n){for(const a of Object.keys(n)){const s=e[a],i=n[a],o=typeof s=="function",c=typeof i=="function";if(o&&ph(a)){const d=s,f=i;e[a]=id(d,f)}else if(o&&c)e[a]=on(s,i);else if(a==="class"){const d=Ji(s),f=Ji(i);d&&f?e[a]=ta(s,i):d?e[a]=ta(s):f&&(e[a]=ta(i))}else if(a==="style"){const d=typeof s=="object",f=typeof i=="object",v=typeof s=="string",h=typeof i=="string";if(d&&f)e[a]={...s,...i};else if(d&&h){const m=Jn(i);e[a]={...s,...m}}else if(v&&f){const m=Jn(s);e[a]={...m,...i}}else if(v&&h){const m=Jn(s),g=Jn(i);e[a]={...m,...g}}else d?e[a]=s:f?e[a]=i:v?e[a]=s:h&&(e[a]=i)}else e[a]=i!==void 0?i:s}for(const a of Object.getOwnPropertySymbols(n)){const s=e[a],i=n[a];e[a]=i!==void 0?i:s}}}return typeof e.style=="object"&&(e.style=Os(e.style).replaceAll(`
`," ")),e.hidden!==!0&&(e.hidden=void 0,delete e.hidden),e.disabled!==!0&&(e.disabled=void 0,delete e.disabled),e}const od=typeof window<"u"?window:void 0;function vh(t){let e=t.activeElement;for(;e?.shadowRoot;){const r=e.shadowRoot.activeElement;if(r===e)break;e=r}return e}class mh extends Map{#e=new Map;#t=Se(0);#r=Se(0);#n=Cr||-1;constructor(e){if(super(),e){for(var[r,n]of e)super.set(r,n);this.#r.v=super.size}}#a(e){return Cr===this.#n?Se(e):fn(e)}has(e){var r=this.#e,n=r.get(e);if(n===void 0){var a=super.get(e);if(a!==void 0)n=this.#a(0),r.set(e,n);else return l(this.#t),!1}return l(n),!0}forEach(e,r){this.#i(),super.forEach(e,r)}get(e){var r=this.#e,n=r.get(e);if(n===void 0){var a=super.get(e);if(a!==void 0)n=this.#a(0),r.set(e,n);else{l(this.#t);return}}return l(n),super.get(e)}set(e,r){var n=this.#e,a=n.get(e),s=super.get(e),i=super.set(e,r),o=this.#t;if(a===void 0)a=this.#a(0),n.set(e,a),V(this.#r,super.size),hr(o);else if(s!==r){hr(a);var c=o.reactions===null?null:new Set(o.reactions),d=c===null||!a.reactions?.every(f=>c.has(f));d&&hr(o)}return i}delete(e){var r=this.#e,n=r.get(e),a=super.delete(e);return n!==void 0&&(r.delete(e),V(this.#r,super.size),V(n,-1),hr(this.#t)),a}clear(){if(super.size!==0){super.clear();var e=this.#e;V(this.#r,0);for(var r of e.values())V(r,-1);hr(this.#t),e.clear()}}#i(){l(this.#t);var e=this.#e;if(this.#r.v!==e.size){for(var r of super.keys())if(!e.has(r)){var n=this.#a(0);e.set(r,n)}}for([,n]of this.#e)l(n)}keys(){return l(this.#t),super.keys()}values(){return this.#i(),super.values()}entries(){return this.#i(),super.entries()}[Symbol.iterator](){return this.entries()}get size(){return l(this.#r),super.size}}class hh{#e;#t;constructor(e,r){this.#e=e,this.#t=bs(r)}get current(){return this.#t(),this.#e()}}const gh=/\(.+\)/,_h=new Set(["all","print","screen","and","or","not","only"]);class yh extends hh{constructor(e,r){let n=gh.test(e)||e.split(/[\s,]+/).some(s=>_h.has(s.trim()))?e:`(${e})`;const a=window.matchMedia(n);super(()=>a.matches,s=>Nt(a,"change",s))}}class bh{#e;#t;constructor(e={}){const{window:r=od,document:n=r?.document}=e;r!==void 0&&(this.#e=n,this.#t=bs(a=>{const s=Nt(r,"focusin",a),i=Nt(r,"focusout",a);return()=>{s(),i()}}))}get current(){return this.#t?.(),this.#e?vh(this.#e):null}}new bh;function xh(t){return typeof t=="function"}class gn{#e;#t;constructor(e){this.#e=e,this.#t=Symbol(e)}get key(){return this.#t}exists(){return Wu(this.#t)}get(){const e=Di(this.#t);if(e===void 0)throw new Error(`Context "${this.#e}" not found`);return e}getOr(e){const r=Di(this.#t);return r===void 0?e:r}set(e){return Bl(this.#t,e)}}function wh(t,e){switch(t){case"post":Ct(e);break;case"pre":ff(e);break}}function ld(t,e,r,n={}){const{lazy:a=!1}=n;let s=!a,i=Array.isArray(t)?[]:void 0;wh(e,()=>{const o=Array.isArray(t)?t.map(d=>d()):t();if(!s){s=!0,i=o;return}const c=Tr(()=>r(o,i));return i=o,c})}function kt(t,e,r){ld(t,"post",e,r)}function Sh(t,e,r){ld(t,"pre",e,r)}kt.pre=Sh;function Qo(t){return xh(t)?t():t}class kh{#e={width:0,height:0};#t=!1;#r;#n;#a;#i=$(()=>(l(this.#s)?.(),this.getSize().width));#l=$(()=>(l(this.#s)?.(),this.getSize().height));#s=$(()=>{const e=Qo(this.#n);if(e)return bs(r=>{if(!this.#a)return;const n=new this.#a.ResizeObserver(a=>{this.#t=!0;for(const s of a){const i=this.#r.box==="content-box"?s.contentBoxSize:s.borderBoxSize,o=Array.isArray(i)?i:[i];this.#e.width=o.reduce((c,d)=>Math.max(c,d.inlineSize),0),this.#e.height=o.reduce((c,d)=>Math.max(c,d.blockSize),0)}r()});return n.observe(e),()=>{this.#t=!1,n.disconnect()}})});constructor(e,r={box:"border-box"}){this.#a=r.window??od,this.#r=r,this.#n=e,this.#e={width:0,height:0}}calculateSize(){const e=Qo(this.#n);if(!e||!this.#a)return;const r=e.offsetWidth,n=e.offsetHeight;if(this.#r.box==="border-box")return{width:r,height:n};const a=this.#a.getComputedStyle(e),s=parseFloat(a.paddingLeft)+parseFloat(a.paddingRight),i=parseFloat(a.paddingTop)+parseFloat(a.paddingBottom),o=parseFloat(a.borderLeftWidth)+parseFloat(a.borderRightWidth),c=parseFloat(a.borderTopWidth)+parseFloat(a.borderBottomWidth),d=r-s-o,f=n-i-c;return{width:d,height:f}}getSize(){return this.#t?this.#e:this.calculateSize()??this.#e}get current(){return l(this.#s)?.(),this.getSize()}get width(){return l(this.#i)}get height(){return l(this.#l)}}class Ph{#e=Se(void 0);constructor(e,r){r!==void 0&&V(this.#e,r,!0),kt(()=>e(),(n,a)=>{V(this.#e,a,!0)})}get current(){return l(this.#e)}}function zn(t){Ct(()=>()=>{t()})}function Is(t,e){return setTimeout(e,t)}function Ns(t){bf().then(t)}function Ah(t){Ct(()=>Tr(()=>t()))}const Eh=1,Ch=9,Th=11;function Zi(t){return ya(t)&&t.nodeType===Eh&&typeof t.nodeName=="string"}function cd(t){return ya(t)&&t.nodeType===Ch}function Fh(t){return ya(t)&&t.constructor?.name==="VisualViewport"}function Rh(t){return ya(t)&&t.nodeType!==void 0}function dd(t){return Rh(t)&&t.nodeType===Th&&"host"in t}function Oh(t,e){if(!t||!e||!Zi(t)||!Zi(e))return!1;const r=e.getRootNode?.();if(t===e||t.contains(e))return!0;if(r&&dd(r)){let n=e;for(;n;){if(t===n)return!0;n=n.parentNode||n.host}}return!1}function ud(t){return cd(t)?t:Fh(t)?t.document:t?.ownerDocument??document}function Ds(t){return dd(t)?Ds(t.host):cd(t)?t.defaultView??window:Zi(t)?t.ownerDocument?.defaultView??window:window}function Ih(t){let e=t.activeElement;for(;e?.shadowRoot;){const r=e.shadowRoot.activeElement;if(r===e)break;e=r}return e}class Ms{element;#e=$(()=>this.element.current?this.element.current.getRootNode()??document:document);get root(){return l(this.#e)}set root(e){V(this.#e,e)}constructor(e){typeof e=="function"?this.element=ee.with(e):this.element=e}getDocument=()=>ud(this.root);getWindow=()=>this.getDocument().defaultView??window;getActiveElement=()=>Ih(this.root);isActiveElement=e=>e===this.getActiveElement();getElementById(e){return this.root.getElementById(e)}querySelector=e=>this.root?this.root.querySelector(e):null;querySelectorAll=e=>this.root?this.root.querySelectorAll(e):[];setTimeout=(e,r)=>this.getWindow().setTimeout(e,r);clearTimeout=e=>this.getWindow().clearTimeout(e)}function lr(t,e){return{[Df()]:r=>ee.isBox(t)?(t.current=r,Tr(()=>e?.(r)),()=>{"isConnected"in r&&r.isConnected||(t.current=null,e?.(null))}):(t(r),Tr(()=>e?.(r)),()=>{"isConnected"in r&&r.isConnected||(t(null),e?.(null))})}}function Nh(t){return t?"open":"closed"}function fd(t){return t?"":void 0}function Dh(t){return t?"true":void 0}class Mh{#e;#t;attrs;constructor(e){this.#e=e.getVariant?e.getVariant():null,this.#t=this.#e?`data-${this.#e}-`:`data-${e.component}-`,this.getAttr=this.getAttr.bind(this),this.selector=this.selector.bind(this),this.attrs=Object.fromEntries(e.parts.map(r=>[r,this.getAttr(r)]))}getAttr(e,r){return r?`data-${r}-${e}`:`${this.#t}${e}`}selector(e,r){return`[${this.getAttr(e,r)}]`}}function Ls(t){const e=new Mh(t);return{...e.attrs,selector:e.selector,getAttr:e.getAttr}}const Lh="Enter",zh="Escape",Bh=" ";function gt(){}function Kr(t,e){return`bits-${t}`}class Uh{state;#e;constructor(e,r){this.state=ee(e),this.#e=r,this.dispatch=this.dispatch.bind(this)}#t(e){return this.#e[this.state.current][e]??this.state.current}dispatch(e){this.state.current=this.#t(e)}}const jh={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}};class $h{opts;#e=Se("none");get prevAnimationNameState(){return l(this.#e)}set prevAnimationNameState(e){V(this.#e,e,!0)}#t=Se(pt({}));get styles(){return l(this.#t)}set styles(e){V(this.#t,e,!0)}initialStatus;previousPresent;machine;present;constructor(e){this.opts=e,this.present=this.opts.open,this.initialStatus=e.open.current?"mounted":"unmounted",this.previousPresent=new Ph(()=>this.present.current),this.machine=new Uh(this.initialStatus,jh),this.handleAnimationEnd=this.handleAnimationEnd.bind(this),this.handleAnimationStart=this.handleAnimationStart.bind(this),qh(this),Vh(this),Gh(this)}handleAnimationEnd(e){if(!this.opts.ref.current)return;const r=ja(this.opts.ref.current),n=r.includes(e.animationName)||r==="none";e.target===this.opts.ref.current&&n&&this.machine.dispatch("ANIMATION_END")}handleAnimationStart(e){this.opts.ref.current&&e.target===this.opts.ref.current&&(this.prevAnimationNameState=ja(this.opts.ref.current))}#r=$(()=>["mounted","unmountSuspended"].includes(this.machine.state.current));get isPresent(){return l(this.#r)}set isPresent(e){V(this.#r,e)}}function qh(t){kt(()=>t.present.current,()=>{if(!t.opts.ref.current||!(t.present.current!==t.previousPresent.current))return;const r=t.prevAnimationNameState,n=ja(t.opts.ref.current);if(t.present.current)t.machine.dispatch("MOUNT");else if(n==="none"||t.styles.display==="none")t.machine.dispatch("UNMOUNT");else{const a=r!==n;t.previousPresent.current&&a?t.machine.dispatch("ANIMATION_OUT"):t.machine.dispatch("UNMOUNT")}})}function Vh(t){kt(()=>t.machine.state.current,()=>{if(!t.opts.ref.current)return;const e=ja(t.opts.ref.current);t.prevAnimationNameState=t.machine.state.current==="mounted"?e:"none"})}function Gh(t){kt(()=>t.opts.ref.current,()=>{if(t.opts.ref.current)return t.styles=getComputedStyle(t.opts.ref.current),on(Nt(t.opts.ref.current,"animationstart",t.handleAnimationStart),Nt(t.opts.ref.current,"animationcancel",t.handleAnimationEnd),Nt(t.opts.ref.current,"animationend",t.handleAnimationEnd))})}function ja(t){return t&&getComputedStyle(t).animationName||"none"}function zs(t,e){ie(e,!0);const r=new $h({open:ee.with(()=>e.open),ref:e.ref});var n=q(),a=A(n);{var s=i=>{var o=q(),c=A(o);fe(c,()=>e.presence??ye,()=>({present:r.isPresent})),u(i,o)};L(a,i=>{(e.forceMount||e.open||r.isPresent)&&i(s)})}u(t,n),se()}class Wh{#e;#t=void 0;#r=!1;constructor(e){this.#e=e,zn(()=>this.#n())}#n(){this.#t&&(window.cancelAnimationFrame(this.#t),this.#t=void 0),this.#r=!1}run(e){if(this.#r)return;this.#n(),this.#r=!0;const r=this.#e.ref.current;if(!r){this.#r=!1;return}if(typeof r.getAnimations!="function"){this.#a(e);return}this.#t=window.requestAnimationFrame(()=>{const n=r.getAnimations();if(n.length===0){this.#a(e);return}Promise.allSettled(n.map(a=>a.finished)).then(()=>{this.#a(e)})})}#a(e){const r=()=>{e(),this.#r=!1};this.#e.afterTick?Ns(r):r()}}class pd{#e;#t;#r;constructor(e){this.#e=e,this.#t=e.enabled??!0,this.#r=new Wh({ref:this.#e.ref,afterTick:this.#e.open}),kt([()=>this.#e.open.current],([r])=>{this.#t&&this.#r.run(()=>{r===this.#e.open.current&&this.#e.onComplete()})})}}const Hh=Ls({component:"dialog",parts:["content","trigger","overlay","title","description","close","cancel","action"]}),Bn=new gn("Dialog.Root | AlertDialog.Root");class Bs{static create(e){return Bn.set(new Bs(e))}opts;#e=Se(null);get triggerNode(){return l(this.#e)}set triggerNode(e){V(this.#e,e,!0)}#t=Se(null);get contentNode(){return l(this.#t)}set contentNode(e){V(this.#t,e,!0)}#r=Se(null);get descriptionNode(){return l(this.#r)}set descriptionNode(e){V(this.#r,e,!0)}#n=Se(void 0);get contentId(){return l(this.#n)}set contentId(e){V(this.#n,e,!0)}#a=Se(void 0);get titleId(){return l(this.#a)}set titleId(e){V(this.#a,e,!0)}#i=Se(void 0);get triggerId(){return l(this.#i)}set triggerId(e){V(this.#i,e,!0)}#l=Se(void 0);get descriptionId(){return l(this.#l)}set descriptionId(e){V(this.#l,e,!0)}#s=Se(null);get cancelNode(){return l(this.#s)}set cancelNode(e){V(this.#s,e,!0)}constructor(e){this.opts=e,this.handleOpen=this.handleOpen.bind(this),this.handleClose=this.handleClose.bind(this),new pd({ref:ee.with(()=>this.contentNode),open:this.opts.open,enabled:!0,onComplete:()=>{this.opts.onOpenChangeComplete.current(this.opts.open.current)}})}handleOpen(){this.opts.open.current||(this.opts.open.current=!0)}handleClose(){this.opts.open.current&&(this.opts.open.current=!1)}getBitsAttr=e=>Hh.getAttr(e,this.opts.variant.current);#o=$(()=>({"data-state":Nh(this.opts.open.current)}));get sharedProps(){return l(this.#o)}set sharedProps(e){V(this.#o,e)}}class Us{static create(e){return new Us(e,Bn.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.attachment=lr(this.opts.ref),this.onclick=this.onclick.bind(this),this.onkeydown=this.onkeydown.bind(this)}onclick(e){this.opts.disabled.current||e.button>0||this.root.handleClose()}onkeydown(e){this.opts.disabled.current||(e.key===Bh||e.key===Lh)&&(e.preventDefault(),this.root.handleClose())}#e=$(()=>({id:this.opts.id.current,[this.root.getBitsAttr(this.opts.variant.current)]:"",onclick:this.onclick,onkeydown:this.onkeydown,disabled:this.opts.disabled.current?!0:void 0,tabindex:0,...this.root.sharedProps,...this.attachment}));get props(){return l(this.#e)}set props(e){V(this.#e,e)}}class js{static create(e){return new js(e,Bn.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.root.titleId=this.opts.id.current,this.attachment=lr(this.opts.ref),kt.pre(()=>this.opts.id.current,n=>{this.root.titleId=n})}#e=$(()=>({id:this.opts.id.current,role:"heading","aria-level":this.opts.level.current,[this.root.getBitsAttr("title")]:"",...this.root.sharedProps,...this.attachment}));get props(){return l(this.#e)}set props(e){V(this.#e,e)}}class $s{static create(e){return new $s(e,Bn.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.root.descriptionId=this.opts.id.current,this.attachment=lr(this.opts.ref,n=>{this.root.descriptionNode=n}),kt.pre(()=>this.opts.id.current,n=>{this.root.descriptionId=n})}#e=$(()=>({id:this.opts.id.current,[this.root.getBitsAttr("description")]:"",...this.root.sharedProps,...this.attachment}));get props(){return l(this.#e)}set props(e){V(this.#e,e)}}class qs{static create(e){return new qs(e,Bn.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.attachment=lr(this.opts.ref,n=>{this.root.contentNode=n,this.root.contentId=n?.id})}#e=$(()=>({open:this.root.opts.open.current}));get snippetProps(){return l(this.#e)}set snippetProps(e){V(this.#e,e)}#t=$(()=>({id:this.opts.id.current,role:this.root.opts.variant.current==="alert-dialog"?"alertdialog":"dialog","aria-modal":"true","aria-describedby":this.root.descriptionId,"aria-labelledby":this.root.titleId,[this.root.getBitsAttr("content")]:"",style:{pointerEvents:"auto",outline:this.root.opts.variant.current==="alert-dialog"?"none":void 0},tabindex:this.root.opts.variant.current==="alert-dialog"?-1:void 0,...this.root.sharedProps,...this.attachment}));get props(){return l(this.#t)}set props(e){V(this.#t,e)}}class Vs{static create(e){return new Vs(e,Bn.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.attachment=lr(this.opts.ref)}#e=$(()=>({open:this.root.opts.open.current}));get snippetProps(){return l(this.#e)}set snippetProps(e){V(this.#e,e)}#t=$(()=>({id:this.opts.id.current,[this.root.getBitsAttr("overlay")]:"",style:{pointerEvents:"auto"},...this.root.sharedProps,...this.attachment}));get props(){return l(this.#t)}set props(e){V(this.#t,e)}}var Yh=k("<div><!></div>");function Kh(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=U(e,"level",3,2),i=xe(e,["$$slots","$$events","$$legacy","id","ref","child","children","level"]);const o=js.create({id:ee.with(()=>n()),level:ee.with(()=>s()),ref:ee.with(()=>a(),m=>a(m))}),c=$(()=>Tt(i,o.props));var d=q(),f=A(d);{var v=m=>{var g=q(),y=A(g);fe(y,()=>e.child,()=>({props:l(c)})),u(m,g)},h=m=>{var g=Yh();Xe(g,()=>({...l(c)}));var y=p(g);fe(y,()=>e.children??ye),u(m,g)};L(f,m=>{e.child?m(v):m(h,!1)})}u(t,d),se()}function Xh(t,e){var r=q(),n=A(r);Mf(n,()=>e.children,a=>{var s=q(),i=A(s);fe(i,()=>e.children??ye),u(a,s)}),u(t,r)}const Gs=typeof document<"u",Jo=Qh();function Qh(){return Gs&&window?.navigator?.userAgent&&(/iP(ad|hone|od)/.test(window.navigator.userAgent)||window?.navigator?.maxTouchPoints>2&&/iPad|Macintosh/.test(window?.navigator.userAgent))}function es(t){return t instanceof HTMLElement}function Ws(t){return t instanceof Element}function Jh(t){return t.matches(":focus-visible")}function Zh(t){return t!==null}const eg=new gn("BitsConfig");function tg(){const t=new rg(null,{});return eg.getOr(t).opts}class rg{opts;constructor(e,r){const n=ng(e,r);this.opts={defaultPortalTo:n(a=>a.defaultPortalTo),defaultLocale:n(a=>a.defaultLocale)}}}function ng(t,e){return r=>ee.with(()=>{const a=r(e)?.current;if(a!==void 0)return a;if(t!==null)return r(t.opts)?.current})}function ag(t,e){return r=>{const n=tg();return ee.with(()=>{const a=r();if(a!==void 0)return a;const s=t(n).current;return s!==void 0?s:e})}}const ig=ag(t=>t.defaultPortalTo,"body");function vd(t,e){ie(e,!0);const r=ig(()=>e.to),n=Hu();let a=$(s);function s(){if(!Gs||e.disabled)return null;let v=null;return typeof r.current=="string"?v=document.querySelector(r.current):v=r.current,v}let i;function o(){i&&(Nf(i),i=null)}kt([()=>l(a),()=>e.disabled],([v,h])=>{if(!v||h){o();return}return i=yc(Xh,{target:v,props:{children:e.children},context:n}),()=>{o()}});var c=q(),d=A(c);{var f=v=>{var h=q(),m=A(h);fe(m,()=>e.children??ye),u(v,h)};L(d,v=>{e.disabled&&v(f)})}u(t,c),se()}function md(t,e,r,n){const a=Array.isArray(e)?e:[e];return a.forEach(s=>t.addEventListener(s,r,n)),()=>{a.forEach(s=>t.removeEventListener(s,r,n))}}function Zo(t,e=500){let r=null;const n=(...a)=>{r!==null&&clearTimeout(r),r=setTimeout(()=>{t(...a)},e)};return n.destroy=()=>{r!==null&&(clearTimeout(r),r=null)},n}function hd(t,e){return t===e||t.contains(e)}function gd(t){return t?.ownerDocument??document}function sg(t,e){const{clientX:r,clientY:n}=t,a=e.getBoundingClientRect();return r<a.left||r>a.right||n<a.top||n>a.bottom}globalThis.bitsDismissableLayers??=new Map;class Hs{static create(e){return new Hs(e)}opts;#e;#t;#r={pointerdown:!1};#n=!1;#a=!1;#i=void 0;#l;#s=gt;constructor(e){this.opts=e,this.#t=e.interactOutsideBehavior,this.#e=e.onInteractOutside,this.#l=e.onFocusOutside,Ct(()=>{this.#i=gd(this.opts.ref.current)});let r=gt;const n=()=>{this.#m(),globalThis.bitsDismissableLayers.delete(this),this.#u.destroy(),r()};kt([()=>this.opts.enabled.current,()=>this.opts.ref.current],()=>{if(!(!this.opts.enabled.current||!this.opts.ref.current))return Is(1,()=>{this.opts.ref.current&&(globalThis.bitsDismissableLayers.set(this,this.#t),r(),r=this.#c())}),n}),zn(()=>{this.#m.destroy(),globalThis.bitsDismissableLayers.delete(this),this.#u.destroy(),this.#s(),r()})}#o=e=>{e.defaultPrevented||this.opts.ref.current&&Ns(()=>{!this.opts.ref.current||this.#h(e.target)||e.target&&!this.#a&&this.#l.current?.(e)})};#c(){return on(Nt(this.#i,"pointerdown",on(this.#v,this.#p),{capture:!0}),Nt(this.#i,"pointerdown",on(this.#f,this.#u)),Nt(this.#i,"focusin",this.#o))}#d=e=>{let r=e;r.defaultPrevented&&(r=el(e)),this.#e.current(e)};#u=Zo(e=>{if(!this.opts.ref.current){this.#s();return}const r=this.opts.isValidEvent.current(e,this.opts.ref.current)||cg(e,this.opts.ref.current);if(!this.#n||this.#g()||!r){this.#s();return}let n=e;if(n.defaultPrevented&&(n=el(n)),this.#t.current!=="close"&&this.#t.current!=="defer-otherwise-close"){this.#s();return}e.pointerType==="touch"?(this.#s(),this.#s=md(this.#i,"click",this.#d,{once:!0})):this.#e.current(n)},10);#v=e=>{this.#r[e.type]=!0};#f=e=>{this.#r[e.type]=!1};#p=()=>{this.opts.ref.current&&(this.#n=lg(this.opts.ref.current))};#h=e=>this.opts.ref.current?hd(this.opts.ref.current,e):!1;#m=Zo(()=>{for(const e in this.#r)this.#r[e]=!1;this.#n=!1},20);#g(){return Object.values(this.#r).some(Boolean)}#_=()=>{this.#a=!0};#y=()=>{this.#a=!1};props={onfocuscapture:this.#_,onblurcapture:this.#y}}function og(t){return t.findLast(([e,{current:r}])=>r==="close"||r==="ignore")}function lg(t){const e=[...globalThis.bitsDismissableLayers],r=og(e);if(r)return r[0].opts.ref.current===t;const[n]=e[0];return n.opts.ref.current===t}function cg(t,e){if("button"in t&&t.button>0)return!1;const r=t.target;return Ws(r)?gd(r).documentElement.contains(r)&&!hd(e,r)&&sg(t,e):!1}function el(t){const e=t.currentTarget,r=t.target;let n;t instanceof PointerEvent?n=new PointerEvent(t.type,t):n=new PointerEvent("pointerdown",t);let a=!1;return new Proxy(n,{get:(i,o)=>o==="currentTarget"?e:o==="target"?r:o==="preventDefault"?()=>{a=!0,typeof i.preventDefault=="function"&&i.preventDefault()}:o==="defaultPrevented"?a:o in i?i[o]:t[o]})}function _d(t,e){ie(e,!0);let r=U(e,"interactOutsideBehavior",3,"close"),n=U(e,"onInteractOutside",3,gt),a=U(e,"onFocusOutside",3,gt),s=U(e,"isValidEvent",3,()=>!1);const i=Hs.create({id:ee.with(()=>e.id),interactOutsideBehavior:ee.with(()=>r()),onInteractOutside:ee.with(()=>n()),enabled:ee.with(()=>e.enabled),onFocusOutside:ee.with(()=>a()),isValidEvent:ee.with(()=>s()),ref:e.ref});var o=q(),c=A(o);fe(c,()=>e.children??ye,()=>({props:i.props})),u(t,o),se()}globalThis.bitsEscapeLayers??=new Map;class Ys{static create(e){return new Ys(e)}opts;domContext;constructor(e){this.opts=e,this.domContext=new Ms(this.opts.ref);let r=gt;kt(()=>e.enabled.current,n=>(n&&(globalThis.bitsEscapeLayers.set(this,e.escapeKeydownBehavior),r=this.#e()),()=>{r(),globalThis.bitsEscapeLayers.delete(this)}))}#e=()=>Nt(this.domContext.getDocument(),"keydown",this.#t,{passive:!1});#t=e=>{if(e.key!==zh||!dg(this))return;const r=new KeyboardEvent(e.type,e);e.preventDefault();const n=this.opts.escapeKeydownBehavior.current;n!=="close"&&n!=="defer-otherwise-close"||this.opts.onEscapeKeydown.current(r)}}function dg(t){const e=[...globalThis.bitsEscapeLayers],r=e.findLast(([a,{current:s}])=>s==="close"||s==="ignore");if(r)return r[0]===t;const[n]=e[0];return n===t}function yd(t,e){ie(e,!0);let r=U(e,"escapeKeydownBehavior",3,"close"),n=U(e,"onEscapeKeydown",3,gt);Ys.create({escapeKeydownBehavior:ee.with(()=>r()),onEscapeKeydown:ee.with(()=>n()),enabled:ee.with(()=>e.enabled),ref:e.ref});var a=q(),s=A(a);fe(s,()=>e.children??ye),u(t,a),se()}class Ks{static instance;#e=ee([]);#t=new WeakMap;static getInstance(){return this.instance||(this.instance=new Ks),this.instance}register(e){const r=this.getActive();r&&r!==e&&r.pause(),this.#e.current=this.#e.current.filter(n=>n!==e),this.#e.current.unshift(e)}unregister(e){this.#e.current=this.#e.current.filter(n=>n!==e);const r=this.getActive();r&&r.resume()}getActive(){return this.#e.current[0]}setFocusMemory(e,r){this.#t.set(e,r)}getFocusMemory(e){return this.#t.get(e)}isActiveScope(e){return this.getActive()===e}}/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/var bd=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],ts=bd.join(","),xd=typeof Element>"u",Fn=xd?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,$a=!xd&&Element.prototype.getRootNode?function(t){var e;return t==null||(e=t.getRootNode)===null||e===void 0?void 0:e.call(t)}:function(t){return t?.ownerDocument},qa=function t(e,r){var n;r===void 0&&(r=!0);var a=e==null||(n=e.getAttribute)===null||n===void 0?void 0:n.call(e,"inert"),s=a===""||a==="true",i=s||r&&e&&t(e.parentNode);return i},ug=function(e){var r,n=e==null||(r=e.getAttribute)===null||r===void 0?void 0:r.call(e,"contenteditable");return n===""||n==="true"},wd=function(e,r,n){if(qa(e))return[];var a=Array.prototype.slice.apply(e.querySelectorAll(ts));return r&&Fn.call(e,ts)&&a.unshift(e),a=a.filter(n),a},Sd=function t(e,r,n){for(var a=[],s=Array.from(e);s.length;){var i=s.shift();if(!qa(i,!1))if(i.tagName==="SLOT"){var o=i.assignedElements(),c=o.length?o:i.children,d=t(c,!0,n);n.flatten?a.push.apply(a,d):a.push({scopeParent:i,candidates:d})}else{var f=Fn.call(i,ts);f&&n.filter(i)&&(r||!e.includes(i))&&a.push(i);var v=i.shadowRoot||typeof n.getShadowRoot=="function"&&n.getShadowRoot(i),h=!qa(v,!1)&&(!n.shadowRootFilter||n.shadowRootFilter(i));if(v&&h){var m=t(v===!0?i.children:v.children,!0,n);n.flatten?a.push.apply(a,m):a.push({scopeParent:i,candidates:m})}else s.unshift.apply(s,i.children)}}return a},kd=function(e){return!isNaN(parseInt(e.getAttribute("tabindex"),10))},Pd=function(e){if(!e)throw new Error("No node provided");return e.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||ug(e))&&!kd(e)?0:e.tabIndex},fg=function(e,r){var n=Pd(e);return n<0&&r&&!kd(e)?0:n},pg=function(e,r){return e.tabIndex===r.tabIndex?e.documentOrder-r.documentOrder:e.tabIndex-r.tabIndex},Ad=function(e){return e.tagName==="INPUT"},vg=function(e){return Ad(e)&&e.type==="hidden"},mg=function(e){var r=e.tagName==="DETAILS"&&Array.prototype.slice.apply(e.children).some(function(n){return n.tagName==="SUMMARY"});return r},hg=function(e,r){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===r)return e[n]},gg=function(e){if(!e.name)return!0;var r=e.form||$a(e),n=function(o){return r.querySelectorAll('input[type="radio"][name="'+o+'"]')},a;if(typeof window<"u"&&typeof window.CSS<"u"&&typeof window.CSS.escape=="function")a=n(window.CSS.escape(e.name));else try{a=n(e.name)}catch(i){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",i.message),!1}var s=hg(a,e.form);return!s||s===e},_g=function(e){return Ad(e)&&e.type==="radio"},yg=function(e){return _g(e)&&!gg(e)},bg=function(e){var r,n=e&&$a(e),a=(r=n)===null||r===void 0?void 0:r.host,s=!1;if(n&&n!==e){var i,o,c;for(s=!!((i=a)!==null&&i!==void 0&&(o=i.ownerDocument)!==null&&o!==void 0&&o.contains(a)||e!=null&&(c=e.ownerDocument)!==null&&c!==void 0&&c.contains(e));!s&&a;){var d,f,v;n=$a(a),a=(d=n)===null||d===void 0?void 0:d.host,s=!!((f=a)!==null&&f!==void 0&&(v=f.ownerDocument)!==null&&v!==void 0&&v.contains(a))}}return s},tl=function(e){var r=e.getBoundingClientRect(),n=r.width,a=r.height;return n===0&&a===0},xg=function(e,r){var n=r.displayCheck,a=r.getShadowRoot;if(getComputedStyle(e).visibility==="hidden")return!0;var s=Fn.call(e,"details>summary:first-of-type"),i=s?e.parentElement:e;if(Fn.call(i,"details:not([open]) *"))return!0;if(!n||n==="full"||n==="legacy-full"){if(typeof a=="function"){for(var o=e;e;){var c=e.parentElement,d=$a(e);if(c&&!c.shadowRoot&&a(c)===!0)return tl(e);e.assignedSlot?e=e.assignedSlot:!c&&d!==e.ownerDocument?e=d.host:e=c}e=o}if(bg(e))return!e.getClientRects().length;if(n!=="legacy-full")return!0}else if(n==="non-zero-area")return tl(e);return!1},wg=function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var r=e.parentElement;r;){if(r.tagName==="FIELDSET"&&r.disabled){for(var n=0;n<r.children.length;n++){var a=r.children.item(n);if(a.tagName==="LEGEND")return Fn.call(r,"fieldset[disabled] *")?!0:!a.contains(e)}return!0}r=r.parentElement}return!1},Va=function(e,r){return!(r.disabled||qa(r)||vg(r)||xg(r,e)||mg(r)||wg(r))},rl=function(e,r){return!(yg(r)||Pd(r)<0||!Va(e,r))},Sg=function(e){var r=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(r)||r>=0)},kg=function t(e){var r=[],n=[];return e.forEach(function(a,s){var i=!!a.scopeParent,o=i?a.scopeParent:a,c=fg(o,i),d=i?t(a.candidates):o;c===0?i?r.push.apply(r,d):r.push(o):n.push({documentOrder:s,tabIndex:c,item:a,isScope:i,content:d})}),n.sort(pg).reduce(function(a,s){return s.isScope?a.push.apply(a,s.content):a.push(s.content),a},[]).concat(r)},Pg=function(e,r){r=r||{};var n;return r.getShadowRoot?n=Sd([e],r.includeContainer,{filter:rl.bind(null,r),flatten:!1,getShadowRoot:r.getShadowRoot,shadowRootFilter:Sg}):n=wd(e,r.includeContainer,rl.bind(null,r)),kg(n)},Ag=function(e,r){r=r||{};var n;return r.getShadowRoot?n=Sd([e],r.includeContainer,{filter:Va.bind(null,r),flatten:!0,getShadowRoot:r.getShadowRoot}):n=wd(e,r.includeContainer,Va.bind(null,r)),n},Eg=bd.concat("iframe").join(","),Cg=function(e,r){if(r=r||{},!e)throw new Error("No node provided");return Fn.call(e,Eg)===!1?!1:Va(r,e)};class Xs{#e=!1;#t=null;#r=Ks.getInstance();#n=[];#a;constructor(e){this.#a=e}get paused(){return this.#e}pause(){this.#e=!0}resume(){this.#e=!1}#i(){for(const e of this.#n)e();this.#n=[]}mount(e){this.#t&&this.unmount(),this.#t=e,this.#r.register(this),this.#o(),this.#l()}unmount(){this.#t&&(this.#i(),this.#s(),this.#r.unregister(this),this.#t=null)}#l(){if(!this.#t)return;const e=new CustomEvent("focusScope.onOpenAutoFocus",{bubbles:!1,cancelable:!0});this.#a.onOpenAutoFocus.current(e),e.defaultPrevented||requestAnimationFrame(()=>{if(!this.#t)return;const r=this.#d();r?(r.focus(),this.#r.setFocusMemory(this,r)):this.#t.focus()})}#s(){const e=new CustomEvent("focusScope.onCloseAutoFocus",{bubbles:!1,cancelable:!0});if(this.#a.onCloseAutoFocus.current?.(e),!e.defaultPrevented){const r=document.activeElement;r&&r!==document.body&&r.focus()}}#o(){if(!this.#t||!this.#a.trap.current)return;const e=this.#t,r=e.ownerDocument,n=i=>{if(this.#e||!this.#r.isActiveScope(this))return;const o=i.target;if(!o)return;if(e.contains(o))this.#r.setFocusMemory(this,o);else{const d=this.#r.getFocusMemory(this);if(d&&e.contains(d)&&Cg(d))i.preventDefault(),d.focus();else{const f=this.#d(),v=this.#u()[0];(f||v||e).focus()}}},a=i=>{if(!this.#a.loop||this.#e||i.key!=="Tab"||!this.#r.isActiveScope(this))return;const o=this.#c();if(o.length<2)return;const c=o[0],d=o[o.length-1];!i.shiftKey&&r.activeElement===d?(i.preventDefault(),c.focus()):i.shiftKey&&r.activeElement===c&&(i.preventDefault(),d.focus())};this.#n.push(Nt(r,"focusin",n,{capture:!0}),Nt(e,"keydown",a));const s=new MutationObserver(()=>{const i=this.#r.getFocusMemory(this);if(i&&!e.contains(i)){const o=this.#d(),c=this.#u()[0],d=o||c;d?(d.focus(),this.#r.setFocusMemory(this,d)):e.focus()}});s.observe(e,{childList:!0,subtree:!0}),this.#n.push(()=>s.disconnect())}#c(){return this.#t?Pg(this.#t,{includeContainer:!1,getShadowRoot:!0}):[]}#d(){return this.#c()[0]||null}#u(){return this.#t?Ag(this.#t,{includeContainer:!1,getShadowRoot:!0}):[]}static use(e){let r=null;return kt([()=>e.ref.current,()=>e.enabled.current],([n,a])=>{n&&a?(r||(r=new Xs(e)),r.mount(n)):r&&(r.unmount(),r=null)}),zn(()=>{r?.unmount()}),{get props(){return{tabindex:-1}}}}}function Ed(t,e){ie(e,!0);let r=U(e,"enabled",3,!1),n=U(e,"trapFocus",3,!1),a=U(e,"loop",3,!1),s=U(e,"onCloseAutoFocus",3,gt),i=U(e,"onOpenAutoFocus",3,gt);const o=Xs.use({enabled:ee.with(()=>r()),trap:ee.with(()=>n()),loop:a(),onCloseAutoFocus:ee.with(()=>s()),onOpenAutoFocus:ee.with(()=>i()),ref:e.ref});var c=q(),d=A(c);fe(d,()=>e.focusScope??ye,()=>({props:o.props})),u(t,c),se()}globalThis.bitsTextSelectionLayers??=new Map;class Qs{static create(e){return new Qs(e)}opts;domContext;#e=gt;constructor(e){this.opts=e,this.domContext=new Ms(e.ref);let r=gt;kt(()=>this.opts.enabled.current,n=>(n&&(globalThis.bitsTextSelectionLayers.set(this,this.opts.enabled),r(),r=this.#t()),()=>{r(),this.#n(),globalThis.bitsTextSelectionLayers.delete(this)}))}#t(){return on(Nt(this.domContext.getDocument(),"pointerdown",this.#r),Nt(this.domContext.getDocument(),"pointerup",id(this.#n,this.opts.onPointerUp.current)))}#r=e=>{const r=this.opts.ref.current,n=e.target;!es(r)||!es(n)||!this.opts.enabled.current||!Fg(this)||!Oh(r,n)||(this.opts.onPointerDown.current(e),!e.defaultPrevented&&(this.#e=Tg(r,this.domContext.getDocument().body)))};#n=()=>{this.#e(),this.#e=gt}}const nl=t=>t.style.userSelect||t.style.webkitUserSelect;function Tg(t,e){const r=nl(e),n=nl(t);return Fa(e,"none"),Fa(t,"text"),()=>{Fa(e,r),Fa(t,n)}}function Fa(t,e){t.style.userSelect=e,t.style.webkitUserSelect=e}function Fg(t){const e=[...globalThis.bitsTextSelectionLayers];if(!e.length)return!1;const r=e.at(-1);return r?r[0]===t:!1}function Cd(t,e){ie(e,!0);let r=U(e,"preventOverflowTextSelection",3,!0),n=U(e,"onPointerDown",3,gt),a=U(e,"onPointerUp",3,gt);Qs.create({id:ee.with(()=>e.id),onPointerDown:ee.with(()=>n()),onPointerUp:ee.with(()=>a()),enabled:ee.with(()=>e.enabled&&r()),ref:e.ref});var s=q(),i=A(s);fe(i,()=>e.children??ye),u(t,s),se()}globalThis.bitsIdCounter??={current:0};function ba(t="bits"){return globalThis.bitsIdCounter.current++,`${t}-${globalThis.bitsIdCounter.current}`}class Rg{#e;#t=0;#r=Se();#n;constructor(e){this.#e=e}#a(){this.#t-=1,this.#n&&this.#t<=0&&(this.#n(),V(this.#r,void 0),this.#n=void 0)}get(...e){return this.#t+=1,l(this.#r)===void 0&&(this.#n=pf(()=>{V(this.#r,this.#e(...e),!0)})),Ct(()=>()=>{this.#a()}),l(this.#r)}}const Og=new Rg(()=>{const t=new mh,e=$(()=>{for(const s of t.values())if(s)return!0;return!1});let r=Se(null),n=null;function a(){Gs&&(document.body.setAttribute("style",l(r)??""),document.body.style.removeProperty("--scrollbar-width"),Jo&&n?.())}return kt(()=>l(e),()=>{if(!l(e))return;V(r,document.body.getAttribute("style"),!0);const s=getComputedStyle(document.body),i=window.innerWidth-document.documentElement.clientWidth,c={padding:Number.parseInt(s.paddingRight??"0",10)+i,margin:Number.parseInt(s.marginRight??"0",10)};i>0&&(document.body.style.paddingRight=`${c.padding}px`,document.body.style.marginRight=`${c.margin}px`,document.body.style.setProperty("--scrollbar-width",`${i}px`),document.body.style.overflow="hidden"),Jo&&(n=md(document,"touchmove",d=>{d.target===document.documentElement&&(d.touches.length>1||d.preventDefault())},{passive:!1})),Ns(()=>{document.body.style.pointerEvents="none",document.body.style.overflow="hidden"})}),zn(()=>()=>{n?.()}),{get map(){return t},resetBodyStyle:a}});class Ig{#e=ba();#t;#r=()=>null;#n;locked;constructor(e,r=()=>null){this.#t=e,this.#r=r,this.#n=Og.get(),this.#n&&(this.#n.map.set(this.#e,this.#t??!1),this.locked=ee.with(()=>this.#n.map.get(this.#e)??!1,n=>this.#n.map.set(this.#e,n)),zn(()=>{if(this.#n.map.delete(this.#e),Ng(this.#n.map))return;const n=this.#r();n===null?requestAnimationFrame(()=>this.#n.resetBodyStyle()):Is(n,()=>this.#n.resetBodyStyle())}))}}function Ng(t){for(const[e,r]of t)if(r)return!0;return!1}function Ga(t,e){ie(e,!0);let r=U(e,"preventScroll",3,!0),n=U(e,"restoreScrollDelay",3,null);r()&&new Ig(r(),()=>n()),se()}function Dg({forceMount:t,present:e,open:r}){return(t||e)&&r}var Mg=k("<div><!></div>");function Lg(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"forceMount",3,!1),s=U(e,"ref",15,null),i=xe(e,["$$slots","$$events","$$legacy","id","forceMount","child","children","ref"]);const o=Vs.create({id:ee.with(()=>n()),ref:ee.with(()=>s(),d=>s(d))}),c=$(()=>Tt(i,o.props));{const d=v=>{var h=q(),m=A(h);{var g=E=>{var S=q(),b=A(S);{let O=$(()=>({props:Tt(l(c)),...o.snippetProps}));fe(b,()=>e.child,()=>l(O))}u(E,S)},y=E=>{var S=Mg();Xe(S,O=>({...O}),[()=>Tt(l(c))]);var b=p(S);fe(b,()=>e.children??ye,()=>o.snippetProps),u(E,S)};L(m,E=>{e.child?E(g):E(y,!1)})}u(v,h)};let f=$(()=>o.root.opts.open.current||a());zs(t,{get open(){return l(f)},get ref(){return o.opts.ref},presence:d,$$slots:{presence:!0}})}se()}var zg=k("<div><!></div>");function Bg(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=xe(e,["$$slots","$$events","$$legacy","id","children","child","ref"]);const i=$s.create({id:ee.with(()=>n()),ref:ee.with(()=>a(),h=>a(h))}),o=$(()=>Tt(s,i.props));var c=q(),d=A(c);{var f=h=>{var m=q(),g=A(m);fe(g,()=>e.child,()=>({props:l(o)})),u(h,m)},v=h=>{var m=zg();Xe(m,()=>({...l(o)}));var g=p(m);fe(g,()=>e.children??ye),u(h,m)};L(d,h=>{e.child?h(f):h(v,!1)})}u(t,c),se()}const Ug=["top","right","bottom","left"],$r=Math.min,Kt=Math.max,Wa=Math.round,Ra=Math.floor,_r=t=>({x:t,y:t}),jg={left:"right",right:"left",bottom:"top",top:"bottom"},$g={start:"end",end:"start"};function rs(t,e,r){return Kt(t,$r(e,r))}function Fr(t,e){return typeof t=="function"?t(e):t}function Rr(t){return t.split("-")[0]}function Un(t){return t.split("-")[1]}function Js(t){return t==="x"?"y":"x"}function Zs(t){return t==="y"?"height":"width"}const qg=new Set(["top","bottom"]);function gr(t){return qg.has(Rr(t))?"y":"x"}function eo(t){return Js(gr(t))}function Vg(t,e,r){r===void 0&&(r=!1);const n=Un(t),a=eo(t),s=Zs(a);let i=a==="x"?n===(r?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(i=Ha(i)),[i,Ha(i)]}function Gg(t){const e=Ha(t);return[ns(t),e,ns(e)]}function ns(t){return t.replace(/start|end/g,e=>$g[e])}const al=["left","right"],il=["right","left"],Wg=["top","bottom"],Hg=["bottom","top"];function Yg(t,e,r){switch(t){case"top":case"bottom":return r?e?il:al:e?al:il;case"left":case"right":return e?Wg:Hg;default:return[]}}function Kg(t,e,r,n){const a=Un(t);let s=Yg(Rr(t),r==="start",n);return a&&(s=s.map(i=>i+"-"+a),e&&(s=s.concat(s.map(ns)))),s}function Ha(t){return t.replace(/left|right|bottom|top/g,e=>jg[e])}function Xg(t){return{top:0,right:0,bottom:0,left:0,...t}}function Td(t){return typeof t!="number"?Xg(t):{top:t,right:t,bottom:t,left:t}}function Ya(t){const{x:e,y:r,width:n,height:a}=t;return{width:n,height:a,top:r,left:e,right:e+n,bottom:r+a,x:e,y:r}}function sl(t,e,r){let{reference:n,floating:a}=t;const s=gr(e),i=eo(e),o=Zs(i),c=Rr(e),d=s==="y",f=n.x+n.width/2-a.width/2,v=n.y+n.height/2-a.height/2,h=n[o]/2-a[o]/2;let m;switch(c){case"top":m={x:f,y:n.y-a.height};break;case"bottom":m={x:f,y:n.y+n.height};break;case"right":m={x:n.x+n.width,y:v};break;case"left":m={x:n.x-a.width,y:v};break;default:m={x:n.x,y:n.y}}switch(Un(e)){case"start":m[i]-=h*(r&&d?-1:1);break;case"end":m[i]+=h*(r&&d?-1:1);break}return m}const Qg=async(t,e,r)=>{const{placement:n="bottom",strategy:a="absolute",middleware:s=[],platform:i}=r,o=s.filter(Boolean),c=await(i.isRTL==null?void 0:i.isRTL(e));let d=await i.getElementRects({reference:t,floating:e,strategy:a}),{x:f,y:v}=sl(d,n,c),h=n,m={},g=0;for(let y=0;y<o.length;y++){const{name:E,fn:S}=o[y],{x:b,y:O,data:z,reset:M}=await S({x:f,y:v,initialPlacement:n,placement:h,strategy:a,middlewareData:m,rects:d,platform:i,elements:{reference:t,floating:e}});f=b??f,v=O??v,m={...m,[E]:{...m[E],...z}},M&&g<=50&&(g++,typeof M=="object"&&(M.placement&&(h=M.placement),M.rects&&(d=M.rects===!0?await i.getElementRects({reference:t,floating:e,strategy:a}):M.rects),{x:f,y:v}=sl(d,h,c)),y=-1)}return{x:f,y:v,placement:h,strategy:a,middlewareData:m}};async function da(t,e){var r;e===void 0&&(e={});const{x:n,y:a,platform:s,rects:i,elements:o,strategy:c}=t,{boundary:d="clippingAncestors",rootBoundary:f="viewport",elementContext:v="floating",altBoundary:h=!1,padding:m=0}=Fr(e,t),g=Td(m),E=o[h?v==="floating"?"reference":"floating":v],S=Ya(await s.getClippingRect({element:(r=await(s.isElement==null?void 0:s.isElement(E)))==null||r?E:E.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(o.floating)),boundary:d,rootBoundary:f,strategy:c})),b=v==="floating"?{x:n,y:a,width:i.floating.width,height:i.floating.height}:i.reference,O=await(s.getOffsetParent==null?void 0:s.getOffsetParent(o.floating)),z=await(s.isElement==null?void 0:s.isElement(O))?await(s.getScale==null?void 0:s.getScale(O))||{x:1,y:1}:{x:1,y:1},M=Ya(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:b,offsetParent:O,strategy:c}):b);return{top:(S.top-M.top+g.top)/z.y,bottom:(M.bottom-S.bottom+g.bottom)/z.y,left:(S.left-M.left+g.left)/z.x,right:(M.right-S.right+g.right)/z.x}}const Jg=t=>({name:"arrow",options:t,async fn(e){const{x:r,y:n,placement:a,rects:s,platform:i,elements:o,middlewareData:c}=e,{element:d,padding:f=0}=Fr(t,e)||{};if(d==null)return{};const v=Td(f),h={x:r,y:n},m=eo(a),g=Zs(m),y=await i.getDimensions(d),E=m==="y",S=E?"top":"left",b=E?"bottom":"right",O=E?"clientHeight":"clientWidth",z=s.reference[g]+s.reference[m]-h[m]-s.floating[g],M=h[m]-s.reference[m],T=await(i.getOffsetParent==null?void 0:i.getOffsetParent(d));let R=T?T[O]:0;(!R||!await(i.isElement==null?void 0:i.isElement(T)))&&(R=o.floating[O]||s.floating[g]);const I=z/2-M/2,K=R/2-y[g]/2-1,W=$r(v[S],K),J=$r(v[b],K),j=W,N=R-y[g]-J,P=R/2-y[g]/2+I,x=rs(j,P,N),w=!c.arrow&&Un(a)!=null&&P!==x&&s.reference[g]/2-(P<j?W:J)-y[g]/2<0,F=w?P<j?P-j:P-N:0;return{[m]:h[m]+F,data:{[m]:x,centerOffset:P-x-F,...w&&{alignmentOffset:F}},reset:w}}}),Zg=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var r,n;const{placement:a,middlewareData:s,rects:i,initialPlacement:o,platform:c,elements:d}=e,{mainAxis:f=!0,crossAxis:v=!0,fallbackPlacements:h,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:y=!0,...E}=Fr(t,e);if((r=s.arrow)!=null&&r.alignmentOffset)return{};const S=Rr(a),b=gr(o),O=Rr(o)===o,z=await(c.isRTL==null?void 0:c.isRTL(d.floating)),M=h||(O||!y?[Ha(o)]:Gg(o)),T=g!=="none";!h&&T&&M.push(...Kg(o,y,g,z));const R=[o,...M],I=await da(e,E),K=[];let W=((n=s.flip)==null?void 0:n.overflows)||[];if(f&&K.push(I[S]),v){const P=Vg(a,i,z);K.push(I[P[0]],I[P[1]])}if(W=[...W,{placement:a,overflows:K}],!K.every(P=>P<=0)){var J,j;const P=(((J=s.flip)==null?void 0:J.index)||0)+1,x=R[P];if(x&&(!(v==="alignment"?b!==gr(x):!1)||W.every(C=>gr(C.placement)===b?C.overflows[0]>0:!0)))return{data:{index:P,overflows:W},reset:{placement:x}};let w=(j=W.filter(F=>F.overflows[0]<=0).sort((F,C)=>F.overflows[1]-C.overflows[1])[0])==null?void 0:j.placement;if(!w)switch(m){case"bestFit":{var N;const F=(N=W.filter(C=>{if(T){const D=gr(C.placement);return D===b||D==="y"}return!0}).map(C=>[C.placement,C.overflows.filter(D=>D>0).reduce((D,H)=>D+H,0)]).sort((C,D)=>C[1]-D[1])[0])==null?void 0:N[0];F&&(w=F);break}case"initialPlacement":w=o;break}if(a!==w)return{reset:{placement:w}}}return{}}}};function ol(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function ll(t){return Ug.some(e=>t[e]>=0)}const e_=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:r}=e,{strategy:n="referenceHidden",...a}=Fr(t,e);switch(n){case"referenceHidden":{const s=await da(e,{...a,elementContext:"reference"}),i=ol(s,r.reference);return{data:{referenceHiddenOffsets:i,referenceHidden:ll(i)}}}case"escaped":{const s=await da(e,{...a,altBoundary:!0}),i=ol(s,r.floating);return{data:{escapedOffsets:i,escaped:ll(i)}}}default:return{}}}}},Fd=new Set(["left","top"]);async function t_(t,e){const{placement:r,platform:n,elements:a}=t,s=await(n.isRTL==null?void 0:n.isRTL(a.floating)),i=Rr(r),o=Un(r),c=gr(r)==="y",d=Fd.has(i)?-1:1,f=s&&c?-1:1,v=Fr(e,t);let{mainAxis:h,crossAxis:m,alignmentAxis:g}=typeof v=="number"?{mainAxis:v,crossAxis:0,alignmentAxis:null}:{mainAxis:v.mainAxis||0,crossAxis:v.crossAxis||0,alignmentAxis:v.alignmentAxis};return o&&typeof g=="number"&&(m=o==="end"?g*-1:g),c?{x:m*f,y:h*d}:{x:h*d,y:m*f}}const r_=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var r,n;const{x:a,y:s,placement:i,middlewareData:o}=e,c=await t_(e,t);return i===((r=o.offset)==null?void 0:r.placement)&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:a+c.x,y:s+c.y,data:{...c,placement:i}}}}},n_=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:r,y:n,placement:a}=e,{mainAxis:s=!0,crossAxis:i=!1,limiter:o={fn:E=>{let{x:S,y:b}=E;return{x:S,y:b}}},...c}=Fr(t,e),d={x:r,y:n},f=await da(e,c),v=gr(Rr(a)),h=Js(v);let m=d[h],g=d[v];if(s){const E=h==="y"?"top":"left",S=h==="y"?"bottom":"right",b=m+f[E],O=m-f[S];m=rs(b,m,O)}if(i){const E=v==="y"?"top":"left",S=v==="y"?"bottom":"right",b=g+f[E],O=g-f[S];g=rs(b,g,O)}const y=o.fn({...e,[h]:m,[v]:g});return{...y,data:{x:y.x-r,y:y.y-n,enabled:{[h]:s,[v]:i}}}}}},a_=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:r,y:n,placement:a,rects:s,middlewareData:i}=e,{offset:o=0,mainAxis:c=!0,crossAxis:d=!0}=Fr(t,e),f={x:r,y:n},v=gr(a),h=Js(v);let m=f[h],g=f[v];const y=Fr(o,e),E=typeof y=="number"?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(c){const O=h==="y"?"height":"width",z=s.reference[h]-s.floating[O]+E.mainAxis,M=s.reference[h]+s.reference[O]-E.mainAxis;m<z?m=z:m>M&&(m=M)}if(d){var S,b;const O=h==="y"?"width":"height",z=Fd.has(Rr(a)),M=s.reference[v]-s.floating[O]+(z&&((S=i.offset)==null?void 0:S[v])||0)+(z?0:E.crossAxis),T=s.reference[v]+s.reference[O]+(z?0:((b=i.offset)==null?void 0:b[v])||0)-(z?E.crossAxis:0);g<M?g=M:g>T&&(g=T)}return{[h]:m,[v]:g}}}},i_=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var r,n;const{placement:a,rects:s,platform:i,elements:o}=e,{apply:c=()=>{},...d}=Fr(t,e),f=await da(e,d),v=Rr(a),h=Un(a),m=gr(a)==="y",{width:g,height:y}=s.floating;let E,S;v==="top"||v==="bottom"?(E=v,S=h===(await(i.isRTL==null?void 0:i.isRTL(o.floating))?"start":"end")?"left":"right"):(S=v,E=h==="end"?"top":"bottom");const b=y-f.top-f.bottom,O=g-f.left-f.right,z=$r(y-f[E],b),M=$r(g-f[S],O),T=!e.middlewareData.shift;let R=z,I=M;if((r=e.middlewareData.shift)!=null&&r.enabled.x&&(I=O),(n=e.middlewareData.shift)!=null&&n.enabled.y&&(R=b),T&&!h){const W=Kt(f.left,0),J=Kt(f.right,0),j=Kt(f.top,0),N=Kt(f.bottom,0);m?I=g-2*(W!==0||J!==0?W+J:Kt(f.left,f.right)):R=y-2*(j!==0||N!==0?j+N:Kt(f.top,f.bottom))}await c({...e,availableWidth:I,availableHeight:R});const K=await i.getDimensions(o.floating);return g!==K.width||y!==K.height?{reset:{rects:!0}}:{}}}};function vi(){return typeof window<"u"}function jn(t){return Rd(t)?(t.nodeName||"").toLowerCase():"#document"}function Xt(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function xr(t){var e;return(e=(Rd(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Rd(t){return vi()?t instanceof Node||t instanceof Xt(t).Node:!1}function ur(t){return vi()?t instanceof Element||t instanceof Xt(t).Element:!1}function br(t){return vi()?t instanceof HTMLElement||t instanceof Xt(t).HTMLElement:!1}function cl(t){return!vi()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof Xt(t).ShadowRoot}const s_=new Set(["inline","contents"]);function xa(t){const{overflow:e,overflowX:r,overflowY:n,display:a}=fr(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+r)&&!s_.has(a)}const o_=new Set(["table","td","th"]);function l_(t){return o_.has(jn(t))}const c_=[":popover-open",":modal"];function mi(t){return c_.some(e=>{try{return t.matches(e)}catch{return!1}})}const d_=["transform","translate","scale","rotate","perspective"],u_=["transform","translate","scale","rotate","perspective","filter"],f_=["paint","layout","strict","content"];function to(t){const e=ro(),r=ur(t)?fr(t):t;return d_.some(n=>r[n]?r[n]!=="none":!1)||(r.containerType?r.containerType!=="normal":!1)||!e&&(r.backdropFilter?r.backdropFilter!=="none":!1)||!e&&(r.filter?r.filter!=="none":!1)||u_.some(n=>(r.willChange||"").includes(n))||f_.some(n=>(r.contain||"").includes(n))}function p_(t){let e=qr(t);for(;br(e)&&!Rn(e);){if(to(e))return e;if(mi(e))return null;e=qr(e)}return null}function ro(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const v_=new Set(["html","body","#document"]);function Rn(t){return v_.has(jn(t))}function fr(t){return Xt(t).getComputedStyle(t)}function hi(t){return ur(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function qr(t){if(jn(t)==="html")return t;const e=t.assignedSlot||t.parentNode||cl(t)&&t.host||xr(t);return cl(e)?e.host:e}function Od(t){const e=qr(t);return Rn(e)?t.ownerDocument?t.ownerDocument.body:t.body:br(e)&&xa(e)?e:Od(e)}function ua(t,e,r){var n;e===void 0&&(e=[]),r===void 0&&(r=!0);const a=Od(t),s=a===((n=t.ownerDocument)==null?void 0:n.body),i=Xt(a);if(s){const o=as(i);return e.concat(i,i.visualViewport||[],xa(a)?a:[],o&&r?ua(o):[])}return e.concat(a,ua(a,[],r))}function as(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Id(t){const e=fr(t);let r=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const a=br(t),s=a?t.offsetWidth:r,i=a?t.offsetHeight:n,o=Wa(r)!==s||Wa(n)!==i;return o&&(r=s,n=i),{width:r,height:n,$:o}}function no(t){return ur(t)?t:t.contextElement}function Pn(t){const e=no(t);if(!br(e))return _r(1);const r=e.getBoundingClientRect(),{width:n,height:a,$:s}=Id(e);let i=(s?Wa(r.width):r.width)/n,o=(s?Wa(r.height):r.height)/a;return(!i||!Number.isFinite(i))&&(i=1),(!o||!Number.isFinite(o))&&(o=1),{x:i,y:o}}const m_=_r(0);function Nd(t){const e=Xt(t);return!ro()||!e.visualViewport?m_:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function h_(t,e,r){return e===void 0&&(e=!1),!r||e&&r!==Xt(t)?!1:e}function vn(t,e,r,n){e===void 0&&(e=!1),r===void 0&&(r=!1);const a=t.getBoundingClientRect(),s=no(t);let i=_r(1);e&&(n?ur(n)&&(i=Pn(n)):i=Pn(t));const o=h_(s,r,n)?Nd(s):_r(0);let c=(a.left+o.x)/i.x,d=(a.top+o.y)/i.y,f=a.width/i.x,v=a.height/i.y;if(s){const h=Xt(s),m=n&&ur(n)?Xt(n):n;let g=h,y=as(g);for(;y&&n&&m!==g;){const E=Pn(y),S=y.getBoundingClientRect(),b=fr(y),O=S.left+(y.clientLeft+parseFloat(b.paddingLeft))*E.x,z=S.top+(y.clientTop+parseFloat(b.paddingTop))*E.y;c*=E.x,d*=E.y,f*=E.x,v*=E.y,c+=O,d+=z,g=Xt(y),y=as(g)}}return Ya({width:f,height:v,x:c,y:d})}function ao(t,e){const r=hi(t).scrollLeft;return e?e.left+r:vn(xr(t)).left+r}function Dd(t,e,r){r===void 0&&(r=!1);const n=t.getBoundingClientRect(),a=n.left+e.scrollLeft-(r?0:ao(t,n)),s=n.top+e.scrollTop;return{x:a,y:s}}function g_(t){let{elements:e,rect:r,offsetParent:n,strategy:a}=t;const s=a==="fixed",i=xr(n),o=e?mi(e.floating):!1;if(n===i||o&&s)return r;let c={scrollLeft:0,scrollTop:0},d=_r(1);const f=_r(0),v=br(n);if((v||!v&&!s)&&((jn(n)!=="body"||xa(i))&&(c=hi(n)),br(n))){const m=vn(n);d=Pn(n),f.x=m.x+n.clientLeft,f.y=m.y+n.clientTop}const h=i&&!v&&!s?Dd(i,c,!0):_r(0);return{width:r.width*d.x,height:r.height*d.y,x:r.x*d.x-c.scrollLeft*d.x+f.x+h.x,y:r.y*d.y-c.scrollTop*d.y+f.y+h.y}}function __(t){return Array.from(t.getClientRects())}function y_(t){const e=xr(t),r=hi(t),n=t.ownerDocument.body,a=Kt(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),s=Kt(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight);let i=-r.scrollLeft+ao(t);const o=-r.scrollTop;return fr(n).direction==="rtl"&&(i+=Kt(e.clientWidth,n.clientWidth)-a),{width:a,height:s,x:i,y:o}}function b_(t,e){const r=Xt(t),n=xr(t),a=r.visualViewport;let s=n.clientWidth,i=n.clientHeight,o=0,c=0;if(a){s=a.width,i=a.height;const d=ro();(!d||d&&e==="fixed")&&(o=a.offsetLeft,c=a.offsetTop)}return{width:s,height:i,x:o,y:c}}const x_=new Set(["absolute","fixed"]);function w_(t,e){const r=vn(t,!0,e==="fixed"),n=r.top+t.clientTop,a=r.left+t.clientLeft,s=br(t)?Pn(t):_r(1),i=t.clientWidth*s.x,o=t.clientHeight*s.y,c=a*s.x,d=n*s.y;return{width:i,height:o,x:c,y:d}}function dl(t,e,r){let n;if(e==="viewport")n=b_(t,r);else if(e==="document")n=y_(xr(t));else if(ur(e))n=w_(e,r);else{const a=Nd(t);n={x:e.x-a.x,y:e.y-a.y,width:e.width,height:e.height}}return Ya(n)}function Md(t,e){const r=qr(t);return r===e||!ur(r)||Rn(r)?!1:fr(r).position==="fixed"||Md(r,e)}function S_(t,e){const r=e.get(t);if(r)return r;let n=ua(t,[],!1).filter(o=>ur(o)&&jn(o)!=="body"),a=null;const s=fr(t).position==="fixed";let i=s?qr(t):t;for(;ur(i)&&!Rn(i);){const o=fr(i),c=to(i);!c&&o.position==="fixed"&&(a=null),(s?!c&&!a:!c&&o.position==="static"&&!!a&&x_.has(a.position)||xa(i)&&!c&&Md(t,i))?n=n.filter(f=>f!==i):a=o,i=qr(i)}return e.set(t,n),n}function k_(t){let{element:e,boundary:r,rootBoundary:n,strategy:a}=t;const i=[...r==="clippingAncestors"?mi(e)?[]:S_(e,this._c):[].concat(r),n],o=i[0],c=i.reduce((d,f)=>{const v=dl(e,f,a);return d.top=Kt(v.top,d.top),d.right=$r(v.right,d.right),d.bottom=$r(v.bottom,d.bottom),d.left=Kt(v.left,d.left),d},dl(e,o,a));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function P_(t){const{width:e,height:r}=Id(t);return{width:e,height:r}}function A_(t,e,r){const n=br(e),a=xr(e),s=r==="fixed",i=vn(t,!0,s,e);let o={scrollLeft:0,scrollTop:0};const c=_r(0);function d(){c.x=ao(a)}if(n||!n&&!s)if((jn(e)!=="body"||xa(a))&&(o=hi(e)),n){const m=vn(e,!0,s,e);c.x=m.x+e.clientLeft,c.y=m.y+e.clientTop}else a&&d();s&&!n&&a&&d();const f=a&&!n&&!s?Dd(a,o):_r(0),v=i.left+o.scrollLeft-c.x-f.x,h=i.top+o.scrollTop-c.y-f.y;return{x:v,y:h,width:i.width,height:i.height}}function Fi(t){return fr(t).position==="static"}function ul(t,e){if(!br(t)||fr(t).position==="fixed")return null;if(e)return e(t);let r=t.offsetParent;return xr(t)===r&&(r=r.ownerDocument.body),r}function Ld(t,e){const r=Xt(t);if(mi(t))return r;if(!br(t)){let a=qr(t);for(;a&&!Rn(a);){if(ur(a)&&!Fi(a))return a;a=qr(a)}return r}let n=ul(t,e);for(;n&&l_(n)&&Fi(n);)n=ul(n,e);return n&&Rn(n)&&Fi(n)&&!to(n)?r:n||p_(t)||r}const E_=async function(t){const e=this.getOffsetParent||Ld,r=this.getDimensions,n=await r(t.floating);return{reference:A_(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:n.width,height:n.height}}};function C_(t){return fr(t).direction==="rtl"}const T_={convertOffsetParentRelativeRectToViewportRelativeRect:g_,getDocumentElement:xr,getClippingRect:k_,getOffsetParent:Ld,getElementRects:E_,getClientRects:__,getDimensions:P_,getScale:Pn,isElement:ur,isRTL:C_};function zd(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function F_(t,e){let r=null,n;const a=xr(t);function s(){var o;clearTimeout(n),(o=r)==null||o.disconnect(),r=null}function i(o,c){o===void 0&&(o=!1),c===void 0&&(c=1),s();const d=t.getBoundingClientRect(),{left:f,top:v,width:h,height:m}=d;if(o||e(),!h||!m)return;const g=Ra(v),y=Ra(a.clientWidth-(f+h)),E=Ra(a.clientHeight-(v+m)),S=Ra(f),O={rootMargin:-g+"px "+-y+"px "+-E+"px "+-S+"px",threshold:Kt(0,$r(1,c))||1};let z=!0;function M(T){const R=T[0].intersectionRatio;if(R!==c){if(!z)return i();R?i(!1,R):n=setTimeout(()=>{i(!1,1e-7)},1e3)}R===1&&!zd(d,t.getBoundingClientRect())&&i(),z=!1}try{r=new IntersectionObserver(M,{...O,root:a.ownerDocument})}catch{r=new IntersectionObserver(M,O)}r.observe(t)}return i(!0),s}function R_(t,e,r,n){n===void 0&&(n={});const{ancestorScroll:a=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:o=typeof IntersectionObserver=="function",animationFrame:c=!1}=n,d=no(t),f=a||s?[...d?ua(d):[],...ua(e)]:[];f.forEach(S=>{a&&S.addEventListener("scroll",r,{passive:!0}),s&&S.addEventListener("resize",r)});const v=d&&o?F_(d,r):null;let h=-1,m=null;i&&(m=new ResizeObserver(S=>{let[b]=S;b&&b.target===d&&m&&(m.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var O;(O=m)==null||O.observe(e)})),r()}),d&&!c&&m.observe(d),m.observe(e));let g,y=c?vn(t):null;c&&E();function E(){const S=vn(t);y&&!zd(y,S)&&r(),y=S,g=requestAnimationFrame(E)}return r(),()=>{var S;f.forEach(b=>{a&&b.removeEventListener("scroll",r),s&&b.removeEventListener("resize",r)}),v?.(),(S=m)==null||S.disconnect(),m=null,c&&cancelAnimationFrame(g)}}const O_=r_,I_=n_,N_=Zg,D_=i_,M_=e_,L_=Jg,z_=a_,B_=(t,e,r)=>{const n=new Map,a={platform:T_,...r},s={...a.platform,_c:n};return Qg(t,e,{...a,platform:s})};function tn(t){return typeof t=="function"?t():t}function Bd(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function fl(t,e){const r=Bd(t);return Math.round(e*r)/r}function pl(t){return{[`--bits-${t}-content-transform-origin`]:"var(--bits-floating-transform-origin)",[`--bits-${t}-content-available-width`]:"var(--bits-floating-available-width)",[`--bits-${t}-content-available-height`]:"var(--bits-floating-available-height)",[`--bits-${t}-anchor-width`]:"var(--bits-floating-anchor-width)",[`--bits-${t}-anchor-height`]:"var(--bits-floating-anchor-height)"}}function U_(t){const e=t.whileElementsMounted,r=$(()=>tn(t.open)??!0),n=$(()=>tn(t.middleware)),a=$(()=>tn(t.transform)??!0),s=$(()=>tn(t.placement)??"bottom"),i=$(()=>tn(t.strategy)??"absolute"),o=$(()=>tn(t.sideOffset)??0),c=$(()=>tn(t.alignOffset)??0),d=t.reference;let f=Se(0),v=Se(0);const h=ee(null);let m=Se(pt(l(i))),g=Se(pt(l(s))),y=Se(pt({})),E=Se(!1);const S=$(()=>{const R=h.current?fl(h.current,l(f)):l(f),I=h.current?fl(h.current,l(v)):l(v);return l(a)?{position:l(m),left:"0",top:"0",transform:`translate(${R}px, ${I}px)`,...h.current&&Bd(h.current)>=1.5&&{willChange:"transform"}}:{position:l(m),left:`${R}px`,top:`${I}px`}});let b;function O(){d.current===null||h.current===null||B_(d.current,h.current,{middleware:l(n),placement:l(s),strategy:l(i)}).then(R=>{if(!l(r)&&l(f)!==0&&l(v)!==0){const I=Math.max(Math.abs(l(o)),Math.abs(l(c)),15);if(R.x<=I&&R.y<=I)return}V(f,R.x,!0),V(v,R.y,!0),V(m,R.strategy,!0),V(g,R.placement,!0),V(y,R.middlewareData,!0),V(E,!0)})}function z(){typeof b=="function"&&(b(),b=void 0)}function M(){if(z(),e===void 0){O();return}d.current===null||h.current===null||(b=e(d.current,h.current,O))}function T(){l(r)||V(E,!1)}return Ct(O),Ct(M),Ct(T),Ct(()=>z),{floating:h,reference:d,get strategy(){return l(m)},get placement(){return l(g)},get middlewareData(){return l(y)},get isPositioned(){return l(E)},get floatingStyles(){return l(S)},get update(){return O}}}const j_={top:"bottom",right:"left",bottom:"top",left:"right"},io=new gn("Floating.Root"),is=new gn("Floating.Content"),so=new gn("Floating.Root");class Ka{static create(e=!1){return e?so.set(new Ka):io.set(new Ka)}anchorNode=ee(null);customAnchorNode=ee(null);triggerNode=ee(null);constructor(){Ct(()=>{this.customAnchorNode.current?typeof this.customAnchorNode.current=="string"?this.anchorNode.current=document.querySelector(this.customAnchorNode.current):this.anchorNode.current=this.customAnchorNode.current:this.anchorNode.current=this.triggerNode.current})}}class Xa{static create(e,r=!1){return r?is.set(new Xa(e,so.get())):is.set(new Xa(e,io.get()))}opts;root;contentRef=ee(null);wrapperRef=ee(null);arrowRef=ee(null);contentAttachment=lr(this.contentRef);wrapperAttachment=lr(this.wrapperRef);arrowAttachment=lr(this.arrowRef);arrowId=ee(ba());#e=$(()=>{if(typeof this.opts.style=="string")return Jn(this.opts.style);if(!this.opts.style)return{}});#t=void 0;#r=new kh(()=>this.arrowRef.current??void 0);#n=$(()=>this.#r?.width??0);#a=$(()=>this.#r?.height??0);#i=$(()=>this.opts.side?.current+(this.opts.align.current!=="center"?`-${this.opts.align.current}`:""));#l=$(()=>Array.isArray(this.opts.collisionBoundary.current)?this.opts.collisionBoundary.current:[this.opts.collisionBoundary.current]);#s=$(()=>l(this.#l).length>0);get hasExplicitBoundaries(){return l(this.#s)}set hasExplicitBoundaries(e){V(this.#s,e)}#o=$(()=>({padding:this.opts.collisionPadding.current,boundary:l(this.#l).filter(Zh),altBoundary:this.hasExplicitBoundaries}));get detectOverflowOptions(){return l(this.#o)}set detectOverflowOptions(e){V(this.#o,e)}#c=Se(void 0);#d=Se(void 0);#u=Se(void 0);#v=Se(void 0);#f=$(()=>[O_({mainAxis:this.opts.sideOffset.current+l(this.#a),alignmentAxis:this.opts.alignOffset.current}),this.opts.avoidCollisions.current&&I_({mainAxis:!0,crossAxis:!1,limiter:this.opts.sticky.current==="partial"?z_():void 0,...this.detectOverflowOptions}),this.opts.avoidCollisions.current&&N_({...this.detectOverflowOptions}),D_({...this.detectOverflowOptions,apply:({rects:e,availableWidth:r,availableHeight:n})=>{const{width:a,height:s}=e.reference;V(this.#c,r,!0),V(this.#d,n,!0),V(this.#u,a,!0),V(this.#v,s,!0)}}),this.arrowRef.current&&L_({element:this.arrowRef.current,padding:this.opts.arrowPadding.current}),$_({arrowWidth:l(this.#n),arrowHeight:l(this.#a)}),this.opts.hideWhenDetached.current&&M_({strategy:"referenceHidden",...this.detectOverflowOptions})].filter(Boolean));get middleware(){return l(this.#f)}set middleware(e){V(this.#f,e)}floating;#p=$(()=>q_(this.floating.placement));get placedSide(){return l(this.#p)}set placedSide(e){V(this.#p,e)}#h=$(()=>V_(this.floating.placement));get placedAlign(){return l(this.#h)}set placedAlign(e){V(this.#h,e)}#m=$(()=>this.floating.middlewareData.arrow?.x??0);get arrowX(){return l(this.#m)}set arrowX(e){V(this.#m,e)}#g=$(()=>this.floating.middlewareData.arrow?.y??0);get arrowY(){return l(this.#g)}set arrowY(e){V(this.#g,e)}#_=$(()=>this.floating.middlewareData.arrow?.centerOffset!==0);get cannotCenterArrow(){return l(this.#_)}set cannotCenterArrow(e){V(this.#_,e)}#y=Se();get contentZIndex(){return l(this.#y)}set contentZIndex(e){V(this.#y,e,!0)}#b=$(()=>j_[this.placedSide]);get arrowBaseSide(){return l(this.#b)}set arrowBaseSide(e){V(this.#b,e)}#x=$(()=>({id:this.opts.wrapperId.current,"data-bits-floating-content-wrapper":"",style:{...this.floating.floatingStyles,transform:this.floating.isPositioned?this.floating.floatingStyles.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:this.contentZIndex,"--bits-floating-transform-origin":`${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,"--bits-floating-available-width":`${l(this.#c)}px`,"--bits-floating-available-height":`${l(this.#d)}px`,"--bits-floating-anchor-width":`${l(this.#u)}px`,"--bits-floating-anchor-height":`${l(this.#v)}px`,...this.floating.middlewareData.hide?.referenceHidden&&{visibility:"hidden","pointer-events":"none"},...l(this.#e)},dir:this.opts.dir.current,...this.wrapperAttachment}));get wrapperProps(){return l(this.#x)}set wrapperProps(e){V(this.#x,e)}#w=$(()=>({"data-side":this.placedSide,"data-align":this.placedAlign,style:Os({...l(this.#e)}),...this.contentAttachment}));get props(){return l(this.#w)}set props(e){V(this.#w,e)}#S=$(()=>({position:"absolute",left:this.arrowX?`${this.arrowX}px`:void 0,top:this.arrowY?`${this.arrowY}px`:void 0,[this.arrowBaseSide]:0,"transform-origin":{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[this.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[this.placedSide],visibility:this.cannotCenterArrow?"hidden":void 0}));get arrowStyle(){return l(this.#S)}set arrowStyle(e){V(this.#S,e)}constructor(e,r){this.opts=e,this.root=r,e.customAnchor&&(this.root.customAnchorNode.current=e.customAnchor.current),kt(()=>e.customAnchor.current,n=>{this.root.customAnchorNode.current=n}),this.floating=U_({strategy:()=>this.opts.strategy.current,placement:()=>l(this.#i),middleware:()=>this.middleware,reference:this.root.anchorNode,whileElementsMounted:(...n)=>R_(...n,{animationFrame:this.#t?.current==="always"}),open:()=>this.opts.enabled.current,sideOffset:()=>this.opts.sideOffset.current,alignOffset:()=>this.opts.alignOffset.current}),Ct(()=>{this.floating.isPositioned&&this.opts.onPlaced?.current()}),kt(()=>this.contentRef.current,n=>{if(!n)return;const a=Ds(n);this.contentZIndex=a.getComputedStyle(n).zIndex}),Ct(()=>{this.floating.floating.current=this.wrapperRef.current})}}class oo{static create(e){return new oo(e,is.get())}opts;content;constructor(e,r){this.opts=e,this.content=r}#e=$(()=>({id:this.opts.id.current,style:this.content.arrowStyle,"data-side":this.content.placedSide,...this.content.arrowAttachment}));get props(){return l(this.#e)}set props(e){V(this.#e,e)}}class Qa{static create(e,r=!1){return r?new Qa(e,so.get()):new Qa(e,io.get())}opts;root;constructor(e,r){this.opts=e,this.root=r,e.virtualEl&&e.virtualEl.current?r.triggerNode=ee.from(e.virtualEl.current):r.triggerNode=e.ref}}function $_(t){return{name:"transformOrigin",options:t,fn(e){const{placement:r,rects:n,middlewareData:a}=e,i=a.arrow?.centerOffset!==0,o=i?0:t.arrowWidth,c=i?0:t.arrowHeight,[d,f]=lo(r),v={start:"0%",center:"50%",end:"100%"}[f],h=(a.arrow?.x??0)+o/2,m=(a.arrow?.y??0)+c/2;let g="",y="";return d==="bottom"?(g=i?v:`${h}px`,y=`${-c}px`):d==="top"?(g=i?v:`${h}px`,y=`${n.floating.height+c}px`):d==="right"?(g=`${-c}px`,y=i?v:`${m}px`):d==="left"&&(g=`${n.floating.width+c}px`,y=i?v:`${m}px`),{data:{x:g,y}}}}}function lo(t){const[e,r="center"]=t.split("-");return[e,r]}function q_(t){return lo(t)[0]}function V_(t){return lo(t)[1]}function G_(t,e){ie(e,!0);let r=U(e,"tooltip",3,!1);Ka.create(r());var n=q(),a=A(n);fe(a,()=>e.children??ye),u(t,n),se()}const W_={afterMs:1e4,onChange:gt};function H_(t,e){const{afterMs:r,onChange:n,getWindow:a}={...W_,...e};let s=null,i=Se(pt(t));function o(){return a().setTimeout(()=>{V(i,t,!0),n?.(t)},r)}return Ct(()=>()=>{s&&a().clearTimeout(s)}),ee.with(()=>l(i),c=>{V(i,c,!0),n?.(c),s&&a().clearTimeout(s),s=o()})}function Y_(t,e){ie(e,!0);let r=U(e,"tooltip",3,!1);Qa.create({id:ee.with(()=>e.id),virtualEl:ee.with(()=>e.virtualEl),ref:e.ref},r());var n=q(),a=A(n);fe(a,()=>e.children??ye),u(t,n),se()}var K_=_c('<svg viewBox="0 0 30 10" preserveAspectRatio="none" data-arrow=""><polygon points="0,0 30,0 15,10" fill="currentColor"></polygon></svg>'),X_=k("<span><!></span>");function Q_(t,e){ie(e,!0);let r=U(e,"id",19,ba),n=U(e,"width",3,10),a=U(e,"height",3,5),s=xe(e,["$$slots","$$events","$$legacy","id","children","child","width","height"]);const i=$(()=>Tt(s,{id:r()}));var o=q(),c=A(o);{var d=v=>{var h=q(),m=A(h);fe(m,()=>e.child,()=>({props:l(i)})),u(v,h)},f=v=>{var h=X_();Xe(h,()=>({...l(i)}));var m=p(h);{var g=E=>{var S=q(),b=A(S);fe(b,()=>e.children??ye),u(E,S)},y=E=>{var S=K_();G(()=>{ht(S,"width",n()),ht(S,"height",a())}),u(E,S)};L(m,E=>{e.children?E(g):E(y,!1)})}u(v,h)};L(c,v=>{e.child?v(d):v(f,!1)})}u(t,o),se()}function J_(t,e){ie(e,!0);let r=U(e,"id",19,ba),n=U(e,"ref",15,null),a=xe(e,["$$slots","$$events","$$legacy","id","ref"]);const s=oo.create({id:ee.with(()=>r()),ref:ee.with(()=>n(),o=>n(o))}),i=$(()=>Tt(a,s.props));Q_(t,Ke(()=>l(i))),se()}function Z_(t,e){ie(e,!0);let r=U(e,"side",3,"bottom"),n=U(e,"sideOffset",3,0),a=U(e,"align",3,"center"),s=U(e,"alignOffset",3,0),i=U(e,"arrowPadding",3,0),o=U(e,"avoidCollisions",3,!0),c=U(e,"collisionBoundary",19,()=>[]),d=U(e,"collisionPadding",3,0),f=U(e,"hideWhenDetached",3,!1),v=U(e,"onPlaced",3,()=>{}),h=U(e,"sticky",3,"partial"),m=U(e,"updatePositionStrategy",3,"optimized"),g=U(e,"strategy",3,"fixed"),y=U(e,"dir",3,"ltr"),E=U(e,"style",19,()=>({})),S=U(e,"wrapperId",19,ba),b=U(e,"customAnchor",3,null),O=U(e,"tooltip",3,!1);const z=Xa.create({side:ee.with(()=>r()),sideOffset:ee.with(()=>n()),align:ee.with(()=>a()),alignOffset:ee.with(()=>s()),id:ee.with(()=>e.id),arrowPadding:ee.with(()=>i()),avoidCollisions:ee.with(()=>o()),collisionBoundary:ee.with(()=>c()),collisionPadding:ee.with(()=>d()),hideWhenDetached:ee.with(()=>f()),onPlaced:ee.with(()=>v()),sticky:ee.with(()=>h()),updatePositionStrategy:ee.with(()=>m()),strategy:ee.with(()=>g()),dir:ee.with(()=>y()),style:ee.with(()=>E()),enabled:ee.with(()=>e.enabled),wrapperId:ee.with(()=>S()),customAnchor:ee.with(()=>b())},O()),M=$(()=>Tt(z.wrapperProps,{style:{pointerEvents:"auto"}}));var T=q(),R=A(T);fe(R,()=>e.content??ye,()=>({props:z.props,wrapperProps:l(M)})),u(t,T),se()}function ey(t,e){ie(e,!0),Ps(()=>{e.onPlaced?.()});var r=q(),n=A(r);fe(n,()=>e.content??ye,()=>({props:{},wrapperProps:{}})),u(t,r),se()}const ty=Ls({component:"separator",parts:["root"]});class co{static create(e){return new co(e)}opts;attachment;constructor(e){this.opts=e,this.attachment=lr(e.ref)}#e=$(()=>({id:this.opts.id.current,role:this.opts.decorative.current?"none":"separator","aria-orientation":this.opts.orientation.current,"aria-hidden":Dh(this.opts.decorative.current),"data-orientation":this.opts.orientation.current,[ty.root]:"",...this.attachment}));get props(){return l(this.#e)}set props(e){V(this.#e,e)}}var ry=k("<div><!></div>");function ny(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=U(e,"decorative",3,!1),i=U(e,"orientation",3,"horizontal"),o=xe(e,["$$slots","$$events","$$legacy","id","ref","child","children","decorative","orientation"]);const c=co.create({ref:ee.with(()=>a(),g=>a(g)),id:ee.with(()=>n()),decorative:ee.with(()=>s()),orientation:ee.with(()=>i())}),d=$(()=>Tt(o,c.props));var f=q(),v=A(f);{var h=g=>{var y=q(),E=A(y);fe(E,()=>e.child,()=>({props:l(d)})),u(g,y)},m=g=>{var y=ry();Xe(y,()=>({...l(d)}));var E=p(y);fe(E,()=>e.children??ye),u(g,y)};L(v,g=>{e.child?g(h):g(m,!1)})}u(t,f),se()}function ay(t,e){let r=U(e,"isStatic",3,!1),n=xe(e,["$$slots","$$events","$$legacy","content","isStatic","onPlaced"]);var a=q(),s=A(a);{var i=c=>{ey(c,{get content(){return e.content},get onPlaced(){return e.onPlaced}})},o=c=>{Z_(c,Ke({get content(){return e.content},get onPlaced(){return e.onPlaced}},()=>n))};L(s,c=>{r()?c(i):c(o,!1)})}u(t,a)}var iy=k("<!> <!>",1);function Ud(t,e){ie(e,!0);let r=U(e,"interactOutsideBehavior",3,"close"),n=U(e,"trapFocus",3,!0),a=U(e,"isValidEvent",3,()=>!1),s=U(e,"customAnchor",3,null),i=U(e,"isStatic",3,!1),o=U(e,"tooltip",3,!1),c=xe(e,["$$slots","$$events","$$legacy","popper","onEscapeKeydown","escapeKeydownBehavior","preventOverflowTextSelection","id","onPointerDown","onPointerUp","side","sideOffset","align","alignOffset","arrowPadding","avoidCollisions","collisionBoundary","collisionPadding","sticky","hideWhenDetached","updatePositionStrategy","strategy","dir","preventScroll","wrapperId","style","onPlaced","onInteractOutside","onCloseAutoFocus","onOpenAutoFocus","onFocusOutside","interactOutsideBehavior","loop","trapFocus","isValidEvent","customAnchor","isStatic","enabled","ref","tooltip"]);ay(t,{get isStatic(){return i()},get id(){return e.id},get side(){return e.side},get sideOffset(){return e.sideOffset},get align(){return e.align},get alignOffset(){return e.alignOffset},get arrowPadding(){return e.arrowPadding},get avoidCollisions(){return e.avoidCollisions},get collisionBoundary(){return e.collisionBoundary},get collisionPadding(){return e.collisionPadding},get sticky(){return e.sticky},get hideWhenDetached(){return e.hideWhenDetached},get updatePositionStrategy(){return e.updatePositionStrategy},get strategy(){return e.strategy},get dir(){return e.dir},get wrapperId(){return e.wrapperId},get style(){return e.style},get onPlaced(){return e.onPlaced},get customAnchor(){return s()},get enabled(){return e.enabled},get tooltip(){return o()},content:(f,v)=>{let h=()=>v?.().props,m=()=>v?.().wrapperProps;var g=iy(),y=A(g);{var E=O=>{Ga(O,{get preventScroll(){return e.preventScroll}})},S=O=>{var z=q(),M=A(z);{var T=R=>{Ga(R,{get preventScroll(){return e.preventScroll}})};L(M,R=>{e.forceMount||R(T)},!0)}u(O,z)};L(y,O=>{e.forceMount&&e.enabled?O(E):O(S,!1)})}var b=_(y,2);Ed(b,{get onOpenAutoFocus(){return e.onOpenAutoFocus},get onCloseAutoFocus(){return e.onCloseAutoFocus},get loop(){return e.loop},get enabled(){return e.enabled},get trapFocus(){return n()},get forceMount(){return e.forceMount},get ref(){return e.ref},focusScope:(z,M)=>{let T=()=>M?.().props;yd(z,{get onEscapeKeydown(){return e.onEscapeKeydown},get escapeKeydownBehavior(){return e.escapeKeydownBehavior},get enabled(){return e.enabled},get ref(){return e.ref},children:(R,I)=>{_d(R,{get id(){return e.id},get onInteractOutside(){return e.onInteractOutside},get onFocusOutside(){return e.onFocusOutside},get interactOutsideBehavior(){return r()},get isValidEvent(){return a()},get enabled(){return e.enabled},get ref(){return e.ref},children:(W,J)=>{let j=()=>J?.().props;Cd(W,{get id(){return e.id},get preventOverflowTextSelection(){return e.preventOverflowTextSelection},get onPointerDown(){return e.onPointerDown},get onPointerUp(){return e.onPointerUp},get enabled(){return e.enabled},get ref(){return e.ref},children:(N,P)=>{var x=q(),w=A(x);{let F=$(()=>({props:Tt(c,h(),j(),T(),{style:{pointerEvents:"auto"}}),wrapperProps:m()}));fe(w,()=>e.popper??ye,()=>l(F))}u(N,x)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{focusScope:!0}}),u(f,g)},$$slots:{content:!0}}),se()}function sy(t,e){let r=U(e,"interactOutsideBehavior",3,"close"),n=U(e,"trapFocus",3,!0),a=U(e,"isValidEvent",3,()=>!1),s=U(e,"customAnchor",3,null),i=U(e,"isStatic",3,!1),o=xe(e,["$$slots","$$events","$$legacy","popper","open","onEscapeKeydown","escapeKeydownBehavior","preventOverflowTextSelection","id","onPointerDown","onPointerUp","side","sideOffset","align","alignOffset","arrowPadding","avoidCollisions","collisionBoundary","collisionPadding","sticky","hideWhenDetached","updatePositionStrategy","strategy","dir","preventScroll","wrapperId","style","onPlaced","onInteractOutside","onCloseAutoFocus","onOpenAutoFocus","onFocusOutside","interactOutsideBehavior","loop","trapFocus","isValidEvent","customAnchor","isStatic","ref"]);zs(t,{get open(){return e.open},get ref(){return e.ref},presence:d=>{Ud(d,Ke({get popper(){return e.popper},get onEscapeKeydown(){return e.onEscapeKeydown},get escapeKeydownBehavior(){return e.escapeKeydownBehavior},get preventOverflowTextSelection(){return e.preventOverflowTextSelection},get id(){return e.id},get onPointerDown(){return e.onPointerDown},get onPointerUp(){return e.onPointerUp},get side(){return e.side},get sideOffset(){return e.sideOffset},get align(){return e.align},get alignOffset(){return e.alignOffset},get arrowPadding(){return e.arrowPadding},get avoidCollisions(){return e.avoidCollisions},get collisionBoundary(){return e.collisionBoundary},get collisionPadding(){return e.collisionPadding},get sticky(){return e.sticky},get hideWhenDetached(){return e.hideWhenDetached},get updatePositionStrategy(){return e.updatePositionStrategy},get strategy(){return e.strategy},get dir(){return e.dir},get preventScroll(){return e.preventScroll},get wrapperId(){return e.wrapperId},get style(){return e.style},get onPlaced(){return e.onPlaced},get customAnchor(){return s()},get isStatic(){return i()},get enabled(){return e.open},get onInteractOutside(){return e.onInteractOutside},get onCloseAutoFocus(){return e.onCloseAutoFocus},get onOpenAutoFocus(){return e.onOpenAutoFocus},get interactOutsideBehavior(){return r()},get loop(){return e.loop},get trapFocus(){return n()},get isValidEvent(){return a()},get onFocusOutside(){return e.onFocusOutside},forceMount:!1,get ref(){return e.ref}},()=>o))},$$slots:{presence:!0}})}function oy(t,e){let r=U(e,"interactOutsideBehavior",3,"close"),n=U(e,"trapFocus",3,!0),a=U(e,"isValidEvent",3,()=>!1),s=U(e,"customAnchor",3,null),i=U(e,"isStatic",3,!1),o=xe(e,["$$slots","$$events","$$legacy","popper","onEscapeKeydown","escapeKeydownBehavior","preventOverflowTextSelection","id","onPointerDown","onPointerUp","side","sideOffset","align","alignOffset","arrowPadding","avoidCollisions","collisionBoundary","collisionPadding","sticky","hideWhenDetached","updatePositionStrategy","strategy","dir","preventScroll","wrapperId","style","onPlaced","onInteractOutside","onCloseAutoFocus","onOpenAutoFocus","onFocusOutside","interactOutsideBehavior","loop","trapFocus","isValidEvent","customAnchor","isStatic","enabled"]);Ud(t,Ke({get popper(){return e.popper},get onEscapeKeydown(){return e.onEscapeKeydown},get escapeKeydownBehavior(){return e.escapeKeydownBehavior},get preventOverflowTextSelection(){return e.preventOverflowTextSelection},get id(){return e.id},get onPointerDown(){return e.onPointerDown},get onPointerUp(){return e.onPointerUp},get side(){return e.side},get sideOffset(){return e.sideOffset},get align(){return e.align},get alignOffset(){return e.alignOffset},get arrowPadding(){return e.arrowPadding},get avoidCollisions(){return e.avoidCollisions},get collisionBoundary(){return e.collisionBoundary},get collisionPadding(){return e.collisionPadding},get sticky(){return e.sticky},get hideWhenDetached(){return e.hideWhenDetached},get updatePositionStrategy(){return e.updatePositionStrategy},get strategy(){return e.strategy},get dir(){return e.dir},get preventScroll(){return e.preventScroll},get wrapperId(){return e.wrapperId},get style(){return e.style},get onPlaced(){return e.onPlaced},get customAnchor(){return s()},get isStatic(){return i()},get enabled(){return e.enabled},get onInteractOutside(){return e.onInteractOutside},get onCloseAutoFocus(){return e.onCloseAutoFocus},get onOpenAutoFocus(){return e.onOpenAutoFocus},get interactOutsideBehavior(){return r()},get loop(){return e.loop},get trapFocus(){return n()},get isValidEvent(){return a()},get onFocusOutside(){return e.onFocusOutside}},()=>o,{forceMount:!0}))}class ly{#e;#t;#r;#n=Se(null);constructor(e){this.#e=e,this.#t=$(()=>this.#e.enabled()),this.#r=H_(!1,{afterMs:e.transitTimeout??300,onChange:r=>{l(this.#t)&&this.#e.setIsPointerInTransit?.(r)},getWindow:()=>Ds(this.#e.triggerNode())}),kt([e.triggerNode,e.contentNode,e.enabled],([r,n,a])=>{if(!r||!n||!a)return;const s=o=>{this.#i(o,n)},i=o=>{this.#i(o,r)};return on(Nt(r,"pointerleave",s),Nt(n,"pointerleave",i))}),kt(()=>l(this.#n),()=>{const r=a=>{if(!l(this.#n))return;const s=a.target;if(!Ws(s))return;const i={x:a.clientX,y:a.clientY},o=e.triggerNode()?.contains(s)||e.contentNode()?.contains(s),c=!fy(i,l(this.#n));o?this.#a():c&&(this.#a(),e.onPointerExit())},n=ud(e.triggerNode()??e.contentNode());if(n)return Nt(n,"pointermove",r)})}#a(){V(this.#n,null),this.#r.current=!1}#i(e,r){const n=e.currentTarget;if(!es(n))return;const a={x:e.clientX,y:e.clientY},s=cy(a,n.getBoundingClientRect()),i=dy(a,s),o=uy(r.getBoundingClientRect()),c=py([...i,...o]);V(this.#n,c,!0),this.#r.current=!0}}function cy(t,e){const r=Math.abs(e.top-t.y),n=Math.abs(e.bottom-t.y),a=Math.abs(e.right-t.x),s=Math.abs(e.left-t.x);switch(Math.min(r,n,a,s)){case s:return"left";case a:return"right";case r:return"top";case n:return"bottom";default:throw new Error("unreachable")}}function dy(t,e,r=5){const n=r*1.5;switch(e){case"top":return[{x:t.x-r,y:t.y+r},{x:t.x,y:t.y-n},{x:t.x+r,y:t.y+r}];case"bottom":return[{x:t.x-r,y:t.y-r},{x:t.x,y:t.y+n},{x:t.x+r,y:t.y-r}];case"left":return[{x:t.x+r,y:t.y-r},{x:t.x-n,y:t.y},{x:t.x+r,y:t.y+r}];case"right":return[{x:t.x-r,y:t.y-r},{x:t.x+n,y:t.y},{x:t.x-r,y:t.y+r}]}}function uy(t){const{top:e,right:r,bottom:n,left:a}=t;return[{x:a,y:e},{x:r,y:e},{x:r,y:n},{x:a,y:n}]}function fy(t,e){const{x:r,y:n}=t;let a=!1;for(let s=0,i=e.length-1;s<e.length;i=s++){const o=e[s].x,c=e[s].y,d=e[i].x,f=e[i].y;c>n!=f>n&&r<(d-o)*(n-c)/(f-c)+o&&(a=!a)}return a}function py(t){const e=t.slice();return e.sort((r,n)=>r.x<n.x?-1:r.x>n.x?1:r.y<n.y?-1:r.y>n.y?1:0),vy(e)}function vy(t){if(t.length<=1)return t.slice();const e=[];for(let n=0;n<t.length;n++){const a=t[n];for(;e.length>=2;){const s=e[e.length-1],i=e[e.length-2];if((s.x-i.x)*(a.y-i.y)>=(s.y-i.y)*(a.x-i.x))e.pop();else break}e.push(a)}e.pop();const r=[];for(let n=t.length-1;n>=0;n--){const a=t[n];for(;r.length>=2;){const s=r[r.length-1],i=r[r.length-2];if((s.x-i.x)*(a.y-i.y)>=(s.y-i.y)*(a.x-i.x))r.pop();else break}r.push(a)}return r.pop(),e.length===1&&r.length===1&&e[0].x===r[0].x&&e[0].y===r[0].y?e:e.concat(r)}function my(t,e){ie(e,!0);let r=U(e,"open",15,!1),n=U(e,"onOpenChange",3,gt),a=U(e,"onOpenChangeComplete",3,gt);Bs.create({variant:ee.with(()=>"dialog"),open:ee.with(()=>r(),o=>{r(o),n()(o)}),onOpenChangeComplete:ee.with(()=>a())});var s=q(),i=A(s);fe(i,()=>e.children??ye),u(t,s),se()}var hy=k("<button><!></button>");function gy(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=U(e,"disabled",3,!1),i=xe(e,["$$slots","$$events","$$legacy","children","child","id","ref","disabled"]);const o=Us.create({variant:ee.with(()=>"close"),id:ee.with(()=>n()),ref:ee.with(()=>a(),m=>a(m)),disabled:ee.with(()=>!!s())}),c=$(()=>Tt(i,o.props));var d=q(),f=A(d);{var v=m=>{var g=q(),y=A(g);fe(y,()=>e.child,()=>({props:l(c)})),u(m,g)},h=m=>{var g=hy();Xe(g,()=>({...l(c)}));var y=p(g);fe(y,()=>e.children??ye),u(m,g)};L(f,m=>{e.child?m(v):m(h,!1)})}u(t,d),se()}var _y=k("<!> <!>",1),yy=k("<!> <div><!></div>",1);function by(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=U(e,"forceMount",3,!1),i=U(e,"onCloseAutoFocus",3,gt),o=U(e,"onOpenAutoFocus",3,gt),c=U(e,"onEscapeKeydown",3,gt),d=U(e,"onInteractOutside",3,gt),f=U(e,"trapFocus",3,!0),v=U(e,"preventScroll",3,!0),h=U(e,"restoreScrollDelay",3,null),m=xe(e,["$$slots","$$events","$$legacy","id","children","child","ref","forceMount","onCloseAutoFocus","onOpenAutoFocus","onEscapeKeydown","onInteractOutside","trapFocus","preventScroll","restoreScrollDelay"]);const g=qs.create({id:ee.with(()=>n()),ref:ee.with(()=>a(),E=>a(E))}),y=$(()=>Tt(m,g.props));{const E=b=>{{const O=(M,T)=>{let R=()=>T?.().props;yd(M,Ke(()=>l(y),{get enabled(){return g.root.opts.open.current},get ref(){return g.opts.ref},onEscapeKeydown:I=>{c()(I),!I.defaultPrevented&&g.root.handleClose()},children:(I,K)=>{_d(I,Ke(()=>l(y),{get ref(){return g.opts.ref},get enabled(){return g.root.opts.open.current},onInteractOutside:W=>{d()(W),!W.defaultPrevented&&g.root.handleClose()},children:(W,J)=>{Cd(W,Ke(()=>l(y),{get ref(){return g.opts.ref},get enabled(){return g.root.opts.open.current},children:(j,N)=>{var P=q(),x=A(P);{var w=C=>{var D=_y(),H=A(D);{var Y=Z=>{Ga(Z,{get preventScroll(){return v()},get restoreScrollDelay(){return h()}})};L(H,Z=>{g.root.opts.open.current&&Z(Y)})}var X=_(H,2);{let Z=$(()=>({props:Tt(l(y),R()),...g.snippetProps}));fe(X,()=>e.child,()=>l(Z))}u(C,D)},F=C=>{var D=yy(),H=A(D);Ga(H,{get preventScroll(){return v()}});var Y=_(H,2);Xe(Y,Z=>({...Z}),[()=>Tt(l(y),R())]);var X=p(Y);fe(X,()=>e.children??ye),u(C,D)};L(x,C=>{e.child?C(w):C(F,!1)})}u(j,P)},$$slots:{default:!0}}))},$$slots:{default:!0}}))},$$slots:{default:!0}}))};let z=$(()=>Dg({forceMount:s(),present:g.root.opts.open.current,open:g.root.opts.open.current}));Ed(b,{get ref(){return g.opts.ref},loop:!0,get trapFocus(){return f()},get enabled(){return l(z)},get onOpenAutoFocus(){return o()},onCloseAutoFocus:M=>{i()(M),!M.defaultPrevented&&Is(1,()=>g.root.triggerNode?.focus())},focusScope:O,$$slots:{focusScope:!0}})}};let S=$(()=>g.root.opts.open.current||s());zs(t,Ke(()=>l(y),{get forceMount(){return s()},get open(){return l(S)},get ref(){return g.opts.ref},presence:E,$$slots:{presence:!0}}))}se()}const xy={immediate:!0};class ss{#e;#t;#r;#n=null;constructor(e,r,n={}){this.#r=e,this.#t=r,this.#e={...xy,...n},this.stop=this.stop.bind(this),this.start=this.start.bind(this),this.#e.immediate&&Su&&this.start(),zn(this.stop)}#a(){this.#n!==null&&(window.clearTimeout(this.#n),this.#n=null)}stop(){this.#a()}start(...e){this.#a(),this.#n=window.setTimeout(()=>{this.#n=null,this.#r(...e)},this.#t)}}const jd=Ls({component:"tooltip",parts:["content","trigger"]}),$d=new gn("Tooltip.Provider"),uo=new gn("Tooltip.Root");class fo{static create(e){return $d.set(new fo(e))}opts;#e=Se(!0);get isOpenDelayed(){return l(this.#e)}set isOpenDelayed(e){V(this.#e,e,!0)}isPointerInTransit=ee(!1);#t;#r=Se(null);constructor(e){this.opts=e,this.#t=new ss(()=>{this.isOpenDelayed=!0},this.opts.skipDelayDuration.current,{immediate:!1})}#n=()=>{this.opts.skipDelayDuration.current!==0&&this.#t.start()};#a=()=>{this.#t.stop()};onOpen=e=>{l(this.#r)&&l(this.#r)!==e&&l(this.#r).handleClose(),this.#a(),this.isOpenDelayed=!1,V(this.#r,e,!0)};onClose=e=>{l(this.#r)===e&&V(this.#r,null),this.#n()};isTooltipOpen=e=>l(this.#r)===e}class po{static create(e){return uo.set(new po(e,$d.get()))}opts;provider;#e=$(()=>this.opts.delayDuration.current??this.provider.opts.delayDuration.current);get delayDuration(){return l(this.#e)}set delayDuration(e){V(this.#e,e)}#t=$(()=>this.opts.disableHoverableContent.current??this.provider.opts.disableHoverableContent.current);get disableHoverableContent(){return l(this.#t)}set disableHoverableContent(e){V(this.#t,e)}#r=$(()=>this.opts.disableCloseOnTriggerClick.current??this.provider.opts.disableCloseOnTriggerClick.current);get disableCloseOnTriggerClick(){return l(this.#r)}set disableCloseOnTriggerClick(e){V(this.#r,e)}#n=$(()=>this.opts.disabled.current??this.provider.opts.disabled.current);get disabled(){return l(this.#n)}set disabled(e){V(this.#n,e)}#a=$(()=>this.opts.ignoreNonKeyboardFocus.current??this.provider.opts.ignoreNonKeyboardFocus.current);get ignoreNonKeyboardFocus(){return l(this.#a)}set ignoreNonKeyboardFocus(e){V(this.#a,e)}#i=Se(null);get contentNode(){return l(this.#i)}set contentNode(e){V(this.#i,e,!0)}#l=Se(null);get triggerNode(){return l(this.#l)}set triggerNode(e){V(this.#l,e,!0)}#s=Se(!1);#o;#c=$(()=>this.opts.open.current?l(this.#s)?"delayed-open":"instant-open":"closed");get stateAttr(){return l(this.#c)}set stateAttr(e){V(this.#c,e)}constructor(e,r){this.opts=e,this.provider=r,this.#o=new ss(()=>{V(this.#s,!0),this.opts.open.current=!0},this.delayDuration??0,{immediate:!1}),new pd({open:this.opts.open,ref:ee.with(()=>this.contentNode),onComplete:()=>{this.opts.onOpenChangeComplete.current(this.opts.open.current)}}),kt(()=>this.delayDuration,()=>{this.delayDuration!==void 0&&(this.#o=new ss(()=>{V(this.#s,!0),this.opts.open.current=!0},this.delayDuration,{immediate:!1}))}),kt(()=>this.opts.open.current,n=>{n?this.provider.onOpen(this):this.provider.onClose(this)})}handleOpen=()=>{this.#o.stop(),V(this.#s,!1),this.opts.open.current=!0};handleClose=()=>{this.#o.stop(),this.opts.open.current=!1};#d=()=>{this.#o.stop();const e=!this.provider.isOpenDelayed,r=this.delayDuration??0;e||r===0?(V(this.#s,r>0&&e,!0),this.opts.open.current=!0):this.#o.start()};onTriggerEnter=()=>{this.#d()};onTriggerLeave=()=>{this.disableHoverableContent?this.handleClose():this.#o.stop()}}class vo{static create(e){return new vo(e,uo.get())}opts;root;attachment;#e=ee(!1);#t=Se(!1);#r=$(()=>this.opts.disabled.current||this.root.disabled);domContext;constructor(e,r){this.opts=e,this.root=r,this.domContext=new Ms(e.ref),this.attachment=lr(this.opts.ref,n=>this.root.triggerNode=n)}handlePointerUp=()=>{this.#e.current=!1};#n=()=>{l(this.#r)||(this.#e.current=!1)};#a=()=>{l(this.#r)||(this.#e.current=!0,this.domContext.getDocument().addEventListener("pointerup",()=>{this.handlePointerUp()},{once:!0}))};#i=e=>{l(this.#r)||e.pointerType!=="touch"&&(l(this.#t)||this.root.provider.isPointerInTransit.current||(this.root.onTriggerEnter(),V(this.#t,!0)))};#l=()=>{l(this.#r)||(this.root.onTriggerLeave(),V(this.#t,!1))};#s=e=>{this.#e.current||l(this.#r)||this.root.ignoreNonKeyboardFocus&&!Jh(e.currentTarget)||this.root.handleOpen()};#o=()=>{l(this.#r)||this.root.handleClose()};#c=()=>{this.root.disableCloseOnTriggerClick||l(this.#r)||this.root.handleClose()};#d=$(()=>({id:this.opts.id.current,"aria-describedby":this.root.opts.open.current?this.root.contentNode?.id:void 0,"data-state":this.root.stateAttr,"data-disabled":fd(l(this.#r)),"data-delay-duration":`${this.root.delayDuration}`,[jd.trigger]:"",tabindex:l(this.#r)?void 0:0,disabled:this.opts.disabled.current,onpointerup:this.#n,onpointerdown:this.#a,onpointermove:this.#i,onpointerleave:this.#l,onfocus:this.#s,onblur:this.#o,onclick:this.#c,...this.attachment}));get props(){return l(this.#d)}set props(e){V(this.#d,e)}}class mo{static create(e){return new mo(e,uo.get())}opts;root;attachment;constructor(e,r){this.opts=e,this.root=r,this.attachment=lr(this.opts.ref,n=>this.root.contentNode=n),new ly({triggerNode:()=>this.root.triggerNode,contentNode:()=>this.root.contentNode,enabled:()=>this.root.opts.open.current&&!this.root.disableHoverableContent,onPointerExit:()=>{this.root.provider.isTooltipOpen(this.root)&&this.root.handleClose()},setIsPointerInTransit:n=>{this.root.provider.isPointerInTransit.current=n},transitTimeout:this.root.provider.opts.skipDelayDuration.current}),Ah(()=>Nt(window,"scroll",n=>{const a=n.target;a&&a.contains(this.root.triggerNode)&&this.root.handleClose()}))}onInteractOutside=e=>{if(Ws(e.target)&&this.root.triggerNode?.contains(e.target)&&this.root.disableCloseOnTriggerClick){e.preventDefault();return}this.opts.onInteractOutside.current(e),!e.defaultPrevented&&this.root.handleClose()};onEscapeKeydown=e=>{this.opts.onEscapeKeydown.current?.(e),!e.defaultPrevented&&this.root.handleClose()};onOpenAutoFocus=e=>{e.preventDefault()};onCloseAutoFocus=e=>{e.preventDefault()};#e=$(()=>({open:this.root.opts.open.current}));get snippetProps(){return l(this.#e)}set snippetProps(e){V(this.#e,e)}#t=$(()=>({id:this.opts.id.current,"data-state":this.root.stateAttr,"data-disabled":fd(this.root.disabled),style:{pointerEvents:"auto",outline:"none"},[jd.content]:"",...this.attachment}));get props(){return l(this.#t)}set props(e){V(this.#t,e)}popperProps={onInteractOutside:this.onInteractOutside,onEscapeKeydown:this.onEscapeKeydown,onOpenAutoFocus:this.onOpenAutoFocus,onCloseAutoFocus:this.onCloseAutoFocus}}function wy(t,e){ie(e,!0);let r=U(e,"open",15,!1),n=U(e,"onOpenChange",3,gt),a=U(e,"onOpenChangeComplete",3,gt);po.create({open:ee.with(()=>r(),s=>{r(s),n()(s)}),delayDuration:ee.with(()=>e.delayDuration),disableCloseOnTriggerClick:ee.with(()=>e.disableCloseOnTriggerClick),disableHoverableContent:ee.with(()=>e.disableHoverableContent),ignoreNonKeyboardFocus:ee.with(()=>e.ignoreNonKeyboardFocus),disabled:ee.with(()=>e.disabled),onOpenChangeComplete:ee.with(()=>a())}),G_(t,{tooltip:!0,children:(s,i)=>{var o=q(),c=A(o);fe(c,()=>e.children??ye),u(s,o)},$$slots:{default:!0}}),se()}var Sy=k("<div><div><!></div></div>"),ky=k("<div><div><!></div></div>");function Py(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"ref",15,null),s=U(e,"side",3,"top"),i=U(e,"sideOffset",3,0),o=U(e,"align",3,"center"),c=U(e,"avoidCollisions",3,!0),d=U(e,"arrowPadding",3,0),f=U(e,"sticky",3,"partial"),v=U(e,"hideWhenDetached",3,!1),h=U(e,"collisionPadding",3,0),m=U(e,"onInteractOutside",3,gt),g=U(e,"onEscapeKeydown",3,gt),y=U(e,"forceMount",3,!1),E=xe(e,["$$slots","$$events","$$legacy","children","child","id","ref","side","sideOffset","align","avoidCollisions","arrowPadding","sticky","hideWhenDetached","collisionPadding","onInteractOutside","onEscapeKeydown","forceMount"]);const S=mo.create({id:ee.with(()=>n()),ref:ee.with(()=>a(),I=>a(I)),onInteractOutside:ee.with(()=>m()),onEscapeKeydown:ee.with(()=>g())}),b=$(()=>({side:s(),sideOffset:i(),align:o(),avoidCollisions:c(),arrowPadding:d(),sticky:f(),hideWhenDetached:v(),collisionPadding:h()})),O=$(()=>Tt(E,l(b),S.props));var z=q(),M=A(z);{var T=I=>{oy(I,Ke(()=>l(O),()=>S.popperProps,{get enabled(){return S.root.opts.open.current},get id(){return n()},trapFocus:!1,loop:!1,preventScroll:!1,forceMount:!0,get ref(){return S.opts.ref},tooltip:!0,popper:(W,J)=>{let j=()=>J?.().props,N=()=>J?.().wrapperProps;var P=q();const x=$(()=>Tt(j(),{style:pl("tooltip")}));var w=A(P);{var F=D=>{var H=q(),Y=A(H);{let X=$(()=>({props:l(x),wrapperProps:N(),...S.snippetProps}));fe(Y,()=>e.child,()=>l(X))}u(D,H)},C=D=>{var H=Sy();Xe(H,()=>({...N()}));var Y=p(H);Xe(Y,()=>({...l(x)}));var X=p(Y);fe(X,()=>e.children??ye),u(D,H)};L(w,D=>{e.child?D(F):D(C,!1)})}u(W,P)},$$slots:{popper:!0}}))},R=I=>{var K=q(),W=A(K);{var J=j=>{sy(j,Ke(()=>l(O),()=>S.popperProps,{get open(){return S.root.opts.open.current},get id(){return n()},trapFocus:!1,loop:!1,preventScroll:!1,forceMount:!1,get ref(){return S.opts.ref},tooltip:!0,popper:(P,x)=>{let w=()=>x?.().props,F=()=>x?.().wrapperProps;var C=q();const D=$(()=>Tt(w(),{style:pl("tooltip")}));var H=A(C);{var Y=Z=>{var Q=q(),pe=A(Q);{let ae=$(()=>({props:l(D),wrapperProps:F(),...S.snippetProps}));fe(pe,()=>e.child,()=>l(ae))}u(Z,Q)},X=Z=>{var Q=ky();Xe(Q,()=>({...F()}));var pe=p(Q);Xe(pe,()=>({...l(D)}));var ae=p(pe);fe(ae,()=>e.children??ye),u(Z,Q)};L(H,Z=>{e.child?Z(Y):Z(X,!1)})}u(P,C)},$$slots:{popper:!0}}))};L(W,j=>{y()||j(J)},!0)}u(I,K)};L(M,I=>{y()?I(T):I(R,!1)})}u(t,z),se()}var Ay=k("<button><!></button>");function Ey(t,e){const r=Yr();ie(e,!0);let n=U(e,"id",19,()=>Kr(r)),a=U(e,"disabled",3,!1),s=U(e,"type",3,"button"),i=U(e,"ref",15,null),o=xe(e,["$$slots","$$events","$$legacy","children","child","id","disabled","type","ref"]);const c=vo.create({id:ee.with(()=>n()),disabled:ee.with(()=>a()??!1),ref:ee.with(()=>i(),f=>i(f))}),d=$(()=>Tt(o,c.props,{type:s()}));Y_(t,{get id(){return n()},get ref(){return c.opts.ref},tooltip:!0,children:(f,v)=>{var h=q(),m=A(h);{var g=E=>{var S=q(),b=A(S);fe(b,()=>e.child,()=>({props:l(d)})),u(E,S)},y=E=>{var S=Ay();Xe(S,()=>({...l(d)}));var b=p(S);fe(b,()=>e.children??ye),u(E,S)};L(m,E=>{e.child?E(g):E(y,!1)})}u(f,h)},$$slots:{default:!0}}),se()}function Cy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref"]);J_(t,Ke(()=>n,{get ref(){return r()},set ref(a){r(a)}})),se()}function Ty(t,e){ie(e,!0);let r=U(e,"delayDuration",3,700),n=U(e,"disableCloseOnTriggerClick",3,!1),a=U(e,"disableHoverableContent",3,!1),s=U(e,"disabled",3,!1),i=U(e,"ignoreNonKeyboardFocus",3,!1),o=U(e,"skipDelayDuration",3,300);fo.create({delayDuration:ee.with(()=>r()),disableCloseOnTriggerClick:ee.with(()=>n()),disableHoverableContent:ee.with(()=>a()),disabled:ee.with(()=>s()),ignoreNonKeyboardFocus:ee.with(()=>i()),skipDelayDuration:ee.with(()=>o())});var c=q(),d=A(c);fe(d,()=>e.children??ye),u(t,c),se()}const Fy=768;class Ry extends yh{constructor(e=Fy){super(`max-width: ${e-1}px`)}}const Oy="sidebar:state",Iy=3600*24*7,Ny="16rem",Dy="18rem",My="3rem",Ly="b";class zy{props;#e=$(()=>this.props.open());get open(){return l(this.#e)}set open(e){V(this.#e,e)}#t=Se(!1);get openMobile(){return l(this.#t)}set openMobile(e){V(this.#t,e,!0)}setOpen;#r;#n=$(()=>this.open?"expanded":"collapsed");get state(){return l(this.#n)}set state(e){V(this.#n,e)}constructor(e){this.setOpen=e.setOpen,this.#r=new Ry,this.props=e}get isMobile(){return this.#r.current}handleShortcutKeydown=e=>{e.key===Ly&&(e.metaKey||e.ctrlKey)&&(e.preventDefault(),this.toggle())};setOpenMobile=e=>{this.openMobile=e};toggle=()=>this.#r.current?this.openMobile=!this.openMobile:this.setOpen(!this.open)}const qd="scn-sidebar";function By(t){return Bl(Symbol.for(qd),new zy(t))}function gi(){return Di(Symbol.for(qd))}var Uy=k("<div><!></div>");function vl(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=Uy();Xe(a,i=>({"data-slot":"sidebar-content","data-sidebar":"content",class:i,...n}),[()=>He("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var jy=k("<div><!></div>");function Yn(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=jy();Xe(a,i=>({"data-slot":"sidebar-group-content","data-sidebar":"group-content",class:i,...n}),[()=>He("w-full text-sm overflow-hidden",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var $y=k("<div><!></div>");function ml(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=$y();Xe(a,i=>({"data-slot":"sidebar-group","data-sidebar":"group",class:i,...n}),[()=>He("relative flex w-full min-w-0 flex-col p-2",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var qy=k("<div><!></div>");function Vy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=qy();Xe(a,i=>({"data-slot":"sidebar-header","data-sidebar":"header",class:i,...n}),[()=>He("flex flex-col gap-2 p-2",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var Gy=k("<input/>"),Wy=k("<input/>");function Hy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"value",15),a=U(e,"files",15),s=xe(e,["$$slots","$$events","$$legacy","ref","value","type","files","class"]);var i=q(),o=A(i);{var c=f=>{var v=Gy();Xe(v,h=>({"data-slot":"input",class:h,type:"file",...s}),[()=>He("selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",e.class)]),ut(v,h=>r(h),()=>r()),Wf(v,a),Oo(v,n),u(f,v)},d=f=>{var v=Wy();Xe(v,h=>({"data-slot":"input",class:h,type:e.type,...s}),[()=>He("border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",e.class)]),ut(v,h=>r(h),()=>r()),Oo(v,n),u(f,v)};L(o,f=>{e.type==="file"?f(c):f(d,!1)})}u(t,i),se()}function Yy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"value",15,""),a=xe(e,["$$slots","$$events","$$legacy","ref","value","class"]);{let s=$(()=>He("bg-background h-8 w-full shadow-none",e.class));Hy(t,Ke({"data-slot":"sidebar-input","data-sidebar":"input",get class(){return l(s)}},()=>a,{get ref(){return r()},set ref(i){r(i)},get value(){return n()},set value(i){n(i)}}))}se()}var Ky=k("<main><!></main>");function Xy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=Ky();Xe(a,i=>({"data-slot":"sidebar-inset",class:i,...n}),[()=>He("bg-background relative flex w-full flex-1 flex-col","md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}function Qy(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref"]);var a=q(),s=A(a);Ce(s,()=>Ey,(i,o)=>{o(i,Ke({"data-slot":"tooltip-trigger"},()=>n,{get ref(){return r()},set ref(c){r(c)}}))}),u(t,a),se()}var Jy=k("<div></div>"),Zy=k("<!> <!>",1);function eb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"sideOffset",3,0),a=U(e,"side",3,"top"),s=xe(e,["$$slots","$$events","$$legacy","ref","class","sideOffset","side","children","arrowClasses"]);var i=q(),o=A(i);Ce(o,()=>vd,(c,d)=>{d(c,{children:(f,v)=>{var h=q(),m=A(h);{let g=$(()=>He("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-tooltip-content-transform-origin) z-50 w-fit text-balance rounded-md px-3 py-1.5 text-xs",e.class));Ce(m,()=>Py,(y,E)=>{E(y,Ke({"data-slot":"tooltip-content",get sideOffset(){return n()},get side(){return a()},get class(){return l(g)}},()=>s,{get ref(){return r()},set ref(S){r(S)},children:(S,b)=>{var O=Zy(),z=A(O);fe(z,()=>e.children??ye);var M=_(z,2);{const T=(R,I)=>{let K=()=>I?.().props;var W=Jy();Xe(W,J=>({class:J,...K()}),[()=>He("bg-primary z-50 size-2.5 rotate-45 rounded-[2px]","data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%_+_2px)]","data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%_+_1px)]","data-[side=right]:translate-x-[calc(50%_+_2px)] data-[side=right]:translate-y-1/2","data-[side=left]:-translate-y-[calc(50%_-_3px)]",e.arrowClasses)]),u(R,W)};Ce(M,()=>Cy,(R,I)=>{I(R,{child:T,$$slots:{child:!0}})})}u(S,O)},$$slots:{default:!0}}))})}u(f,h)},$$slots:{default:!0}})}),u(t,i),se()}const tb=wy,rb=Ty,nb=fi({base:"peer/menu-button outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground group-has-data-[sidebar=menu-action]/menu-item:pr-8 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",variants:{variant:{default:"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",outline:"bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"},size:{default:"h-8 text-sm",sm:"h-7 text-xs",lg:"group-data-[collapsible=icon]:p-0! h-12 text-sm"}},defaultVariants:{variant:"default",size:"default"}});var ab=k("<button><!></button>"),ib=k("<!> <!>",1);function sb(t,e){ie(e,!0);const r=(g,y)=>{let E=()=>y?.().props;var S=q();const b=$(()=>Tt(l(d),E()));var O=A(S);{var z=T=>{var R=q(),I=A(R);fe(I,()=>e.child,()=>({props:l(b)})),u(T,R)},M=T=>{var R=ab();Xe(R,()=>({...l(b)}));var I=p(R);fe(I,()=>e.children??ye),ut(R,K=>n(K),()=>n()),u(T,R)};L(O,T=>{e.child?T(z):T(M,!1)})}u(g,S)};let n=U(e,"ref",15,null),a=U(e,"variant",3,"default"),s=U(e,"size",3,"default"),i=U(e,"isActive",3,!1),o=xe(e,["$$slots","$$events","$$legacy","ref","class","children","child","variant","size","isActive","tooltipContent","tooltipContentProps"]);const c=gi(),d=$(()=>({class:He(nb({variant:a(),size:s()}),e.class),"data-slot":"sidebar-menu-button","data-sidebar":"menu-button","data-size":s(),"data-active":i(),...o}));var f=q(),v=A(f);{var h=g=>{r(g,()=>({}))},m=g=>{var y=q(),E=A(y);Ce(E,()=>tb,(S,b)=>{b(S,{children:(O,z)=>{var M=ib(),T=A(M);{const I=(K,W)=>{let J=()=>W?.().props;r(K,()=>({props:J()}))};Ce(T,()=>Qy,(K,W)=>{W(K,{child:I,$$slots:{child:!0}})})}var R=_(T,2);{let I=$(()=>c.state!=="collapsed"||c.isMobile);Ce(R,()=>eb,(K,W)=>{W(K,Ke({side:"right",align:"center",get hidden(){return l(I)}},()=>e.tooltipContentProps,{children:(J,j)=>{var N=q(),P=A(N);{var x=F=>{var C=$e();G(()=>B(C,e.tooltipContent)),u(F,C)},w=F=>{var C=q(),D=A(C);{var H=Y=>{var X=q(),Z=A(X);fe(Z,()=>e.tooltipContent),u(Y,X)};L(D,Y=>{e.tooltipContent&&Y(H)},!0)}u(F,C)};L(P,F=>{typeof e.tooltipContent=="string"?F(x):F(w,!1)})}u(J,N)},$$slots:{default:!0}}))})}u(O,M)},$$slots:{default:!0}})}),u(g,y)};L(v,g=>{e.tooltipContent?g(m,!1):g(h)})}u(t,f),se()}var ob=k("<li><!></li>");function lb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=ob();Xe(a,i=>({"data-slot":"sidebar-menu-item","data-sidebar":"menu-item",class:i,...n}),[()=>He("group/menu-item relative",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var cb=k("<ul><!></ul>");function db(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=cb();Xe(a,i=>({"data-slot":"sidebar-menu","data-sidebar":"menu",class:i,...n}),[()=>He("flex w-full min-w-0 flex-col gap-1",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var ub=k("<div><!></div>");function fb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"open",15,!0),a=U(e,"onOpenChange",3,()=>{}),s=xe(e,["$$slots","$$events","$$legacy","ref","open","onOpenChange","class","style","children"]);const i=By({open:()=>n(),setOpen:d=>{n(d),a()(d),document.cookie=`${Oy}=${n()}; path=/; max-age=${Iy}`}});var o=q();kf("keydown",zi,function(...d){i.handleShortcutKeydown?.apply(this,d)});var c=A(o);Ce(c,()=>rb,(d,f)=>{f(d,{delayDuration:0,children:(v,h)=>{var m=ub();Xe(m,y=>({"data-slot":"sidebar-wrapper",style:`--sidebar-width: ${Ny}; --sidebar-width-icon: ${My}; ${e.style??""}`,class:y,...s}),[()=>He("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",e.class)]);var g=p(m);fe(g,()=>e.children??ye),ut(m,y=>r(y),()=>r()),u(v,m)},$$slots:{default:!0}})}),u(t,o),se()}function Qt(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class"]);var a=q(),s=A(a);{let i=$(()=>He("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",e.class));Ce(s,()=>ny,(o,c)=>{c(o,Ke({"data-slot":"separator",get class(){return l(i)}},()=>n,{get ref(){return r()},set ref(d){r(d)}}))})}u(t,a),se()}function pb(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M9 3v18"}]];_t(t,Ke({name:"panel-left"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}var vb=k('<!> <span class="sr-only">Toggle Sidebar</span>',1);function mb(t,e){ie(e,!0),U(e,"ref",11,null);let r=xe(e,["$$slots","$$events","$$legacy","ref","class","onclick"]);const n=gi();{let a=$(()=>He("size-7",e.class));It(t,Ke({"data-sidebar":"trigger","data-slot":"sidebar-trigger",variant:"ghost",size:"icon",get class(){return l(a)},type:"button",onclick:s=>{e.onclick?.(s),n.toggle()}},()=>r,{children:(s,i)=>{var o=vb(),c=A(o);pb(c,{}),u(s,o)},$$slots:{default:!0}}))}se()}function hb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class"]);var a=q(),s=A(a);{let i=$(()=>He("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",e.class));Ce(s,()=>Lg,(o,c)=>{c(o,Ke({"data-slot":"sheet-overlay",get class(){return l(i)}},()=>n,{get ref(){return r()},set ref(d){r(d)}}))})}u(t,a),se()}function Vd(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];_t(t,Ke({name:"x"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}const gb=fi({base:"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",variants:{side:{top:"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",bottom:"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",left:"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",right:"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"}},defaultVariants:{side:"right"}});var _b=k('<!> <span class="sr-only">Close</span>',1),yb=k("<!> <!>",1),bb=k("<!> <!>",1);function xb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"side",3,"right"),a=xe(e,["$$slots","$$events","$$legacy","ref","class","side","portalProps","children"]);var s=q(),i=A(s);Ce(i,()=>vd,(o,c)=>{c(o,Ke(()=>e.portalProps,{children:(d,f)=>{var v=bb(),h=A(v);hb(h,{});var m=_(h,2);{let g=$(()=>He(gb({side:n()}),e.class));Ce(m,()=>by,(y,E)=>{E(y,Ke({"data-slot":"sheet-content",get class(){return l(g)}},()=>a,{get ref(){return r()},set ref(S){r(S)},children:(S,b)=>{var O=yb(),z=A(O);fe(z,()=>e.children??ye);var M=_(z,2);Ce(M,()=>gy,(T,R)=>{R(T,{class:"ring-offset-background focus-visible:ring-ring rounded-xs focus-visible:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",children:(I,K)=>{var W=_b(),J=A(W);Vd(J,{class:"size-4"}),u(I,W)},$$slots:{default:!0}})}),u(S,O)},$$slots:{default:!0}}))})}u(d,v)},$$slots:{default:!0}}))}),u(t,s),se()}var wb=k("<div><!></div>");function Sb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=wb();Xe(a,i=>({"data-slot":"sheet-header",class:i,...n}),[()=>He("flex flex-col gap-1.5 p-4",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}function kb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class"]);var a=q(),s=A(a);{let i=$(()=>He("text-foreground font-semibold",e.class));Ce(s,()=>Kh,(o,c)=>{c(o,Ke({"data-slot":"sheet-title",get class(){return l(i)}},()=>n,{get ref(){return r()},set ref(d){r(d)}}))})}u(t,a),se()}function Pb(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class"]);var a=q(),s=A(a);{let i=$(()=>He("text-muted-foreground text-sm",e.class));Ce(s,()=>Bg,(o,c)=>{c(o,Ke({"data-slot":"sheet-description",get class(){return l(i)}},()=>n,{get ref(){return r()},set ref(d){r(d)}}))})}u(t,a),se()}const Ab=my;var Eb=k("<div><!></div>"),Cb=k("<!> <!>",1),Tb=k('<!> <div class="flex h-full w-full flex-col"><!></div>',1),Fb=k('<div class="text-sidebar-foreground group peer hidden md:block" data-slot="sidebar"><div data-slot="sidebar-gap"></div> <div><div data-sidebar="sidebar" data-slot="sidebar-inner" class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"><!></div></div></div>');function Ri(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"side",3,"left"),a=U(e,"variant",3,"sidebar"),s=U(e,"collapsible",3,"offcanvas"),i=xe(e,["$$slots","$$events","$$legacy","ref","side","variant","collapsible","class","children"]);const o=gi();var c=q(),d=A(c);{var f=h=>{var m=Eb();Xe(m,y=>({class:y,...i}),[()=>He("bg-sidebar text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col",e.class)]);var g=p(m);fe(g,()=>e.children??ye),ut(m,y=>r(y),()=>r()),u(h,m)},v=h=>{var m=q(),g=A(m);{var y=S=>{var b=q(),O=A(b),z=()=>o.openMobile,M=T=>o.setOpenMobile(T);Ce(O,()=>Ab,(T,R)=>{R(T,Ke({get open(){return z()},set open(I){M(I)}},()=>i,{children:(I,K)=>{var W=q(),J=A(W);Ce(J,()=>xb,(j,N)=>{N(j,{"data-sidebar":"sidebar","data-slot":"sidebar","data-mobile":"true",class:"bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",get style(){return`--sidebar-width: ${Dy};`},get side(){return n()},children:(P,x)=>{var w=Tb(),F=A(w);Ce(F,()=>Sb,(H,Y)=>{Y(H,{class:"sr-only",children:(X,Z)=>{var Q=Cb(),pe=A(Q);Ce(pe,()=>kb,(te,Fe)=>{Fe(te,{children:(ue,le)=>{var re=$e("Sidebar");u(ue,re)},$$slots:{default:!0}})});var ae=_(pe,2);Ce(ae,()=>Pb,(te,Fe)=>{Fe(te,{children:(ue,le)=>{var re=$e("Displays the mobile sidebar.");u(ue,re)},$$slots:{default:!0}})}),u(X,Q)},$$slots:{default:!0}})});var C=_(F,2),D=p(C);fe(D,()=>e.children??ye),u(P,w)},$$slots:{default:!0}})}),u(I,W)},$$slots:{default:!0}}))}),u(S,b)},E=S=>{var b=Fb(),O=p(b),z=_(O,2);Xe(z,R=>({"data-slot":"sidebar-container",class:R,...i}),[()=>He("w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex",n()==="left"?"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]":"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",a()==="floating"||a()==="inset"?"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",e.class)]);var M=p(z),T=p(M);fe(T,()=>e.children??ye),ut(b,R=>r(R),()=>r()),G(R=>{ht(b,"data-state",o.state),ht(b,"data-collapsible",o.state==="collapsed"?s():""),ht(b,"data-variant",a()),ht(b,"data-side",n()),dr(O,1,R)},[()=>jr(He("w-(--sidebar-width) relative bg-transparent transition-[width] duration-200 ease-linear","group-data-[collapsible=offcanvas]:w-0","group-data-[side=right]:rotate-180",a()==="floating"||a()==="inset"?"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]":"group-data-[collapsible=icon]:w-(--sidebar-width-icon)"))]),u(S,b)};L(g,S=>{o.isMobile?S(y):S(E,!1)},!0)}u(h,m)};L(d,h=>{s()==="none"?h(f):h(v,!1)})}u(t,c),se()}class Ar{static instance=null;pyodide=null;status="not-initialized";initializationPromise=null;outputHandlers=[];stdoutBuffer="";stderrBuffer="";constructor(){}static getInstance(){return Ar.instance||(Ar.instance=new Ar),Ar.instance}getStatus(){return this.status}isReady(){return this.status==="ready"&&this.pyodide!==null}addOutputHandler(e){this.outputHandlers.push(e)}removeOutputHandler(e){const r=this.outputHandlers.indexOf(e);r>-1&&this.outputHandlers.splice(r,1)}setStatus(e){this.status=e,this.outputHandlers.forEach(r=>{r.onStatusChange?.(e)})}handleStdout=e=>{this.stdoutBuffer+=e,this.outputHandlers.forEach(r=>{r.onStdout?.(e)})};handleStderr=e=>{this.stderrBuffer+=e,this.outputHandlers.forEach(r=>{r.onStderr?.(e)})};async getPyodide(){return this.pyodide?this.pyodide:this.initializationPromise?this.initializationPromise:(this.initializationPromise=this.initializePyodide(),this.initializationPromise)}async initializePyodide(){try{this.setStatus("initializing"),await this.loadPyodideScript();const r=window.location.pathname.includes("/BrowserBoxV5/")?"/BrowserBoxV5":"",n={stdout:this.handleStdout,stderr:this.handleStderr,indexURL:`${r}/assets/`};this.pyodide=await loadPyodide(n),this.setStatus("loading-packages"),console.log("Loading basic packages...");const a=["micropip","numpy","pandas","matplotlib","scikit-learn"];try{await this.pyodide.loadPackage(a),console.log("Standard packages loaded successfully"),await this.pyodide.runPython(`
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
print("✓ Basic scientific computing packages loaded successfully!")
print(f"NumPy version: {np.__version__}")
print(f"Pandas version: {pd.__version__}")
print(f"Matplotlib version: {plt.matplotlib.__version__}")
print(f"Scikit-learn version: {sklearn.__version__}")
        `)}catch(s){throw console.error("Failed to load standard packages:",s),s}return this.setStatus("ready"),this.pyodide}catch(e){throw this.setStatus("error"),console.error("Failed to initialize Pyodide:",e),e}}async loadPyodideScript(){return new Promise((e,r)=>{if(typeof loadPyodide<"u"){e();return}const a=window.location.pathname.includes("/BrowserBoxV5/")?"/BrowserBoxV5":"",s=document.createElement("script");s.src=`${a}/assets/pyodide.js`,s.onload=()=>e(),s.onerror=()=>r(new Error("Failed to load Pyodide script")),document.head.appendChild(s)})}async runPython(e){return(await this.getPyodide()).runPython(e)}async runPythonAsync(e){return(await this.getPyodide()).runPythonAsync(e)}async writeFile(e,r){(await this.getPyodide()).FS.writeFile(e,r)}async readFile(e){return(await this.getPyodide()).FS.readFile(e)}getStdoutBuffer(){return this.stdoutBuffer}getStderrBuffer(){return this.stderrBuffer}clearBuffers(){this.stdoutBuffer="",this.stderrBuffer=""}async isPackageAvailable(e){try{return await this.runPython(`import ${e}`),!0}catch{return!1}}async createDataDirectory(){const e=await this.getPyodide();try{e.FS.mkdir("/data")}catch{}}}class Gd{pyodideManager;uploadedFiles=new Map;constructor(){this.pyodideManager=Ar.getInstance()}async uploadFileWithCustomName(e,r,n){try{await this.pyodideManager.getPyodide(),await this.pyodideManager.createDataDirectory();const a=this.sanitizeFilename(n),s=`/data/${a}`,i=await r.arrayBuffer(),o=new Uint8Array(i);await this.pyodideManager.writeFile(s,o);const c={id:e,filename:a,originalName:r.name,size:r.size,type:r.type,pythonPath:s,uploadedAt:new Date,file:r};this.uploadedFiles.set(e,c);const d=this.createVariableName(a);return await this.pyodideManager.runPython(`${d} = "${s}"`),console.log(`File uploaded to Pyodide: ${r.name} -> ${s} (as ${n})`),c}catch(a){throw console.error(`Failed to upload file ${r.name}:`,a),a}}async uploadFile(e,r){try{await this.pyodideManager.getPyodide(),await this.pyodideManager.createDataDirectory();const n=this.sanitizeFilename(r.name),a=`/data/${n}`,s=await r.arrayBuffer(),i=new Uint8Array(s);await this.pyodideManager.writeFile(a,i);const o={id:e,filename:n,originalName:r.name,size:r.size,type:r.type,pythonPath:a,uploadedAt:new Date,file:r};this.uploadedFiles.set(e,o);const c=this.createVariableName(n);return await this.pyodideManager.runPython(`${c} = "${a}"`),console.log(`File uploaded to Pyodide: ${r.name} -> ${a}`),o}catch(n){throw console.error(`Failed to upload file ${r.name}:`,n),n}}async removeFile(e){const r=this.uploadedFiles.get(e);if(r)try{await this.pyodideManager.runPython(`
import os
if os.path.exists("${r.pythonPath}"):
    os.remove("${r.pythonPath}")
      `),this.uploadedFiles.delete(e),console.log(`File removed from Pyodide: ${r.pythonPath}`)}catch(n){console.error(`Failed to remove file ${r.originalName}:`,n)}}getDataSummary(){const e=Array.from(this.uploadedFiles.values()),r=e.reduce((a,s)=>a+s.size,0),n={};return e.forEach(a=>{n[a.filename]=a.pythonPath}),{totalFiles:e.length,totalSize:r,availableFiles:e,pythonPaths:n}}async syncFromFileStore(){try{const e=ft.files;console.log(`[DataBridge] Starting sync from file store. Found ${Object.keys(e).length} files in store.`);for(const[r,n]of Object.entries(e))console.log(`[DataBridge] Checking file ${r}: ${n.filename}, has file object: ${!!n.file}, already synced: ${this.uploadedFiles.has(r)}`),n.file&&!this.uploadedFiles.has(r)&&(console.log(`[DataBridge] Syncing new file: ${n.filename} ${n.wasRenamed?"(renamed from "+n.originalName+")":""}`),await this.uploadFileWithCustomName(r,n.file,n.filename));console.log(`[DataBridge] Sync complete. Total files in Pyodide: ${this.uploadedFiles.size}`),this.uploadedFiles.forEach((r,n)=>{console.log(`  - ${n}: ${r.filename} -> ${r.pythonPath}`)})}catch(e){console.error("Failed to sync files from file store:",e)}}generateDataLoadingCode(){const e=Array.from(this.uploadedFiles.values());if(e.length===0)return`
# No data files available
print("No data files have been uploaded yet.")
available_files = []
`;const r=e.map(n=>{const a=this.createVariableName(n.filename);return n.type==="application/octet-stream"||n.originalName.endsWith(".parquet")?`
# Load ${n.originalName}
try:
    import pandas as pd
    ${a}_df = pd.read_parquet("${n.pythonPath}")
    print(f"Loaded {file.originalName}: {${a}_df.shape} rows/columns")
except Exception as e:
    print(f"Failed to load ${n.originalName}: {e}")
    ${a}_df = None
`:`
# File available at: ${n.pythonPath}
${a}_path = "${n.pythonPath}"
print(f"File available: ${n.originalName} at {${a}_path}")
`}).join(`
`);return`
# Available data files
available_files = [
${e.map(n=>`    "${n.originalName}"`).join(`,
`)}
]

print(f"Available data files: {len(available_files)}")
${r}
`}getFile(e){return this.uploadedFiles.get(e)}getAllFiles(){return Array.from(this.uploadedFiles.values())}async fileExists(e){try{return await this.pyodideManager.runPython(`
import os
file_exists = os.path.exists("${e}")
      `),await this.pyodideManager.runPython("file_exists")}catch{return!1}}async getFileSize(e){try{return await this.pyodideManager.runPython(`
import os
os.path.getsize("${e}") if os.path.exists("${e}") else 0
      `)}catch{return 0}}createVariableName(e){return e.replace(/[^a-zA-Z0-9_]/g,"_").replace(/^[0-9]/,"_$&").toLowerCase()}sanitizeFilename(e){return e.replace(/[<>:"/\\|?*]/g,"_")}async clearAllFiles(){const e=Array.from(this.uploadedFiles.keys());for(const r of e)await this.removeFile(r);this.uploadedFiles.clear()}generateFileInspectionCode(e){const r=this.uploadedFiles.get(e);return r?r.type==="application/octet-stream"||r.originalName.endsWith(".parquet")?`
# Inspect ${r.originalName}
import pandas as pd
import numpy as np

try:
    df = pd.read_parquet("${r.pythonPath}")
    
    print(f"File: ${r.originalName}")
    print(f"Shape: {df.shape}")
    print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    print(f"Columns: {list(df.columns)}")
    print(f"Data types:\\n{df.dtypes}")
    print(f"\\nFirst 5 rows:")
    print(df.head())
    print(f"\\nSummary statistics:")
    print(df.describe())
    
except Exception as e:
    print(f"Error inspecting file: {e}")
`:`
# File info for ${r.originalName}
print(f"File: ${r.originalName}")
print(f"Path: ${r.pythonPath}")
print(f"Size: ${r.size} bytes")
print(f"Type: ${r.type}")
`:`print("File not found: ${e}")`}}const $t=pt({availableSchemas:Ts,executions:{},selectedSchemaId:null}),Rb=new Gd,nr={getSchema:t=>$t.availableSchemas.find(e=>e.id===t),getExecution:t=>$t.executions[t],getExecutionStatus:t=>$t.executions[t]?.status??"ready",getValidationResults:t=>$t.executions[t]?.results,isSchemaSelected:t=>$t.selectedSchemaId===t},Mr={selectSchema:t=>{$t.selectedSchemaId=t},initializeExecution:t=>{$t.executions[t]||($t.executions[t]={id:`${t}-${Date.now()}`,schemaId:t,status:"ready"})},startExecution:async t=>{const e=nr.getSchema(t);if(!e)throw new Error(`Schema with ID ${t} not found`);Mr.initializeExecution(t);const r=$t.executions[t];r.status="running",r.output="",r.error="",r.results=void 0;const n=Date.now();try{console.log(`Starting schema validation: ${e.title}`);const a=Ar.getInstance();if(await Rb.syncFromFileStore(),e.dependencies){for(const f of e.dependencies)if(f.type==="uploaded"){const v=ft.files[f.sourceId];if(!v?.file)throw new Error(`Required file ${f.sourceId} not found or not uploaded`);console.log(`File ${v.filename} is available for schema validation`)}}a.clearBuffers();const s={onStdout:f=>{r.output=(r.output||"")+f}};a.addOutputHandler(s);try{await a.runPython(e.content)}finally{a.removeOutputHandler(s)}const o=((Date.now()-n)/1e3).toFixed(2)+"s";let c;const d=[`/data/${e.id.replace("-","_")}_validation_results.json`,"/data/random_data_schema_validation_results.json","/data/sample_data_schema_validation_results.json"];for(const f of d)try{const v=await a.readFile(f),h=new TextDecoder().decode(v);c=JSON.parse(h),console.log(`Parsed validation results from: ${f}`,c);break}catch(v){console.debug(`Failed to read validation results from ${f}:`,v)}c||console.warn("No validation results file found"),r.status="completed",r.executionTime=o,r.lastRun=new Date().toLocaleString(),r.results=c,r.metrics={outputLines:r.output?.split(`
`).length||0,errorCount:0,memoryUsage:"N/A"},console.log(`Schema validation completed in ${o}`)}catch(a){const i=((Date.now()-n)/1e3).toFixed(2)+"s";throw r.status="error",r.executionTime=i,r.lastRun=new Date().toLocaleString(),r.error=a instanceof Error?a.message:String(a),r.metrics={outputLines:r.output?.split(`
`).length||0,errorCount:1,memoryUsage:"N/A"},console.error("Schema validation failed:",a),a}},clearExecution:t=>{delete $t.executions[t]},clearAllExecutions:()=>{$t.executions={}}},Ob=`
let pyodide;

async function loadPyodideAndPackages(embeddedAssets, baseUrl) {
    // Check if we have embedded assets (single-file build)
    if (embeddedAssets && embeddedAssets['pyodide.js']) {
        // Load Pyodide from embedded assets with improved approach
        try {
            // Create blob URLs for all embedded assets first
            const assetBlobUrls = {};
            const cleanupUrls = [];
            
            for (const [filename, dataUri] of Object.entries(embeddedAssets)) {
                try {
                    const base64Data = dataUri.split(',')[1];
                    if (base64Data) {
                        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                        const mimeType = getMimeTypeFromFilename(filename);
                        const blob = new Blob([binaryData], { type: mimeType });
                        const blobUrl = URL.createObjectURL(blob);
                        assetBlobUrls[filename] = blobUrl;
                        cleanupUrls.push(blobUrl);
                    }
                } catch (error) {
                    console.error(\`Failed to create blob URL for \${filename}:\`, error);
                }
            }
            
            // Set up both fetch and importScripts interception for CSP compliance
            const originalFetch = globalThis.fetch;
            const originalImportScripts = globalThis.importScripts;
            
            globalThis.fetch = function(url, options) {
                const urlString = String(url);
                console.log(\`Fetch intercepted: \${urlString}\`);
                if (urlString.startsWith('https://pyodide-embedded/')) {
                    const filename = urlString.replace('https://pyodide-embedded/', '');
                    console.log(\`Looking for embedded file: \${filename}\`);
                    if (assetBlobUrls[filename]) {
                        console.log(\`Redirecting \${filename} to blob URL\`);
                        return originalFetch.call(this, assetBlobUrls[filename], options);
                    }
                    console.error(\`Embedded asset not found: \${filename}\`);
                    console.error('Available assets:', Object.keys(assetBlobUrls));
                    return Promise.reject(new Error(\`Embedded asset not found: \${filename}\`));
                }
                return originalFetch.call(this, url, options);
            };
            
            // Intercept importScripts for CSP compliance
            globalThis.importScripts = function(...urls) {
                const mappedUrls = urls.map(url => {
                    const urlString = String(url);
                    if (urlString.startsWith('https://pyodide-embedded/')) {
                        const filename = urlString.replace('https://pyodide-embedded/', '');
                        if (assetBlobUrls[filename]) {
                            console.log(\`Redirecting importScripts for \${filename} to blob URL\`);
                            return assetBlobUrls[filename];
                        }
                        throw new Error(\`Embedded asset not found for importScripts: \${filename}\`);
                    }
                    return url;
                });
                return originalImportScripts.apply(this, mappedUrls);
            };
            
            // Load pyodide.js using importScripts with proper cleanup
            const pyodideJsUrl = assetBlobUrls['pyodide.js'];
            if (!pyodideJsUrl) {
                throw new Error('pyodide.js not found in embedded assets');
            }
            
            try {
                importScripts(pyodideJsUrl);
                
                // Load Pyodide with embedded assets - keep fetch interception active
                self.pyodide = await loadPyodide({
                    indexURL: 'https://pyodide-embedded/',
                    stdout: (text) => {
                        self.postMessage({ type: 'stdout', data: text });
                    },
                    stderr: (text) => {
                        self.postMessage({ type: 'stderr', data: text });
                    }
                });
                
                // Load micropip first with our fetch interception still active
                await self.pyodide.loadPackage("micropip");
                await self.pyodide.loadPackage("packaging");
                
                // Keep fetch interception active for the entire worker session
                // Only restore importScripts since it's not needed after initial loading
                globalThis.importScripts = originalImportScripts;
                
                // Store the asset URLs globally so they persist for the worker lifetime
                self.pyodideAssetUrls = assetBlobUrls;
                
            } catch (error) {
                // On error, restore everything
                globalThis.fetch = originalFetch;
                globalThis.importScripts = originalImportScripts;
                cleanupUrls.forEach(url => URL.revokeObjectURL(url));
                throw error;
            }
            
        } catch (error) {
            console.error('Failed to load Pyodide from embedded assets:', error);
            throw error;
        }
    } else {
        // Standard mode - load from Vite-generated paths
        try {
            // Use base URL passed from main thread
            if (!baseUrl) {
                throw new Error('Base URL not provided');
            }
            
            // Detect GitHub Pages deployment
            const isGitHubPages = baseUrl.includes('github.io');
            const basePath = isGitHubPages ? '/BrowserBoxV5' : '';
            
            // Import from assets directory (where Vite places core Pyodide files)
            importScripts(\`\${baseUrl}\${basePath}/assets/pyodide.js\`);
            
            // Load Pyodide with assets path for core files
            self.pyodide = await loadPyodide({
                indexURL: \`\${baseUrl}\${basePath}/assets/\`,
                stdout: (text) => {
                    self.postMessage({ type: 'stdout', data: text });
                },
                stderr: (text) => {
                    self.postMessage({ type: 'stderr', data: text });
                }
            });
        } catch (error) {
            console.error('Failed to load Pyodide from local files:', error);
            throw error;
        }
    }
    
    return self.pyodide;
}

function getMimeTypeFromFilename(filename) {
    if (filename.endsWith('.wasm')) return 'application/wasm';
    if (filename.endsWith('.js')) return 'application/javascript';
    if (filename.endsWith('.json')) return 'application/json';
    if (filename.endsWith('.zip')) return 'application/zip';
    if (filename.endsWith('.whl')) return 'application/zip';
    if (filename.endsWith('.tar')) return 'application/x-tar';
    if (filename.endsWith('.tar.gz')) return 'application/gzip';
    if (filename.endsWith('.data')) return 'application/octet-stream';
    if (filename.endsWith('.txt')) return 'text/plain';
    if (filename.endsWith('.map')) return 'application/json';
    return 'application/octet-stream';
}

// Pyodide will be loaded when we receive the first message with embedded assets
let pyodideReadyPromise = null;

self.onmessage = async function(event) {
    try {
        const { id, python, files, embeddedAssets, baseUrl } = event.data;
        
        // Initialize Pyodide on first message with embedded assets
        if (!pyodideReadyPromise) {
            pyodideReadyPromise = loadPyodideAndPackages(embeddedAssets, baseUrl);
        }
        
        // Make sure pyodide is ready
        self.pyodide = await pyodideReadyPromise;
        
        function sendStatus(status) {
            self.postMessage({ type: 'status', id, data: status });
        }
        
        sendStatus("Setting up environment...");
        
        sendStatus("Loading packages...");
        
        // Use standard Pyodide package loading (no custom wheels for now)
        const standardPackages = [
            'micropip',
            'numpy', 
            'pandas',
            'matplotlib',
            'scikit-learn'
        ];
        
        await self.pyodide.loadPackage(standardPackages);
        
        // Verify package loading
        await self.pyodide.runPython(\`
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn
print("✓ Basic scientific computing packages loaded successfully!")
print(f"NumPy version: {np.__version__}")
print(f"Pandas version: {pd.__version__}")
print(f"Matplotlib version: {plt.matplotlib.__version__}")
print(f"Scikit-learn version: {sklearn.__version__}")
        \`);
        
        // GeoPandas dependencies as wheel files  
        const geopandasDeps = [
            'shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl',
            'fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl', 
            'pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl'
            // packaging already installed above, pandas already installed above
            // pyogrio not provided - geopandas will fall back to fiona
        ];
        
        // GeoPandas itself
        const geopandasPackages = [
            'geopandas-1.0.1-py3-none-any.whl'
        ];
        
        // Matplotlib dependencies that need to be installed first
        const matplotlibDeps = [
            'cycler-0.12.1-py3-none-any.whl',
            'fonttools-4.51.0-py3-none-any.whl',
            'kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
            'pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
            'pyparsing-3.1.2-py3-none-any.whl',
            'contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl'
            // packaging and python-dateutil already available in base pyodide
            // numpy already installed in basicPackages
        ];
        
        // Matplotlib itself
        const matplotlibPackages = [
            'matplotlib-3.8.4-cp312-cp312-pyodide_2024_0_wasm32.whl'
        ];
        
        // Install basic packages first
        if (embeddedAssets) {
            // Single-file build mode - use embedded wheels directly
            for (const filename of basicPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        
                        try {
                            self.pyodide.FS.mkdir('/wheels');
                        } catch (e) {
                            // Directory might already exist
                        }
                        
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install \${filename}:\`, error);
                    }
                }
            }
        } else {
            // Standard mode - use pyodide directory for wheel files
            for (const filename of basicPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}\${basePath}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    
                    try {
                        self.pyodide.FS.mkdir('/wheels');
                    } catch (e) {
                        // Directory might already exist
                    }
                    
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install \${filename} from pyodide directory:\`, error);
                }
            }
        }
        
        // Install Fiona dependencies first
        console.log('Installing Fiona dependencies...');
        if (embeddedAssets) {
            for (const filename of fionaDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed fiona dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install fiona dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of fionaDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed fiona dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install fiona dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install GeoPandas dependencies from embedded wheels
        console.log('Installing GeoPandas dependencies...');
        if (embeddedAssets) {
            for (const filename of geopandasDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of geopandasDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Finally install GeoPandas - extract wheel manually to bypass micropip dependency issues
        console.log('Installing GeoPandas manually...');
        if (embeddedAssets) {
            for (const filename of geopandasPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        
                        // Extract the wheel manually using Python's zipfile instead of micropip
                        await self.pyodide.runPythonAsync(\`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/\${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                        \`);
                        console.log(\`Manually extracted: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to manually extract \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of geopandasPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    
                    // Extract the wheel manually using Python's zipfile instead of micropip
                    await self.pyodide.runPythonAsync(\`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/\${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                    \`);
                    console.log(\`Manually extracted: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to manually extract \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install matplotlib dependencies
        console.log('Installing matplotlib dependencies...');
        if (embeddedAssets) {
            for (const filename of matplotlibDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed matplotlib dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install matplotlib dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of matplotlibDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed matplotlib dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install matplotlib dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install matplotlib itself
        console.log('Installing matplotlib...');
        if (embeddedAssets) {
            for (const filename of matplotlibPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed matplotlib: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install matplotlib \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of matplotlibPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed matplotlib: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install matplotlib \${filename} from local files:\`, error);
                }
            }
        }
        
        console.log('GeoPandas and matplotlib installation phase completed, moving to filesystem setup...');
        sendStatus("Setting up filesystem...");
        
        // Create data directory
        console.log('Creating data directory...');
        self.pyodide.runPython(\`
import os
if not os.path.exists('/data'):
    os.makedirs('/data')
        \`);
        console.log('Data directory created.');
        
        // Record initial filesystem state
        console.log('Recording initial filesystem state...');
        const initialFiles = new Set();
        try {
            const dataFiles = self.pyodide.FS.readdir('/data');
            dataFiles.forEach(name => {
                if (name !== '.' && name !== '..') {
                    initialFiles.add(name);
                }
            });
        } catch (e) {
            // Directory might not exist yet
        }
        console.log('Initial filesystem state recorded.');
        
        // Add files to the virtual filesystem
        if (files && files.length > 0) {
            console.log('Loading files into filesystem...');
            sendStatus("Loading files into filesystem...");
            
            for (const file of files) {
                const path = \`/data/\${file.name}\`;
                self.pyodide.FS.writeFile(path, new Uint8Array(file.data));
                initialFiles.add(file.name); // Mark as initial file
                
                // Log file mapping for debugging
                if (file.originalName !== file.name) {
                    console.log(\`File renamed: \${file.originalName} -> \${file.name}\`);
                } else {
                    console.log(\`File loaded: \${file.name}\`);
                }
            }
            console.log('Files loaded into filesystem.');
        } else {
            console.log('No files to load into filesystem.');
        }
        
        sendStatus("Setting up Python environment...");
        
        // Set up Python environment
        console.log('Setting up Python environment...');
        self.pyodide.runPython(\`
import sys
import os

# Set working directory to data directory
os.chdir('/data')

# Set up output capturing
import io
import contextlib

class OutputCollector:
    def __init__(self):
        self.value = ""
    
    def write(self, text):
        self.value += text
        return len(text)
    
    def flush(self):
        pass

stdout_collector = OutputCollector()
stderr_collector = OutputCollector()

old_stdout = sys.stdout
old_stderr = sys.stderr

sys.stdout = stdout_collector
sys.stderr = stderr_collector
        \`);
        console.log('Python environment setup completed.');
        
        sendStatus("Executing Python script...");
        
        // Execute the Python code with enhanced error handling
        console.log('Starting Python script execution...');
        let result;
        try {
            // Wrap user code in try-except for better error reporting
            // Indent each line of user code to be inside the try block
            const indentedPython = python.split('\\n').map(line => '    ' + line).join('\\n');
            const wrappedPython = \`
try:
\${indentedPython}
except Exception as e:
    import traceback
    error_msg = "Python Error: " + type(e).__name__ + ": " + str(e) + "\\\\n"
    error_msg += "Traceback:\\\\n" + traceback.format_exc()
    print(error_msg, file=sys.stderr)
    raise e
            \`;
            result = await self.pyodide.runPythonAsync(wrappedPython);
        } catch (pythonError) {
            console.log('Python script execution failed with error:', pythonError);
            // Don't re-throw yet, let's capture stderr first
        }
        console.log('Python script execution completed.');
        
        // Get captured output
        const stdout = self.pyodide.runPython("stdout_collector.value");
        const stderr = self.pyodide.runPython("stderr_collector.value");
        
        // Reset stdout and stderr
        self.pyodide.runPython(\`
sys.stdout = old_stdout
sys.stderr = old_stderr
        \`);
        
        sendStatus("Collecting output files...");
        
        // Collect new/modified files
        const modifiedFiles = [];
        try {
            const currentFiles = self.pyodide.FS.readdir('/data');
            const newFiles = currentFiles.filter(name => 
                name !== '.' && name !== '..' && !initialFiles.has(name)
            );
            
            for (const fileName of newFiles) {
                try {
                    const path = \`/data/\${fileName}\`;
                    const content = self.pyodide.FS.readFile(path, { encoding: 'binary' });
                    
                    modifiedFiles.push({
                        name: fileName,
                        data: content,
                        path: path
                    });
                } catch (fileError) {
                    console.error(\`Error reading file \${fileName}:\`, fileError);
                }
            }
        } catch (fsError) {
            console.error("Error reading filesystem:", fsError);
        }
        
        // Send results - check if we have errors in stderr
        if (stderr && stderr.trim()) {
            // Python error occurred - send as error but include output
            self.postMessage({
                type: 'error',
                id,
                data: {
                    error: stderr,
                    stdout: stdout || '',
                    stderr: stderr,
                    modifiedFiles: modifiedFiles
                }
            });
        } else {
            // Successful execution
            self.postMessage({
                type: 'complete',
                id,
                data: {
                    result,
                    stdout,
                    stderr,
                    modifiedFiles
                }
            });
        }
        
    } catch (error) {
        // Send error
        self.postMessage({
            type: 'error',
            id: event.data.id,
            data: {
                error: error.message,
                stack: error.stack
            }
        });
    }
};
`;function os(){const t=new Blob([Ob],{type:"application/javascript"}),e=URL.createObjectURL(t),r=new Worker(e);return setTimeout(()=>URL.revokeObjectURL(e),1e3),r}class Ib{activeWorkers=new Map;executionCounter=0;constructor(){}async executeScript(e,r={}){const n=Date.now(),a=`exec_${++this.executionCounter}_${Date.now()}`,s=[];if(r.dataFiles)for(const c of r.dataFiles){const f=sr.find(v=>v.id===c.requirementId)?.defaultFilename||c.file.name;s.push({name:f,originalName:c.file.name,requirementId:c.requirementId,data:await c.file.arrayBuffer()})}const i=void 0,o=`${window.location.protocol}//${window.location.host}`;return new Promise(c=>{const d=os();this.activeWorkers.set(a,d);let f="";const v=r.timeout?setTimeout(()=>{d.terminate(),this.activeWorkers.delete(a);const m=Date.now()-n;c({success:!1,output:f,error:`Script execution timed out after ${r.timeout}ms`,executionTime:m})},r.timeout):null;d.onmessage=m=>{const{type:g,id:y,data:E}=m.data;if(!(y&&y!==a))switch(g){case"status":r.onStatusUpdate?.(E);break;case"stdout":f+=E,r.onStdout?.(E);break;case"stderr":r.onStderr?.(E);break;case"complete":v&&clearTimeout(v),d.terminate(),this.activeWorkers.delete(a);const S=Date.now()-n,b=E;c({success:!0,output:b.stdout||f,executionTime:S,modifiedFiles:b.modifiedFiles,metrics:{outputLines:(b.stdout||"").split("\\n").length,errorCount:b.stderr?1:0,filesCreated:b.modifiedFiles?.length||0}});break;case"error":v&&clearTimeout(v),d.terminate(),this.activeWorkers.delete(a);const O=Date.now()-n;c({success:!1,output:E.stdout||f,error:E.error||"Unknown error",executionTime:O,modifiedFiles:E.modifiedFiles||[]});break}},d.onerror=m=>{v&&clearTimeout(v),d.terminate(),this.activeWorkers.delete(a);const g=Date.now()-n;c({success:!1,output:f,error:`Worker error: ${m.message}`,executionTime:g})};const h={id:a,python:e.content,files:s,embeddedAssets:i,baseUrl:o};d.postMessage(h)})}cancelExecution(e){if(e){const r=this.activeWorkers.get(e);r&&(r.terminate(),this.activeWorkers.delete(e))}else{for(const[r,n]of this.activeWorkers)n.terminate();this.activeWorkers.clear()}}isCurrentlyExecuting(){return this.activeWorkers.size>0}getActiveExecutionsCount(){return this.activeWorkers.size}dispose(){this.cancelExecution()}}function Nb(t){switch(t.toLowerCase()){case"html":case"htm":return"HTML report or visualization";case"parquet":case"pq":return"Parquet data file";case"csv":return"CSV data file";case"json":return"JSON data file";case"png":case"jpg":case"jpeg":return"Image file";case"pdf":return"PDF document";default:return"Generated file"}}const mt=pt({executions:{},selectedScriptId:null,availableScripts:oa}),Oi=new Ib,Db=new Gd;oa.forEach(t=>{mt.executions[t.id]={id:`exec_${t.id}`,scriptId:t.id,status:"ready"}});const ar={getScript:t=>mt.availableScripts.find(e=>e.id===t),getExecution:t=>mt.executions[t],getExecutionStatus:t=>mt.executions[t]?.status??"ready",isScriptSelected:t=>mt.selectedScriptId===t,getScriptsByCategory:t=>t?mt.availableScripts.filter(e=>e.category===t):mt.availableScripts},Pr={selectScript(t){const e=t?ar.getScript(t):null;if(t&&!e){console.warn(`Attempted to select non-existent script: ${t}`);return}mt.selectedScriptId=t},async startExecution(t){const e=ar.getScript(t);if(!e){console.error(`Invalid script ID: ${t}`);return}const r={id:`exec_${t}`,scriptId:t,status:"running",output:"",error:"",metrics:{outputLines:0,errorCount:0}};mt.executions[t]=r;try{const n=[];if(e.dependencies)for(const s of e.dependencies){let i=null,o=null;if(s.type==="uploaded"){const c=ft.files[s.sourceId];if(c?.file)i=c.file,o=s.sourceId;else{console.warn(`Dependency not found: uploaded file '${s.sourceId}' for script '${e.id}'`);continue}}else if(s.type==="result"){const d=Object.values(yt.resultFiles).filter(v=>v.scriptId===s.sourceId),f=d.length>0?d[0]:null;if(f?.content&&f.content instanceof Uint8Array){const v=new Blob([f.content],{type:"application/octet-stream"});i=new File([v],f.filename,{lastModified:new Date(f.createdAt).getTime()}),o=f.id}else{console.warn(`Dependency not found: no result files from script '${s.sourceId}' for script '${e.id}'`);continue}}i&&o&&n.push({file:i,requirementId:o})}else Object.entries(ft.files).forEach(([s,i])=>{i.file&&n.push({file:i.file,requirementId:s})});const a=await Oi.executeScript(e,{timeout:6e4,dataFiles:n,onStatusUpdate:s=>{const i=mt.executions[t];i&&i.status==="running"&&(i.output+=`[${new Date().toLocaleTimeString()}] ${s}
`)},onStdout:s=>{const i=mt.executions[t];i&&i.status==="running"&&(i.output+=s)},onStderr:s=>{const i=mt.executions[t];i&&i.status==="running"&&(i.output+=`ERROR: ${s}`)}});if(a.modifiedFiles&&a.modifiedFiles.length>0)for(const s of a.modifiedFiles){const i=new Blob([s.data],{type:"application/octet-stream"}),o=new File([i],s.name,{lastModified:new Date().getTime()}),c=s.name.split(".").pop()?.toLowerCase()||"";Sn.addResult({filename:s.name,fileType:c,fileSize:s.data.length,content:s.data,createdAt:new Date().toISOString(),scriptId:t,pyodidePath:s.path,description:Nb(c)})}Pr.completeExecution(t,{output:a.output,error:a.error,executionTime:`${(a.executionTime/1e3).toFixed(2)}s`,metrics:{...a.metrics,executionTimeMs:a.executionTime,filesCreated:a.modifiedFiles?.length||0}})}catch(n){const a=n instanceof Error?n.message:String(n);Pr.errorExecution(t,a)}},completeExecution(t,e){const r=mt.executions[t];if(!r){console.error(`No execution found for script: ${t}`);return}mt.executions[t]={...r,status:e.error?"error":"completed",output:e.output||"",error:e.error||"",executionTime:e.executionTime||"",lastRun:new Date().toLocaleString(),metrics:{...r.metrics,...e.metrics,outputLines:e.output?e.output.split(`
`).length:0,errorCount:e.error?1:0}}},errorExecution(t,e){const r=mt.executions[t];if(!r){console.error(`No execution found for script: ${t}`);return}mt.executions[t]={...r,status:"error",error:e,lastRun:new Date().toLocaleString(),metrics:{...r.metrics,errorCount:1}}},resetExecution(t){mt.executions[t]={id:`exec_${t}`,scriptId:t,status:"ready"}},cancelExecution(t){const e=mt.executions[t];!e||e.status!=="running"||(Oi.cancelExecution(),mt.executions[t]={...e,status:"error",error:"Execution cancelled by user",lastRun:new Date().toLocaleString()})},getDataBridge(){return Db},getScriptExecutor(){return Oi},getAllScriptsWithStatus:()=>mt.availableScripts.map(t=>({...t,execution:mt.executions[t.id]}))};function Mb(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{d:"M12 10v6"}],["path",{d:"m9 13 3-3 3 3"}]];_t(t,Ke({name:"folder-up"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}const hl={navMain:[{title:"Required Files",url:"#",icon:Cc,isActive:!0},{title:"Schema Validation",url:"#",icon:pn,isActive:!1},{title:"Scripts",url:"#",icon:Tc,isActive:!1},{title:"Results",url:"#",icon:Jf,isActive:!1}]};var Lb=k("<!> <span> </span>",1),zb=k("<!> Upload All",1),Bb=k("<!> Validate All",1),Ub=k("<!> Run All",1),jb=k("<!> Download All",1),$b=(t,e)=>V(e,""),qb=k('<button class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-sidebar-accent transition-colors" title="Clear search"><!></button>'),Vb=k('<div class="flex w-full items-center justify-between min-w-0"><div class="text-foreground text-base font-medium truncate"> </div> <!></div> <div class="relative min-w-0"><!> <!></div>',1),Gb=k('<div class="text-xs text-muted-foreground mb-3 px-1"> </div>'),Wb=(t,e)=>V(e,""),Hb=k('<button class="text-xs text-primary hover:underline mt-2">Clear search</button>'),Yb=k('<div class="text-center py-8 text-muted-foreground"><!> <p class="text-sm"><!></p> <!></div>'),Kb=k("<!> <!>",1),Xb=k('<div class="text-xs text-muted-foreground mb-3 px-1"> </div>'),Qb=(t,e)=>V(e,""),Jb=k('<button class="text-xs text-primary hover:underline mt-2">Clear search</button>'),Zb=k('<div class="text-center py-8 text-muted-foreground"><!> <p class="text-sm"><!></p> <!></div>'),ex=k("<!> <!>",1),tx=k('<div class="text-xs text-muted-foreground mb-3 px-1"> </div>'),rx=(t,e)=>V(e,""),nx=k('<button class="text-xs text-primary hover:underline mt-2">Clear search</button>'),ax=k('<p class="text-xs text-muted-foreground mt-1">Run a script to generate results</p>'),ix=k('<div class="text-center py-8 text-muted-foreground"><!> <p class="text-sm"><!></p> <!></div>'),sx=k("<!> <!>",1),ox=k('<div class="text-xs text-muted-foreground mb-3 px-1"> </div>'),lx=(t,e)=>V(e,""),cx=k('<button class="text-xs text-primary hover:underline mt-2">Clear search</button>'),dx=k('<div class="text-center py-8 text-muted-foreground"><!> <p class="text-sm"><!></p> <!></div>'),ux=k("<!> <!>",1),fx=k("<!> <!>",1),px=k("<!>  <!>",1);function vx(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref"]),a=Se(pt(hl.navMain[0])),s=pt(sr),i=Se("");const o=$(()=>$t.availableSchemas),c=$(()=>mt.availableScripts),d=$(()=>Object.values(yt.resultFiles)),f=gi(),v=$(()=>{let x=s;if(l(i).trim()){const w=l(i).toLowerCase().trim();x=x.filter(F=>F.title.toLowerCase().includes(w)||F.description.toLowerCase().includes(w)||F.defaultFilename.toLowerCase().includes(w))}return x}),h=$(()=>{let x=l(o);if(l(i).trim()){const w=l(i).toLowerCase().trim();x=x.filter(F=>F.title.toLowerCase().includes(w)||F.description.toLowerCase().includes(w)||F.filename.toLowerCase().includes(w)||F.category&&F.category.toLowerCase().includes(w))}return x}),m=$(()=>{let x=l(c);if(l(i).trim()){const w=l(i).toLowerCase().trim();x=x.filter(F=>F.title.toLowerCase().includes(w)||F.description.toLowerCase().includes(w)||F.filename.toLowerCase().includes(w)||F.category&&F.category.toLowerCase().includes(w))}return x}),g=$(()=>{let x=l(d);if(l(i).trim()){const w=l(i).toLowerCase().trim();x=x.filter(F=>F.filename.toLowerCase().includes(w)||F.fileType.toLowerCase().includes(w)||F.description&&F.description.toLowerCase().includes(w))}return x}),y=async x=>{const w=document.createElement("input");w.type="file";const F=sr.find(C=>C.id===x);w.accept=F?.acceptedTypes?.join(",")||".parquet,.csv,.gpkg",w.onchange=async C=>{const D=C.target.files?.[0];if(D)try{await er.loadFile(x,D)}catch(H){console.error("File loading failed:",H)}},w.click()},E=async()=>{const x=document.createElement("input");x.type="file",x.webkitdirectory=!0,x.multiple=!0,x.accept=".parquet,.csv,.gpkg",x.onchange=async w=>{const F=Array.from(w.target.files||[]);if(F.length>0)try{const C=await er.loadFilesFromFolder(F);C.matched>0&&console.log(`Successfully uploaded ${C.matched} out of ${C.total} parquet files.`),C.errors.length>0&&console.warn("Some files failed to upload:",C.errors),C.matched===0&&C.total>0&&console.warn(`Found ${C.total} parquet files but none matched expected filenames.`)}catch(C){console.error("Folder upload failed:",C)}},x.click()},S=x=>{er.removeFile(x)},b=x=>{Mr.selectSchema(null),Pr.selectScript(null),Sn.selectResult(null),er.selectFile(x)},O=x=>{Mr.startExecution(x)},z=x=>{er.selectFile(null),Pr.selectScript(null),Sn.selectResult(null),Mr.selectSchema(x)},M=x=>{Pr.startExecution(x)},T=x=>{er.selectFile(null),Mr.selectSchema(null),Sn.selectResult(null),Pr.selectScript(x)},R=x=>{er.selectFile(null),Mr.selectSchema(null),Pr.selectScript(null),Sn.selectResult(x)},I=async x=>{J(x)},K=async()=>{const x=l(h).filter(w=>nr.getExecutionStatus(w.id)!=="running");for(const w of x)try{for(await Mr.startExecution(w.id);nr.getExecutionStatus(w.id)==="running";)await new Promise(F=>setTimeout(F,500))}catch(F){console.error(`Failed to execute schema validation ${w.id}:`,F)}},W=async()=>{const x=l(m).filter(w=>ar.getExecutionStatus(w.id)!=="running");for(const w of x)try{for(await Pr.startExecution(w.id);ar.getExecutionStatus(w.id)==="running";)await new Promise(F=>setTimeout(F,500))}catch(F){console.error(`Failed to execute script ${w.id}:`,F)}},J=x=>{const w=la.getResultFile(x);if(!w?.content){console.error("No content available for download:",x);return}const F=new Blob([w.content],{type:"application/octet-stream"}),C=URL.createObjectURL(F),D=document.createElement("a");D.href=C,D.download=w.filename,D.style.display="none",document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(C)},j=async()=>{const x=l(g);if(x.length===0){console.warn("No results available for download");return}for(const w of x)if(w.content)try{J(w.id),await new Promise(F=>setTimeout(F,100))}catch(F){console.error(`Failed to download ${w.filename}:`,F)}else console.warn(`No content available for ${w.filename}`)};var N=q(),P=A(N);Ce(P,()=>Ri,(x,w)=>{w(x,Ke({collapsible:"icon",class:"overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"},()=>n,{get ref(){return r()},set ref(F){r(F)},children:(F,C)=>{var D=px(),H=A(D);Ce(H,()=>Ri,(X,Z)=>{Z(X,{collapsible:"none",class:"!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r",children:(Q,pe)=>{var ae=q(),te=A(ae);Ce(te,()=>vl,(Fe,ue)=>{ue(Fe,{children:(le,re)=>{var de=q(),Oe=A(de);Ce(Oe,()=>ml,(ge,me)=>{me(ge,{children:(_e,we)=>{var Te=q(),ve=A(Te);Ce(ve,()=>Yn,(Be,Re)=>{Re(Be,{class:"px-1.5 md:px-0",children:(Ue,oe)=>{var ne=q(),ce=A(ne);Ce(ce,()=>db,(he,ke)=>{ke(he,{children:(be,Ee)=>{var Pe=q(),Le=A(Pe);vt(Le,17,()=>hl.navMain,Ze=>Ze.title,(Ze,ze)=>{var Ve=q(),Qe=A(Ve);Ce(Qe,()=>lb,(tt,Ae)=>{Ae(tt,{children:(je,et)=>{var We=q(),qe=A(We);{const Ge=lt=>{var nt=$e();G(()=>B(nt,l(ze).title)),u(lt,nt)};let Ye=$(()=>l(a).title===l(ze).title);Ce(qe,()=>sb,(lt,nt)=>{nt(lt,{tooltipContentProps:{hidden:!1},onclick:()=>{V(a,l(ze),!0),f.setOpen(!0)},get isActive(){return l(Ye)},class:"px-2.5 md:px-2",tooltipContent:Ge,children:(ct,wt)=>{var Pt=Lb(),xt=A(Pt);Ce(xt,()=>l(ze).icon,(vr,wr)=>{wr(vr,{})});var Je=_(xt,2),Ft=p(Je);G(()=>B(Ft,l(ze).title)),u(ct,Pt)},$$slots:{tooltipContent:!0,default:!0}})})}u(je,We)},$$slots:{default:!0}})}),u(Ze,Ve)}),u(be,Pe)},$$slots:{default:!0}})}),u(Ue,ne)},$$slots:{default:!0}})}),u(_e,Te)},$$slots:{default:!0}})}),u(le,de)},$$slots:{default:!0}})}),u(Q,ae)},$$slots:{default:!0}})});var Y=_(H,2);Ce(Y,()=>Ri,(X,Z)=>{Z(X,{collapsible:"none",class:"hidden flex-1 md:flex min-w-0 max-w-full overflow-hidden",children:(Q,pe)=>{var ae=fx(),te=A(ae);Ce(te,()=>Vy,(ue,le)=>{le(ue,{class:"gap-3.5 border-b p-4 min-w-0",children:(re,de)=>{var Oe=Vb(),ge=A(Oe),me=p(ge),_e=p(me),we=_(me,2);{var Te=ne=>{{let ce=$(()=>l(v).length===0);It(ne,{size:"sm",variant:"outline",class:"text-xs h-7",onclick:E,get disabled(){return l(ce)},children:(he,ke)=>{var be=zb(),Ee=A(be);Mb(Ee,{class:"size-3 mr-1"}),u(he,be)},$$slots:{default:!0}})}},ve=ne=>{var ce=q(),he=A(ce);{var ke=Ee=>{{let Pe=$(()=>l(h).length===0||l(h).some(Le=>nr.getExecutionStatus(Le.id)==="running"));It(Ee,{size:"sm",variant:"outline",class:"text-xs h-7",onclick:K,get disabled(){return l(Pe)},children:(Le,Ze)=>{var ze=Bb(),Ve=A(ze);pn(Ve,{class:"size-3 mr-1"}),u(Le,ze)},$$slots:{default:!0}})}},be=Ee=>{var Pe=q(),Le=A(Pe);{var Ze=Ve=>{{let Qe=$(()=>l(m).length===0||l(m).some(tt=>ar.getExecutionStatus(tt.id)==="running"));It(Ve,{size:"sm",variant:"outline",class:"text-xs h-7",onclick:W,get disabled(){return l(Qe)},children:(tt,Ae)=>{var je=Ub(),et=A(je);Tn(et,{class:"size-3 mr-1"}),u(tt,je)},$$slots:{default:!0}})}},ze=Ve=>{var Qe=q(),tt=A(Qe);{var Ae=je=>{{let et=$(()=>l(g).length===0);It(je,{size:"sm",variant:"outline",class:"text-xs h-7",onclick:j,get disabled(){return l(et)},children:(We,qe)=>{var Ge=jb(),Ye=A(Ge);Qi(Ye,{class:"size-3 mr-1"}),u(We,Ge)},$$slots:{default:!0}})}};L(tt,je=>{l(a).title==="Results"&&je(Ae)},!0)}u(Ve,Qe)};L(Le,Ve=>{l(a).title==="Scripts"?Ve(Ze):Ve(ze,!1)},!0)}u(Ee,Pe)};L(he,Ee=>{l(a).title==="Schema Validation"?Ee(ke):Ee(be,!1)},!0)}u(ne,ce)};L(we,ne=>{l(a).title==="Required Files"?ne(Te):ne(ve,!1)})}var Be=_(ge,2),Re=p(Be);{let ne=$(()=>l(a).title==="Schema Validation"?"Search schemas...":l(a).title==="Scripts"?"Search scripts...":l(a).title==="Results"?"Search results...":"Search files...");Ce(Re,()=>Yy,(ce,he)=>{he(ce,{get placeholder(){return l(ne)},class:"pr-8 w-full",get value(){return l(i)},set value(ke){V(i,ke,!0)}})})}var Ue=_(Re,2);{var oe=ne=>{var ce=qb();ce.__click=[$b,i];var he=p(ce);Vd(he,{class:"size-3 text-muted-foreground"}),u(ne,ce)};L(Ue,ne=>{l(i).trim()&&ne(oe)})}G(()=>B(_e,l(a).title)),u(re,Oe)},$$slots:{default:!0}})});var Fe=_(te,2);Ce(Fe,()=>vl,(ue,le)=>{le(ue,{class:"min-w-0 overflow-y-auto",children:(re,de)=>{var Oe=q(),ge=A(Oe);Ce(ge,()=>ml,(me,_e)=>{_e(me,{class:"px-2 min-w-0",children:(we,Te)=>{var ve=q(),Be=A(ve);{var Re=oe=>{var ne=Kb(),ce=A(ne);{var he=be=>{var Ee=Gb(),Pe=p(Ee);G(()=>B(Pe,`Found ${l(h).length??""} schema${l(h).length===1?"":"s"} matching "${l(i)??""}"`)),u(be,Ee)};L(ce,be=>{l(i).trim()&&be(he)})}var ke=_(ce,2);Ce(ke,()=>Yn,(be,Ee)=>{Ee(be,{class:"space-y-4 px-2 py-2",children:(Pe,Le)=>{var Ze=q(),ze=A(Ze);{var Ve=tt=>{var Ae=Yb(),je=p(Ae);pn(je,{class:"size-8 mx-auto mb-2 opacity-50"});var et=_(je,2),We=p(et);{var qe=nt=>{var ct=$e("No schemas match your search");u(nt,ct)},Ge=nt=>{var ct=$e("No schema validations available");u(nt,ct)};L(We,nt=>{l(i).trim()?nt(qe):nt(Ge,!1)})}var Ye=_(et,2);{var lt=nt=>{var ct=Hb();ct.__click=[Wb,i],u(nt,ct)};L(Ye,nt=>{l(i).trim()&&nt(lt)})}u(tt,Ae)},Qe=tt=>{var Ae=q(),je=A(Ae);vt(je,17,()=>l(h),et=>et.id,(et,We)=>{{let qe=$(()=>nr.getExecutionStatus(l(We).id)),Ge=$(()=>nr.getExecution(l(We).id)?.executionTime),Ye=$(()=>nr.getExecution(l(We).id)?.lastRun),lt=$(()=>nr.getValidationResults(l(We).id)?.summary),nt=$(()=>nr.isSchemaSelected(l(We).id));wm(et,{get id(){return l(We).id},get title(){return l(We).title},get description(){return l(We).description},get filename(){return l(We).filename},get status(){return l(qe)},get executionTime(){return l(Ge)},get lastRun(){return l(Ye)},get validationSummary(){return l(lt)},get isSelected(){return l(nt)},onValidate:()=>O(l(We).id),onPreview:()=>z(l(We).id)})}}),u(tt,Ae)};L(ze,tt=>{l(h).length===0?tt(Ve):tt(Qe,!1)})}u(Pe,Ze)},$$slots:{default:!0}})}),u(oe,ne)},Ue=oe=>{var ne=q(),ce=A(ne);{var he=be=>{var Ee=ex(),Pe=A(Ee);{var Le=ze=>{var Ve=Xb(),Qe=p(Ve);G(()=>B(Qe,`Found ${l(m).length??""} script${l(m).length===1?"":"s"} matching "${l(i)??""}"`)),u(ze,Ve)};L(Pe,ze=>{l(i).trim()&&ze(Le)})}var Ze=_(Pe,2);Ce(Ze,()=>Yn,(ze,Ve)=>{Ve(ze,{class:"space-y-4 px-2 py-2",children:(Qe,tt)=>{var Ae=q(),je=A(Ae);{var et=qe=>{var Ge=Zb(),Ye=p(Ge);ra(Ye,{class:"size-8 mx-auto mb-2 opacity-50"});var lt=_(Ye,2),nt=p(lt);{var ct=Je=>{var Ft=$e("No scripts match your search");u(Je,Ft)},wt=Je=>{var Ft=$e("No scripts available");u(Je,Ft)};L(nt,Je=>{l(i).trim()?Je(ct):Je(wt,!1)})}var Pt=_(lt,2);{var xt=Je=>{var Ft=Jb();Ft.__click=[Qb,i],u(Je,Ft)};L(Pt,Je=>{l(i).trim()&&Je(xt)})}u(qe,Ge)},We=qe=>{var Ge=q(),Ye=A(Ge);vt(Ye,17,()=>l(m),lt=>lt.id,(lt,nt)=>{{let ct=$(()=>ar.getExecutionStatus(l(nt).id)),wt=$(()=>ar.getExecution(l(nt).id)?.executionTime),Pt=$(()=>ar.getExecution(l(nt).id)?.lastRun),xt=$(()=>ar.isScriptSelected(l(nt).id));Rm(lt,{get id(){return l(nt).id},get title(){return l(nt).title},get description(){return l(nt).description},get filename(){return l(nt).filename},get status(){return l(ct)},get executionTime(){return l(wt)},get lastRun(){return l(Pt)},get isSelected(){return l(xt)},onRun:()=>M(l(nt).id),onPreview:()=>T(l(nt).id)})}}),u(qe,Ge)};L(je,qe=>{l(m).length===0?qe(et):qe(We,!1)})}u(Qe,Ae)},$$slots:{default:!0}})}),u(be,Ee)},ke=be=>{var Ee=q(),Pe=A(Ee);{var Le=ze=>{var Ve=sx(),Qe=A(Ve);{var tt=je=>{var et=tx(),We=p(et);G(()=>B(We,`Found ${l(g).length??""} result${l(g).length===1?"":"s"} matching "${l(i)??""}"`)),u(je,et)};L(Qe,je=>{l(i).trim()&&je(tt)})}var Ae=_(Qe,2);Ce(Ae,()=>Yn,(je,et)=>{et(je,{class:"space-y-4 px-2 py-2",children:(We,qe)=>{var Ge=q(),Ye=A(Ge);{var lt=ct=>{var wt=ix(),Pt=p(wt);ra(Pt,{class:"size-8 mx-auto mb-2 opacity-50"});var xt=_(Pt,2),Je=p(xt);{var Ft=at=>{var At=$e("No results match your search");u(at,At)},vr=at=>{var At=$e("No results available");u(at,At)};L(Je,at=>{l(i).trim()?at(Ft):at(vr,!1)})}var wr=_(xt,2);{var Xr=at=>{var At=nx();At.__click=[rx,i],u(at,At)},Dt=at=>{var At=ax();u(at,At)};L(wr,at=>{l(i).trim()?at(Xr):at(Dt,!1)})}u(ct,wt)},nt=ct=>{var wt=q(),Pt=A(wt);vt(Pt,17,()=>l(g),xt=>xt.id,(xt,Je)=>{{let Ft=$(()=>la.isResultSelected(l(Je).id));Um(xt,{get id(){return l(Je).id},get filename(){return l(Je).filename},get fileType(){return l(Je).fileType},get fileSize(){return l(Je).fileSize},get createdAt(){return l(Je).createdAt},get description(){return l(Je).description},get isSelected(){return l(Ft)},onPreview:()=>R(l(Je).id),onDownload:()=>I(l(Je).id)})}}),u(ct,wt)};L(Ye,ct=>{l(g).length===0?ct(lt):ct(nt,!1)})}u(We,Ge)},$$slots:{default:!0}})}),u(ze,Ve)},Ze=ze=>{var Ve=ux(),Qe=A(Ve);{var tt=je=>{var et=ox(),We=p(et);G(()=>B(We,`Found ${l(v).length??""} file${l(v).length===1?"":"s"} matching "${l(i)??""}"`)),u(je,et)};L(Qe,je=>{l(i).trim()&&je(tt)})}var Ae=_(Qe,2);Ce(Ae,()=>Yn,(je,et)=>{et(je,{class:"space-y-4 px-2 py-2",children:(We,qe)=>{var Ge=q(),Ye=A(Ge);{var lt=ct=>{var wt=dx(),Pt=p(wt);ra(Pt,{class:"size-8 mx-auto mb-2 opacity-50"});var xt=_(Pt,2),Je=p(xt);{var Ft=Dt=>{var at=$e("No files match your search");u(Dt,at)},vr=Dt=>{var at=$e("No files available");u(Dt,at)};L(Je,Dt=>{l(i).trim()?Dt(Ft):Dt(vr,!1)})}var wr=_(xt,2);{var Xr=Dt=>{var at=cx();at.__click=[lx,i],u(Dt,at)};L(wr,Dt=>{l(i).trim()&&Dt(Xr)})}u(ct,wt)},nt=ct=>{var wt=q(),Pt=A(wt);vt(Pt,17,()=>l(v),xt=>xt.id,(xt,Je)=>{{let Ft=$(()=>ft.uploadStates[l(Je).id]??"waiting"),vr=$(()=>ft.files[l(Je).id]?.filename),wr=$(()=>ft.files[l(Je).id]?.size),Xr=$(()=>ft.files[l(Je).id]?.uploadedAt),Dt=$(()=>ft.files[l(Je).id]?.wasRenamed);om(xt,{get id(){return l(Je).id},get title(){return l(Je).title},get description(){return l(Je).description},get defaultFilename(){return l(Je).defaultFilename},get status(){return l(Ft)},get uploadedFilename(){return l(vr)},get fileSize(){return l(wr)},get uploadedAt(){return l(Xr)},get wasRenamed(){return l(Dt)},onUpload:()=>y(l(Je).id),onRemove:()=>S(l(Je).id),onPreview:()=>b(l(Je).id)})}}),u(ct,wt)};L(Ye,ct=>{l(v).length===0?ct(lt):ct(nt,!1)})}u(We,Ge)},$$slots:{default:!0}})}),u(ze,Ve)};L(Pe,ze=>{l(a).title==="Results"?ze(Le):ze(Ze,!1)},!0)}u(be,Ee)};L(ce,be=>{l(a).title==="Scripts"?be(he):be(ke,!1)},!0)}u(oe,ne)};L(Be,oe=>{l(a).title==="Schema Validation"?oe(Re):oe(Ue,!1)})}u(we,ve)},$$slots:{default:!0}})}),u(re,Oe)},$$slots:{default:!0}})}),u(Q,ae)},$$slots:{default:!0}})}),u(F,D)},$$slots:{default:!0}}))}),u(t,N),se()}ma(["click"]);const gl=["BOOLEAN","INT32","INT64","INT96","FLOAT","DOUBLE","BYTE_ARRAY","FIXED_LEN_BYTE_ARRAY"],nn=["PLAIN","GROUP_VAR_INT","PLAIN_DICTIONARY","RLE","BIT_PACKED","DELTA_BINARY_PACKED","DELTA_LENGTH_BYTE_ARRAY","DELTA_BYTE_ARRAY","RLE_DICTIONARY","BYTE_STREAM_SPLIT"],mx=["REQUIRED","OPTIONAL","REPEATED"],hx=["UTF8","MAP","MAP_KEY_VALUE","LIST","ENUM","DECIMAL","DATE","TIME_MILLIS","TIME_MICROS","TIMESTAMP_MILLIS","TIMESTAMP_MICROS","UINT_8","UINT_16","UINT_32","UINT_64","INT_8","INT_16","INT_32","INT_64","JSON","BSON","INTERVAL"],gx=["UNCOMPRESSED","SNAPPY","GZIP","LZO","BROTLI","LZ4","ZSTD","LZ4_RAW"],Wd=["DATA_PAGE","INDEX_PAGE","DICTIONARY_PAGE","DATA_PAGE_V2"],Hd={timestampFromMilliseconds(t){return new Date(Number(t))},timestampFromMicroseconds(t){return new Date(Number(t/1000n))},timestampFromNanoseconds(t){return new Date(Number(t/1000000n))},dateFromDays(t){return new Date(t*864e5)}};function _l(t,e,r,n){if(e&&r.endsWith("_DICTIONARY")){let a=t;t instanceof Uint8Array&&!(e instanceof Uint8Array)&&(a=new e.constructor(t.length));for(let s=0;s<t.length;s++)a[s]=e[t[s]];return a}else return Yd(t,n)}function Yd(t,e){const{element:r,parsers:n,utf8:a=!0}=e,{type:s,converted_type:i,logical_type:o}=r;if(i==="DECIMAL"){const d=10**-(r.scale||0),f=new Array(t.length);for(let v=0;v<f.length;v++)t[0]instanceof Uint8Array?f[v]=Kd(t[v])*d:f[v]=Number(t[v])*d;return f}if(!i&&s==="INT96"){const c=new Array(t.length);for(let d=0;d<c.length;d++)c[d]=n.timestampFromNanoseconds(_x(t[d]));return c}if(i==="DATE"){const c=new Array(t.length);for(let d=0;d<c.length;d++)c[d]=n.dateFromDays(t[d]);return c}if(i==="TIMESTAMP_MILLIS"){const c=new Array(t.length);for(let d=0;d<c.length;d++)c[d]=n.timestampFromMilliseconds(t[d]);return c}if(i==="TIMESTAMP_MICROS"){const c=new Array(t.length);for(let d=0;d<c.length;d++)c[d]=n.timestampFromMicroseconds(t[d]);return c}if(i==="JSON"){const c=new TextDecoder;return t.map(d=>JSON.parse(c.decode(d)))}if(i==="BSON")throw new Error("parquet bson not supported");if(i==="INTERVAL")throw new Error("parquet interval not supported");if(i==="UTF8"||o?.type==="STRING"||a&&s==="BYTE_ARRAY"){const c=new TextDecoder,d=new Array(t.length);for(let f=0;f<d.length;f++)d[f]=t[f]&&c.decode(t[f]);return d}if(i==="UINT_64"||o?.type==="INTEGER"&&o.bitWidth===64&&!o.isSigned){if(t instanceof BigInt64Array)return new BigUint64Array(t.buffer,t.byteOffset,t.length);const c=new BigUint64Array(t.length);for(let d=0;d<c.length;d++)c[d]=BigInt(t[d]);return c}if(i==="UINT_32"||o?.type==="INTEGER"&&o.bitWidth===32&&!o.isSigned){if(t instanceof Int32Array)return new Uint32Array(t.buffer,t.byteOffset,t.length);const c=new Uint32Array(t.length);for(let d=0;d<c.length;d++)c[d]=t[d];return c}if(o?.type==="FLOAT16")return Array.from(t).map(Xd);if(o?.type==="TIMESTAMP"){const{unit:c}=o;let d=n.timestampFromMilliseconds;c==="MICROS"&&(d=n.timestampFromMicroseconds),c==="NANOS"&&(d=n.timestampFromNanoseconds);const f=new Array(t.length);for(let v=0;v<f.length;v++)f[v]=d(t[v]);return f}return t}function Kd(t){let e=0;for(const n of t)e=e*256+n;const r=t.length*8;return e>=2**(r-1)&&(e-=2**r),e}function _x(t){const e=(t>>64n)-2440588n,r=t&0xffffffffffffffffn;return e*86400000000000n+r}function Xd(t){if(!t)return;const e=t[1]<<8|t[0],r=e>>15?-1:1,n=e>>10&31,a=e&1023;return n===0?r*2**-14*(a/1024):n===31?a?NaN:r*(1/0):r*2**(n-15)*(1+a/1024)}function Qd(t,e,r){const n=t[e],a=[];let s=1;if(n.num_children)for(;a.length<n.num_children;){const i=t[e+s],o=Qd(t,e+s,[...r,i.name]);s+=o.count,a.push(o)}return{count:s,element:n,children:a,path:r}}function Jd(t,e){let r=Qd(t,0,[]);const n=[r];for(const a of e){const s=r.children.find(i=>i.element.name===a);if(!s)throw new Error(`parquet schema element not found: ${e}`);n.push(s),r=s}return n}function Zd(t){let e=0;for(const{element:r}of t)r.repetition_type==="REPEATED"&&e++;return e}function ho(t){let e=0;for(const{element:r}of t.slice(1))r.repetition_type!=="REQUIRED"&&e++;return e}function yx(t){if(!t||t.element.converted_type!=="LIST"||t.children.length>1)return!1;const e=t.children[0];return!(e.children.length>1||e.element.repetition_type!=="REPEATED")}function bx(t){if(!t||t.element.converted_type!=="MAP"||t.children.length>1)return!1;const e=t.children[0];return!(e.children.length!==2||e.element.repetition_type!=="REPEATED"||e.children.find(a=>a.element.name==="key")?.element.repetition_type==="REPEATED"||e.children.find(a=>a.element.name==="value")?.element.repetition_type==="REPEATED")}function xx(t){if(t.length!==2)return!1;const[,e]=t;return!(e.element.repetition_type==="REPEATED"||e.children.length)}const Mt={STOP:0,TRUE:1,FALSE:2,BYTE:3,I16:4,I32:5,I64:6,DOUBLE:7,BINARY:8,LIST:9,STRUCT:12};function eu(t){let e=0;const r={};for(;t.offset<t.view.byteLength;){const[n,a,s]=ru(t,e);if(e=s,n===Mt.STOP)break;r[`field_${a}`]=Da(t,n)}return r}function Da(t,e){switch(e){case Mt.TRUE:return!0;case Mt.FALSE:return!1;case Mt.BYTE:return t.view.getInt8(t.offset++);case Mt.I16:case Mt.I32:return Sx(t);case Mt.I64:return ls(t);case Mt.DOUBLE:{const r=t.view.getFloat64(t.offset,!0);return t.offset+=8,r}case Mt.BINARY:{const r=ln(t),n=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,r);return t.offset+=r,n}case Mt.LIST:{const[r,n]=kx(t),a=r===Mt.TRUE||r===Mt.FALSE,s=new Array(n);for(let i=0;i<n;i++)s[i]=a?Da(t,Mt.BYTE)===1:Da(t,r);return s}case Mt.STRUCT:{const r={};let n=0;for(;;){let a,s;if([a,s,n]=ru(t,n),a===Mt.STOP)break;r[`field_${s}`]=Da(t,a)}return r}default:throw new Error(`thrift unhandled type: ${e}`)}}function ln(t){let e=0,r=0;for(;;){const n=t.view.getUint8(t.offset++);if(e|=(n&127)<<r,!(n&128))return e;r+=7}}function wx(t){let e=0n,r=0n;for(;;){const n=t.view.getUint8(t.offset++);if(e|=BigInt(n&127)<<r,!(n&128))return e;r+=7n}}function Sx(t){const e=ln(t);return e>>>1^-(e&1)}function ls(t){const e=wx(t);return e>>1n^-(e&1n)}function tu(t){return t&15}function ru(t,e){const r=t.view.getUint8(t.offset++);if((r&15)===Mt.STOP)return[0,0,e];const n=r>>4;let a;if(n)a=e+n;else throw new Error("non-delta field id not supported");return[tu(r),a,a]}function kx(t){const e=t.view.getUint8(t.offset++),r=e>>4,n=tu(e);if(r===15){const a=ln(t);return[n,a]}return[n,r]}const Px=1<<19;async function Ax(t,{parsers:e,initialFetchSize:r=Px}={}){if(!t||!(t.byteLength>=0))throw new Error("parquet expected AsyncBuffer");const n=Math.max(0,t.byteLength-r),a=await t.slice(n,t.byteLength),s=new DataView(a);if(s.getUint32(a.byteLength-4,!0)!==827474256)throw new Error("parquet file invalid (footer != PAR1)");const i=s.getUint32(a.byteLength-8,!0);if(i>t.byteLength-8)throw new Error(`parquet metadata length ${i} exceeds available buffer ${t.byteLength-8}`);if(i+8>r){const o=t.byteLength-i-8,c=await t.slice(o,n),d=new ArrayBuffer(i+8),f=new Uint8Array(d);return f.set(new Uint8Array(c)),f.set(new Uint8Array(a),n-o),cs(d,{parsers:e})}else return cs(a,{parsers:e})}function cs(t,{parsers:e}={}){if(!(t instanceof ArrayBuffer))throw new Error("parquet expected ArrayBuffer");const r=new DataView(t);if(e={...Hd,...e},r.byteLength<8)throw new Error("parquet file is too short");if(r.getUint32(r.byteLength-4,!0)!==827474256)throw new Error("parquet file invalid (footer != PAR1)");const n=r.byteLength-8,a=r.getUint32(n,!0);if(a>r.byteLength-8)throw new Error(`parquet metadata length ${a} exceeds available buffer ${r.byteLength-8}`);const s=n-a,o=eu({view:r,offset:s}),c=new TextDecoder;function d(S){return S&&c.decode(S)}const f=o.field_1,v=o.field_2.map(S=>({type:gl[S.field_1],type_length:S.field_2,repetition_type:mx[S.field_3],name:d(S.field_4),num_children:S.field_5,converted_type:hx[S.field_6],scale:S.field_7,precision:S.field_8,field_id:S.field_9,logical_type:Cx(S.field_10)})),h=v.filter(S=>S.type),m=o.field_3,g=o.field_4.map(S=>({columns:S.field_1.map((b,O)=>({file_path:d(b.field_1),file_offset:b.field_2,meta_data:b.field_3&&{type:gl[b.field_3.field_1],encodings:b.field_3.field_2?.map(z=>nn[z]),path_in_schema:b.field_3.field_3.map(d),codec:gx[b.field_3.field_4],num_values:b.field_3.field_5,total_uncompressed_size:b.field_3.field_6,total_compressed_size:b.field_3.field_7,key_value_metadata:b.field_3.field_8,data_page_offset:b.field_3.field_9,index_page_offset:b.field_3.field_10,dictionary_page_offset:b.field_3.field_11,statistics:Tx(b.field_3.field_12,h[O],e),encoding_stats:b.field_3.field_13?.map(z=>({page_type:Wd[z.field_1],encoding:nn[z.field_2],count:z.field_3})),bloom_filter_offset:b.field_3.field_14,bloom_filter_length:b.field_3.field_15,size_statistics:b.field_3.field_16&&{unencoded_byte_array_data_bytes:b.field_3.field_16.field_1,repetition_level_histogram:b.field_3.field_16.field_2,definition_level_histogram:b.field_3.field_16.field_3}},offset_index_offset:b.field_4,offset_index_length:b.field_5,column_index_offset:b.field_6,column_index_length:b.field_7,crypto_metadata:b.field_8,encrypted_column_metadata:b.field_9})),total_byte_size:S.field_2,num_rows:S.field_3,sorting_columns:S.field_4?.map(b=>({column_idx:b.field_1,descending:b.field_2,nulls_first:b.field_3})),file_offset:S.field_5,total_compressed_size:S.field_6,ordinal:S.field_7})),y=o.field_5?.map(S=>({key:d(S.field_1),value:d(S.field_2)})),E=d(o.field_6);return{version:f,schema:v,num_rows:m,row_groups:g,key_value_metadata:y,created_by:E,metadata_length:a}}function Ex({schema:t}){return Jd(t,[])[0]}function Cx(t){return t?.field_1?{type:"STRING"}:t?.field_2?{type:"MAP"}:t?.field_3?{type:"LIST"}:t?.field_4?{type:"ENUM"}:t?.field_5?{type:"DECIMAL",scale:t.field_5.field_1,precision:t.field_5.field_2}:t?.field_6?{type:"DATE"}:t?.field_7?{type:"TIME",isAdjustedToUTC:t.field_7.field_1,unit:yl(t.field_7.field_2)}:t?.field_8?{type:"TIMESTAMP",isAdjustedToUTC:t.field_8.field_1,unit:yl(t.field_8.field_2)}:t?.field_10?{type:"INTEGER",bitWidth:t.field_10.field_1,isSigned:t.field_10.field_2}:t?.field_11?{type:"NULL"}:t?.field_12?{type:"JSON"}:t?.field_13?{type:"BSON"}:t?.field_14?{type:"UUID"}:t?.field_15?{type:"FLOAT16"}:t}function yl(t){if(t.field_1)return"MILLIS";if(t.field_2)return"MICROS";if(t.field_3)return"NANOS";throw new Error("parquet time unit required")}function Tx(t,e,r){return t&&{max:Oa(t.field_1,e,r),min:Oa(t.field_2,e,r),null_count:t.field_3,distinct_count:t.field_4,max_value:Oa(t.field_5,e,r),min_value:Oa(t.field_6,e,r),is_max_value_exact:t.field_7,is_min_value_exact:t.field_8}}function Oa(t,e,r){const{type:n,converted_type:a,logical_type:s}=e;if(t===void 0)return t;if(n==="BOOLEAN")return t[0]===1;if(n==="BYTE_ARRAY")return new TextDecoder().decode(t);const i=new DataView(t.buffer,t.byteOffset,t.byteLength);return n==="FLOAT"&&i.byteLength===4?i.getFloat32(0,!0):n==="DOUBLE"&&i.byteLength===8?i.getFloat64(0,!0):n==="INT32"&&a==="DATE"?r.dateFromDays(i.getInt32(0,!0)):n==="INT64"&&a==="TIMESTAMP_MILLIS"?r.timestampFromMilliseconds(i.getBigInt64(0,!0)):n==="INT64"&&a==="TIMESTAMP_MICROS"?r.timestampFromMicroseconds(i.getBigInt64(0,!0)):n==="INT64"&&s?.type==="TIMESTAMP"&&s?.unit==="NANOS"?r.timestampFromNanoseconds(i.getBigInt64(0,!0)):n==="INT64"&&s?.type==="TIMESTAMP"&&s?.unit==="MICROS"?r.timestampFromMicroseconds(i.getBigInt64(0,!0)):n==="INT64"&&s?.type==="TIMESTAMP"?r.timestampFromMilliseconds(i.getBigInt64(0,!0)):n==="INT32"&&i.byteLength===4?i.getInt32(0,!0):n==="INT64"&&i.byteLength===8?i.getBigInt64(0,!0):a==="DECIMAL"?Kd(t)*10**-(e.scale||0):s?.type==="FLOAT16"?Xd(t):t}function go(t,e){for(let n=0;n<e.length;n+=1e4)t.push(...e.slice(n,n+1e4))}function nu(t){if(!t)return[];if(t.length===1)return t[0];const e=[];for(const r of t)go(e,r);return e}const Fx=1<<25;function Rx({metadata:t,rowStart:e=0,rowEnd:r=1/0,columns:n}){if(!t)throw new Error("parquetPlan requires metadata");const a=[],s=[];let i=0;for(const o of t.row_groups){const c=Number(o.num_rows),d=i+c;if(c>0&&d>=e&&i<r){const f=[];for(const{file_path:g,meta_data:y}of o.columns){if(g)throw new Error("parquet file_path not supported");if(!y)throw new Error("parquet column metadata is undefined");(!n||n.includes(y.path_in_schema[0]))&&f.push(au(y))}const v=Math.max(e-i,0),h=Math.min(r-i,c);a.push({ranges:f,rowGroup:o,groupStart:i,groupRows:c,selectStart:v,selectEnd:h});const m=f[f.length-1]?.endByte-f[0]?.startByte;if(!n&&m<Fx)s.push({startByte:f[0].startByte,endByte:f[f.length-1].endByte});else if(f.length)go(s,f);else if(n?.length)throw new Error(`parquet columns not found: ${n.join(", ")}`)}i=d}return isFinite(r)||(r=i),{metadata:t,rowStart:e,rowEnd:r,columns:n,fetches:s,groups:a}}function au({dictionary_page_offset:t,data_page_offset:e,total_compressed_size:r}){const n=t||e;return{startByte:Number(n),endByte:Number(n+r)}}function Ox(t,{fetches:e}){const r=e.map(({startByte:n,endByte:a})=>t.slice(n,a));return{byteLength:t.byteLength,slice(n,a=t.byteLength){const s=e.findIndex(({startByte:i,endByte:o})=>i<=n&&a<=o);if(s<0)throw new Error(`no prefetch for range [${n}, ${a}]`);if(e[s].startByte!==n||e[s].endByte!==a){const i=n-e[s].startByte,o=a-e[s].startByte;return r[s]instanceof Promise?r[s].then(c=>c.slice(i,o)):r[s].slice(i,o)}else return r[s]}}}function bl(t,e,r,n,a){const s=e?.length||r.length;if(!s)return n;const i=ho(a),o=a.map(({element:g})=>g.repetition_type);let c=0;const d=[t];let f=t,v=0,h=0,m=0;if(r[0])for(;v<o.length-2&&m<r[0];)v++,o[v]!=="REQUIRED"&&(f=f.at(-1),d.push(f),h++),o[v]==="REPEATED"&&m++;for(let g=0;g<s;g++){const y=e?.length?e[g]:i,E=r[g];for(;v&&(E<m||o[v]!=="REPEATED");)o[v]!=="REQUIRED"&&(d.pop(),h--),o[v]==="REPEATED"&&m--,v--;for(f=d.at(-1);(v<o.length-2||o[v+1]==="REPEATED")&&(h<y||o[v+1]==="REQUIRED");){if(v++,o[v]!=="REQUIRED"){const S=[];f.push(S),f=S,d.push(S),h++}o[v]==="REPEATED"&&m++}y===i?f.push(n[c++]):v===o.length-2?f.push(null):f.push([])}if(!t.length)for(let g=0;g<i;g++){const y=[];f.push(y),f=y}return t}function Zn(t,e,r=0){const n=e.path.join("."),a=e.element.repetition_type==="OPTIONAL",s=a?r+1:r;if(yx(e)){let i=e.children[0],o=s;i.children.length===1&&(i=i.children[0],o++),Zn(t,i,o);const c=i.path.join("."),d=t.get(c);if(!d)throw new Error("parquet list column missing values");a&&Ma(d,r),t.set(n,d),t.delete(c);return}if(bx(e)){const i=e.children[0].element.name;Zn(t,e.children[0].children[0],s+1),Zn(t,e.children[0].children[1],s+1);const o=t.get(`${n}.${i}.key`),c=t.get(`${n}.${i}.value`);if(!o)throw new Error("parquet map column missing keys");if(!c)throw new Error("parquet map column missing values");if(o.length!==c.length)throw new Error("parquet map column key/value length mismatch");const d=iu(o,c,s);a&&Ma(d,r),t.delete(`${n}.${i}.key`),t.delete(`${n}.${i}.value`),t.set(n,d);return}if(e.children.length){const i=e.element.repetition_type==="REQUIRED"?r:r+1,o={};for(const d of e.children){Zn(t,d,i);const f=t.get(d.path.join("."));if(!f)throw new Error("parquet struct missing child data");o[d.element.name]=f}for(const d of e.children)t.delete(d.path.join("."));const c=su(o,i);a&&Ma(c,r),t.set(n,c)}}function Ma(t,e){for(let r=0;r<t.length;r++)e?Ma(t[r],e-1):t[r]=t[r][0]}function iu(t,e,r){const n=[];for(let a=0;a<t.length;a++)if(r)n.push(iu(t[a],e[a],r-1));else if(t[a]){const s={};for(let i=0;i<t[a].length;i++){const o=e[a][i];s[t[a][i]]=o===void 0?null:o}n.push(s)}else n.push(void 0);return n}function su(t,e){const r=Object.keys(t),n=t[r[0]]?.length,a=[];for(let s=0;s<n;s++){const i={};for(const o of r){if(t[o].length!==n)throw new Error("parquet struct parsing error");i[o]=t[o][s]}e?a.push(su(i,e-1)):a.push(i)}return a}function fa(t,e,r){const n=r instanceof Int32Array,a=ln(t),s=ln(t);ln(t);let i=ls(t),o=0;r[o++]=n?Number(i):i;const c=a/s;for(;o<e;){const d=ls(t),f=new Uint8Array(s);for(let v=0;v<s;v++)f[v]=t.view.getUint8(t.offset++);for(let v=0;v<s&&o<e;v++){const h=BigInt(f[v]);if(h){let m=0n,g=c;const y=(1n<<h)-1n;for(;g&&o<e;){let E=BigInt(t.view.getUint8(t.offset))>>m&y;for(m+=h;m>=8;)m-=8n,t.offset++,m&&(E|=BigInt(t.view.getUint8(t.offset))<<h-m&y);const S=d+E;i+=S,r[o++]=n?Number(i):i,g--}g&&(t.offset+=Math.ceil((g*Number(h)+Number(m))/8))}else for(let m=0;m<c&&o<e;m++)i+=d,r[o++]=n?Number(i):i}}}function ou(t,e,r){const n=new Int32Array(e);fa(t,e,n);for(let a=0;a<e;a++)r[a]=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,n[a]),t.offset+=n[a]}function Ix(t,e,r){const n=new Int32Array(e);fa(t,e,n);const a=new Int32Array(e);fa(t,e,a);for(let s=0;s<e;s++){const i=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,a[s]);n[s]?(r[s]=new Uint8Array(n[s]+a[s]),r[s].set(r[s-1].subarray(0,n[s])),r[s].set(i,n[s])):r[s]=i,t.offset+=a[s]}}function _i(t){return 32-Math.clz32(t)}function Vr(t,e,r,n){n===void 0&&(n=t.view.getUint32(t.offset,!0),t.offset+=4);const a=t.offset;let s=0;for(;s<r.length;){const i=ln(t);if(i&1)s=Dx(t,i,e,r,s);else{const o=i>>>1;Nx(t,o,e,r,s),s+=o}}t.offset=a+n}function Nx(t,e,r,n,a){const s=r+7>>3;let i=0;for(let o=0;o<s;o++)i|=t.view.getUint8(t.offset++)<<(o<<3);for(let o=0;o<e;o++)n[a+o]=i}function Dx(t,e,r,n,a){let s=e>>1<<3;const i=(1<<r)-1;let o=0;if(t.offset<t.view.byteLength)o=t.view.getUint8(t.offset++);else if(i)throw new Error(`parquet bitpack offset ${t.offset} out of range`);let c=8,d=0;for(;s;)d>8?(d-=8,c-=8,o>>>=8):c-d<r?(o|=t.view.getUint8(t.offset)<<c,t.offset++,c+=8):(a<n.length&&(n[a++]=o>>d&i),s--,d+=r);return a}function lu(t,e,r,n){const a=Mx(r,n),s=new Uint8Array(e*a);for(let i=0;i<a;i++)for(let o=0;o<e;o++)s[o*a+i]=t.view.getUint8(t.offset++);if(r==="FLOAT")return new Float32Array(s.buffer);if(r==="DOUBLE")return new Float64Array(s.buffer);if(r==="INT32")return new Int32Array(s.buffer);if(r==="INT64")return new BigInt64Array(s.buffer);if(r==="FIXED_LEN_BYTE_ARRAY"){const i=new Array(e);for(let o=0;o<e;o++)i[o]=s.subarray(o*a,(o+1)*a);return i}throw new Error(`parquet byte_stream_split unsupported type: ${r}`)}function Mx(t,e){switch(t){case"INT32":case"FLOAT":return 4;case"INT64":case"DOUBLE":return 8;case"FIXED_LEN_BYTE_ARRAY":if(!e)throw new Error("parquet byteWidth missing type_length");return e;default:throw new Error(`parquet unsupported type: ${t}`)}}function _o(t,e,r,n){if(r===0)return[];if(e==="BOOLEAN")return Lx(t,r);if(e==="INT32")return zx(t,r);if(e==="INT64")return Bx(t,r);if(e==="INT96")return Ux(t,r);if(e==="FLOAT")return jx(t,r);if(e==="DOUBLE")return $x(t,r);if(e==="BYTE_ARRAY")return qx(t,r);if(e==="FIXED_LEN_BYTE_ARRAY"){if(!n)throw new Error("parquet missing fixed length");return Vx(t,r,n)}else throw new Error(`parquet unhandled type: ${e}`)}function Lx(t,e){const r=new Array(e);for(let n=0;n<e;n++){const a=t.offset+(n/8|0),s=n%8,i=t.view.getUint8(a);r[n]=(i&1<<s)!==0}return t.offset+=Math.ceil(e/8),r}function zx(t,e){const r=(t.view.byteOffset+t.offset)%4?new Int32Array(yi(t.view.buffer,t.view.byteOffset+t.offset,e*4)):new Int32Array(t.view.buffer,t.view.byteOffset+t.offset,e);return t.offset+=e*4,r}function Bx(t,e){const r=(t.view.byteOffset+t.offset)%8?new BigInt64Array(yi(t.view.buffer,t.view.byteOffset+t.offset,e*8)):new BigInt64Array(t.view.buffer,t.view.byteOffset+t.offset,e);return t.offset+=e*8,r}function Ux(t,e){const r=new Array(e);for(let n=0;n<e;n++){const a=t.view.getBigInt64(t.offset+n*12,!0),s=t.view.getInt32(t.offset+n*12+8,!0);r[n]=BigInt(s)<<64n|a}return t.offset+=e*12,r}function jx(t,e){const r=(t.view.byteOffset+t.offset)%4?new Float32Array(yi(t.view.buffer,t.view.byteOffset+t.offset,e*4)):new Float32Array(t.view.buffer,t.view.byteOffset+t.offset,e);return t.offset+=e*4,r}function $x(t,e){const r=(t.view.byteOffset+t.offset)%8?new Float64Array(yi(t.view.buffer,t.view.byteOffset+t.offset,e*8)):new Float64Array(t.view.buffer,t.view.byteOffset+t.offset,e);return t.offset+=e*8,r}function qx(t,e){const r=new Array(e);for(let n=0;n<e;n++){const a=t.view.getUint32(t.offset,!0);t.offset+=4,r[n]=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,a),t.offset+=a}return r}function Vx(t,e,r){const n=new Array(e);for(let a=0;a<e;a++)n[a]=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,r),t.offset+=r;return n}function yi(t,e,r){const n=new ArrayBuffer(r);return new Uint8Array(n).set(new Uint8Array(t,e,r)),n}const Gx=[0,255,65535,16777215,4294967295];function xl(t,e,r,n,a){for(let s=0;s<a;s++)r[n+s]=t[e+s]}function Wx(t,e){const r=t.byteLength,n=e.byteLength;let a=0,s=0;for(;a<r;){const i=t[a];if(a++,i<128)break}if(n&&a>=r)throw new Error("invalid snappy length header");for(;a<r;){const i=t[a];let o=0;if(a++,a>=r)throw new Error("missing eof marker");if((i&3)===0){let c=(i>>>2)+1;if(c>60){if(a+3>=r)throw new Error("snappy error literal pos + 3 >= inputLength");const d=c-60;c=t[a]+(t[a+1]<<8)+(t[a+2]<<16)+(t[a+3]<<24),c=(c&Gx[d])+1,a+=d}if(a+c>r)throw new Error("snappy error literal exceeds input length");xl(t,a,e,s,c),a+=c,s+=c}else{let c=0;switch(i&3){case 1:o=(i>>>2&7)+4,c=t[a]+(i>>>5<<8),a++;break;case 2:if(r<=a+1)throw new Error("snappy error end of input");o=(i>>>2)+1,c=t[a]+(t[a+1]<<8),a+=2;break;case 3:if(r<=a+3)throw new Error("snappy error end of input");o=(i>>>2)+1,c=t[a]+(t[a+1]<<8)+(t[a+2]<<16)+(t[a+3]<<24),a+=4;break}if(c===0||isNaN(c))throw new Error(`invalid offset ${c} pos ${a} inputLength ${r}`);if(c>s)throw new Error("cannot copy from before start of buffer");xl(e,s-c,e,s,o),s+=o}}if(s!==n)throw new Error("premature end of input")}function Hx(t,e,{type:r,element:n,schemaPath:a}){const s=new DataView(t.buffer,t.byteOffset,t.byteLength),i={view:s,offset:0};let o;const c=Yx(i,e,a),{definitionLevels:d,numNulls:f}=Kx(i,e,a),v=e.num_values-f;if(e.encoding==="PLAIN")o=_o(i,r,v,n.type_length);else if(e.encoding==="PLAIN_DICTIONARY"||e.encoding==="RLE_DICTIONARY"||e.encoding==="RLE"){const h=r==="BOOLEAN"?1:s.getUint8(i.offset++);h?(o=new Array(v),r==="BOOLEAN"?(Vr(i,h,o),o=o.map(m=>!!m)):Vr(i,h,o,s.byteLength-i.offset)):o=new Uint8Array(v)}else if(e.encoding==="BYTE_STREAM_SPLIT")o=lu(i,v,r,n.type_length);else if(e.encoding==="DELTA_BINARY_PACKED")o=r==="INT32"?new Int32Array(v):new BigInt64Array(v),fa(i,v,o);else if(e.encoding==="DELTA_LENGTH_BYTE_ARRAY")o=new Array(v),ou(i,v,o);else throw new Error(`parquet unsupported encoding: ${e.encoding}`);return{definitionLevels:d,repetitionLevels:c,dataPage:o}}function Yx(t,e,r){if(r.length>1){const n=Zd(r);if(n){const a=new Array(e.num_values);return Vr(t,_i(n),a),a}}return[]}function Kx(t,e,r){const n=ho(r);if(!n)return{definitionLevels:[],numNulls:0};const a=new Array(e.num_values);Vr(t,_i(n),a);let s=e.num_values;for(const i of a)i===n&&s--;return s===0&&(a.length=0),{definitionLevels:a,numNulls:s}}function ds(t,e,r,n){let a;const s=n?.[r];if(r==="UNCOMPRESSED")a=t;else if(s)a=s(t,e);else if(r==="SNAPPY")a=new Uint8Array(e),Wx(t,a);else throw new Error(`parquet unsupported compression codec: ${r}`);if(a?.length!==e)throw new Error(`parquet decompressed page length ${a?.length} does not match header ${e}`);return a}function Xx(t,e,r){const a={view:new DataView(t.buffer,t.byteOffset,t.byteLength),offset:0},{type:s,element:i,schemaPath:o,codec:c,compressors:d}=r,f=e.data_page_header_v2;if(!f)throw new Error("parquet data page header v2 is undefined");const v=Qx(a,f,o);a.offset=f.repetition_levels_byte_length;const h=Jx(a,f,o),m=e.uncompressed_page_size-f.definition_levels_byte_length-f.repetition_levels_byte_length;let g=t.subarray(a.offset);f.is_compressed!==!1&&(g=ds(g,m,c,d));const y=new DataView(g.buffer,g.byteOffset,g.byteLength),E={view:y,offset:0};let S;const b=f.num_values-f.num_nulls;if(f.encoding==="PLAIN")S=_o(E,s,b,i.type_length);else if(f.encoding==="RLE")S=new Array(b),Vr(E,1,S),S=S.map(O=>!!O);else if(f.encoding==="PLAIN_DICTIONARY"||f.encoding==="RLE_DICTIONARY"){const O=y.getUint8(E.offset++);S=new Array(b),Vr(E,O,S,m-1)}else if(f.encoding==="DELTA_BINARY_PACKED")S=s==="INT32"?new Int32Array(b):new BigInt64Array(b),fa(E,b,S);else if(f.encoding==="DELTA_LENGTH_BYTE_ARRAY")S=new Array(b),ou(E,b,S);else if(f.encoding==="DELTA_BYTE_ARRAY")S=new Array(b),Ix(E,b,S);else if(f.encoding==="BYTE_STREAM_SPLIT")S=lu(a,b,s,i.type_length);else throw new Error(`parquet unsupported encoding: ${f.encoding}`);return{definitionLevels:h,repetitionLevels:v,dataPage:S}}function Qx(t,e,r){const n=Zd(r);if(!n)return[];const a=new Array(e.num_values);return Vr(t,_i(n),a,e.repetition_levels_byte_length),a}function Jx(t,e,r){const n=ho(r);if(n){const a=new Array(e.num_values);return Vr(t,_i(n),a,e.definition_levels_byte_length),a}}function Zx(t,{groupStart:e,selectStart:r,selectEnd:n},a,s){const{columnName:i}=a,o=[];let c,d,f=0;const v=s&&(()=>{d&&s({columnName:i,columnData:d,rowStart:e+f-d.length,rowEnd:e+f})});for(;f<n&&!(t.offset>=t.view.byteLength-1);){const h=ew(t);if(h.type==="DICTIONARY_PAGE")c=wl(t,h,a,c,void 0,0),c=Yd(c,a);else{const m=d?.length||0,g=wl(t,h,a,c,d,r-f);d===g?f+=g.length-m:(v?.(),o.push(g),f+=g.length,d=g)}}return v?.(),f>n&&d&&(o[o.length-1]=d.slice(0,n-(f-d.length))),o}function wl(t,e,r,n,a,s){const{type:i,element:o,schemaPath:c,codec:d,compressors:f}=r,v=new Uint8Array(t.view.buffer,t.view.byteOffset+t.offset,e.compressed_page_size);if(t.offset+=e.compressed_page_size,e.type==="DATA_PAGE"){const h=e.data_page_header;if(!h)throw new Error("parquet data page header is undefined");if(s>h.num_values&&xx(c))return new Array(h.num_values);const m=ds(v,Number(e.uncompressed_page_size),d,f),{definitionLevels:g,repetitionLevels:y,dataPage:E}=Hx(m,h,r);let S=_l(E,n,h.encoding,r);if(y.length||g?.length){const b=Array.isArray(a)?a:[];return bl(b,g,y,S,c)}else{for(let b=2;b<c.length;b++)c[b].element.repetition_type!=="REQUIRED"&&(S=Array.from(S,O=>[O]));return S}}else if(e.type==="DATA_PAGE_V2"){const h=e.data_page_header_v2;if(!h)throw new Error("parquet data page header v2 is undefined");if(s>h.num_rows)return new Array(h.num_values);const{definitionLevels:m,repetitionLevels:g,dataPage:y}=Xx(v,e,r),E=_l(y,n,h.encoding,r),S=Array.isArray(a)?a:[];return bl(S,m,g,E,c)}else if(e.type==="DICTIONARY_PAGE"){const h=e.dictionary_page_header;if(!h)throw new Error("parquet dictionary page header is undefined");const m=ds(v,Number(e.uncompressed_page_size),d,f),g={view:new DataView(m.buffer,m.byteOffset,m.byteLength),offset:0};return _o(g,i,h.num_values,o.type_length)}else throw new Error(`parquet unsupported page type: ${e.type}`)}function ew(t){const e=eu(t),r=Wd[e.field_1],n=e.field_2,a=e.field_3,s=e.field_4,i=e.field_5&&{num_values:e.field_5.field_1,encoding:nn[e.field_5.field_2],definition_level_encoding:nn[e.field_5.field_3],repetition_level_encoding:nn[e.field_5.field_4],statistics:e.field_5.field_5&&{max:e.field_5.field_5.field_1,min:e.field_5.field_5.field_2,null_count:e.field_5.field_5.field_3,distinct_count:e.field_5.field_5.field_4,max_value:e.field_5.field_5.field_5,min_value:e.field_5.field_5.field_6}},o=e.field_6,c=e.field_7&&{num_values:e.field_7.field_1,encoding:nn[e.field_7.field_2],is_sorted:e.field_7.field_3},d=e.field_8&&{num_values:e.field_8.field_1,num_nulls:e.field_8.field_2,num_rows:e.field_8.field_3,encoding:nn[e.field_8.field_4],definition_levels_byte_length:e.field_8.field_5,repetition_levels_byte_length:e.field_8.field_6,is_compressed:e.field_8.field_7===void 0?!0:e.field_8.field_7,statistics:e.field_8.field_8};return{type:r,uncompressed_page_size:n,compressed_page_size:a,crc:s,data_page_header:i,index_page_header:o,dictionary_page_header:c,data_page_header_v2:d}}function tw(t,{metadata:e,columns:r},n){const{file:a,compressors:s,utf8:i}=t,o=[],c={...Hd,...t.parsers};for(const{file_path:d,meta_data:f}of n.rowGroup.columns){if(d)throw new Error("parquet file_path not supported");if(!f)throw new Error("parquet column metadata is undefined");const v=f.path_in_schema[0];if(r&&!r.includes(v))continue;const{startByte:h,endByte:m}=au(f),g=m-h;if(g>1<<30){console.warn(`parquet skipping huge column "${f.path_in_schema}" ${g} bytes`);continue}const y=Promise.resolve(a.slice(h,m));o.push({pathInSchema:f.path_in_schema,data:y.then(E=>{const S=Jd(e.schema,f.path_in_schema),b={view:new DataView(E),offset:0},z={columnName:f.path_in_schema.join("."),type:f.type,element:S[S.length-1].element,schemaPath:S,codec:f.codec,parsers:c,compressors:s,utf8:i};return Zx(b,n,z,t.onPage)})})}return{groupStart:n.groupStart,groupRows:n.groupRows,asyncColumns:o}}async function rw({asyncColumns:t},e,r,n,a){const s=new Array(r),i=await Promise.all(t.map(({data:f})=>f.then(nu))),o=t.map(f=>f.pathInSchema[0]).filter(f=>!n||n.includes(f)),c=n??o,d=c.map(f=>t.findIndex(v=>v.pathInSchema[0]===f));for(let f=e;f<r;f++)if(a==="object"){const v={};for(let h=0;h<t.length;h++)v[t[h].pathInSchema[0]]=i[h][f];s[f]=v}else{const v=new Array(t.length);for(let h=0;h<c.length;h++)d[h]>=0&&(v[h]=i[d[h]][f]);s[f]=v}return s}function nw(t,e){const{asyncColumns:r}=t,n=[];for(const a of e.children)if(a.children.length){const s=r.filter(c=>c.pathInSchema[0]===a.element.name);if(!s.length)continue;const i=new Map,o=Promise.all(s.map(c=>c.data.then(d=>{i.set(c.pathInSchema.join("."),nu(d))}))).then(()=>{Zn(i,a);const c=i.get(a.path.join("."));if(!c)throw new Error("parquet column data not assembled");return[c]});n.push({pathInSchema:a.path,data:o})}else{const s=r.find(i=>i.pathInSchema[0]===a.element.name);s&&n.push(s)}return{...t,asyncColumns:n}}async function aw(t){t.metadata??=await Ax(t.file);const e=await iw(t),{rowStart:r=0,rowEnd:n,columns:a,onChunk:s,onComplete:i,rowFormat:o}=t;if(!i&&!s){for(const{asyncColumns:f}of e)for(const{data:v}of f)await v;return}const c=Ex(t.metadata),d=e.map(f=>nw(f,c));if(s)for(const f of d)for(const v of f.asyncColumns)v.data.then(h=>{let m=f.groupStart;for(const g of h)s({columnName:v.pathInSchema[0],columnData:g,rowStart:m,rowEnd:m+g.length}),m+=g.length});if(i){const f=[];for(const v of d){const h=Math.max(r-v.groupStart,0),m=Math.min((n??1/0)-v.groupStart,v.groupRows),g=await rw(v,h,m,a,o);go(f,g.slice(h,m))}i(f)}else for(const{asyncColumns:f}of d)for(const{data:v}of f)await v}function iw(t){if(!t.metadata)throw new Error("parquet requires metadata");const e=Rx(t);return t.file=Ox(t.file,e),e.groups.map(r=>tw(t,e,r))}var sw=k("<div><!></div>");function Vt(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=sw();Xe(a,i=>({"data-slot":"card",class:i,...n}),[()=>He("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var ow=k("<div><!></div>");function Gt(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=ow();Xe(a,i=>({"data-slot":"card-content",class:i,...n}),[()=>He("px-6",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var lw=k("<div><!></div>");function Wt(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=lw();Xe(a,i=>({"data-slot":"card-header",class:i,...n}),[()=>He("@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var cw=k("<div><!></div>");function Ht(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=cw();Xe(a,i=>({"data-slot":"card-title",class:i,...n}),[()=>He("font-semibold leading-none",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var dw=k('<span class="truncate"> </span> <!>',1),uw=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div> <p class="text-sm text-muted-foreground">Loading parquet file...</p></div></div>'),fw=k('<div class="flex items-center justify-center h-full"><div class="text-center"><p class="text-sm text-destructive mb-2">Error</p> <p class="text-xs text-muted-foreground"> </p></div></div>'),pw=k('<th class="text-left p-3 font-medium border-b min-w-[120px]"><div class="truncate"> </div> <div class="text-xs text-muted-foreground font-normal"> </div></th>'),vw=k('<td class="p-3 max-w-[200px]"><div class="truncate"> </div></td>'),mw=k('<tr class="border-b hover:bg-muted/50"></tr>'),hw=k('<tr><td class="p-3 text-center text-sm text-muted-foreground"> </td></tr>'),gw=k('<div class="overflow-auto h-full"><table class="w-full text-sm"><thead class="sticky top-0 bg-muted"><tr></tr></thead><tbody><!><!></tbody></table></div>'),_w=k("<!> <!>",1),yw=k('<div class="animate-pulse space-y-3"><div class="h-4 bg-muted rounded"></div> <div class="h-4 bg-muted rounded w-3/4"></div> <div class="h-4 bg-muted rounded w-1/2"></div></div>'),bw=k('<p class="text-sm text-muted-foreground">Metadata unavailable</p>'),xw=k('<div class="flex justify-between items-start p-2 rounded border text-sm"><div class="min-w-0 flex-1"><div class="font-medium truncate"> </div> <div class="text-xs text-muted-foreground"> </div></div></div>'),ww=k('<!> <div><h4 class="font-medium mb-2">Created By</h4> <p class="text-sm text-muted-foreground"> </p></div>',1),Sw=k('<div><h4 class="font-medium mb-2">File Information</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Size:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Rows:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Columns:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Version:</span> <span> </span></div></div></div> <!> <div><h4 class="font-medium mb-2">Schema</h4> <div class="space-y-2"></div></div> <!>',1),kw=k("<!> <!>",1),Pw=k('<div class="flex gap-6 h-full"><div class="flex-[2] min-w-0"><!></div> <div class="flex-1 min-w-0"><!></div></div>');function Sl(t,e){ie(e,!0);let r=Se(null),n=Se(pt([])),a=Se(pt([])),s=Se(!0),i=Se(null),o=Se(0),c=100;Ct(()=>{V(s,!0),V(i,null),V(r,null),V(n,[],!0),V(a,[],!0),V(o,0),d().catch(S=>{V(i,`Failed to load parquet file: ${S instanceof Error?S.message:"Unknown error"}`),V(s,!1)})});async function d(){const S=await e.file.arrayBuffer();V(r,cs(S),!0),V(o,Number(l(r).num_rows),!0);const b=l(r).schema.filter(O=>O.repetition_type!=="REPEATED"||O.name!=="list").map(O=>O.name);V(a,b.slice(1),!0),await aw({file:S,onComplete:O=>{V(n,O.slice(0,c),!0),V(s,!1)}})}function f(S){return S==null?"":typeof S=="object"?JSON.stringify(S):String(S)}function v(S){if(!l(r)?.schema||S>=l(r).schema.length)return"unknown";const b=l(r).schema[S];return b.type||b.converted_type||"unknown"}var h=Pw(),m=p(h),g=p(m);Vt(g,{class:"h-full",children:(S,b)=>{var O=_w(),z=A(O);Wt(z,{children:(T,R)=>{Ht(T,{class:"flex items-center justify-between",children:(I,K)=>{var W=dw(),J=A(W),j=p(J),N=_(J,2);{var P=x=>{bt(x,{variant:"secondary",children:(w,F)=>{var C=$e();G(D=>B(C,`${D??""} rows`),[()=>l(o).toLocaleString()]),u(w,C)},$$slots:{default:!0}})};L(N,x=>{!l(s)&&!l(i)&&x(P)})}G(()=>B(j,e.filename)),u(I,W)},$$slots:{default:!0}})},$$slots:{default:!0}});var M=_(z,2);Gt(M,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(T,R)=>{var I=q(),K=A(I);{var W=j=>{var N=uw();u(j,N)},J=j=>{var N=q(),P=A(N);{var x=F=>{var C=fw(),D=p(C),H=_(p(D),2),Y=p(H);G(()=>B(Y,l(i))),u(F,C)},w=F=>{var C=gw(),D=p(C),H=p(D),Y=p(H);vt(Y,21,()=>l(a),St,(ae,te,Fe)=>{var ue=pw(),le=p(ue),re=p(le),de=_(le,2),Oe=p(de);G(ge=>{ht(le,"title",l(te)),B(re,l(te)),B(Oe,ge)},[()=>v(Fe)]),u(ae,ue)});var X=_(H),Z=p(X);vt(Z,17,()=>l(n),St,(ae,te)=>{var Fe=mw();vt(Fe,21,()=>l(te),St,(ue,le)=>{var re=vw(),de=p(re),Oe=p(de);G((ge,me)=>{ht(de,"title",ge),B(Oe,me)},[()=>f(l(le)),()=>f(l(le))]),u(ue,re)}),u(ae,Fe)});var Q=_(Z);{var pe=ae=>{var te=hw(),Fe=p(te),ue=p(Fe);G(le=>{ht(Fe,"colspan",l(a).length),B(ue,`Showing first 100 rows of ${le??""} total`)},[()=>l(o).toLocaleString()]),u(ae,te)};L(Q,ae=>{l(n).length===c&&l(o)>c&&ae(pe)})}u(F,C)};L(P,F=>{l(i)?F(x):F(w,!1)},!0)}u(j,N)};L(K,j=>{l(s)?j(W):j(J,!1)})}u(T,I)},$$slots:{default:!0}}),u(S,O)},$$slots:{default:!0}});var y=_(m,2),E=p(y);Vt(E,{class:"h-full",children:(S,b)=>{var O=kw(),z=A(O);Wt(z,{children:(T,R)=>{Ht(T,{children:(I,K)=>{var W=$e("Metadata");u(I,W)},$$slots:{default:!0}})},$$slots:{default:!0}});var M=_(z,2);Gt(M,{class:"space-y-4 h-[calc(100%-4rem)] overflow-auto",children:(T,R)=>{var I=q(),K=A(I);{var W=j=>{var N=yw();u(j,N)},J=j=>{var N=q(),P=A(N);{var x=F=>{var C=bw();u(F,C)},w=F=>{var C=q(),D=A(C);{var H=Y=>{var X=Sw(),Z=A(X),Q=_(p(Z),2),pe=p(Q),ae=_(p(pe),2),te=p(ae),Fe=_(pe,2),ue=_(p(Fe),2),le=p(ue),re=_(Fe,2),de=_(p(re),2),Oe=p(de),ge=_(re,2),me=_(p(ge),2),_e=p(me),we=_(Z,2);Qt(we,{});var Te=_(we,2),ve=_(p(Te),2);vt(ve,21,()=>l(a),St,(Ue,oe,ne)=>{var ce=xw(),he=p(ce),ke=p(he),be=p(ke),Ee=_(ke,2),Pe=p(Ee);G(Le=>{ht(ke,"title",l(oe)),B(be,l(oe)),B(Pe,Le)},[()=>v(ne)]),u(Ue,ce)});var Be=_(Te,2);{var Re=Ue=>{var oe=ww(),ne=A(oe);Qt(ne,{});var ce=_(ne,2),he=_(p(ce),2),ke=p(he);G(()=>B(ke,l(r).created_by)),u(Ue,oe)};L(Be,Ue=>{l(r).created_by&&Ue(Re)})}G((Ue,oe)=>{B(te,Ue),B(le,oe),B(Oe,l(a).length),B(_e,l(r).version||"Unknown")},[()=>_a(e.file.size),()=>l(o).toLocaleString()]),u(Y,X)};L(D,Y=>{l(r)&&Y(H)},!0)}u(F,C)};L(P,F=>{l(i)?F(x):F(w,!1)},!0)}u(j,N)};L(K,j=>{l(s)?j(W):j(J,!1)})}u(T,I)},$$slots:{default:!0}}),u(S,O)},$$slots:{default:!0}}),u(t,h),se()}var Aw=k('<span class="truncate"> </span> <!>',1),Ew=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div> <p class="text-sm text-muted-foreground">Loading CSV file...</p></div></div>'),Cw=k('<div class="flex items-center justify-center h-full"><div class="text-center"><p class="text-sm text-destructive mb-2">Error</p> <p class="text-xs text-muted-foreground"> </p></div></div>'),Tw=k('<th class="text-left p-3 font-medium border-b min-w-[120px]"><div class="truncate"> </div> <div class="text-xs text-muted-foreground font-normal"> </div></th>'),Fw=k('<td class="p-3 max-w-[200px]"><div class="truncate"> </div></td>'),Rw=k('<tr class="border-b hover:bg-muted/50"></tr>'),Ow=k('<tr><td class="p-3 text-center text-sm text-muted-foreground"> </td></tr>'),Iw=k('<div class="overflow-auto h-full"><table class="w-full text-sm"><thead class="sticky top-0 bg-muted"><tr></tr></thead><tbody><!><!></tbody></table></div>'),Nw=k("<!> <!>",1),Dw=k('<div class="animate-pulse space-y-3"><div class="h-4 bg-muted rounded"></div> <div class="h-4 bg-muted rounded w-3/4"></div> <div class="h-4 bg-muted rounded w-1/2"></div></div>'),Mw=k('<p class="text-sm text-muted-foreground">Metadata unavailable</p>'),Lw=k('<div class="flex justify-between items-start p-2 rounded border text-sm"><div class="min-w-0 flex-1"><div class="font-medium truncate"> </div> <div class="text-xs text-muted-foreground"> </div></div></div>'),zw=k(`<div><h4 class="font-medium mb-2">File Information</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Size:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Rows:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Columns:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Delimiter:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Encoding:</span> <span> </span></div></div></div> <!> <div><h4 class="font-medium mb-2">Column Schema</h4> <div class="space-y-2"></div></div> <!> <div><h4 class="font-medium mb-2">CSV Details</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Has Header:</span> <span>Yes</span></div> <div class="flex justify-between"><span class="text-muted-foreground">Delimiter:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Quote Character:</span> <span>'"' (Double Quote)</span></div></div></div>`,1),Bw=k("<!> <!>",1),Uw=k('<div class="flex gap-6 h-full"><div class="flex-[2] min-w-0"><!></div> <div class="flex-1 min-w-0"><!></div></div>');function kl(t,e){ie(e,!0);let r=Se(pt([])),n=Se(pt([])),a=Se(!0),s=Se(null),i=Se(0),o=100,c=Se(","),d=Se("utf-8");Ct(()=>{V(a,!0),V(s,null),V(r,[],!0),V(n,[],!0),V(i,0),V(c,","),V(d,"utf-8"),f().catch(M=>{V(s,`Failed to load CSV file: ${M instanceof Error?M.message:"Unknown error"}`),V(a,!1)})});async function f(){try{const M=await e.file.text();V(c,v(M),!0);const T=M.split(`
`).filter(I=>I.trim()!=="");if(V(i,T.length,!0),T.length===0)throw new Error("CSV file is empty");V(n,h(T[0],l(c)),!0);const R=T.slice(1,Math.min(T.length,o+1));V(r,R.map(I=>h(I,l(c))),!0),V(r,l(r).map(I=>{const K=[...I];for(;K.length<l(n).length;)K.push("");return K.slice(0,l(n).length)}),!0),V(a,!1)}catch(M){throw new Error(`CSV parsing failed: ${M instanceof Error?M.message:"Unknown error"}`)}}function v(M){const T=M.split(`
`).slice(0,5).join(`
`),K=[",",";","	","|"].map(W=>({delimiter:W,count:(T.match(new RegExp(`\\${W}`,"g"))||[]).length})).sort((W,J)=>J.count-W.count)[0];return K.count>0?K.delimiter:","}function h(M,T){const R=[];let I="",K=!1,W=0;for(;W<M.length;){const J=M[W];J==='"'?K&&M[W+1]==='"'?(I+='"',W+=2):(K=!K,W++):J===T&&!K?(R.push(I.trim()),I="",W++):(I+=J,W++)}return R.push(I.trim()),R}function m(M){return!M||M.trim()===""?"":M}function g(M){if(l(r).length===0)return"text";const T=l(r).slice(0,10).map(R=>R[M]).filter(R=>R&&R.trim()!=="");return T.length===0?"text":T.every(R=>!isNaN(Number(R))&&R.trim()!=="")?T.some(R=>R.includes("."))?"float":"integer":T.every(R=>!isNaN(Date.parse(R)))?"date":"text"}function y(M){switch(M){case",":return"Comma";case";":return"Semicolon";case"	":return"Tab";case"|":return"Pipe";default:return"Custom"}}var E=Uw(),S=p(E),b=p(S);Vt(b,{class:"h-full",children:(M,T)=>{var R=Nw(),I=A(R);Wt(I,{children:(W,J)=>{Ht(W,{class:"flex items-center justify-between",children:(j,N)=>{var P=Aw(),x=A(P),w=p(x),F=_(x,2);{var C=D=>{bt(D,{variant:"secondary",children:(H,Y)=>{var X=$e();G(Z=>B(X,`${Z??""} rows`),[()=>l(i).toLocaleString()]),u(H,X)},$$slots:{default:!0}})};L(F,D=>{!l(a)&&!l(s)&&D(C)})}G(()=>B(w,e.filename)),u(j,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var K=_(I,2);Gt(K,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(W,J)=>{var j=q(),N=A(j);{var P=w=>{var F=Ew();u(w,F)},x=w=>{var F=q(),C=A(F);{var D=Y=>{var X=Cw(),Z=p(X),Q=_(p(Z),2),pe=p(Q);G(()=>B(pe,l(s))),u(Y,X)},H=Y=>{var X=Iw(),Z=p(X),Q=p(Z),pe=p(Q);vt(pe,21,()=>l(n),St,(le,re,de)=>{var Oe=Tw(),ge=p(Oe),me=p(ge),_e=_(ge,2),we=p(_e);G(Te=>{ht(ge,"title",l(re)),B(me,l(re)||`Column ${de+1}`),B(we,Te)},[()=>g(de)]),u(le,Oe)});var ae=_(Q),te=p(ae);vt(te,17,()=>l(r),St,(le,re)=>{var de=Rw();vt(de,21,()=>l(re),St,(Oe,ge)=>{var me=Fw(),_e=p(me),we=p(_e);G((Te,ve)=>{ht(_e,"title",Te),B(we,ve)},[()=>m(l(ge)),()=>m(l(ge))]),u(Oe,me)}),u(le,de)});var Fe=_(te);{var ue=le=>{var re=Ow(),de=p(re),Oe=p(de);G(ge=>{ht(de,"colspan",l(n).length),B(Oe,`Showing first 100 rows of ${ge??""} total data rows`)},[()=>(l(i)-1).toLocaleString()]),u(le,re)};L(Fe,le=>{l(r).length===o&&l(i)>o+1&&le(ue)})}u(Y,X)};L(C,Y=>{l(s)?Y(D):Y(H,!1)},!0)}u(w,F)};L(N,w=>{l(a)?w(P):w(x,!1)})}u(W,j)},$$slots:{default:!0}}),u(M,R)},$$slots:{default:!0}});var O=_(S,2),z=p(O);Vt(z,{class:"h-full",children:(M,T)=>{var R=Bw(),I=A(R);Wt(I,{children:(W,J)=>{Ht(W,{children:(j,N)=>{var P=$e("Metadata");u(j,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var K=_(I,2);Gt(K,{class:"space-y-4 h-[calc(100%-4rem)] overflow-auto",children:(W,J)=>{var j=q(),N=A(j);{var P=w=>{var F=Dw();u(w,F)},x=w=>{var F=q(),C=A(F);{var D=Y=>{var X=Mw();u(Y,X)},H=Y=>{var X=zw(),Z=A(X),Q=_(p(Z),2),pe=p(Q),ae=_(p(pe),2),te=p(ae),Fe=_(pe,2),ue=_(p(Fe),2),le=p(ue),re=_(Fe,2),de=_(p(re),2),Oe=p(de),ge=_(re,2),me=_(p(ge),2),_e=p(me),we=_(ge,2),Te=_(p(we),2),ve=p(Te),Be=_(Z,2);Qt(Be,{});var Re=_(Be,2),Ue=_(p(Re),2);vt(Ue,21,()=>l(n),St,(Ee,Pe,Le)=>{var Ze=Lw(),ze=p(Ze),Ve=p(ze),Qe=p(Ve),tt=_(Ve,2),Ae=p(tt);G(je=>{ht(Ve,"title",l(Pe)||`Column ${Le+1}`),B(Qe,l(Pe)||`Column ${Le+1}`),B(Ae,je)},[()=>g(Le)]),u(Ee,Ze)});var oe=_(Re,2);Qt(oe,{});var ne=_(oe,2),ce=_(p(ne),2),he=_(p(ce),2),ke=_(p(he),2),be=p(ke);G((Ee,Pe,Le,Ze,ze)=>{B(te,Ee),B(le,`${Pe??""} data + 1 header`),B(Oe,l(n).length),B(_e,Le),B(ve,Ze),B(be,`'${l(c)??""}' (${ze??""})`)},[()=>_a(e.file.size),()=>(l(i)-1).toLocaleString(),()=>y(l(c)),()=>l(d).toUpperCase(),()=>y(l(c))]),u(Y,X)};L(C,Y=>{l(s)?Y(D):Y(H,!1)},!0)}u(w,F)};L(N,w=>{l(a)?w(P):w(x,!1)})}u(W,j)},$$slots:{default:!0}}),u(M,R)},$$slots:{default:!0}}),u(t,E),se()}var jw=k('<span class="truncate"> </span> <!>',1),$w=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div> <p class="text-sm text-muted-foreground">Loading GeoPackage...</p> <p class="text-xs text-muted-foreground mt-2"> </p></div></div>'),qw=k('<div class="flex items-center justify-center h-full"><div class="text-center"><p class="text-sm text-destructive mb-2">Error</p> <p class="text-xs text-muted-foreground"> </p></div></div>'),Vw=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="text-6xl mb-4">📄</div> <h3 class="text-lg font-medium mb-2">No Layers Found</h3> <p class="text-muted-foreground">This GeoPackage appears to be empty or contains no spatial layers.</p></div></div>'),Gw=(t,e,r)=>e(l(r)),Ww=k("<button> </button>"),Hw=k('<th class="text-left p-3 font-medium border-b min-w-[120px]"><div class="truncate"> </div> <div class="text-xs text-muted-foreground font-normal"> </div></th>'),Yw=k('<td class="p-3 max-w-[200px]"><div class="truncate"> </div></td>'),Kw=k('<tr class="border-b hover:bg-muted/50"></tr>'),Xw=k('<tr><td class="p-3 text-center text-sm text-muted-foreground"> </td></tr>'),Qw=k('<div class="overflow-auto"><table class="w-full text-sm"><thead class="sticky top-0 bg-muted"><tr></tr></thead><tbody><!><!></tbody></table></div>'),Jw=k('<div class="flex items-center justify-center h-32"><p class="text-muted-foreground">Loading layer details...</p></div>'),Zw=k('<div class="flex-1 overflow-auto p-4"><h4 class="font-medium mb-3"> </h4> <!></div>'),e0=k('<div class="flex flex-col h-full"><div class="p-4 border-b"><h4 class="font-medium mb-2">Layers</h4> <div class="flex flex-wrap gap-2"></div></div> <!></div>'),t0=k("<!> <!>",1),r0=k('<div class="animate-pulse space-y-3"><div class="h-4 bg-muted rounded"></div> <div class="h-4 bg-muted rounded w-3/4"></div> <div class="h-4 bg-muted rounded w-1/2"></div></div>'),n0=k('<p class="text-sm text-muted-foreground">Metadata unavailable</p>'),a0=k('<div class="space-y-1"><span class="text-muted-foreground text-xs">Bounding Box:</span> <div class="text-xs font-mono bg-muted p-2 rounded"> </div></div>'),i0=k('<div class="flex justify-between items-start p-2 rounded border text-sm"><div class="min-w-0 flex-1"><div class="font-medium truncate"> </div> <div class="text-xs text-muted-foreground"> </div></div></div>'),s0=k('<!> <div><h4 class="font-medium mb-2"> </h4> <div class="space-y-2"></div></div>',1),o0=k('<!> <div><h4 class="font-medium mb-2">Selected Layer</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Name:</span> <span class="truncate ml-2"> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Geometry:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Features:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">CRS:</span> <span class="truncate ml-2"> </span></div> <!></div></div> <!>',1),l0=k('<div class="p-2 rounded border text-sm"><div class="font-medium"> </div> <div class="text-xs text-muted-foreground"> </div></div>'),c0=k('<!> <div><h4 class="font-medium mb-2">All Layers</h4> <div class="space-y-2"></div></div>',1),d0=k('<div><h4 class="font-medium mb-2">File Information</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Size:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Layers:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Format:</span> <span>GeoPackage (SQLite)</span></div></div></div> <!> <!>',1),u0=k("<!> <!>",1),f0=k('<div class="flex gap-6 h-full"><div class="flex-[2] min-w-0"><!></div> <div class="flex-1 min-w-0"><!></div></div>');function Pl(t,e){ie(e,!0);let r=Se(pt([])),n=Se(null),a=Se(pt([])),s=Se(pt([])),i=Se(!0),o=Se(null),c=Se("Initializing...");Ct(()=>{V(i,!0),V(o,null),V(r,[],!0),V(n,null),V(a,[],!0),V(s,[],!0),V(c,"Initializing..."),d().catch(b=>{V(o,`Failed to load GeoPackage: ${b instanceof Error?b.message:"Unknown error"}`),V(i,!1)})});async function d(){const b=os();let O=`geopackage-preview-${Date.now()}`;try{V(c,"Starting Pyodide worker...");const z={name:e.filename,originalName:e.filename,requirementId:"temp",data:await e.file.arrayBuffer()},M=`
import os
import geopandas as gpd
import json
import traceback

try:
    print("🔍 Starting GeoPackage analysis...")
    file_path = "/data/${e.filename}"
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    print(f"📁 File found: {file_path}")
    print(f"📏 File size: {os.path.getsize(file_path)} bytes")
    
    # Get list of layers
    print("📋 Reading layer information...")
    layers = gpd.list_layers(file_path)
    print(f"✅ Found {len(layers)} layer(s)")
    
    layer_info = []
    
    for idx, (layer_name, layer_type) in enumerate(layers.iterrows()):
        try:
            print(f"\\n🗂️  Analyzing layer {idx + 1}/{len(layers)}: '{layer_name}'")
            
            # Read layer metadata without loading all data
            gdf = gpd.read_file(file_path, layer=layer_name, rows=1)
            
            # Get basic info
            info = {
                'name': layer_name,
                'geometryType': str(gdf.geometry.dtype) if not gdf.empty else 'Unknown',
                'crs': str(gdf.crs) if gdf.crs else 'Unknown'
            }
            
            # Get feature count (more efficient way)
            try:
                full_gdf = gpd.read_file(file_path, layer=layer_name)
                info['featureCount'] = len(full_gdf)
                
                # Get bounds if geometry exists
                if not full_gdf.empty and full_gdf.geometry.notna().any():
                    bounds = full_gdf.total_bounds
                    info['bbox'] = [float(bounds[0]), float(bounds[1]), float(bounds[2]), float(bounds[3])]
                    
                    # Get actual geometry type from first valid geometry
                    first_geom = full_gdf.geometry.dropna().iloc[0] if len(full_gdf.geometry.dropna()) > 0 else None
                    if first_geom:
                        info['geometryType'] = first_geom.geom_type
                else:
                    info['bbox'] = None
                    
            except Exception as e:
                print(f"⚠️  Warning getting feature count for {layer_name}: {e}")
                info['featureCount'] = 0
                info['bbox'] = None
            
            layer_info.append(info)
            print(f"✅ Layer '{layer_name}': {info['featureCount']} features, {info['geometryType']}, CRS: {info['crs']}")
            
        except Exception as e:
            print(f"❌ Error analyzing layer '{layer_name}': {e}")
            layer_info.append({
                'name': layer_name,
                'geometryType': 'Error',
                'featureCount': 0,
                'crs': 'Unknown',
                'bbox': None
            })
    
    # Output results as JSON for JavaScript to parse
    result = {
        'layers': layer_info,
        'success': True
    }
    
    print(f"\\n🎉 Analysis complete!")
    print("📊 RESULT_JSON_START")
    print(json.dumps(result))
    print("📊 RESULT_JSON_END")
    
except Exception as e:
    print(f"❌ Error during GeoPackage analysis: {str(e)}")
    print("🔍 Full traceback:")
    traceback.print_exc()
    
    error_result = {
        'layers': [],
        'success': False,
        'error': str(e)
    }
    print("📊 RESULT_JSON_START")
    print(json.dumps(error_result))
    print("📊 RESULT_JSON_END")
`;return new Promise((T,R)=>{const I=K=>{const{type:W,id:J,data:j}=K.data;if(J===O)switch(W){case"status":V(c,j,!0);break;case"stdout":if(console.log("GeoPackage Worker stdout:",j),j.includes("RESULT_JSON_START")){const N=j.split(`
`);let P=-1,x=-1;for(let w=0;w<N.length;w++)if(N[w].includes("RESULT_JSON_START"))P=w+1;else if(N[w].includes("RESULT_JSON_END")){x=w;break}if(P>=0&&x>=0)try{const w=N.slice(P,x).join(`
`),F=JSON.parse(w);if(F.success)V(r,F.layers,!0),l(r).length>0&&f(l(r)[0]);else throw new Error(F.error||"Failed to analyze GeoPackage")}catch(w){throw console.error("Failed to parse GeoPackage analysis result:",w),new Error("Failed to parse analysis results")}}break;case"stderr":console.error("GeoPackage Worker stderr:",j);break;case"complete":b.removeEventListener("message",I),b.terminate(),V(i,!1),T();break;case"error":b.removeEventListener("message",I),b.terminate(),R(new Error(j.error||"Worker execution failed"));break}};b.addEventListener("message",I),b.postMessage({id:O,python:M,files:[z]})})}catch(z){throw V(o,`GeoPackage analysis failed: ${z instanceof Error?z.message:"Unknown error"}`),V(i,!1),z}}async function f(b){V(n,b,!0);try{await v(b.name)}catch(O){console.error("Failed to load layer details:",O)}}async function v(b){const O=os();let z=`layer-details-${Date.now()}`;const M=`
import geopandas as gpd
import json
import pandas as pd

try:
    file_path = "/data/${e.filename}"
    layer_name = "${b}"
    
    print(f"🔍 Loading details for layer: {layer_name}")
    
    # Read a sample of the layer (first 10 rows)
    gdf = gpd.read_file(file_path, layer=layer_name, rows=10)
    
    # Get attribute information
    attributes = []
    for col_name, dtype in gdf.dtypes.items():
        if col_name != 'geometry':  # Skip geometry column
            attributes.append({
                'name': col_name,
                'type': str(dtype),
                'nullable': gdf[col_name].isnull().any()
            })
    
    # Get sample data (convert to regular Python types)
    sample_data = []
    for _, row in gdf.iterrows():
        row_data = []
        for col_name in gdf.columns:
            if col_name != 'geometry':
                value = row[col_name]
                # Convert pandas/numpy types to Python native types
                if pd.isna(value):
                    row_data.append(None)
                elif isinstance(value, (pd.Timestamp, pd.datetime)):
                    row_data.append(str(value))
                else:
                    row_data.append(str(value))
        sample_data.append(row_data)
    
    result = {
        'attributes': attributes,
        'sampleData': sample_data,
        'success': True
    }
    
    print("📊 DETAILS_JSON_START")
    print(json.dumps(result))
    print("📊 DETAILS_JSON_END")
    
except Exception as e:
    print(f"❌ Error loading layer details: {str(e)}")
    error_result = {
        'attributes': [],
        'sampleData': [],
        'success': False,
        'error': str(e)
    }
    print("📊 DETAILS_JSON_START")
    print(json.dumps(error_result))
    print("📊 DETAILS_JSON_END")
`;return new Promise((T,R)=>{const I=W=>{const{type:J,id:j,data:N}=W.data;if(j===z)switch(J){case"stdout":if(N.includes("DETAILS_JSON_START")){const P=N.split(`
`);let x=-1,w=-1;for(let F=0;F<P.length;F++)if(P[F].includes("DETAILS_JSON_START"))x=F+1;else if(P[F].includes("DETAILS_JSON_END")){w=F;break}if(x>=0&&w>=0)try{const F=P.slice(x,w).join(`
`),C=JSON.parse(F);C.success&&(V(a,C.attributes,!0),V(s,C.sampleData,!0))}catch(F){console.error("Failed to parse layer details:",F)}}break;case"complete":O.removeEventListener("message",I),O.terminate(),T();break;case"error":O.removeEventListener("message",I),O.terminate(),R(new Error(N.error||"Worker execution failed"));break}};O.addEventListener("message",I);const K={name:e.filename,originalName:e.filename,requirementId:"temp",data:e.file.arrayBuffer()};O.postMessage({id:z,python:M,files:[K]})})}function h(b){return b?`[${b[0].toFixed(6)}, ${b[1].toFixed(6)}, ${b[2].toFixed(6)}, ${b[3].toFixed(6)}]`:"Unknown"}var m=f0(),g=p(m),y=p(g);Vt(y,{class:"h-full",children:(b,O)=>{var z=t0(),M=A(z);Wt(M,{children:(R,I)=>{Ht(R,{class:"flex items-center justify-between",children:(K,W)=>{var J=jw(),j=A(J),N=p(j),P=_(j,2);{var x=w=>{bt(w,{variant:"secondary",children:(F,C)=>{var D=$e();G(()=>B(D,`${l(r).length??""} layer${l(r).length!==1?"s":""}`)),u(F,D)},$$slots:{default:!0}})};L(P,w=>{!l(i)&&!l(o)&&l(r).length>0&&w(x)})}G(()=>B(N,e.filename)),u(K,J)},$$slots:{default:!0}})},$$slots:{default:!0}});var T=_(M,2);Gt(T,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(R,I)=>{var K=q(),W=A(K);{var J=N=>{var P=$w(),x=p(P),w=_(p(x),4),F=p(w);G(()=>B(F,l(c))),u(N,P)},j=N=>{var P=q(),x=A(P);{var w=C=>{var D=qw(),H=p(D),Y=_(p(H),2),X=p(Y);G(()=>B(X,l(o))),u(C,D)},F=C=>{var D=q(),H=A(D);{var Y=Z=>{var Q=Vw();u(Z,Q)},X=Z=>{var Q=e0(),pe=p(Q),ae=_(p(pe),2);vt(ae,21,()=>l(r),St,(ue,le)=>{var re=Ww();re.__click=[Gw,f,le];var de=p(re);G(()=>{dr(re,1,`px-3 py-1 text-sm border rounded-md transition-colors ${l(n)?.name===l(le).name?"bg-primary text-primary-foreground":"hover:bg-muted"}`),B(de,`${l(le).name??""} (${l(le).featureCount??""})`)}),u(ue,re)});var te=_(pe,2);{var Fe=ue=>{var le=Zw(),re=p(le),de=p(re),Oe=_(re,2);{var ge=_e=>{var we=Qw(),Te=p(we),ve=p(Te),Be=p(ve);vt(Be,21,()=>l(a),St,(ce,he)=>{var ke=Hw(),be=p(ke),Ee=p(be),Pe=_(be,2),Le=p(Pe);G(()=>{ht(be,"title",l(he).name),B(Ee,l(he).name),B(Le,l(he).type)}),u(ce,ke)});var Re=_(ve),Ue=p(Re);vt(Ue,17,()=>l(s),St,(ce,he)=>{var ke=Kw();vt(ke,21,()=>l(he),St,(be,Ee)=>{var Pe=Yw(),Le=p(Pe),Ze=p(Le);G(()=>{ht(Le,"title",l(Ee)||""),B(Ze,l(Ee)||"")}),u(be,Pe)}),u(ce,ke)});var oe=_(Ue);{var ne=ce=>{var he=Xw(),ke=p(he),be=p(ke);G(Ee=>{ht(ke,"colspan",l(a).length),B(be,`Showing first 10 rows of ${Ee??""} total features`)},[()=>l(n).featureCount.toLocaleString()]),u(ce,he)};L(oe,ce=>{l(s).length===10&&ce(ne)})}u(_e,we)},me=_e=>{var we=Jw();u(_e,we)};L(Oe,_e=>{l(a).length>0&&l(s).length>0?_e(ge):_e(me,!1)})}G(()=>B(de,`Layer: ${l(n).name??""}`)),u(ue,le)};L(te,ue=>{l(n)&&ue(Fe)})}u(Z,Q)};L(H,Z=>{l(r).length===0?Z(Y):Z(X,!1)},!0)}u(C,D)};L(x,C=>{l(o)?C(w):C(F,!1)},!0)}u(N,P)};L(W,N=>{l(i)?N(J):N(j,!1)})}u(R,K)},$$slots:{default:!0}}),u(b,z)},$$slots:{default:!0}});var E=_(g,2),S=p(E);Vt(S,{class:"h-full",children:(b,O)=>{var z=u0(),M=A(z);Wt(M,{children:(R,I)=>{Ht(R,{children:(K,W)=>{var J=$e("Metadata");u(K,J)},$$slots:{default:!0}})},$$slots:{default:!0}});var T=_(M,2);Gt(T,{class:"space-y-4 h-[calc(100%-4rem)] overflow-auto",children:(R,I)=>{var K=q(),W=A(K);{var J=N=>{var P=r0();u(N,P)},j=N=>{var P=q(),x=A(P);{var w=C=>{var D=n0();u(C,D)},F=C=>{var D=d0(),H=A(D),Y=_(p(H),2),X=p(Y),Z=_(p(X),2),Q=p(Z),pe=_(X,2),ae=_(p(pe),2),te=p(ae),Fe=_(H,2);{var ue=de=>{var Oe=o0(),ge=A(Oe);Qt(ge,{});var me=_(ge,2),_e=_(p(me),2),we=p(_e),Te=_(p(we),2),ve=p(Te),Be=_(we,2),Re=_(p(Be),2),Ue=p(Re),oe=_(Be,2),ne=_(p(oe),2),ce=p(ne),he=_(oe,2),ke=_(p(he),2),be=p(ke),Ee=_(he,2);{var Pe=ze=>{var Ve=a0(),Qe=_(p(Ve),2),tt=p(Qe);G(Ae=>B(tt,Ae),[()=>h(l(n).bbox)]),u(ze,Ve)};L(Ee,ze=>{l(n).bbox&&ze(Pe)})}var Le=_(me,2);{var Ze=ze=>{var Ve=s0(),Qe=A(Ve);Qt(Qe,{});var tt=_(Qe,2),Ae=p(tt),je=p(Ae),et=_(Ae,2);vt(et,21,()=>l(a),St,(We,qe)=>{var Ge=i0(),Ye=p(Ge),lt=p(Ye),nt=p(lt),ct=_(lt,2),wt=p(ct);G(()=>{ht(lt,"title",l(qe).name),B(nt,l(qe).name),B(wt,`${l(qe).type??""}${l(qe).nullable?" (nullable)":""}`)}),u(We,Ge)}),G(()=>B(je,`Attributes (${l(a).length??""})`)),u(ze,Ve)};L(Le,ze=>{l(a).length>0&&ze(Ze)})}G(ze=>{ht(Te,"title",l(n).name),B(ve,l(n).name),B(Ue,l(n).geometryType),B(ce,ze),ht(ke,"title",l(n).crs),B(be,l(n).crs)},[()=>l(n).featureCount.toLocaleString()]),u(de,Oe)};L(Fe,de=>{l(n)&&de(ue)})}var le=_(Fe,2);{var re=de=>{var Oe=c0(),ge=A(Oe);Qt(ge,{});var me=_(ge,2),_e=_(p(me),2);vt(_e,21,()=>l(r),St,(we,Te)=>{var ve=l0(),Be=p(ve),Re=p(Be),Ue=_(Be,2),oe=p(Ue);G(ne=>{B(Re,l(Te).name),B(oe,`${l(Te).geometryType??""} • ${ne??""} features`)},[()=>l(Te).featureCount.toLocaleString()]),u(we,ve)}),u(de,Oe)};L(le,de=>{l(r).length>1&&de(re)})}G(de=>{B(Q,de),B(te,l(r).length)},[()=>_a(e.file.size)]),u(C,D)};L(x,C=>{l(o)?C(w):C(F,!1)},!0)}u(N,P)};L(W,N=>{l(i)?N(J):N(j,!1)})}u(R,K)},$$slots:{default:!0}}),u(b,z)},$$slots:{default:!0}}),u(t,m),se()}ma(["click"]);function p0(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];_t(t,Ke({name:"copy"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function v0(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M20 6 9 17l-5-5"}]];_t(t,Ke({name:"check"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function Ja(t,e){ie(e,!0);let r=U(e,"variant",3,"ghost"),n=U(e,"size",3,"sm"),a=U(e,"class",3,""),s=U(e,"feedbackDuration",3,2e3),i=U(e,"disabled",3,!1),o=xe(e,["$$slots","$$events","$$legacy","content","variant","size","class","feedbackDuration","disabled"]),c=Se(!1);async function d(){i()||!e.content||(await $v(e.content),V(c,!0),setTimeout(()=>{V(c,!1)},s()))}{let f=$(()=>l(c)?"text-green-600":""),v=$(a);It(t,Ke({get variant(){return r()},get size(){return n()},onclick:d,get disabled(){return i()},get class(){return`transition-colors ${l(f)??""} ${l(v)??""}`}},()=>o,{children:(h,m)=>{var g=q(),y=A(g);{var E=b=>{v0(b,{class:"size-4"})},S=b=>{p0(b,{class:"size-4"})};L(y,b=>{l(c)?b(E):b(S,!1)})}u(h,g)},$$slots:{default:!0}}))}se()}function Za(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];_t(t,Ke({name:"loader"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function cu(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];_t(t,Ke({name:"circle-alert"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function m0(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"m6 9 6 6 6-6"}]];_t(t,Ke({name:"chevron-down"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function du(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"m9 18 6-6-6-6"}]];_t(t,Ke({name:"chevron-right"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}var h0=k('<div class="flex items-center gap-2 min-w-0"><!> <span class="truncate">Schema Expectations</span></div> <!>',1),g0=k('<div class="flex justify-between"><span class="text-muted-foreground">Expected rows:</span> <span> </span></div>'),_0=k("<div> </div>"),y0=k("<div> </div>"),b0=k("<div> </div>"),x0=k("<div> </div>"),w0=k('<div class="text-muted-foreground">No nulls</div>'),S0=k('<tr class="border-t"><td class="p-2 font-medium text-xs"> </td><td class="p-2 text-xs"><!></td><td class="p-2 text-xs"><!></td><td class="p-2 text-xs"><div class="space-y-1"><!> <!> <!> <!> <!></div></td></tr>'),k0=k('<div class="overflow-auto h-full"><div class="p-4 space-y-4"><div><h4 class="font-medium mb-2 text-sm">Description</h4> <p class="text-sm text-muted-foreground"> </p></div> <div><h4 class="font-medium mb-2 text-sm">Schema Statistics</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Total columns:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Required columns:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Constrained columns:</span> <span> </span></div> <!></div></div> <!> <div><h4 class="font-medium mb-2 text-sm">Column Expectations</h4> <div class="border rounded-md overflow-hidden"><table class="w-full text-sm"><thead class="bg-muted/50"><tr><th class="text-left p-2 font-medium w-[100px]">Column</th><th class="text-left p-2 font-medium w-[80px]">Type</th><th class="text-left p-2 font-medium w-[70px]">Required</th><th class="text-left p-2 font-medium">Constraints</th></tr></thead><tbody></tbody></table></div></div></div></div>'),P0=k("<!> <!>",1),A0=k('<div class="text-xs text-muted-foreground pl-4"> </div>'),E0=k('<div class="space-y-2"><div class="flex justify-between items-center min-w-0"><span class="text-muted-foreground flex-shrink-0">Target File:</span> <div class="flex items-center gap-2 min-w-0"><span class="truncate text-right text-sm"> </span> <!></div></div> <!></div>'),C0=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Runtime:</span> <span class="truncate text-right"> </span></div>'),T0=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Last run:</span> <span class="truncate text-right"> </span></div>'),F0=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Output lines:</span> <span class="truncate text-right"> </span></div>'),R0=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Errors:</span> <span> </span></div>'),O0=k('<!> <div><h4 class="font-medium mb-2 text-sm">Execution</h4> <div class="space-y-1 text-sm min-w-0"><!> <!> <!> <!></div></div>',1),I0=k('<div class="flex justify-between"><span class="text-muted-foreground">Failed:</span> <span class="text-red-600"> </span></div>'),N0=k('<div class="flex justify-between"><span class="text-muted-foreground">Warnings:</span> <span class="text-yellow-600"> </span></div>'),D0=k('<!> <div><h4 class="font-medium mb-2 text-sm">Validation Summary</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Overall status:</span> <!></div> <div class="flex justify-between"><span class="text-muted-foreground">Total checks:</span> <span> </span></div> <div class="flex justify-between"><span class="text-muted-foreground">Passed:</span> <span class="text-green-600"> </span></div> <!> <!></div></div>',1),M0=k('<div><h4 class="font-medium mb-2 text-sm">Schema</h4> <div class="space-y-1 text-sm min-w-0"><div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Validation Script:</span> <span class="truncate text-right"> </span></div> <!> <div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Expected columns:</span> <span class="truncate text-right"> </span></div> <div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Required columns:</span> <span class="truncate text-right"> </span></div></div></div> <!> <!>',1),L0=k("<!> <!>",1),z0=k("<span><!></span> <!>",1),B0=k('<pre class="text-xs font-mono whitespace-pre-wrap text-destructive bg-destructive/5 p-3 rounded w-full overflow-auto"> </pre>'),U0=(t,e,r)=>e(l(r).column_name),j0=k('<span class="text-muted-foreground">-</span>'),$0=k('<span class="text-muted-foreground">Missing</span>'),q0=k('<span class="text-red-600"> </span>'),V0=k('<span class="text-yellow-600"> </span>'),G0=k('<span class="text-green-600">All passed</span>'),W0=k('<div class="text-muted-foreground"> </div>'),H0=k('<div class="text-muted-foreground"> </div>'),Y0=k('<div class="text-muted-foreground"> </div>'),K0=k('<div class="flex items-start gap-2 text-xs"><!> <div class="flex-1"><div class="font-medium capitalize"> </div> <!> <!> <!></div></div>'),X0=k('<tr class="border-t"><td colspan="6" class="bg-muted/20 p-0"><div class="p-4 space-y-2"><h5 class="font-medium text-sm">Detailed Check Results</h5> <div class="space-y-1"></div></div></td></tr>'),Q0=k('<tr class="border-t"><td class="p-2"><button class="p-1 hover:bg-muted rounded transition-colors"><!></button></td><td class="p-2 font-medium text-xs"> </td><td class="p-2 text-xs"><!></td><td class="p-2 text-xs"><!></td><td class="p-2"><div class="flex items-center gap-1"><!> <!></div></td><td class="p-2 text-xs"><!></td></tr> <!>',1),J0=k('<div class="border rounded-md overflow-hidden"><table class="w-full text-sm"><thead class="bg-muted/50"><tr><th class="text-left p-2 font-medium w-[30px]"></th><th class="text-left p-2 font-medium w-[120px]">Column</th><th class="text-left p-2 font-medium w-[80px]">Expected</th><th class="text-left p-2 font-medium w-[80px]">Actual</th><th class="text-left p-2 font-medium w-[70px]">Status</th><th class="text-left p-2 font-medium">Issues</th></tr></thead><tbody></tbody></table></div>'),Z0=k('<pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto"> </pre>'),e1=k('<p class="text-xs text-muted-foreground mt-1"> </p>'),t1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground">Schema validation running...</p> <!></div></div>'),r1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-destructive">Python runtime failed to initialize</p> <p class="text-xs text-muted-foreground mt-1">Please refresh the page to retry</p></div></div>'),n1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground"> </p> <p class="text-xs text-muted-foreground mt-1">This may take a few moments on first load</p></div></div>'),a1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground">Ready to validate schema</p> <p class="text-xs text-muted-foreground mt-1"> </p></div></div>'),i1=k('<div class="overflow-auto h-full"><!></div>'),s1=k("<!> <!>",1),o1=k('<div class="flex gap-6 h-full w-full min-w-0 overflow-hidden max-w-full"><div class="flex-1 min-w-0 max-w-[50%] w-0"><!></div> <div class="flex-1 min-w-0 max-w-[50%] w-0 flex flex-col space-y-4"><!> <!></div></div>');function l1(t,e){ie(e,!0);let r=U(e,"status",3,"ready"),n=U(e,"metrics",19,()=>({})),a=U(e,"output",3,""),s=U(e,"error",3,""),i=Se("not-initialized"),o=Se("");const c=Ar.getInstance();let d=Se(pt(new Set));const f=$(()=>()=>r()==="error"?s()||"":e.validationResults?JSON.stringify(e.validationResults,null,2):a()||""),v=$(()=>e.schemaId&&nd(e.schemaId).dependencies[0]||null);Ps(()=>{const M={onStatusChange:R=>{V(i,R,!0),h(R)}};c.addOutputHandler(M);const T=c.getStatus();return T!=="not-initialized"&&(V(i,T,!0),h(T)),()=>{c.removeOutputHandler(M)}});function h(M){V(o,ad(M),!0)}const m=$(()=>{const M=Object.keys(e.expectations.columns).length,T=Object.values(e.expectations.columns).filter(I=>I.required).length,R=Object.values(e.expectations.columns).filter(I=>I.min_value!==void 0||I.max_value!==void 0||I.allowed_values!==void 0).length;return{columns:M,requiredColumns:T,constrainedColumns:R}});function g(M){l(d).has(M)?l(d).delete(M):l(d).add(M),V(d,new Set(l(d)),!0)}var y=o1(),E=p(y),S=p(E);Vt(S,{class:"h-full",children:(M,T)=>{var R=P0(),I=A(R);Wt(I,{children:(W,J)=>{Ht(W,{class:"flex items-center justify-between gap-2 min-w-0",children:(j,N)=>{var P=h0(),x=A(P),w=p(x);pi(w,{class:"size-4 flex-shrink-0"});var F=_(x,2);{let C=$(()=>JSON.stringify(e.expectations,null,2));Ja(F,{get content(){return l(C)},class:"flex-shrink-0"})}u(j,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var K=_(I,2);Gt(K,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(W,J)=>{var j=k0(),N=p(j),P=p(N),x=_(p(P),2),w=p(x),F=_(P,2),C=_(p(F),2),D=p(C),H=_(p(D),2),Y=p(H),X=_(D,2),Z=_(p(X),2),Q=p(Z),pe=_(X,2),ae=_(p(pe),2),te=p(ae),Fe=_(pe,2);{var ue=me=>{var _e=g0(),we=_(p(_e),2),Te=p(we);G(()=>B(Te,`${e.expectations.expected_row_count.min??0??""} - ${e.expectations.expected_row_count.max??"∞"??""}`)),u(me,_e)};L(Fe,me=>{e.expectations.expected_row_count&&me(ue)})}var le=_(F,2);Qt(le,{});var re=_(le,2),de=_(p(re),2),Oe=p(de),ge=_(p(Oe));vt(ge,21,()=>Object.entries(e.expectations.columns),St,(me,_e)=>{var we=$(()=>fs(l(_e),2));let Te=()=>l(we)[0],ve=()=>l(we)[1];var Be=S0(),Re=p(Be),Ue=p(Re),oe=_(Re),ne=p(oe);bt(ne,{variant:"outline",class:"text-xs",children:(qe,Ge)=>{var Ye=$e();G(()=>B(Ye,ve().type)),u(qe,Ye)},$$slots:{default:!0}});var ce=_(oe),he=p(ce);{var ke=qe=>{bt(qe,{variant:"default",class:"text-xs",children:(Ge,Ye)=>{var lt=$e("Yes");u(Ge,lt)},$$slots:{default:!0}})},be=qe=>{bt(qe,{variant:"outline",class:"text-xs",children:(Ge,Ye)=>{var lt=$e("No");u(Ge,lt)},$$slots:{default:!0}})};L(he,qe=>{ve().required?qe(ke):qe(be,!1)})}var Ee=_(ce),Pe=p(Ee),Le=p(Pe);{var Ze=qe=>{var Ge=_0(),Ye=p(Ge);G(()=>B(Ye,`Min: ${ve().min_value??""}`)),u(qe,Ge)};L(Le,qe=>{ve().min_value!==void 0&&qe(Ze)})}var ze=_(Le,2);{var Ve=qe=>{var Ge=y0(),Ye=p(Ge);G(()=>B(Ye,`Max: ${ve().max_value??""}`)),u(qe,Ge)};L(ze,qe=>{ve().max_value!==void 0&&qe(Ve)})}var Qe=_(ze,2);{var tt=qe=>{var Ge=b0(),Ye=p(Ge);G(lt=>B(Ye,`Values: ${lt??""}`),[()=>ve().allowed_values.join(", ")]),u(qe,Ge)};L(Qe,qe=>{ve().allowed_values&&qe(tt)})}var Ae=_(Qe,2);{var je=qe=>{var Ge=x0(),Ye=p(Ge);G(()=>B(Ye,`Max categories: ${ve().max_categories??""}`)),u(qe,Ge)};L(Ae,qe=>{ve().max_categories!==void 0&&qe(je)})}var et=_(Ae,2);{var We=qe=>{var Ge=w0();u(qe,Ge)};L(et,qe=>{ve().null_allowed||qe(We)})}G(()=>B(Ue,Te())),u(me,Be)}),G(()=>{B(w,e.expectations.description),B(Y,l(m).columns),B(Q,l(m).requiredColumns),B(te,l(m).constrainedColumns)}),u(W,j)},$$slots:{default:!0}}),u(M,R)},$$slots:{default:!0}});var b=_(E,2),O=p(b);Vt(O,{class:"h-64 flex-shrink-0 overflow-hidden",children:(M,T)=>{var R=L0(),I=A(R);Wt(I,{children:(W,J)=>{Ht(W,{class:"text-base",children:(j,N)=>{var P=$e("Validation Info");u(j,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var K=_(I,2);Gt(K,{class:"h-[calc(100%-4rem)] overflow-y-auto space-y-4",children:(W,J)=>{var j=M0(),N=A(j),P=_(p(N),2),x=p(P),w=_(p(x),2),F=p(w),C=_(x,2);{var D=le=>{var re=E0(),de=p(re),Oe=_(p(de),2),ge=p(Oe),me=p(ge),_e=_(ge,2);{let ve=$(()=>l(v).isAvailable?"default":"outline"),Be=$(()=>l(v).isAvailable?"bg-green-500 hover:bg-green-600":"");bt(_e,{get variant(){return l(ve)},get class(){return`text-xs flex-shrink-0 ${l(Be)??""}`},children:(Re,Ue)=>{var oe=$e();G(()=>B(oe,l(v).isAvailable?"Available":"Missing")),u(Re,oe)},$$slots:{default:!0}})}var we=_(de,2);{var Te=ve=>{var Be=A0(),Re=p(Be);G(()=>B(Re,l(v).description)),u(ve,Be)};L(we,ve=>{l(v).description&&ve(Te)})}G(()=>B(me,l(v).filename)),u(le,re)};L(C,le=>{l(v)&&le(D)})}var H=_(C,2),Y=_(p(H),2),X=p(Y),Z=_(H,2),Q=_(p(Z),2),pe=p(Q),ae=_(N,2);{var te=le=>{var re=O0(),de=A(re);Qt(de,{});var Oe=_(de,2),ge=_(p(Oe),2),me=p(ge);{var _e=oe=>{var ne=C0(),ce=_(p(ne),2),he=p(ce);G(()=>B(he,n().executionTime)),u(oe,ne)};L(me,oe=>{n().executionTime&&oe(_e)})}var we=_(me,2);{var Te=oe=>{var ne=T0(),ce=_(p(ne),2),he=p(ce);G(()=>B(he,n().lastRun)),u(oe,ne)};L(we,oe=>{n().lastRun&&oe(Te)})}var ve=_(we,2);{var Be=oe=>{var ne=F0(),ce=_(p(ne),2),he=p(ce);G(ke=>B(he,ke),[()=>n().outputLines.toLocaleString()]),u(oe,ne)};L(ve,oe=>{n().outputLines!==void 0&&oe(Be)})}var Re=_(ve,2);{var Ue=oe=>{var ne=R0(),ce=_(p(ne),2),he=p(ce);G(()=>{dr(ce,1,jr(n().errorCount>0?"text-destructive font-medium":"")),B(he,n().errorCount)}),u(oe,ne)};L(Re,oe=>{n().errorCount!==void 0&&oe(Ue)})}u(le,re)};L(ae,le=>{Object.keys(n()).length>0&&le(te)})}var Fe=_(ae,2);{var ue=le=>{var re=D0(),de=A(re);Qt(de,{});var Oe=_(de,2),ge=_(p(Oe),2),me=p(ge),_e=_(p(me),2);{let ke=$(()=>e.validationResults.overall_status==="pass"?"default":e.validationResults.overall_status==="warning"?"secondary":"destructive");bt(_e,{get variant(){return l(ke)},children:(be,Ee)=>{var Pe=$e();G(Le=>B(Pe,Le),[()=>e.validationResults.overall_status.toUpperCase()]),u(be,Pe)},$$slots:{default:!0}})}var we=_(me,2),Te=_(p(we),2),ve=p(Te),Be=_(we,2),Re=_(p(Be),2),Ue=p(Re),oe=_(Be,2);{var ne=ke=>{var be=I0(),Ee=_(p(be),2),Pe=p(Ee);G(()=>B(Pe,e.validationResults.summary.failed)),u(ke,be)};L(oe,ke=>{e.validationResults.summary.failed>0&&ke(ne)})}var ce=_(oe,2);{var he=ke=>{var be=N0(),Ee=_(p(be),2),Pe=p(Ee);G(()=>B(Pe,e.validationResults.summary.warnings)),u(ke,be)};L(ce,ke=>{e.validationResults.summary.warnings>0&&ke(he)})}G(()=>{B(ve,e.validationResults.summary.total_checks),B(Ue,e.validationResults.summary.passed)}),u(le,re)};L(Fe,le=>{e.validationResults&&le(ue)})}G(()=>{B(F,e.filename),B(X,l(m).columns),B(pe,l(m).requiredColumns)}),u(W,j)},$$slots:{default:!0}}),u(M,R)},$$slots:{default:!0}});var z=_(O,2);Vt(z,{class:"flex-1 min-h-0 overflow-hidden",children:(M,T)=>{var R=s1(),I=A(R);Wt(I,{children:(W,J)=>{Ht(W,{class:"flex items-center justify-between gap-2 text-base",children:(j,N)=>{var P=z0(),x=A(P),w=p(x);{var F=Y=>{var X=$e("Validation Error");u(Y,X)},C=Y=>{var X=q(),Z=A(X);{var Q=ae=>{var te=$e("Validation Results");u(ae,te)},pe=ae=>{var te=q(),Fe=A(te);{var ue=re=>{var de=$e("Validation Output");u(re,de)},le=re=>{var de=$e("Validation Results");u(re,de)};L(Fe,re=>{a()?re(ue):re(le,!1)},!0)}u(ae,te)};L(Z,ae=>{e.validationResults?ae(Q):ae(pe,!1)},!0)}u(Y,X)};L(w,Y=>{r()==="error"?Y(F):Y(C,!1)})}var D=_(x,2);{var H=Y=>{Ja(Y,{get content(){return l(f)},class:"flex-shrink-0"})};L(D,Y=>{(r()==="error"&&s()||a()||e.validationResults)&&Y(H)})}u(j,P)},$$slots:{default:!0}})},$$slots:{default:!0}});var K=_(I,2);Gt(K,{class:"h-[calc(100%-4rem)] overflow-hidden",children:(W,J)=>{var j=i1(),N=p(j);{var P=w=>{var F=B0(),C=p(F);G(()=>B(C,s())),u(w,F)},x=w=>{var F=q(),C=A(F);{var D=Y=>{var X=J0(),Z=p(X),Q=_(p(Z));vt(Q,21,()=>e.validationResults.column_validations,St,(pe,ae)=>{var te=Q0();const Fe=$(()=>Go(l(ae).status)),ue=$(()=>l(ae).checks.filter(Ae=>Ae.status==="fail")),le=$(()=>l(ae).checks.filter(Ae=>Ae.status==="warning"));var re=A(te),de=p(re),Oe=p(de);Oe.__click=[U0,g,ae];var ge=p(Oe);{var me=Ae=>{m0(Ae,{class:"size-3"})},_e=Ae=>{du(Ae,{class:"size-3"})};L(ge,Ae=>{l(d).has(l(ae).column_name)?Ae(me):Ae(_e,!1)})}var we=_(de),Te=p(we),ve=_(we),Be=p(ve);{var Re=Ae=>{bt(Ae,{variant:"outline",class:"text-xs",children:(je,et)=>{var We=$e();G(()=>B(We,l(ae).expected_type)),u(je,We)},$$slots:{default:!0}})},Ue=Ae=>{var je=j0();u(Ae,je)};L(Be,Ae=>{l(ae).expected_type?Ae(Re):Ae(Ue,!1)})}var oe=_(ve),ne=p(oe);{var ce=Ae=>{bt(Ae,{variant:"outline",class:"text-xs",children:(je,et)=>{var We=$e();G(()=>B(We,l(ae).actual_type)),u(je,We)},$$slots:{default:!0}})},he=Ae=>{var je=$0();u(Ae,je)};L(ne,Ae=>{l(ae).actual_type?Ae(ce):Ae(he,!1)})}var ke=_(oe),be=p(ke),Ee=p(be);{let Ae=$(()=>`size-3 ${Wo(l(ae).status)}`);Ce(Ee,()=>l(Fe),(je,et)=>{et(je,{get class(){return l(Ae)}})})}var Pe=_(Ee,2);{let Ae=$(()=>l(ae).status==="pass"?"default":l(ae).status==="warning"?"secondary":"destructive");bt(Pe,{get variant(){return l(Ae)},class:"text-xs",children:(je,et)=>{var We=$e();G(()=>B(We,l(ae).status)),u(je,We)},$$slots:{default:!0}})}var Le=_(ke),Ze=p(Le);{var ze=Ae=>{var je=q0(),et=p(je);G(()=>B(et,`${l(ue).length??""} failed`)),u(Ae,je)},Ve=Ae=>{var je=q(),et=A(je);{var We=Ge=>{var Ye=V0(),lt=p(Ye);G(()=>B(lt,`${l(le).length??""} warnings`)),u(Ge,Ye)},qe=Ge=>{var Ye=G0();u(Ge,Ye)};L(et,Ge=>{l(le).length>0?Ge(We):Ge(qe,!1)},!0)}u(Ae,je)};L(Ze,Ae=>{l(ue).length>0?Ae(ze):Ae(Ve,!1)})}var Qe=_(re,2);{var tt=Ae=>{var je=X0(),et=p(je),We=p(et),qe=_(p(We),2);vt(qe,21,()=>l(ae).checks,St,(Ge,Ye)=>{var lt=K0();const nt=$(()=>Go(l(Ye).status));var ct=p(lt);{let at=$(()=>`size-3 mt-0.5 flex-shrink-0 ${Wo(l(Ye).status)}`);Ce(ct,()=>l(nt),(At,Qr)=>{Qr(At,{get class(){return l(at)}})})}var wt=_(ct,2),Pt=p(wt),xt=p(Pt),Je=_(Pt,2);{var Ft=at=>{var At=W0(),Qr=p(At);G(()=>B(Qr,l(Ye).message)),u(at,At)};L(Je,at=>{l(Ye).message&&at(Ft)})}var vr=_(Je,2);{var wr=at=>{var At=H0(),Qr=p(At);G(()=>B(Qr,`Expected: ${l(Ye).expected??""}, Actual: ${l(Ye).actual??""}`)),u(at,At)};L(vr,at=>{l(Ye).expected!==void 0&&l(Ye).actual!==void 0&&at(wr)})}var Xr=_(vr,2);{var Dt=at=>{var At=Y0(),Qr=p(At);G(uu=>B(Qr,`Violations: ${uu??""}`),[()=>l(Ye).violations.join(", ")]),u(at,At)};L(Xr,at=>{l(Ye).violations&&l(Ye).violations.length>0&&at(Dt)})}G(at=>B(xt,at),[()=>l(Ye).check.replace("_"," ")]),u(Ge,lt)}),u(Ae,je)};L(Qe,Ae=>{l(d).has(l(ae).column_name)&&Ae(tt)})}G(()=>B(Te,l(ae).column_name)),u(pe,te)}),u(Y,X)},H=Y=>{var X=q(),Z=A(X);{var Q=ae=>{var te=Z0(),Fe=p(te);G(()=>B(Fe,a())),u(ae,te)},pe=ae=>{var te=q(),Fe=A(te);{var ue=re=>{var de=t1(),Oe=p(de),ge=p(Oe);Za(ge,{class:"animate-spin h-6 w-6 mx-auto mb-2 text-primary"});var me=_(ge,4);{var _e=we=>{var Te=e1(),ve=p(Te);G(()=>B(ve,l(o))),u(we,Te)};L(me,we=>{(l(i)==="initializing"||l(i)==="loading-packages")&&we(_e)})}u(re,de)},le=re=>{var de=q(),Oe=A(de);{var ge=_e=>{var we=r1(),Te=p(we),ve=p(Te);cu(ve,{class:"h-6 w-6 mx-auto mb-2 text-destructive"}),u(_e,we)},me=_e=>{var we=q(),Te=A(we);{var ve=Re=>{var Ue=n1(),oe=p(Ue),ne=p(oe);Za(ne,{class:"animate-spin h-6 w-6 mx-auto mb-2 text-primary"});var ce=_(ne,2),he=p(ce);G(()=>B(he,l(o))),u(Re,Ue)},Be=Re=>{var Ue=a1(),oe=p(Ue),ne=p(oe);pn(ne,{class:"h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50"});var ce=_(ne,4),he=p(ce);G(()=>B(he,l(i)==="ready"?'Python loaded - click "Validate"':'Click "Validate" to load Python and validate schema')),u(Re,Ue)};L(Te,Re=>{l(i)==="initializing"||l(i)==="loading-packages"?Re(ve):Re(Be,!1)},!0)}u(_e,we)};L(Oe,_e=>{l(i)==="error"?_e(ge):_e(me,!1)},!0)}u(re,de)};L(Fe,re=>{r()==="running"?re(ue):re(le,!1)},!0)}u(ae,te)};L(Z,ae=>{a()?ae(Q):ae(pe,!1)},!0)}u(Y,X)};L(C,Y=>{e.validationResults?Y(D):Y(H,!1)},!0)}u(w,F)};L(N,w=>{r()==="error"&&s()?w(P):w(x,!1)})}u(W,j)},$$slots:{default:!0}}),u(M,R)},$$slots:{default:!0}}),u(t,y),se()}ma(["click"]);var c1=k('<div class="flex items-center gap-2 min-w-0"><!> <span class="truncate"> </span></div> <!>',1),d1=k('<div class="overflow-auto h-full"><pre class="p-4 text-xs font-mono whitespace-pre-wrap bg-muted/20 h-full w-full overflow-auto"> </pre></div>'),u1=k("<!> <!>",1),f1=k('<div class="text-xs text-muted-foreground mt-1 line-clamp-2"> </div>'),p1=k('<div><div class="flex items-start gap-2 min-w-0"><div class="min-w-0 flex-1"><div class="font-medium text-xs truncate"> </div> <div class="text-xs text-muted-foreground truncate"> </div> <!></div> <!></div></div>'),v1=k('<div><h4 class="font-medium mb-2 text-sm">Required Files</h4> <div class="space-y-2"></div></div> <!>',1),m1=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Runtime:</span> <span class="truncate text-right"> </span></div>'),h1=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Last run:</span> <span class="truncate text-right"> </span></div>'),g1=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Output lines:</span> <span class="truncate text-right"> </span></div>'),_1=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Errors:</span> <span> </span></div>'),y1=k('<div class="flex justify-between min-w-0"><span class="text-muted-foreground capitalize flex-shrink-0 truncate"> </span> <span class="truncate text-right"> </span></div>'),b1=k('<!> <div><h4 class="font-medium mb-2 text-sm">Execution</h4> <div class="space-y-1 text-sm min-w-0"><!> <!> <!> <!> <!></div></div>',1),x1=k('<!> <div><h4 class="font-medium mb-2 text-sm">Statistics</h4> <div class="space-y-1 text-sm min-w-0"><div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Lines:</span> <span class="truncate text-right"> </span></div> <div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Non-empty:</span> <span class="truncate text-right"> </span></div> <div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Characters:</span> <span class="truncate text-right"> </span></div> <div class="flex justify-between min-w-0"><span class="text-muted-foreground flex-shrink-0">Size:</span> <span class="truncate text-right"> </span></div></div></div> <!>',1),w1=k("<!> <!>",1),S1=k("<span><!></span> <!>",1),k1=k('<div><h4 class="text-xs font-medium text-muted-foreground mb-2">Output before error:</h4> <pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto"> </pre></div>'),P1=k('<div class="space-y-3"><!> <div><h4 class="text-xs font-medium text-destructive mb-2">Error:</h4> <pre class="text-xs font-mono whitespace-pre-wrap text-destructive bg-destructive/5 p-3 rounded w-full overflow-auto"> </pre></div></div>'),A1=k('<pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto"> </pre>'),E1=k('<p class="text-xs text-muted-foreground mt-1"> </p>'),C1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground">Script running...</p> <!></div></div>'),T1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-destructive">Python runtime failed to initialize</p> <p class="text-xs text-muted-foreground mt-1">Please refresh the page to retry</p></div></div>'),F1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground"> </p> <p class="text-xs text-muted-foreground mt-1">This may take a few moments on first load</p></div></div>'),R1=k('<div class="flex items-center justify-center h-full"><div class="text-center"><!> <p class="text-sm text-muted-foreground">Ready to run Python script</p> <p class="text-xs text-muted-foreground mt-1"> </p></div></div>'),O1=k('<div class="overflow-auto h-full"><!></div>'),I1=k("<!> <!>",1),N1=k('<div class="flex gap-6 h-full"><div class="flex-1 min-w-0 max-w-[50%]"><!></div> <div class="flex-1 min-w-0 max-w-[50%] flex flex-col space-y-4"><!> <!></div></div>');function D1(t,e){ie(e,!0);let r=U(e,"status",3,"ready"),n=U(e,"metrics",19,()=>({})),a=U(e,"output",3,""),s=U(e,"error",3,""),i=Se("not-initialized"),o=Se("");const c=Ar.getInstance();Ps(()=>{const O={onStatusChange:M=>{V(i,M,!0),d(M)}};c.addOutputHandler(O);const z=c.getStatus();return z!=="not-initialized"&&(V(i,z,!0),d(z)),()=>{c.removeOutputHandler(O)}});function d(O){V(o,ad(O),!0)}const f=$(()=>{const O=e.scriptContent.split(`
`).length,z=e.scriptContent.length,M=e.scriptContent.split(`
`).filter(T=>T.trim()).length;return{lines:O,characters:z,nonEmptyLines:M}}),v=$(()=>e.scriptId?rd(e.scriptId).dependencies.map(z=>({...z,isUploaded:z.isAvailable})):[]),h=$(()=>()=>r()==="error"?a()&&a().trim()?`Output:
${a()}

Error:
${s()}`:s()||"":a()||"");var m=N1(),g=p(m),y=p(g);Vt(y,{class:"h-full",children:(O,z)=>{var M=u1(),T=A(M);Wt(T,{children:(I,K)=>{Ht(I,{class:"flex items-center justify-between gap-2 min-w-0",children:(W,J)=>{var j=c1(),N=A(j),P=p(N);pi(P,{class:"size-4 flex-shrink-0"});var x=_(P,2),w=p(x),F=_(N,2);Ja(F,{get content(){return e.scriptContent},class:"flex-shrink-0"}),G(()=>B(w,e.filename)),u(W,j)},$$slots:{default:!0}})},$$slots:{default:!0}});var R=_(T,2);Gt(R,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(I,K)=>{var W=d1(),J=p(W),j=p(J);G(()=>B(j,e.scriptContent)),u(I,W)},$$slots:{default:!0}}),u(O,M)},$$slots:{default:!0}});var E=_(g,2),S=p(E);Vt(S,{class:"h-80 flex-shrink-0 overflow-hidden",children:(O,z)=>{var M=w1(),T=A(M);Wt(T,{children:(I,K)=>{Ht(I,{class:"text-base",children:(W,J)=>{var j=$e("Script Info");u(W,j)},$$slots:{default:!0}})},$$slots:{default:!0}});var R=_(T,2);Gt(R,{class:"h-[calc(100%-4rem)] overflow-y-auto space-y-4",children:(I,K)=>{var W=x1(),J=A(W);{var j=ue=>{var le=v1(),re=A(le),de=_(p(re),2);vt(de,21,()=>l(v),St,(ge,me)=>{var _e=p1(),we=p(_e),Te=p(we),ve=p(Te),Be=p(ve),Re=_(ve,2),Ue=p(Re),oe=_(Re,2);{var ne=be=>{var Ee=f1(),Pe=p(Ee);G(()=>B(Pe,l(me).description)),u(be,Ee)};L(oe,be=>{l(me).description&&be(ne)})}var ce=_(Te,2);{var he=be=>{{let Ee=$(()=>l(me).isUploaded?"default":"outline"),Pe=$(()=>l(me).isUploaded?"bg-green-500 hover:bg-green-600":"");bt(be,{get variant(){return l(Ee)},get class(){return`text-xs flex-shrink-0 ${l(Pe)??""}`},children:(Le,Ze)=>{var ze=$e();G(()=>B(ze,l(me).isUploaded?"Uploaded":"Required")),u(Le,ze)},$$slots:{default:!0}})}},ke=be=>{{let Ee=$(()=>l(me).isUploaded?"default":"secondary"),Pe=$(()=>l(me).isUploaded?"bg-green-500 hover:bg-green-600":"");bt(be,{get variant(){return l(Ee)},get class(){return`text-xs flex-shrink-0 ${l(Pe)??""}`},children:(Le,Ze)=>{var ze=$e();G(()=>B(ze,l(me).isUploaded?"Generated":"Missing")),u(Le,ze)},$$slots:{default:!0}})}};L(ce,be=>{l(me).type==="uploaded"?be(he):be(ke,!1)})}G(()=>{dr(_e,1,`border rounded-md p-2 ${l(me).isUploaded?"bg-green-50/50 border-green-200":"bg-muted/20"}`),B(Be,l(me).title),B(Ue,l(me).filename)}),u(ge,_e)});var Oe=_(re,2);Qt(Oe,{}),u(ue,le)};L(J,ue=>{l(v).length>0&&ue(j)})}var N=_(J,2),P=_(p(N),2),x=p(P),w=_(p(x),2),F=p(w),C=_(x,2),D=_(p(C),2),H=p(D),Y=_(C,2),X=_(p(Y),2),Z=p(X),Q=_(Y,2),pe=_(p(Q),2),ae=p(pe),te=_(N,2);{var Fe=ue=>{var le=b1(),re=A(le);Qt(re,{});var de=_(re,2),Oe=_(p(de),2),ge=p(Oe);{var me=oe=>{var ne=m1(),ce=_(p(ne),2),he=p(ce);G(()=>B(he,n().executionTime)),u(oe,ne)};L(ge,oe=>{n().executionTime&&oe(me)})}var _e=_(ge,2);{var we=oe=>{var ne=h1(),ce=_(p(ne),2),he=p(ce);G(()=>B(he,n().lastRun)),u(oe,ne)};L(_e,oe=>{n().lastRun&&oe(we)})}var Te=_(_e,2);{var ve=oe=>{var ne=g1(),ce=_(p(ne),2),he=p(ce);G(ke=>B(he,ke),[()=>n().outputLines.toLocaleString()]),u(oe,ne)};L(Te,oe=>{n().outputLines!==void 0&&oe(ve)})}var Be=_(Te,2);{var Re=oe=>{var ne=_1(),ce=_(p(ne),2),he=p(ce);G(()=>{dr(ce,1,jr(n().errorCount>0?"text-destructive font-medium":"")),B(he,n().errorCount)}),u(oe,ne)};L(Be,oe=>{n().errorCount!==void 0&&oe(Re)})}var Ue=_(Be,2);vt(Ue,17,()=>Object.entries(n()),St,(oe,ne)=>{var ce=$(()=>fs(l(ne),2));let he=()=>l(ce)[0],ke=()=>l(ce)[1];var be=q(),Ee=A(be);{var Pe=Le=>{var Ze=y1(),ze=p(Ze),Ve=p(ze),Qe=_(ze,2),tt=p(Qe);G(Ae=>{B(Ve,`${Ae??""}:`),B(tt,ke())},[()=>he().replace(/([A-Z])/g," $1").trim()]),u(Le,Ze)};L(Ee,Le=>{["executionTime","lastRun","outputLines","errorCount"].includes(he())||Le(Pe)})}u(oe,be)}),u(ue,le)};L(te,ue=>{Object.keys(n()).length>0&&ue(Fe)})}G((ue,le,re,de)=>{B(F,ue),B(H,le),B(Z,re),B(ae,de)},[()=>l(f).lines.toLocaleString(),()=>l(f).nonEmptyLines.toLocaleString(),()=>l(f).characters.toLocaleString(),()=>_a(new TextEncoder().encode(e.scriptContent).length)]),u(I,W)},$$slots:{default:!0}}),u(O,M)},$$slots:{default:!0}});var b=_(S,2);Vt(b,{class:"flex-1 min-h-0 overflow-hidden",children:(O,z)=>{var M=I1(),T=A(M);Wt(T,{children:(I,K)=>{Ht(I,{class:"flex items-center justify-between gap-2 text-base",children:(W,J)=>{var j=S1(),N=A(j),P=p(N);{var x=D=>{var H=$e("Error Output");u(D,H)},w=D=>{var H=q(),Y=A(H);{var X=Q=>{var pe=$e("Script Output");u(Q,pe)},Z=Q=>{var pe=$e("Live Output");u(Q,pe)};L(Y,Q=>{a()?Q(X):Q(Z,!1)},!0)}u(D,H)};L(P,D=>{r()==="error"?D(x):D(w,!1)})}var F=_(N,2);{var C=D=>{Ja(D,{get content(){return l(h)},class:"flex-shrink-0"})};L(F,D=>{(r()==="error"&&s()||a())&&D(C)})}u(W,j)},$$slots:{default:!0}})},$$slots:{default:!0}});var R=_(T,2);Gt(R,{class:"h-[calc(100%-4rem)] overflow-hidden",children:(I,K)=>{var W=O1(),J=p(W);{var j=P=>{var x=P1(),w=p(x);{var F=Y=>{var X=k1(),Z=_(p(X),2),Q=p(Z);G(()=>B(Q,a())),u(Y,X)};L(w,Y=>{a()&&a().trim()&&Y(F)})}var C=_(w,2),D=_(p(C),2),H=p(D);G(()=>B(H,s())),u(P,x)},N=P=>{var x=q(),w=A(x);{var F=D=>{var H=A1(),Y=p(H);G(()=>B(Y,a())),u(D,H)},C=D=>{var H=q(),Y=A(H);{var X=Q=>{var pe=C1(),ae=p(pe),te=p(ae);Za(te,{class:"animate-spin h-6 w-6 mx-auto mb-2 text-primary"});var Fe=_(te,4);{var ue=le=>{var re=E1(),de=p(re);G(()=>B(de,l(o))),u(le,re)};L(Fe,le=>{(l(i)==="initializing"||l(i)==="loading-packages")&&le(ue)})}u(Q,pe)},Z=Q=>{var pe=q(),ae=A(pe);{var te=ue=>{var le=T1(),re=p(le),de=p(re);cu(de,{class:"h-6 w-6 mx-auto mb-2 text-destructive"}),u(ue,le)},Fe=ue=>{var le=q(),re=A(le);{var de=ge=>{var me=F1(),_e=p(me),we=p(_e);Za(we,{class:"animate-spin h-6 w-6 mx-auto mb-2 text-primary"});var Te=_(we,2),ve=p(Te);G(()=>B(ve,l(o))),u(ge,me)},Oe=ge=>{var me=R1(),_e=p(me),we=p(_e);Tn(we,{class:"h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50"});var Te=_(we,4),ve=p(Te);G(()=>B(ve,l(i)==="ready"?'Python loaded - click "Run Script"':'Click "Run Script" to load Python and execute')),u(ge,me)};L(re,ge=>{l(i)==="initializing"||l(i)==="loading-packages"?ge(de):ge(Oe,!1)},!0)}u(ue,le)};L(ae,ue=>{l(i)==="error"?ue(te):ue(Fe,!1)},!0)}u(Q,pe)};L(Y,Q=>{r()==="running"?Q(X):Q(Z,!1)},!0)}u(D,H)};L(w,D=>{a()?D(F):D(C,!1)},!0)}u(P,x)};L(J,P=>{r()==="error"&&s()?P(j):P(N,!1)})}u(I,W)},$$slots:{default:!0}}),u(O,M)},$$slots:{default:!0}}),u(t,m),se()}function Al(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];_t(t,Ke({name:"external-link"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}function El(t,e){ie(e,!0);/**
 * @license @lucide/svelte v0.515.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */let r=xe(e,["$$slots","$$events","$$legacy"]);const n=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];_t(t,Ke({name:"refresh-cw"},()=>r,{get iconNode(){return n},children:(a,s)=>{var i=q(),o=A(i);fe(o,()=>e.children??ye),u(a,i)},$$slots:{default:!0}})),se()}var M1=k('<span class="truncate flex items-center gap-2 min-w-0 flex-shrink"><!> <span class="truncate"> </span></span> <div class="flex items-center gap-2 flex-shrink-0"><!> <!></div>',1),L1=k('<div class="absolute inset-0 flex items-center justify-center bg-muted/20"><div class="text-center"><!> <p class="text-sm text-muted-foreground">Loading HTML content...</p></div></div>'),z1=k('<div class="relative h-full"><!> <iframe sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe></div>'),B1=k("<!> <!>",1),U1=k('<div class="flex justify-between"><span class="text-muted-foreground">Size:</span> <span> </span></div>'),j1=k('<div class="flex justify-between"><span class="text-muted-foreground">Created:</span> <span> </span></div>'),$1=k("<!> Open in New Tab",1),q1=k(`<div><h4 class="font-medium mb-2 text-sm">Details</h4> <div class="space-y-1 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Type:</span> <span>HTML Report</span></div> <div class="flex justify-between"><span class="text-muted-foreground">Filename:</span> <span class="truncate ml-2"> </span></div> <!> <!></div></div> <div><h4 class="font-medium mb-2 text-sm">Preview Options</h4> <div class="space-y-2"><p class="text-xs text-muted-foreground">This HTML report is displayed in a sandboxed iframe for security. 
							Some interactive features may be limited.</p> <!></div></div>`,1),V1=k("<!> <!>",1),G1=k('<div class="flex gap-6 h-full"><div class="flex-1 min-w-0"><!></div> <div class="w-80 flex-shrink-0"><!></div></div>');function W1(t,e){ie(e,!0);let r,n=Se(!0);const a=m=>{const g=["Bytes","KB","MB","GB"];if(m===0)return"0 Bytes";const y=Math.floor(Math.log(m)/Math.log(1024));return Math.round(m/Math.pow(1024,y)*100)/100+" "+g[y]},s=m=>new Date(m).toLocaleString(),i=()=>{if(r&&e.htmlContent){V(n,!0);const m=new Blob([e.htmlContent],{type:"text/html"}),g=URL.createObjectURL(m);r.onload=()=>{V(n,!1)},r.onerror=()=>{V(n,!1)},r.src=g,setTimeout(()=>URL.revokeObjectURL(g),1e3)}},o=()=>{i()};Ct(()=>{r&&e.htmlContent&&i()});var c=G1(),d=p(c),f=p(d);Vt(f,{class:"h-full",children:(m,g)=>{var y=B1(),E=A(y);Wt(E,{children:(b,O)=>{Ht(b,{class:"flex items-center justify-between gap-4 min-w-0",children:(z,M)=>{var T=M1(),R=A(T),I=p(R);pi(I,{class:"size-4 flex-shrink-0"});var K=_(I,2),W=p(K),J=_(R,2),j=p(J);It(j,{size:"sm",variant:"ghost",onclick:o,get disabled(){return l(n)},title:"Refresh content",children:(x,w)=>{{let F=$(()=>l(n)?"animate-spin":"");El(x,{get class(){return`size-3 ${l(F)??""}`}})}},$$slots:{default:!0}});var N=_(j,2);{var P=x=>{It(x,{size:"sm",variant:"ghost",get onclick(){return e.onOpenNewTab},title:"Open in new tab",children:(w,F)=>{Al(w,{class:"size-3"})},$$slots:{default:!0}})};L(N,x=>{e.onOpenNewTab&&x(P)})}G(()=>B(W,e.filename)),u(z,T)},$$slots:{default:!0}})},$$slots:{default:!0}});var S=_(E,2);Gt(S,{class:"p-0 h-[calc(100%-4rem)] overflow-hidden",children:(b,O)=>{var z=z1(),M=p(z);{var T=I=>{var K=L1(),W=p(K),J=p(W);El(J,{class:"animate-spin h-6 w-6 mx-auto mb-2 text-primary"}),u(I,K)};L(M,I=>{l(n)&&I(T)})}var R=_(M,2);ut(R,I=>r=I,()=>r),G(()=>{dr(R,1,`w-full h-full border-0 ${l(n)?"opacity-0":"opacity-100"} transition-opacity`),ht(R,"title",`Preview of ${e.filename}`)}),u(b,z)},$$slots:{default:!0}}),u(m,y)},$$slots:{default:!0}});var v=_(d,2),h=p(v);Vt(h,{class:"h-full",children:(m,g)=>{var y=V1(),E=A(y);Wt(E,{children:(b,O)=>{Ht(b,{class:"text-base",children:(z,M)=>{var T=$e("File Information");u(z,T)},$$slots:{default:!0}})},$$slots:{default:!0}});var S=_(E,2);Gt(S,{class:"space-y-4",children:(b,O)=>{var z=q1(),M=A(z),T=_(p(M),2),R=_(p(T),2),I=_(p(R),2),K=p(I),W=_(R,2);{var J=C=>{var D=U1(),H=_(p(D),2),Y=p(H);G(X=>B(Y,X),[()=>a(e.fileSize)]),u(C,D)};L(W,C=>{e.fileSize&&C(J)})}var j=_(W,2);{var N=C=>{var D=j1(),H=_(p(D),2),Y=p(H);G(X=>B(Y,X),[()=>s(e.createdAt)]),u(C,D)};L(j,C=>{e.createdAt&&C(N)})}var P=_(M,2),x=_(p(P),2),w=_(p(x),2);{var F=C=>{It(C,{size:"sm",variant:"outline",get onclick(){return e.onOpenNewTab},class:"w-full",children:(D,H)=>{var Y=$1(),X=A(Y);Al(X,{class:"size-3 mr-2"}),u(D,Y)},$$slots:{default:!0}})};L(w,C=>{e.onOpenNewTab&&C(F)})}G(()=>{ht(I,"title",e.filename),B(K,e.filename)}),u(b,z)},$$slots:{default:!0}}),u(m,y)},$$slots:{default:!0}}),u(t,c),se()}var H1=k("<nav><!></nav>");function Y1(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=H1();Xe(a,()=>({"data-slot":"breadcrumb",class:e.class,"aria-label":"breadcrumb",...n}));var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var K1=k("<li><!></li>");function rn(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=K1();Xe(a,i=>({"data-slot":"breadcrumb-item",class:i,...n}),[()=>He("inline-flex items-center gap-1.5",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var X1=k("<li><!></li>");function wn(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=X1();Xe(a,c=>({"data-slot":"breadcrumb-separator",role:"presentation","aria-hidden":"true",class:c,...n}),[()=>He("[&>svg]:size-3.5",e.class)]);var s=p(a);{var i=c=>{var d=q(),f=A(d);fe(f,()=>e.children??ye),u(c,d)},o=c=>{du(c,{})};L(s,c=>{e.children?c(i):c(o,!1)})}ut(a,c=>r(c),()=>r()),u(t,a),se()}var Q1=k("<a><!></a>");function Cl(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=U(e,"href",3,void 0),a=xe(e,["$$slots","$$events","$$legacy","ref","class","href","child","children"]);const s=$(()=>({"data-slot":"breadcrumb-link",class:He("hover:text-foreground transition-colors",e.class),href:n(),...a}));var i=q(),o=A(i);{var c=f=>{var v=q(),h=A(v);fe(h,()=>e.child,()=>({props:l(s)})),u(f,v)},d=f=>{var v=Q1();Xe(v,()=>({...l(s)}));var h=p(v);fe(h,()=>e.children??ye),ut(v,m=>r(m),()=>r()),u(f,v)};L(o,f=>{e.child?f(c):f(d,!1)})}u(t,i),se()}var J1=k("<ol><!></ol>");function Z1(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=J1();Xe(a,i=>({"data-slot":"breadcrumb-list",class:i,...n}),[()=>He("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var e2=k("<span><!></span>");function Kn(t,e){ie(e,!0);let r=U(e,"ref",15,null),n=xe(e,["$$slots","$$events","$$legacy","ref","class","children"]);var a=e2();Xe(a,i=>({"data-slot":"breadcrumb-page",role:"link","aria-disabled":"true","aria-current":"page",class:i,...n}),[()=>He("text-foreground font-normal",e.class)]);var s=p(a);fe(s,()=>e.children??ye),ut(a,i=>r(i),()=>r()),u(t,a),se()}var t2=k("<!> <!>",1),r2=k("<!> <!>",1),n2=k("<!> <!>",1),a2=k("<!> <!>",1),i2=k("<!> <!>",1),s2=k("<!> <!> <!> <!>",1),o2=k('<div class="h-full min-h-0 overflow-hidden"><!></div>'),l2=k('<div class="h-full min-h-0 overflow-hidden"><!></div>'),c2=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="text-6xl mb-4">📄</div> <h3 class="text-lg font-medium mb-2"> </h3> <p class="text-muted-foreground mb-4"> </p> <p class="text-sm text-muted-foreground"> </p></div></div>'),d2=k('<div class="h-full min-h-0 overflow-hidden"><!></div>'),u2=k('<div class="flex items-center justify-center h-full"><div class="text-center"><div class="text-6xl mb-4">📄</div> <h3 class="text-lg font-medium mb-2"> </h3> <p class="text-muted-foreground mb-4"> </p> <p class="text-sm text-muted-foreground">Preview not available for this file type</p></div></div>'),f2=k('<div class="h-full min-h-0 overflow-hidden"><!></div>'),p2=k(`<div class="bg-muted/50 flex-1 rounded-xl overflow-auto"><div class="p-8"><h1 class="text-3xl font-bold mb-4">Super Great Description</h1> <p class="text-lg text-muted-foreground mb-6">Upload and manage your files with real-time preview capabilities, plus execute Python scripts with Pyodide. 
							The sidebar shows your file requirements, upload status, and available scripts.</p> <div class="space-y-4"><h2 class="text-xl font-semibold">Features:</h2> <ul class="list-disc list-inside space-y-2 text-muted-foreground"><li>Upload files with progress tracking</li> <li>Real-time parquet file preview with hyparquet</li> <li>Schema validation with comprehensive reporting</li> <li>Python script execution with Pyodide</li> <li>Script preview with metrics and output display</li> <li>File search and filtering capabilities</li> <li>Metadata and schema information display</li> <li>Responsive design with collapsible sidebar</li></ul> <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border"><h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3> <p class="text-sm text-blue-700 dark:text-blue-300">Click on "Required Files" to upload and preview data files. 
									Click on "Schema Validation" to validate your data against expected schemas.
									Click on "Scripts" to view and execute Python analysis scripts.
									Use the search functionality to find specific files, schemas, or scripts quickly.</p></div></div></div></div>`),v2=k('<header class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4"><!> <!> <!></header> <div class="flex flex-1 flex-col gap-4 p-4 max-h-[calc(100vh-5rem)] min-h-0 overflow-hidden"><!></div>',1),m2=k("<!> <!>",1);function h2(t,e){ie(e,!0);const r=$(()=>{const f=ft.selectedFileId;return f?ft.files[f]??null:null}),n=$(()=>{const f=$t.selectedSchemaId;return f?nr.getSchema(f)??null:null}),a=$(()=>{const f=$t.selectedSchemaId;return f?nr.getExecution(f)??null:null}),s=$(()=>{const f=mt.selectedScriptId;return f?ar.getScript(f)??null:null}),i=$(()=>{const f=mt.selectedScriptId;return f?ar.getExecution(f)??null:null}),o=$(()=>{const f=yt.selectedResultId;return f?la.getResultFile(f)??null:null});var c=q(),d=A(c);Ce(d,()=>fb,(f,v)=>{v(f,{style:"--sidebar-width: 400px;",children:(h,m)=>{var g=m2(),y=A(g);vx(y,{});var E=_(y,2);Ce(E,()=>Xy,(S,b)=>{b(S,{children:(O,z)=>{var M=v2(),T=A(M),R=p(T);Ce(R,()=>mb,(P,x)=>{x(P,{class:"-ml-1"})});var I=_(R,2);Qt(I,{orientation:"vertical",class:"mr-2 data-[orientation=vertical]:h-4"});var K=_(I,2);Ce(K,()=>Y1,(P,x)=>{x(P,{children:(w,F)=>{var C=q(),D=A(C);Ce(D,()=>Z1,(H,Y)=>{Y(H,{children:(X,Z)=>{var Q=s2(),pe=A(Q);Ce(pe,()=>rn,(re,de)=>{de(re,{class:"hidden md:block",children:(Oe,ge)=>{var me=q(),_e=A(me);Ce(_e,()=>Cl,(we,Te)=>{Te(we,{href:"#",children:(ve,Be)=>{var Re=$e("YourBespokeAppName");u(ve,Re)},$$slots:{default:!0}})}),u(Oe,me)},$$slots:{default:!0}})});var ae=_(pe,2);Ce(ae,()=>wn,(re,de)=>{de(re,{class:"hidden md:block"})});var te=_(ae,2);Ce(te,()=>rn,(re,de)=>{de(re,{class:"hidden md:block",children:(Oe,ge)=>{var me=q(),_e=A(me);Ce(_e,()=>Cl,(we,Te)=>{Te(we,{href:"#",children:(ve,Be)=>{var Re=q(),Ue=A(Re);{var oe=ce=>{var he=$e("Schema Validation");u(ce,he)},ne=ce=>{var he=q(),ke=A(he);{var be=Pe=>{var Le=$e("Scripts");u(Pe,Le)},Ee=Pe=>{var Le=q(),Ze=A(Le);{var ze=Qe=>{var tt=$e("Results");u(Qe,tt)},Ve=Qe=>{var tt=$e("Files");u(Qe,tt)};L(Ze,Qe=>{l(o)?Qe(ze):Qe(Ve,!1)},!0)}u(Pe,Le)};L(ke,Pe=>{l(s)?Pe(be):Pe(Ee,!1)},!0)}u(ce,he)};L(Ue,ce=>{l(n)?ce(oe):ce(ne,!1)})}u(ve,Re)},$$slots:{default:!0}})}),u(Oe,me)},$$slots:{default:!0}})});var Fe=_(te,2);{var ue=re=>{var de=t2(),Oe=A(de);Ce(Oe,()=>wn,(me,_e)=>{_e(me,{class:"hidden md:block"})});var ge=_(Oe,2);Ce(ge,()=>rn,(me,_e)=>{_e(me,{children:(we,Te)=>{var ve=q(),Be=A(ve);Ce(Be,()=>Kn,(Re,Ue)=>{Ue(Re,{children:(oe,ne)=>{var ce=$e();G(()=>B(ce,l(r).originalName)),u(oe,ce)},$$slots:{default:!0}})}),u(we,ve)},$$slots:{default:!0}})}),u(re,de)},le=re=>{var de=q(),Oe=A(de);{var ge=_e=>{var we=r2(),Te=A(we);Ce(Te,()=>wn,(Be,Re)=>{Re(Be,{class:"hidden md:block"})});var ve=_(Te,2);Ce(ve,()=>rn,(Be,Re)=>{Re(Be,{children:(Ue,oe)=>{var ne=q(),ce=A(ne);Ce(ce,()=>Kn,(he,ke)=>{ke(he,{children:(be,Ee)=>{var Pe=$e();G(()=>B(Pe,l(n).title)),u(be,Pe)},$$slots:{default:!0}})}),u(Ue,ne)},$$slots:{default:!0}})}),u(_e,we)},me=_e=>{var we=q(),Te=A(we);{var ve=Re=>{var Ue=n2(),oe=A(Ue);Ce(oe,()=>wn,(ce,he)=>{he(ce,{class:"hidden md:block"})});var ne=_(oe,2);Ce(ne,()=>rn,(ce,he)=>{he(ce,{children:(ke,be)=>{var Ee=q(),Pe=A(Ee);Ce(Pe,()=>Kn,(Le,Ze)=>{Ze(Le,{children:(ze,Ve)=>{var Qe=$e();G(()=>B(Qe,l(s).title)),u(ze,Qe)},$$slots:{default:!0}})}),u(ke,Ee)},$$slots:{default:!0}})}),u(Re,Ue)},Be=Re=>{var Ue=q(),oe=A(Ue);{var ne=he=>{var ke=a2(),be=A(ke);Ce(be,()=>wn,(Pe,Le)=>{Le(Pe,{class:"hidden md:block"})});var Ee=_(be,2);Ce(Ee,()=>rn,(Pe,Le)=>{Le(Pe,{children:(Ze,ze)=>{var Ve=q(),Qe=A(Ve);Ce(Qe,()=>Kn,(tt,Ae)=>{Ae(tt,{children:(je,et)=>{var We=$e();G(()=>B(We,l(o).filename)),u(je,We)},$$slots:{default:!0}})}),u(Ze,Ve)},$$slots:{default:!0}})}),u(he,ke)},ce=he=>{var ke=i2(),be=A(ke);Ce(be,()=>wn,(Pe,Le)=>{Le(Pe,{class:"hidden md:block"})});var Ee=_(be,2);Ce(Ee,()=>rn,(Pe,Le)=>{Le(Pe,{children:(Ze,ze)=>{var Ve=q(),Qe=A(Ve);Ce(Qe,()=>Kn,(tt,Ae)=>{Ae(tt,{children:(je,et)=>{var We=$e("Dashboard");u(je,We)},$$slots:{default:!0}})}),u(Ze,Ve)},$$slots:{default:!0}})}),u(he,ke)};L(oe,he=>{l(o)?he(ne):he(ce,!1)},!0)}u(Re,Ue)};L(Te,Re=>{l(s)?Re(ve):Re(Be,!1)},!0)}u(_e,we)};L(Oe,_e=>{l(n)?_e(ge):_e(me,!1)},!0)}u(re,de)};L(Fe,re=>{l(r)?re(ue):re(le,!1)})}u(X,Q)},$$slots:{default:!0}})}),u(w,C)},$$slots:{default:!0}})});var W=_(T,2),J=p(W);{var j=P=>{var x=o2(),w=p(x);{let F=$(()=>l(a)?.status),C=$(()=>l(a)?.metrics),D=$(()=>l(a)?.output),H=$(()=>l(a)?.results),Y=$(()=>l(a)?.error);l1(w,{get schemaId(){return l(n).id},get expectations(){return l(n).expectations},get filename(){return l(n).filename},get status(){return l(F)},get metrics(){return l(C)},get output(){return l(D)},get validationResults(){return l(H)},get error(){return l(Y)},onValidate:()=>{Mr.startExecution(l(n).id)}})}u(P,x)},N=P=>{var x=q(),w=A(x);{var F=D=>{var H=l2(),Y=p(H);{let X=$(()=>l(i)?.status),Z=$(()=>l(i)?.metrics),Q=$(()=>l(i)?.output),pe=$(()=>l(i)?.error);D1(Y,{get scriptId(){return l(s).id},get scriptContent(){return l(s).content},get filename(){return l(s).filename},get status(){return l(X)},get metrics(){return l(Z)},get output(){return l(Q)},get error(){return l(pe)},onRun:()=>{Pr.startExecution(l(s).id)}})}u(D,H)},C=D=>{var H=q(),Y=A(H);{var X=Q=>{var pe=d2(),ae=p(pe);{var te=ue=>{{let le=$(()=>l(o).content?typeof l(o).content=="string"?l(o).content:new TextDecoder().decode(l(o).content):"");W1(ue,{get htmlContent(){return l(le)},get filename(){return l(o).filename},get fileSize(){return l(o).fileSize},get createdAt(){return l(o).createdAt},onDownload:()=>{console.log("Download result:",l(o).filename)}})}},Fe=ue=>{var le=q(),re=A(le);{var de=ge=>{var me=q(),_e=A(me);{var we=Te=>{const ve=$(()=>new File([l(o).content],l(o).filename,{type:"text/csv",lastModified:new Date(l(o).createdAt).getTime()}));kl(Te,{get file(){return l(ve)},get filename(){return l(o).filename}})};L(_e,Te=>{l(o).content&&Te(we)})}u(ge,me)},Oe=ge=>{var me=q(),_e=A(me);{var we=ve=>{var Be=q(),Re=A(Be);{var Ue=oe=>{const ne=$(()=>new File([l(o).content],l(o).filename,{type:"application/octet-stream",lastModified:new Date(l(o).createdAt).getTime()}));Sl(oe,{get file(){return l(ne)},get filename(){return l(o).filename}})};L(Re,oe=>{l(o).content&&oe(Ue)})}u(ve,Be)},Te=ve=>{var Be=q(),Re=A(Be);{var Ue=ne=>{var ce=q(),he=A(ce);{var ke=be=>{const Ee=$(()=>new File([l(o).content],l(o).filename,{type:"application/geopackage+sqlite3",lastModified:new Date(l(o).createdAt).getTime()}));Pl(be,{get file(){return l(Ee)},get filename(){return l(o).filename}})};L(he,be=>{l(o).content&&be(ke)})}u(ne,ce)},oe=ne=>{var ce=c2(),he=p(ce),ke=_(p(he),2),be=p(ke),Ee=_(ke,2),Pe=p(Ee),Le=_(Ee,2),Ze=p(Le);G((ze,Ve)=>{B(be,l(o).filename),B(Pe,`${ze??""} file • ${Ve??""} KB`),B(Ze,l(o).description)},[()=>l(o).fileType.toUpperCase(),()=>(l(o).fileSize/1024).toFixed(1)]),u(ne,ce)};L(Re,ne=>{l(o).fileType==="gpkg"?ne(Ue):ne(oe,!1)},!0)}u(ve,Be)};L(_e,ve=>{l(o).fileType==="parquet"||l(o).fileType==="pq"?ve(we):ve(Te,!1)},!0)}u(ge,me)};L(re,ge=>{l(o).fileType==="csv"?ge(de):ge(Oe,!1)},!0)}u(ue,le)};L(ae,ue=>{l(o).fileType==="html"||l(o).fileType==="htm"?ue(te):ue(Fe,!1)})}u(Q,pe)},Z=Q=>{var pe=q(),ae=A(pe);{var te=ue=>{var le=f2(),re=p(le);{var de=ge=>{kl(ge,{get file(){return l(r).file},get filename(){return l(r).originalName}})},Oe=ge=>{var me=q(),_e=A(me);{var we=ve=>{Sl(ve,{get file(){return l(r).file},get filename(){return l(r).originalName}})},Te=ve=>{var Be=q(),Re=A(Be);{var Ue=ne=>{Pl(ne,{get file(){return l(r).file},get filename(){return l(r).originalName}})},oe=ne=>{var ce=u2(),he=p(ce),ke=_(p(he),2),be=p(ke),Ee=_(ke,2),Pe=p(Ee);G(Le=>{B(be,l(r).originalName),B(Pe,`${Le??""} file • ${l(r).size??""}`)},[()=>Ca(l(r).originalName).toUpperCase().slice(1)]),u(ne,ce)};L(Re,ne=>{Ca(l(r).originalName)===".gpkg"?ne(Ue):ne(oe,!1)},!0)}u(ve,Be)};L(_e,ve=>{Ca(l(r).originalName)===".parquet"?ve(we):ve(Te,!1)},!0)}u(ge,me)};L(re,ge=>{Ca(l(r).originalName)===".csv"?ge(de):ge(Oe,!1)})}u(ue,le)},Fe=ue=>{var le=p2();u(ue,le)};L(ae,ue=>{l(r)?.file?ue(te):ue(Fe,!1)},!0)}u(Q,pe)};L(Y,Q=>{l(o)?Q(X):Q(Z,!1)},!0)}u(D,H)};L(w,D=>{l(s)?D(F):D(C,!1)},!0)}u(P,x)};L(J,P=>{l(n)?P(j):P(N,!1)})}u(O,M)},$$slots:{default:!0}})}),u(h,g)},$$slots:{default:!0}})}),u(t,c),se()}yc(h2,{target:document.getElementById("app")});
