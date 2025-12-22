(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return a},urlQueryToSearchParams:function(){return i}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function a(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function s(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function i(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,s(e));else t.set(r,s(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809)._(e.r(98183)),s=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",i=e.hash||"",l=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let c=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||s.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),i&&"#"!==i[0]&&(i="#"+i),c&&"?"!==c[0]&&(c="?"+c),o=o.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${o}${c}${i}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return i(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return g},MiddlewareNotFoundError:function(){return k},MissingStaticPage:function(){return x},NormalizeError:function(){return b},PageNotFoundError:function(){return v},SP:function(){return h},ST:function(){return y},WEB_VITALS:function(){return a},execOnce:function(){return s},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return w}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>i.test(e);function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let h="undefined"!=typeof performance,y=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class g extends Error{}class b extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class k extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),o=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return g},useLinkStatus:function(){return v}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809),s=e.r(43476),i=a._(e.r(71645)),l=e.r(95057),u=e.r(8372),c=e.r(18581),d=e.r(18967),f=e.r(5550);e.r(33525);let p=e.r(91949),m=e.r(73668),h=e.r(9396);function y(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function g(t){var r;let n,o,a,[l,g]=(0,i.useOptimistic)(p.IDLE_LINK_STATUS),v=(0,i.useRef)(null),{href:x,as:k,children:w,prefetch:j=null,passHref:E,replace:P,shallow:N,scroll:O,onClick:_,onMouseEnter:C,onTouchStart:T,legacyBehavior:S=!1,onNavigate:$,ref:A,unstable_dynamicOnHover:M,...I}=t;n=w,S&&("string"==typeof n||"number"==typeof n)&&(n=(0,s.jsx)("a",{children:n}));let R=i.default.useContext(u.AppRouterContext),L=!1!==j,D=!1!==j?null===(r=j)||"auto"===r?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,{href:z,as:U}=i.default.useMemo(()=>{let e=y(x);return{href:e,as:k?y(k):e}},[x,k]);if(S){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=i.default.Children.only(n)}let B=S?o&&"object"==typeof o&&o.ref:A,F=i.default.useCallback(e=>(null!==R&&(v.current=(0,p.mountLinkInstance)(e,z,R,D,L,g)),()=>{v.current&&((0,p.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,p.unmountPrefetchableInstance)(e)}),[L,z,R,D,g]),K={ref:(0,c.useMergedRef)(F,B),onClick(t){S||"function"!=typeof _||_(t),S&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!R||t.defaultPrevented||function(t,r,n,o,a,s,l){if("undefined"!=typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,m.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);i.default.startTransition(()=>{d(n||r,a?"replace":"push",s??!0,o.current)})}}(t,z,U,v,P,O,$)},onMouseEnter(e){S||"function"!=typeof C||C(e),S&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),R&&L&&(0,p.onNavigationIntent)(e.currentTarget,!0===M)},onTouchStart:function(e){S||"function"!=typeof T||T(e),S&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),R&&L&&(0,p.onNavigationIntent)(e.currentTarget,!0===M)}};return(0,d.isAbsoluteUrl)(U)?K.href=U:S&&!E&&("a"!==o.type||"href"in o.props)||(K.href=(0,f.addBasePath)(U)),a=S?i.default.cloneElement(o,K):(0,s.jsx)("a",{...I,...K,children:n}),(0,s.jsx)(b.Provider,{value:l,children:a})}e.r(84508);let b=(0,i.createContext)(p.IDLE_LINK_STATUS),v=()=>(0,i.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18566,(e,t,r)=>{t.exports=e.r(76562)},19449,e=>{"use strict";var t=e.i(43476),r=e.i(22016),n=e.i(18566),o=e.i(75254);let a=(0,o.default)("book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]]),s=(0,o.default)("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]),i=(0,o.default)("library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]),l=(0,o.default)("plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var u=e.i(59544),c=e.i(75157),d=e.i(71645),f=e.i(46047);function p(){let e=(0,n.usePathname)(),[o,p]=(0,d.useState)(!1);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("header",{className:"sticky top-0 z-40 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80",children:(0,t.jsxs)("div",{className:"container mx-auto flex h-16 items-center justify-between px-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-6",children:[(0,t.jsxs)(r.default,{href:"/",className:"flex items-center gap-2 font-bold text-lg",children:[(0,t.jsx)("div",{className:"p-1.5 bg-stone-900 rounded-md dark:bg-stone-50",children:(0,t.jsx)(a,{className:"h-4 w-4 text-stone-50 dark:text-stone-900"})}),(0,t.jsx)("span",{className:"hidden sm:inline-block",children:"BookTracker"})]}),(0,t.jsx)("nav",{className:"flex items-center gap-4",children:[{href:"/dashboard",label:"Dashboard",icon:s},{href:"/books",label:"My Books",icon:i}].map(n=>{let o=e===n.href;return(0,t.jsxs)(r.default,{href:n.href,className:(0,c.cn)("flex items-center gap-2 text-sm font-medium transition-colors hover:text-stone-900 dark:hover:text-stone-50",o?"text-stone-900 dark:text-stone-50":"text-stone-500 dark:text-stone-400"),children:[(0,t.jsx)(n.icon,{className:"h-4 w-4"}),(0,t.jsx)("span",{children:n.label})]},n.href)})})]}),(0,t.jsxs)(u.Button,{size:"sm",onClick:()=>p(!0),children:[(0,t.jsx)(l,{className:"mr-2 h-4 w-4"}),(0,t.jsx)("span",{className:"hidden sm:inline",children:"Add Book"}),(0,t.jsx)("span",{className:"inline sm:hidden",children:"Add"})]})]})}),o&&(0,t.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200",children:(0,t.jsxs)("div",{className:"w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-stone-950 dark:border dark:border-stone-800",children:[(0,t.jsxs)("div",{className:"p-6 border-b border-stone-100 dark:border-stone-800",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold",children:"Add New Book"}),(0,t.jsx)("p",{className:"text-sm text-stone-500",children:"Enter details to track a new book."})]}),(0,t.jsx)("div",{className:"p-6",children:(0,t.jsx)(f.BookForm,{onSuccess:()=>p(!1),onCancel:()=>p(!1)})})]})})]})}e.s(["NavBar",()=>p],19449)},90189,e=>{"use strict";var t=e.i(35488),r=e.i(71645);function n(){let{books:e,generateDummyData:n}=(0,t.useBookStore)(),o=(0,r.useRef)(!1);return(0,r.useEffect)(()=>{o.current||(o.current=!0,0===e.length&&n())},[e.length,n]),null}e.s(["DataSeeder",()=>n])},5766,e=>{"use strict";let t,r;var n,o=e.i(71645);let a={data:""},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,i=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,u=(e,t)=>{let r="",n="",o="";for(let a in e){let s=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+s+";":n+="f"==a[1]?u(s,a):a+"{"+u(s,"k"==a[1]?"":t)+"}":"object"==typeof s?n+=u(s,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=s&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=u.p?u.p(a,s):a+":"+s+";")}return r+(t&&o?t+"{"+o+"}":o)+n},c={},d=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+d(e[r]);return t}return e};function f(e){let t,r,n=this||{},o=e.call?e(n.p):e;return((e,t,r,n,o)=>{var a;let f=d(e),p=c[f]||(c[f]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(f));if(!c[p]){let t=f!==e?e:(e=>{let t,r,n=[{}];for(;t=s.exec(e.replace(i,""));)t[4]?n.shift():t[3]?(r=t[3].replace(l," ").trim(),n.unshift(n[0][r]=n[0][r]||{})):n[0][t[1]]=t[2].replace(l," ").trim();return n[0]})(e);c[p]=u(o?{["@keyframes "+p]:t}:t,r?"":"."+p)}let m=r&&c.g?c.g:null;return r&&(c.g=c[p]),a=c[p],m?t.data=t.data.replace(m,a):-1===t.data.indexOf(a)&&(t.data=n?a+t.data:t.data+a),p})(o.unshift?o.raw?(t=[].slice.call(arguments,1),r=n.p,o.reduce((e,n,o)=>{let a=t[o];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+n+(null==a?"":a)},"")):o.reduce((e,t)=>Object.assign(e,t&&t.call?t(n.p):t),{}):o,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a})(n.target),n.g,n.o,n.k)}f.bind({g:1});let p,m,h,y=f.bind({k:1});function g(e,t){let r=this||{};return function(){let n=arguments;function o(a,s){let i=Object.assign({},a),l=i.className||o.className;r.p=Object.assign({theme:m&&m()},i),r.o=/ *go\d+/.test(l),i.className=f.apply(r,n)+(l?" "+l:""),t&&(i.ref=s);let u=e;return e[0]&&(u=i.as||e,delete i.as),h&&u[0]&&h(i),p(u,i)}return t?t(o):o}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),x=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},k="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:n}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===n.id),toast:n});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},j=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},P={},N=(e,t=k)=>{P[t]=w(P[t]||E,e),j.forEach(([e,r])=>{e===t&&r(P[t])})},O=e=>Object.keys(P).forEach(t=>N(e,t)),_=(e=k)=>t=>{N(t,e)},C={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},T=(e={},t=k)=>{let[r,n]=(0,o.useState)(P[t]||E),a=(0,o.useRef)(P[t]);(0,o.useEffect)(()=>(a.current!==P[t]&&n(P[t]),j.push([t,n]),()=>{let e=j.findIndex(([e])=>e===t);e>-1&&j.splice(e,1)}),[t]);let s=r.toasts.map(t=>{var r,n,o;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(n=e[t.type])?void 0:n.duration)||(null==e?void 0:e.duration)||C[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...r,toasts:s}},S=e=>(t,r)=>{let n,o=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return _(o.toasterId||(n=o.id,Object.keys(P).find(e=>P[e].toasts.some(e=>e.id===n))))({type:2,toast:o}),o.id},$=(e,t)=>S("blank")(e,t);$.error=S("error"),$.success=S("success"),$.loading=S("loading"),$.custom=S("custom"),$.dismiss=(e,t)=>{let r={type:3,toastId:e};t?_(t)(r):O(r)},$.dismissAll=e=>$.dismiss(void 0,e),$.remove=(e,t)=>{let r={type:4,toastId:e};t?_(t)(r):O(r)},$.removeAll=e=>$.remove(void 0,e),$.promise=(e,t,r)=>{let n=$.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let o=t.success?b(t.success,e):void 0;return o?$.success(o,{id:n,...r,...null==r?void 0:r.success}):$.dismiss(n),e}).catch(e=>{let o=t.error?b(t.error,e):void 0;o?$.error(o,{id:n,...r,...null==r?void 0:r.error}):$.dismiss(n)}),e};var A=1e3,M=(e,t="default")=>{let{toasts:r,pausedAt:n}=T(e,t),a=(0,o.useRef)(new Map).current,s=(0,o.useCallback)((e,t=A)=>{if(a.has(e))return;let r=setTimeout(()=>{a.delete(e),i({type:4,toastId:e})},t);a.set(e,r)},[]);(0,o.useEffect)(()=>{if(n)return;let e=Date.now(),o=r.map(r=>{if(r.duration===1/0)return;let n=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(n<0){r.visible&&$.dismiss(r.id);return}return setTimeout(()=>$.dismiss(r.id,t),n)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[r,n,t]);let i=(0,o.useCallback)(_(t),[t]),l=(0,o.useCallback)(()=>{i({type:5,time:Date.now()})},[i]),u=(0,o.useCallback)((e,t)=>{i({type:1,toast:{id:e,height:t}})},[i]),c=(0,o.useCallback)(()=>{n&&i({type:6,time:Date.now()})},[n,i]),d=(0,o.useCallback)((e,t)=>{let{reverseOrder:n=!1,gutter:o=8,defaultPosition:a}=t||{},s=r.filter(t=>(t.position||a)===(e.position||a)&&t.height),i=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<i&&e.visible).length;return s.filter(e=>e.visible).slice(...n?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+o,0)},[r]);return(0,o.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)s(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[r,s]),{toasts:r,handlers:{updateHeight:u,startPause:l,endPause:c,calculateOffset:d}}},I=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,R=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,D=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,B=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=g("div")`
  position: absolute;
`,q=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Q=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:n}=e;return void 0!==t?"string"==typeof t?o.createElement(V,null,t):t:"blank"===r?null:o.createElement(q,null,o.createElement(U,{...n}),"loading"!==r&&o.createElement(H,null,"error"===r?o.createElement(D,{...n}):o.createElement(K,{...n})))},X=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,J=o.memo(({toast:e,position:t,style:r,children:n})=>{let a=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[n,o]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},s=o.createElement(W,{toast:e}),i=o.createElement(Z,{...e.ariaProps},b(e.message,e));return o.createElement(X,{className:e.className,style:{...a,...r,...e.style}},"function"==typeof n?n({icon:s,message:i}):o.createElement(o.Fragment,null,s,i))});n=o.createElement,u.p=void 0,p=n,m=void 0,h=void 0;var G=({id:e,className:t,style:r,onHeightUpdate:n,children:a})=>{let s=o.useCallback(t=>{if(t){let r=()=>{n(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return o.createElement("div",{ref:s,className:t,style:r},a)},Y=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:n,children:a,toasterId:s,containerStyle:i,containerClassName:l})=>{let{toasts:u,handlers:c}=M(r,s);return o.createElement("div",{"data-rht-toaster":s||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...i},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},u.map(r=>{let s,i,l=r.position||t,u=c.calculateOffset(r,{reverseOrder:e,gutter:n,defaultPosition:t}),d=(s=l.includes("top"),i=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${u*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...i});return o.createElement(G,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?Y:"",style:d},"custom"===r.type?b(r.message,r):a?a(r):o.createElement(J,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>K,"ErrorIcon",()=>D,"LoaderIcon",()=>U,"ToastBar",()=>J,"ToastIcon",()=>W,"Toaster",()=>ee,"default",()=>$,"resolveValue",()=>b,"toast",()=>$,"useToaster",()=>M,"useToasterStore",()=>T],5766)}]);