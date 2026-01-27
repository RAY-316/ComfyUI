function ot(...n){if(n){let t=[];for(let o=0;o<n.length;o++){const e=n[o];if(!e)continue;const r=typeof e;if(r==="string"||r==="number")t.push(e);else if(r==="object"){const l=Array.isArray(e)?[ot(...e)]:Object.entries(e).map(([i,a])=>a?i:void 0);t=l.length?t.concat(l.filter(i=>!!i)):t}}return t.join(" ").trim()}}function et(n,t){return n?n.classList?n.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(n.className):!1}function bn(n,t){if(n&&t){const o=e=>{et(n,e)||(n.classList?n.classList.add(e):n.className+=" "+e)};[t].flat().filter(Boolean).forEach(e=>e.split(" ").forEach(o))}}function rt(){return window.innerWidth-document.documentElement.offsetWidth}function Tt(n){typeof n=="string"?bn(document.body,n||"p-overflow-hidden"):(n!=null&&n.variableName&&document.body.style.setProperty(n.variableName,rt()+"px"),bn(document.body,(n==null?void 0:n.className)||"p-overflow-hidden"))}function gn(n,t){if(n&&t){const o=e=>{n.classList?n.classList.remove(e):n.className=n.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")};[t].flat().filter(Boolean).forEach(e=>e.split(" ").forEach(o))}}function Ft(n){typeof n=="string"?gn(document.body,n||"p-overflow-hidden"):(n!=null&&n.variableName&&document.body.style.removeProperty(n.variableName),gn(document.body,(n==null?void 0:n.className)||"p-overflow-hidden"))}function G(n){for(const t of document==null?void 0:document.styleSheets)try{for(const o of t==null?void 0:t.cssRules)for(const e of o==null?void 0:o.style)if(n.test(e))return{name:e,value:o.style.getPropertyValue(e).trim()}}catch{}return null}function _n(n){const t={width:0,height:0};return n&&(n.style.visibility="hidden",n.style.display="block",t.width=n.offsetWidth,t.height=n.offsetHeight,n.style.display="none",n.style.visibility="visible"),t}function an(){const n=window,t=document,o=t.documentElement,e=t.getElementsByTagName("body")[0],r=n.innerWidth||o.clientWidth||e.clientWidth,l=n.innerHeight||o.clientHeight||e.clientHeight;return{width:r,height:l}}function on(n){return n?Math.abs(n.scrollLeft):0}function it(){const n=document.documentElement;return(window.pageXOffset||on(n))-(n.clientLeft||0)}function lt(){const n=document.documentElement;return(window.pageYOffset||n.scrollTop)-(n.clientTop||0)}function at(n){return n?getComputedStyle(n).direction==="rtl":!1}function It(n,t,o=!0){var e,r,l,i;if(n){const a=n.offsetParent?{width:n.offsetWidth,height:n.offsetHeight}:_n(n),c=a.height,d=a.width,s=t.offsetHeight,p=t.offsetWidth,u=t.getBoundingClientRect(),b=lt(),h=it(),f=an();let m,$,x="top";u.top+s+c>f.height?(m=u.top+b-c,x="bottom",m<0&&(m=b)):m=s+u.top+b,u.left+d>f.width?$=Math.max(0,u.left+h+p-d):$=u.left+h,at(n)?n.style.insetInlineEnd=$+"px":n.style.insetInlineStart=$+"px",n.style.top=m+"px",n.style.transformOrigin=x,o&&(n.style.marginTop=x==="bottom"?`calc(${(r=(e=G(/-anchor-gutter$/))==null?void 0:e.value)!=null?r:"2px"} * -1)`:(i=(l=G(/-anchor-gutter$/))==null?void 0:l.value)!=null?i:"")}}function ct(n,t){n&&(typeof t=="string"?n.style.cssText=t:Object.entries(t||{}).forEach(([o,e])=>n.style[o]=e))}function dt(n,t){return n instanceof HTMLElement?n.offsetWidth:0}function jt(n,t,o=!0){var e,r,l,i;if(n){const a=n.offsetParent?{width:n.offsetWidth,height:n.offsetHeight}:_n(n),c=t.offsetHeight,d=t.getBoundingClientRect(),s=an();let p,u,b="top";d.top+c+a.height>s.height?(p=-1*a.height,b="bottom",d.top+p<0&&(p=-1*d.top)):p=c,a.width>s.width?u=d.left*-1:d.left+a.width>s.width?u=(d.left+a.width-s.width)*-1:u=0,n.style.top=p+"px",n.style.insetInlineStart=u+"px",n.style.transformOrigin=b,o&&(n.style.marginTop=b==="bottom"?`calc(${(r=(e=G(/-anchor-gutter$/))==null?void 0:e.value)!=null?r:"2px"} * -1)`:(i=(l=G(/-anchor-gutter$/))==null?void 0:l.value)!=null?i:"")}}function Sn(n){if(n){let t=n.parentNode;return t&&t instanceof ShadowRoot&&t.host&&(t=t.host),t}return null}function Wt(n){return!!(n!==null&&typeof n<"u"&&n.nodeName&&Sn(n))}function N(n){return typeof Element<"u"?n instanceof Element:n!==null&&typeof n=="object"&&n.nodeType===1&&typeof n.nodeName=="string"}var nn=void 0;function hn(n){{if(nn!=null)return nn;const t=document.createElement("div");ct(t,{width:"100px",height:"100px",overflow:"scroll",position:"absolute",top:"-9999px"}),document.body.appendChild(t);const o=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),nn=o,o}}function Vt(){if(window.getSelection){const n=window.getSelection()||{};n.empty?n.empty():n.removeAllRanges&&n.rangeCount>0&&n.getRangeAt(0).getClientRects().length>0&&n.removeAllRanges()}}function Cn(n,t={}){if(N(n)){const o=(e,r)=>{var l,i;const a=(l=n==null?void 0:n.$attrs)!=null&&l[e]?[(i=n==null?void 0:n.$attrs)==null?void 0:i[e]]:[];return[r].flat().reduce((c,d)=>{if(d!=null){const s=typeof d;if(s==="string"||s==="number")c.push(d);else if(s==="object"){const p=Array.isArray(d)?o(e,d):Object.entries(d).map(([u,b])=>e==="style"&&(b||b===0)?`${u.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${b}`:b?u:void 0);c=p.length?c.concat(p.filter(u=>!!u)):c}}return c},a)};Object.entries(t).forEach(([e,r])=>{if(r!=null){const l=e.match(/^on(.+)/);l?n.addEventListener(l[1].toLowerCase(),r):e==="p-bind"||e==="pBind"?Cn(n,r):(r=e==="class"?[...new Set(o("class",r))].join(" ").trim():e==="style"?o("style",r).join(";").trim():r,(n.$attrs=n.$attrs||{})&&(n.$attrs[e]=r),n.setAttribute(e,r))}})}}function Bt(n,t={},...o){if(n){const e=document.createElement(n);return Cn(e,t),e.append(...o),e}}function Ht(n,t){if(n){n.style.opacity="0";let o=+new Date,e="0";const r=function(){e=`${+n.style.opacity+(new Date().getTime()-o)/t}`,n.style.opacity=e,o=+new Date,+e<1&&("requestAnimationFrame"in window?requestAnimationFrame(r):setTimeout(r,16))};r()}}function st(n,t){return N(n)?Array.from(n.querySelectorAll(t)):[]}function ut(n,t){return N(n)?n.matches(t)?n:n.querySelector(t):null}function Kt(n,t){n&&document.activeElement!==n&&n.focus(t)}function Zt(n,t){if(N(n)){const o=n.getAttribute(t);return isNaN(o)?o==="true"||o==="false"?o==="true":o:+o}}function On(n,t=""){const o=st(n,`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`),e=[];for(const r of o)getComputedStyle(r).display!="none"&&getComputedStyle(r).visibility!="hidden"&&e.push(r);return e}function qt(n,t){const o=On(n,t);return o.length>0?o[0]:null}function Mt(n){if(n){let t=n.offsetHeight;const o=getComputedStyle(n);return t-=parseFloat(o.paddingTop)+parseFloat(o.paddingBottom)+parseFloat(o.borderTopWidth)+parseFloat(o.borderBottomWidth),t}return 0}function pt(n){if(n){n.style.visibility="hidden",n.style.display="block";const t=n.offsetHeight;return n.style.display="none",n.style.visibility="visible",t}return 0}function bt(n){if(n){n.style.visibility="hidden",n.style.display="block";const t=n.offsetWidth;return n.style.display="none",n.style.visibility="visible",t}return 0}function Yt(n,t){const o=On(n,t);return o.length>0?o[o.length-1]:null}function gt(n){if(n){const t=n.getBoundingClientRect();return{top:t.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:t.left+(window.pageXOffset||on(document.documentElement)||on(document.body)||0)}}return{top:"auto",left:"auto"}}function ht(n,t){return n?n.offsetHeight:0}function En(n,t=[]){const o=Sn(n);return o===null?t:En(o,t.concat([o]))}function Ut(n){const t=[];if(n){const o=En(n),e=/(auto|scroll)/,r=l=>{try{const i=window.getComputedStyle(l,null);return e.test(i.getPropertyValue("overflow"))||e.test(i.getPropertyValue("overflowX"))||e.test(i.getPropertyValue("overflowY"))}catch{return!1}};for(const l of o){const i=l.nodeType===1&&l.dataset.scrollselectors;if(i){const a=i.split(",");for(const c of a){const d=ut(l,c);d&&r(d)&&t.push(d)}}l.nodeType!==9&&r(l)&&t.push(l)}}return t}function Xt(){if(window.getSelection)return window.getSelection().toString();if(document.getSelection)return document.getSelection().toString()}function Jt(n){if(n){let t=n.offsetWidth;const o=getComputedStyle(n);return t-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight)+parseFloat(o.borderLeftWidth)+parseFloat(o.borderRightWidth),t}return 0}function Gt(){return/(android)/i.test(navigator.userAgent)}function Qt(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function no(n,t=""){return N(n)?n.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`):!1}function to(n){return!!(n&&n.offsetParent!=null)}function oo(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function eo(n,t){var o,e;if(n){const r=n.parentElement,l=gt(r),i=an(),a=n.offsetParent?n.offsetWidth:bt(n),c=n.offsetParent?n.offsetHeight:pt(n),d=dt((o=r==null?void 0:r.children)==null?void 0:o[0]),s=ht((e=r==null?void 0:r.children)==null?void 0:e[0]);let p="",u="";l.left+d+a>i.width-hn()?l.left<a?t%2===1?p=l.left?"-"+l.left+"px":"100%":t%2===0&&(p=i.width-a-hn()+"px"):p="-100%":p="100%",n.getBoundingClientRect().top+s+c>i.height?u=`-${c-s}px`:u="0px",n.style.top=u,n.style.insetInlineStart=p}}function ro(n,t="",o){N(n)&&o!==null&&o!==void 0&&n.setAttribute(t,o)}function mt(){const n=new Map;return{on(t,o){let e=n.get(t);return e?e.push(o):e=[o],n.set(t,e),this},off(t,o){const e=n.get(t);return e&&e.splice(e.indexOf(o)>>>0,1),this},emit(t,o){const e=n.get(t);e&&e.forEach(r=>{r(o)})},clear(){n.clear()}}}var ft=Object.defineProperty,mn=Object.getOwnPropertySymbols,$t=Object.prototype.hasOwnProperty,xt=Object.prototype.propertyIsEnumerable,fn=(n,t,o)=>t in n?ft(n,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[t]=o,vt=(n,t)=>{for(var o in t||(t={}))$t.call(t,o)&&fn(n,o,t[o]);if(mn)for(var o of mn(t))xt.call(t,o)&&fn(n,o,t[o]);return n};function cn(n){return n==null||n===""||Array.isArray(n)&&n.length===0||!(n instanceof Date)&&typeof n=="object"&&Object.keys(n).length===0}function en(n,t,o=new WeakSet){if(n===t)return!0;if(!n||!t||typeof n!="object"||typeof t!="object"||o.has(n)||o.has(t))return!1;o.add(n).add(t);const e=Array.isArray(n),r=Array.isArray(t);let l,i,a;if(e&&r){if(i=n.length,i!=t.length)return!1;for(l=i;l--!==0;)if(!en(n[l],t[l],o))return!1;return!0}if(e!=r)return!1;const c=n instanceof Date,d=t instanceof Date;if(c!=d)return!1;if(c&&d)return n.getTime()==t.getTime();const s=n instanceof RegExp,p=t instanceof RegExp;if(s!=p)return!1;if(s&&p)return n.toString()==t.toString();const u=Object.keys(n);if(i=u.length,i!==Object.keys(t).length)return!1;for(l=i;l--!==0;)if(!Object.prototype.hasOwnProperty.call(t,u[l]))return!1;for(l=i;l--!==0;)if(a=u[l],!en(n[a],t[a],o))return!1;return!0}function kt(n,t){return en(n,t)}function Rn(n){return typeof n=="function"&&"call"in n&&"apply"in n}function g(n){return!cn(n)}function $n(n,t){if(!n||!t)return null;try{const o=n[t];if(g(o))return o}catch{}if(Object.keys(n).length){if(Rn(t))return t(n);if(t.indexOf(".")===-1)return n[t];{const o=t.split(".");let e=n;for(let r=0,l=o.length;r<l;++r){if(e==null)return null;e=e[o[r]]}return e}}return null}function yt(n,t,o){return o?$n(n,o)===$n(t,o):kt(n,t)}function io(n,t){if(n!=null&&t&&t.length){for(const o of t)if(yt(n,o))return!0}return!1}function _(n,t=!0){return n instanceof Object&&n.constructor===Object&&(t||Object.keys(n).length!==0)}function Nn(n={},t={}){const o=vt({},n);return Object.keys(t).forEach(e=>{const r=e;_(t[r])&&r in n&&_(n[r])?o[r]=Nn(n[r],t[r]):o[r]=t[r]}),o}function wt(...n){return n.reduce((t,o,e)=>e===0?o:Nn(t,o),{})}function lo(n,t){let o=-1;if(g(n))try{o=n.findLastIndex(t)}catch{o=n.lastIndexOf([...n].reverse().find(t))}return o}function R(n,...t){return Rn(n)?n(...t):n}function S(n,t=!0){return typeof n=="string"&&(t||n!=="")}function xn(n){return S(n)?n.replace(/(-|_)/g,"").toLowerCase():n}function zt(n,t="",o={}){const e=xn(t).split("."),r=e.shift();if(r){if(_(n)){const l=Object.keys(n).find(i=>xn(i)===r)||"";return zt(R(n[l],o),e.join("."),o)}return}return R(n,o)}function Ln(n,t=!0){return Array.isArray(n)&&(t||n.length!==0)}function _t(n){return g(n)&&!isNaN(n)}function ao(n=""){return g(n)&&n.length===1&&!!n.match(/\S| /)}function z(n,t){if(t){const o=t.test(n);return t.lastIndex=0,o}return!1}function co(...n){return wt(...n)}function vn(n){return n&&n.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}function so(n){if(n&&/[\xC0-\xFF\u0100-\u017E]/.test(n)){const o={A:/[\xC0-\xC5\u0100\u0102\u0104]/g,AE:/[\xC6]/g,C:/[\xC7\u0106\u0108\u010A\u010C]/g,D:/[\xD0\u010E\u0110]/g,E:/[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,G:/[\u011C\u011E\u0120\u0122]/g,H:/[\u0124\u0126]/g,I:/[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,IJ:/[\u0132]/g,J:/[\u0134]/g,K:/[\u0136]/g,L:/[\u0139\u013B\u013D\u013F\u0141]/g,N:/[\xD1\u0143\u0145\u0147\u014A]/g,O:/[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,OE:/[\u0152]/g,R:/[\u0154\u0156\u0158]/g,S:/[\u015A\u015C\u015E\u0160]/g,T:/[\u0162\u0164\u0166]/g,U:/[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,W:/[\u0174]/g,Y:/[\xDD\u0176\u0178]/g,Z:/[\u0179\u017B\u017D]/g,a:/[\xE0-\xE5\u0101\u0103\u0105]/g,ae:/[\xE6]/g,c:/[\xE7\u0107\u0109\u010B\u010D]/g,d:/[\u010F\u0111]/g,e:/[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,g:/[\u011D\u011F\u0121\u0123]/g,i:/[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,ij:/[\u0133]/g,j:/[\u0135]/g,k:/[\u0137,\u0138]/g,l:/[\u013A\u013C\u013E\u0140\u0142]/g,n:/[\xF1\u0144\u0146\u0148\u014B]/g,p:/[\xFE]/g,o:/[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,oe:/[\u0153]/g,r:/[\u0155\u0157\u0159]/g,s:/[\u015B\u015D\u015F\u0161]/g,t:/[\u0163\u0165\u0167]/g,u:/[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,w:/[\u0175]/g,y:/[\xFD\xFF\u0177]/g,z:/[\u017A\u017C\u017E]/g};for(const e in o)n=n.replace(o[e],e)}return n}function uo(n){return S(n,!1)?n[0].toUpperCase()+n.slice(1):n}function An(n){return S(n)?n.replace(/(_)/g,"-").replace(/[A-Z]/g,(t,o)=>o===0?t:"-"+t.toLowerCase()).toLowerCase():n}function kn(n){return S(n)?n.replace(/[A-Z]/g,(t,o)=>o===0?t:"."+t.toLowerCase()).toLowerCase():n}var J={};function po(n="pui_id_"){return Object.hasOwn(J,n)||(J[n]=0),J[n]++,`${n}${J[n]}`}function St(){let n=[];const t=(i,a,c=999)=>{const d=r(i,a,c),s=d.value+(d.key===i?0:c)+1;return n.push({key:i,value:s}),s},o=i=>{n=n.filter(a=>a.value!==i)},e=(i,a)=>r(i).value,r=(i,a,c=0)=>[...n].reverse().find(d=>!0)||{key:i,value:c},l=i=>i&&parseInt(i.style.zIndex,10)||0;return{get:l,set:(i,a,c)=>{a&&(a.style.zIndex=String(t(i,!0,c)))},clear:i=>{i&&(o(l(i)),i.style.zIndex="")},getCurrent:i=>e(i)}}var bo=St(),Ct=Object.defineProperty,Ot=Object.defineProperties,Et=Object.getOwnPropertyDescriptors,Q=Object.getOwnPropertySymbols,Dn=Object.prototype.hasOwnProperty,Pn=Object.prototype.propertyIsEnumerable,yn=(n,t,o)=>t in n?Ct(n,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[t]=o,y=(n,t)=>{for(var o in t||(t={}))Dn.call(t,o)&&yn(n,o,t[o]);if(Q)for(var o of Q(t))Pn.call(t,o)&&yn(n,o,t[o]);return n},tn=(n,t)=>Ot(n,Et(t)),w=(n,t)=>{var o={};for(var e in n)Dn.call(n,e)&&t.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&Q)for(var e of Q(n))t.indexOf(e)<0&&Pn.call(n,e)&&(o[e]=n[e]);return o},Rt=mt(),O=Rt;function wn(n,t){Ln(n)?n.push(...t||[]):_(n)&&Object.assign(n,t)}function Nt(n){return _(n)&&n.hasOwnProperty("$value")&&n.hasOwnProperty("$type")?n.$value:n}function Lt(n){return n.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function rn(n="",t=""){return Lt(`${S(n,!1)&&S(t,!1)?`${n}-`:n}${t}`)}function Tn(n="",t=""){return`--${rn(n,t)}`}function At(n=""){const t=(n.match(/{/g)||[]).length,o=(n.match(/}/g)||[]).length;return(t+o)%2!==0}function Fn(n,t="",o="",e=[],r){if(S(n)){const l=/{([^}]*)}/g,i=n.trim();if(At(i))return;if(z(i,l)){const a=i.replaceAll(l,s=>{const u=s.replace(/{|}/g,"").split(".").filter(b=>!e.some(h=>z(b,h)));return`var(${Tn(o,An(u.join("-")))}${g(r)?`, ${r}`:""})`}),c=/(\d+\s+[\+\-\*\/]\s+\d+)/g,d=/var\([^)]+\)/g;return z(a.replace(d,"0"),c)?`calc(${a})`:a}return i}else if(_t(n))return n}function Dt(n,t,o){S(t,!1)&&n.push(`${t}:${o};`)}function E(n,t){return n?`${n}{${t}}`:""}var go=n=>{var t;const o=P.getTheme(),e=ln(o,n,void 0,"variable"),r=(t=e==null?void 0:e.match(/--[\w-]+/g))==null?void 0:t[0],l=ln(o,n,void 0,"value");return{name:r,variable:e,value:l}},zn=(...n)=>ln(P.getTheme(),...n),ln=(n={},t,o,e)=>{if(t){const{variable:r,options:l}=P.defaults||{},{prefix:i,transform:a}=(n==null?void 0:n.options)||l||{},d=z(t,/{([^}]*)}/g)?t:`{${t}}`;return e==="value"||cn(e)&&a==="strict"?P.getTokenValue(t):Fn(d,void 0,i,[r.excludedKeyRegex],o)}return""};function Pt(n,t={}){const o=P.defaults.variable,{prefix:e=o.prefix,selector:r=o.selector,excludedKeyRegex:l=o.excludedKeyRegex}=t,i=(d,s="")=>Object.entries(d).reduce((p,[u,b])=>{const h=z(u,l)?rn(s):rn(s,An(u)),f=Nt(b);if(_(f)){const{variables:m,tokens:$}=i(f,h);wn(p.tokens,$),wn(p.variables,m)}else p.tokens.push((e?h.replace(`${e}-`,""):h).replaceAll("-",".")),Dt(p.variables,Tn(h),Fn(f,h,e,[l]));return p},{variables:[],tokens:[]}),{variables:a,tokens:c}=i(n,e);return{value:a,tokens:c,declarations:a.join(""),css:E(r,a.join(""))}}var k={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(n){return{type:"class",selector:n,matched:this.pattern.test(n.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(n){return{type:"attr",selector:`:root${n}`,matched:this.pattern.test(n.trim())}}},media:{pattern:/^@media (.*)$/,resolve(n){return{type:"media",selector:`${n}{:root{[CSS]}}`,matched:this.pattern.test(n.trim())}}},system:{pattern:/^system$/,resolve(n){return{type:"system",selector:"@media (prefers-color-scheme: dark){:root{[CSS]}}",matched:this.pattern.test(n.trim())}}},custom:{resolve(n){return{type:"custom",selector:n,matched:!0}}}},resolve(n){const t=Object.keys(this.rules).filter(o=>o!=="custom").map(o=>this.rules[o]);return[n].flat().map(o=>{var e;return(e=t.map(r=>r.resolve(o)).find(r=>r.matched))!=null?e:this.rules.custom.resolve(o)})}},_toVariables(n,t){return Pt(n,{prefix:t==null?void 0:t.prefix})},getCommon({name:n="",theme:t={},params:o,set:e,defaults:r}){var l,i,a,c,d,s,p;const{preset:u,options:b}=t;let h,f,m,$,x,C,v;if(g(u)&&b.transform!=="strict"){const{primitive:T,semantic:F,extend:I}=u,L=F||{},{colorScheme:j}=L,W=w(L,["colorScheme"]),V=I||{},{colorScheme:B}=V,A=w(V,["colorScheme"]),D=j||{},{dark:H}=D,K=w(D,["dark"]),Z=B||{},{dark:q}=Z,M=w(Z,["dark"]),Y=g(T)?this._toVariables({primitive:T},b):{},U=g(W)?this._toVariables({semantic:W},b):{},X=g(K)?this._toVariables({light:K},b):{},dn=g(H)?this._toVariables({dark:H},b):{},sn=g(A)?this._toVariables({semantic:A},b):{},un=g(M)?this._toVariables({light:M},b):{},pn=g(q)?this._toVariables({dark:q},b):{},[In,jn]=[(l=Y.declarations)!=null?l:"",Y.tokens],[Wn,Vn]=[(i=U.declarations)!=null?i:"",U.tokens||[]],[Bn,Hn]=[(a=X.declarations)!=null?a:"",X.tokens||[]],[Kn,Zn]=[(c=dn.declarations)!=null?c:"",dn.tokens||[]],[qn,Mn]=[(d=sn.declarations)!=null?d:"",sn.tokens||[]],[Yn,Un]=[(s=un.declarations)!=null?s:"",un.tokens||[]],[Xn,Jn]=[(p=pn.declarations)!=null?p:"",pn.tokens||[]];h=this.transformCSS(n,In,"light","variable",b,e,r),f=jn;const Gn=this.transformCSS(n,`${Wn}${Bn}`,"light","variable",b,e,r),Qn=this.transformCSS(n,`${Kn}`,"dark","variable",b,e,r);m=`${Gn}${Qn}`,$=[...new Set([...Vn,...Hn,...Zn])];const nt=this.transformCSS(n,`${qn}${Yn}color-scheme:light`,"light","variable",b,e,r),tt=this.transformCSS(n,`${Xn}color-scheme:dark`,"dark","variable",b,e,r);x=`${nt}${tt}`,C=[...new Set([...Mn,...Un,...Jn])],v=R(u.css,{dt:zn})}return{primitive:{css:h,tokens:f},semantic:{css:m,tokens:$},global:{css:x,tokens:C},style:v}},getPreset({name:n="",preset:t={},options:o,params:e,set:r,defaults:l,selector:i}){var a,c,d;let s,p,u;if(g(t)&&o.transform!=="strict"){const b=n.replace("-directive",""),h=t,{colorScheme:f,extend:m,css:$}=h,x=w(h,["colorScheme","extend","css"]),C=m||{},{colorScheme:v}=C,T=w(C,["colorScheme"]),F=f||{},{dark:I}=F,L=w(F,["dark"]),j=v||{},{dark:W}=j,V=w(j,["dark"]),B=g(x)?this._toVariables({[b]:y(y({},x),T)},o):{},A=g(L)?this._toVariables({[b]:y(y({},L),V)},o):{},D=g(I)?this._toVariables({[b]:y(y({},I),W)},o):{},[H,K]=[(a=B.declarations)!=null?a:"",B.tokens||[]],[Z,q]=[(c=A.declarations)!=null?c:"",A.tokens||[]],[M,Y]=[(d=D.declarations)!=null?d:"",D.tokens||[]],U=this.transformCSS(b,`${H}${Z}`,"light","variable",o,r,l,i),X=this.transformCSS(b,M,"dark","variable",o,r,l,i);s=`${U}${X}`,p=[...new Set([...K,...q,...Y])],u=R($,{dt:zn})}return{css:s,tokens:p,style:u}},getPresetC({name:n="",theme:t={},params:o,set:e,defaults:r}){var l;const{preset:i,options:a}=t,c=(l=i==null?void 0:i.components)==null?void 0:l[n];return this.getPreset({name:n,preset:c,options:a,params:o,set:e,defaults:r})},getPresetD({name:n="",theme:t={},params:o,set:e,defaults:r}){var l,i;const a=n.replace("-directive",""),{preset:c,options:d}=t,s=((l=c==null?void 0:c.components)==null?void 0:l[a])||((i=c==null?void 0:c.directives)==null?void 0:i[a]);return this.getPreset({name:a,preset:s,options:d,params:o,set:e,defaults:r})},applyDarkColorScheme(n){return!(n.darkModeSelector==="none"||n.darkModeSelector===!1)},getColorSchemeOption(n,t){var o;return this.applyDarkColorScheme(n)?this.regex.resolve(n.darkModeSelector===!0?t.options.darkModeSelector:(o=n.darkModeSelector)!=null?o:t.options.darkModeSelector):[]},getLayerOrder(n,t={},o,e){const{cssLayer:r}=t;return r?`@layer ${R(r.order||"primeui",o)}`:""},getCommonStyleSheet({name:n="",theme:t={},params:o,props:e={},set:r,defaults:l}){const i=this.getCommon({name:n,theme:t,params:o,set:r,defaults:l}),a=Object.entries(e).reduce((c,[d,s])=>c.push(`${d}="${s}"`)&&c,[]).join(" ");return Object.entries(i||{}).reduce((c,[d,s])=>{if(s!=null&&s.css){const p=vn(s==null?void 0:s.css),u=`${d}-variables`;c.push(`<style type="text/css" data-primevue-style-id="${u}" ${a}>${p}</style>`)}return c},[]).join("")},getStyleSheet({name:n="",theme:t={},params:o,props:e={},set:r,defaults:l}){var i;const a={name:n,theme:t,params:o,set:r,defaults:l},c=(i=n.includes("-directive")?this.getPresetD(a):this.getPresetC(a))==null?void 0:i.css,d=Object.entries(e).reduce((s,[p,u])=>s.push(`${p}="${u}"`)&&s,[]).join(" ");return c?`<style type="text/css" data-primevue-style-id="${n}-variables" ${d}>${vn(c)}</style>`:""},createTokens(n={},t,o="",e="",r={}){return Object.entries(n).forEach(([l,i])=>{const a=z(l,t.variable.excludedKeyRegex)?o:o?`${o}.${kn(l)}`:kn(l),c=e?`${e}.${l}`:l;_(i)?this.createTokens(i,t,a,c,r):(r[a]||(r[a]={paths:[],computed(d,s={}){var p,u;return this.paths.length===1?(p=this.paths[0])==null?void 0:p.computed(this.paths[0].scheme,s.binding):d&&d!=="none"?(u=this.paths.find(b=>b.scheme===d))==null?void 0:u.computed(d,s.binding):this.paths.map(b=>b.computed(b.scheme,s[b.scheme]))}}),r[a].paths.push({path:c,value:i,scheme:c.includes("colorScheme.light")?"light":c.includes("colorScheme.dark")?"dark":"none",computed(d,s={}){const p=/{([^}]*)}/g;let u=i;if(s.name=this.path,s.binding||(s.binding={}),z(i,p)){const h=i.trim().replaceAll(p,$=>{var x;const C=$.replace(/{|}/g,""),v=(x=r[C])==null?void 0:x.computed(d,s);return Ln(v)&&v.length===2?`light-dark(${v[0].value},${v[1].value})`:v==null?void 0:v.value}),f=/(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g,m=/var\([^)]+\)/g;u=z(h.replace(m,"0"),f)?`calc(${h})`:h}return cn(s.binding)&&delete s.binding,{colorScheme:d,path:this.path,paths:s,value:u.includes("undefined")?void 0:u}}}))}),r},getTokenValue(n,t,o){var e;const l=(c=>c.split(".").filter(s=>!z(s.toLowerCase(),o.variable.excludedKeyRegex)).join("."))(t),i=t.includes("colorScheme.light")?"light":t.includes("colorScheme.dark")?"dark":void 0,a=[(e=n[l])==null?void 0:e.computed(i)].flat().filter(c=>c);return a.length===1?a[0].value:a.reduce((c={},d)=>{const s=d,{colorScheme:p}=s,u=w(s,["colorScheme"]);return c[p]=u,c},void 0)},getSelectorRule(n,t,o,e){return o==="class"||o==="attr"?E(g(t)?`${n}${t},${n} ${t}`:n,e):E(n,g(t)?E(t,e):e)},transformCSS(n,t,o,e,r={},l,i,a){if(g(t)){const{cssLayer:c}=r;if(e!=="style"){const d=this.getColorSchemeOption(r,i);t=o==="dark"?d.reduce((s,{type:p,selector:u})=>(g(u)&&(s+=u.includes("[CSS]")?u.replace("[CSS]",t):this.getSelectorRule(u,a,p,t)),s),""):E(a??":root",t)}if(c){const d={name:"primeui"};_(c)&&(d.name=R(c.name,{name:n,type:e})),g(d.name)&&(t=E(`@layer ${d.name}`,t),l==null||l.layerNames(d.name))}return t}return""}},P={defaults:{variable:{prefix:"p",selector:":root",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(n={}){const{theme:t}=n;t&&(this._theme=tn(y({},t),{options:y(y({},this.defaults.options),t.options)}),this._tokens=k.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var n;return((n=this.theme)==null?void 0:n.preset)||{}},get options(){var n;return((n=this.theme)==null?void 0:n.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(n){this.update({theme:n}),O.emit("theme:change",n)},getPreset(){return this.preset},setPreset(n){this._theme=tn(y({},this.theme),{preset:n}),this._tokens=k.createTokens(n,this.defaults),this.clearLoadedStyleNames(),O.emit("preset:change",n),O.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(n){this._theme=tn(y({},this.theme),{options:n}),this.clearLoadedStyleNames(),O.emit("options:change",n),O.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(n){this._layerNames.add(n)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(n){return this._loadedStyleNames.has(n)},setLoadedStyleName(n){this._loadedStyleNames.add(n)},deleteLoadedStyleName(n){this._loadedStyleNames.delete(n)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(n){return k.getTokenValue(this.tokens,n,this.defaults)},getCommon(n="",t){return k.getCommon({name:n,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(n="",t){const o={name:n,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return k.getPresetC(o)},getDirective(n="",t){const o={name:n,theme:this.theme,params:t,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return k.getPresetD(o)},getCustomPreset(n="",t,o,e){const r={name:n,preset:t,options:this.options,selector:o,params:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return k.getPreset(r)},getLayerOrderCSS(n=""){return k.getLayerOrder(n,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(n="",t,o="style",e){return k.transformCSS(n,t,e,o,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(n="",t,o={}){return k.getCommonStyleSheet({name:n,theme:this.theme,params:t,props:o,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(n,t,o={}){return k.getStyleSheet({name:n,theme:this.theme,params:t,props:o,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(n){this._loadingStyles.add(n)},onStyleUpdated(n){this._loadingStyles.add(n)},onStyleLoaded(n,{name:t}){this._loadingStyles.size&&(this._loadingStyles.delete(t),O.emit(`theme:${t}:load`,n),!this._loadingStyles.size&&O.emit("theme:load"))}},ho=({dt:n})=>`
*,
::before,
::after {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${n("disabled.opacity")};
}

.pi {
    font-size: ${n("icon.size")};
}

.p-icon {
    width: ${n("icon.size")};
    height: ${n("icon.size")};
}

.p-overlay-mask {
    background: ${n("mask.background")};
    color: ${n("mask.color")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${n("mask.transition.duration")} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${n("mask.transition.duration")} forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${n("mask.background")};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${n("mask.background")};
    }
    to {
        background: transparent;
    }
}
`,mo=({dt:n})=>`
.p-badge {
    display: inline-flex;
    border-radius: ${n("badge.border.radius")};
    align-items: center;
    justify-content: center;
    padding: ${n("badge.padding")};
    background: ${n("badge.primary.background")};
    color: ${n("badge.primary.color")};
    font-size: ${n("badge.font.size")};
    font-weight: ${n("badge.font.weight")};
    min-width: ${n("badge.min.width")};
    height: ${n("badge.height")};
}

.p-badge-dot {
    width: ${n("badge.dot.size")};
    min-width: ${n("badge.dot.size")};
    height: ${n("badge.dot.size")};
    border-radius: 50%;
    padding: 0;
}

.p-badge-circle {
    padding: 0;
    border-radius: 50%;
}

.p-badge-secondary {
    background: ${n("badge.secondary.background")};
    color: ${n("badge.secondary.color")};
}

.p-badge-success {
    background: ${n("badge.success.background")};
    color: ${n("badge.success.color")};
}

.p-badge-info {
    background: ${n("badge.info.background")};
    color: ${n("badge.info.color")};
}

.p-badge-warn {
    background: ${n("badge.warn.background")};
    color: ${n("badge.warn.color")};
}

.p-badge-danger {
    background: ${n("badge.danger.background")};
    color: ${n("badge.danger.color")};
}

.p-badge-contrast {
    background: ${n("badge.contrast.background")};
    color: ${n("badge.contrast.color")};
}

.p-badge-sm {
    font-size: ${n("badge.sm.font.size")};
    min-width: ${n("badge.sm.min.width")};
    height: ${n("badge.sm.height")};
}

.p-badge-lg {
    font-size: ${n("badge.lg.font.size")};
    min-width: ${n("badge.lg.min.width")};
    height: ${n("badge.lg.height")};
}

.p-badge-xl {
    font-size: ${n("badge.xl.font.size")};
    min-width: ${n("badge.xl.min.width")};
    height: ${n("badge.xl.height")};
}
`,fo=({dt:n})=>`
.p-ink {
    display: block;
    position: absolute;
    background: ${n("ripple.background")};
    border-radius: 100%;
    transform: scale(0);
    pointer-events: none;
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`,$o=({dt:n})=>`
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: ${n("button.primary.color")};
    background: ${n("button.primary.background")};
    border: 1px solid ${n("button.primary.border.color")};
    padding: ${n("button.padding.y")} ${n("button.padding.x")};
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background ${n("button.transition.duration")}, color ${n("button.transition.duration")}, border-color ${n("button.transition.duration")},
            outline-color ${n("button.transition.duration")}, box-shadow ${n("button.transition.duration")};
    border-radius: ${n("button.border.radius")};
    outline-color: transparent;
    gap: ${n("button.gap")};
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-right:dir(rtl) {
    order: -1;
}

.p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: ${n("button.icon.only.width")};
    padding-inline-start: 0;
    padding-inline-end: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: ${n("button.icon.only.width")};
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: ${n("button.sm.font.size")};
    padding: ${n("button.sm.padding.y")} ${n("button.sm.padding.x")};
}

.p-button-sm .p-button-icon {
    font-size: ${n("button.sm.font.size")};
}

.p-button-sm.p-button-icon-only {
    width: ${n("button.sm.icon.only.width")};
}

.p-button-sm.p-button-icon-only.p-button-rounded {
    height: ${n("button.sm.icon.only.width")};
}

.p-button-lg {
    font-size: ${n("button.lg.font.size")};
    padding: ${n("button.lg.padding.y")} ${n("button.lg.padding.x")};
}

.p-button-lg .p-button-icon {
    font-size: ${n("button.lg.font.size")};
}

.p-button-lg.p-button-icon-only {
    width: ${n("button.lg.icon.only.width")};
}

.p-button-lg.p-button-icon-only.p-button-rounded {
    height: ${n("button.lg.icon.only.width")};
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: ${n("button.label.font.weight")};
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: ${n("button.icon.only.width")};
}

.p-button:not(:disabled):hover {
    background: ${n("button.primary.hover.background")};
    border: 1px solid ${n("button.primary.hover.border.color")};
    color: ${n("button.primary.hover.color")};
}

.p-button:not(:disabled):active {
    background: ${n("button.primary.active.background")};
    border: 1px solid ${n("button.primary.active.border.color")};
    color: ${n("button.primary.active.color")};
}

.p-button:focus-visible {
    box-shadow: ${n("button.primary.focus.ring.shadow")};
    outline: ${n("button.focus.ring.width")} ${n("button.focus.ring.style")} ${n("button.primary.focus.ring.color")};
    outline-offset: ${n("button.focus.ring.offset")};
}

.p-button .p-badge {
    min-width: ${n("button.badge.size")};
    height: ${n("button.badge.size")};
    line-height: ${n("button.badge.size")};
}

.p-button-raised {
    box-shadow: ${n("button.raised.shadow")};
}

.p-button-rounded {
    border-radius: ${n("button.rounded.border.radius")};
}

.p-button-secondary {
    background: ${n("button.secondary.background")};
    border: 1px solid ${n("button.secondary.border.color")};
    color: ${n("button.secondary.color")};
}

.p-button-secondary:not(:disabled):hover {
    background: ${n("button.secondary.hover.background")};
    border: 1px solid ${n("button.secondary.hover.border.color")};
    color: ${n("button.secondary.hover.color")};
}

.p-button-secondary:not(:disabled):active {
    background: ${n("button.secondary.active.background")};
    border: 1px solid ${n("button.secondary.active.border.color")};
    color: ${n("button.secondary.active.color")};
}

.p-button-secondary:focus-visible {
    outline-color: ${n("button.secondary.focus.ring.color")};
    box-shadow: ${n("button.secondary.focus.ring.shadow")};
}

.p-button-success {
    background: ${n("button.success.background")};
    border: 1px solid ${n("button.success.border.color")};
    color: ${n("button.success.color")};
}

.p-button-success:not(:disabled):hover {
    background: ${n("button.success.hover.background")};
    border: 1px solid ${n("button.success.hover.border.color")};
    color: ${n("button.success.hover.color")};
}

.p-button-success:not(:disabled):active {
    background: ${n("button.success.active.background")};
    border: 1px solid ${n("button.success.active.border.color")};
    color: ${n("button.success.active.color")};
}

.p-button-success:focus-visible {
    outline-color: ${n("button.success.focus.ring.color")};
    box-shadow: ${n("button.success.focus.ring.shadow")};
}

.p-button-info {
    background: ${n("button.info.background")};
    border: 1px solid ${n("button.info.border.color")};
    color: ${n("button.info.color")};
}

.p-button-info:not(:disabled):hover {
    background: ${n("button.info.hover.background")};
    border: 1px solid ${n("button.info.hover.border.color")};
    color: ${n("button.info.hover.color")};
}

.p-button-info:not(:disabled):active {
    background: ${n("button.info.active.background")};
    border: 1px solid ${n("button.info.active.border.color")};
    color: ${n("button.info.active.color")};
}

.p-button-info:focus-visible {
    outline-color: ${n("button.info.focus.ring.color")};
    box-shadow: ${n("button.info.focus.ring.shadow")};
}

.p-button-warn {
    background: ${n("button.warn.background")};
    border: 1px solid ${n("button.warn.border.color")};
    color: ${n("button.warn.color")};
}

.p-button-warn:not(:disabled):hover {
    background: ${n("button.warn.hover.background")};
    border: 1px solid ${n("button.warn.hover.border.color")};
    color: ${n("button.warn.hover.color")};
}

.p-button-warn:not(:disabled):active {
    background: ${n("button.warn.active.background")};
    border: 1px solid ${n("button.warn.active.border.color")};
    color: ${n("button.warn.active.color")};
}

.p-button-warn:focus-visible {
    outline-color: ${n("button.warn.focus.ring.color")};
    box-shadow: ${n("button.warn.focus.ring.shadow")};
}

.p-button-help {
    background: ${n("button.help.background")};
    border: 1px solid ${n("button.help.border.color")};
    color: ${n("button.help.color")};
}

.p-button-help:not(:disabled):hover {
    background: ${n("button.help.hover.background")};
    border: 1px solid ${n("button.help.hover.border.color")};
    color: ${n("button.help.hover.color")};
}

.p-button-help:not(:disabled):active {
    background: ${n("button.help.active.background")};
    border: 1px solid ${n("button.help.active.border.color")};
    color: ${n("button.help.active.color")};
}

.p-button-help:focus-visible {
    outline-color: ${n("button.help.focus.ring.color")};
    box-shadow: ${n("button.help.focus.ring.shadow")};
}

.p-button-danger {
    background: ${n("button.danger.background")};
    border: 1px solid ${n("button.danger.border.color")};
    color: ${n("button.danger.color")};
}

.p-button-danger:not(:disabled):hover {
    background: ${n("button.danger.hover.background")};
    border: 1px solid ${n("button.danger.hover.border.color")};
    color: ${n("button.danger.hover.color")};
}

.p-button-danger:not(:disabled):active {
    background: ${n("button.danger.active.background")};
    border: 1px solid ${n("button.danger.active.border.color")};
    color: ${n("button.danger.active.color")};
}

.p-button-danger:focus-visible {
    outline-color: ${n("button.danger.focus.ring.color")};
    box-shadow: ${n("button.danger.focus.ring.shadow")};
}

.p-button-contrast {
    background: ${n("button.contrast.background")};
    border: 1px solid ${n("button.contrast.border.color")};
    color: ${n("button.contrast.color")};
}

.p-button-contrast:not(:disabled):hover {
    background: ${n("button.contrast.hover.background")};
    border: 1px solid ${n("button.contrast.hover.border.color")};
    color: ${n("button.contrast.hover.color")};
}

.p-button-contrast:not(:disabled):active {
    background: ${n("button.contrast.active.background")};
    border: 1px solid ${n("button.contrast.active.border.color")};
    color: ${n("button.contrast.active.color")};
}

.p-button-contrast:focus-visible {
    outline-color: ${n("button.contrast.focus.ring.color")};
    box-shadow: ${n("button.contrast.focus.ring.shadow")};
}

.p-button-outlined {
    background: transparent;
    border-color: ${n("button.outlined.primary.border.color")};
    color: ${n("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):hover {
    background: ${n("button.outlined.primary.hover.background")};
    border-color: ${n("button.outlined.primary.border.color")};
    color: ${n("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):active {
    background: ${n("button.outlined.primary.active.background")};
    border-color: ${n("button.outlined.primary.border.color")};
    color: ${n("button.outlined.primary.color")};
}

.p-button-outlined.p-button-secondary {
    border-color: ${n("button.outlined.secondary.border.color")};
    color: ${n("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: ${n("button.outlined.secondary.hover.background")};
    border-color: ${n("button.outlined.secondary.border.color")};
    color: ${n("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: ${n("button.outlined.secondary.active.background")};
    border-color: ${n("button.outlined.secondary.border.color")};
    color: ${n("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-success {
    border-color: ${n("button.outlined.success.border.color")};
    color: ${n("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: ${n("button.outlined.success.hover.background")};
    border-color: ${n("button.outlined.success.border.color")};
    color: ${n("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: ${n("button.outlined.success.active.background")};
    border-color: ${n("button.outlined.success.border.color")};
    color: ${n("button.outlined.success.color")};
}

.p-button-outlined.p-button-info {
    border-color: ${n("button.outlined.info.border.color")};
    color: ${n("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: ${n("button.outlined.info.hover.background")};
    border-color: ${n("button.outlined.info.border.color")};
    color: ${n("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: ${n("button.outlined.info.active.background")};
    border-color: ${n("button.outlined.info.border.color")};
    color: ${n("button.outlined.info.color")};
}

.p-button-outlined.p-button-warn {
    border-color: ${n("button.outlined.warn.border.color")};
    color: ${n("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: ${n("button.outlined.warn.hover.background")};
    border-color: ${n("button.outlined.warn.border.color")};
    color: ${n("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: ${n("button.outlined.warn.active.background")};
    border-color: ${n("button.outlined.warn.border.color")};
    color: ${n("button.outlined.warn.color")};
}

.p-button-outlined.p-button-help {
    border-color: ${n("button.outlined.help.border.color")};
    color: ${n("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: ${n("button.outlined.help.hover.background")};
    border-color: ${n("button.outlined.help.border.color")};
    color: ${n("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: ${n("button.outlined.help.active.background")};
    border-color: ${n("button.outlined.help.border.color")};
    color: ${n("button.outlined.help.color")};
}

.p-button-outlined.p-button-danger {
    border-color: ${n("button.outlined.danger.border.color")};
    color: ${n("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: ${n("button.outlined.danger.hover.background")};
    border-color: ${n("button.outlined.danger.border.color")};
    color: ${n("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: ${n("button.outlined.danger.active.background")};
    border-color: ${n("button.outlined.danger.border.color")};
    color: ${n("button.outlined.danger.color")};
}

.p-button-outlined.p-button-contrast {
    border-color: ${n("button.outlined.contrast.border.color")};
    color: ${n("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: ${n("button.outlined.contrast.hover.background")};
    border-color: ${n("button.outlined.contrast.border.color")};
    color: ${n("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: ${n("button.outlined.contrast.active.background")};
    border-color: ${n("button.outlined.contrast.border.color")};
    color: ${n("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-plain {
    border-color: ${n("button.outlined.plain.border.color")};
    color: ${n("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: ${n("button.outlined.plain.hover.background")};
    border-color: ${n("button.outlined.plain.border.color")};
    color: ${n("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: ${n("button.outlined.plain.active.background")};
    border-color: ${n("button.outlined.plain.border.color")};
    color: ${n("button.outlined.plain.color")};
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.primary.color")};
}

.p-button-text:not(:disabled):hover {
    background: ${n("button.text.primary.hover.background")};
    border-color: transparent;
    color: ${n("button.text.primary.color")};
}

.p-button-text:not(:disabled):active {
    background: ${n("button.text.primary.active.background")};
    border-color: transparent;
    color: ${n("button.text.primary.color")};
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: ${n("button.text.secondary.hover.background")};
    border-color: transparent;
    color: ${n("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: ${n("button.text.secondary.active.background")};
    border-color: transparent;
    color: ${n("button.text.secondary.color")};
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: ${n("button.text.success.hover.background")};
    border-color: transparent;
    color: ${n("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):active {
    background: ${n("button.text.success.active.background")};
    border-color: transparent;
    color: ${n("button.text.success.color")};
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: ${n("button.text.info.hover.background")};
    border-color: transparent;
    color: ${n("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):active {
    background: ${n("button.text.info.active.background")};
    border-color: transparent;
    color: ${n("button.text.info.color")};
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: ${n("button.text.warn.hover.background")};
    border-color: transparent;
    color: ${n("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: ${n("button.text.warn.active.background")};
    border-color: transparent;
    color: ${n("button.text.warn.color")};
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: ${n("button.text.help.hover.background")};
    border-color: transparent;
    color: ${n("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):active {
    background: ${n("button.text.help.active.background")};
    border-color: transparent;
    color: ${n("button.text.help.color")};
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: ${n("button.text.danger.hover.background")};
    border-color: transparent;
    color: ${n("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: ${n("button.text.danger.active.background")};
    border-color: transparent;
    color: ${n("button.text.danger.color")};
}

.p-button-text.p-button-contrast {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):hover {
    background: ${n("button.text.contrast.hover.background")};
    border-color: transparent;
    color: ${n("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):active {
    background: ${n("button.text.contrast.active.background")};
    border-color: transparent;
    color: ${n("button.text.contrast.color")};
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: ${n("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: ${n("button.text.plain.hover.background")};
    border-color: transparent;
    color: ${n("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: ${n("button.text.plain.active.background")};
    border-color: transparent;
    color: ${n("button.text.plain.color")};
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: ${n("button.link.color")};
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: ${n("button.link.hover.color")};
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: ${n("button.link.active.color")};
}
`,xo=({dt:n})=>`
.p-tooltip {
    position: absolute;
    display: none;
    max-width: ${n("tooltip.max.width")};
}

.p-tooltip-right,
.p-tooltip-left {
    padding: 0 ${n("tooltip.gutter")};
}

.p-tooltip-top,
.p-tooltip-bottom {
    padding: ${n("tooltip.gutter")} 0;
}

.p-tooltip-text {
    white-space: pre-line;
    word-break: break-word;
    background: ${n("tooltip.background")};
    color: ${n("tooltip.color")};
    padding: ${n("tooltip.padding")};
    box-shadow: ${n("tooltip.shadow")};
    border-radius: ${n("tooltip.border.radius")};
}

.p-tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
}

.p-tooltip-right .p-tooltip-arrow {
    margin-top: calc(-1 * ${n("tooltip.gutter")});
    border-width: ${n("tooltip.gutter")} ${n("tooltip.gutter")} ${n("tooltip.gutter")} 0;
    border-right-color: ${n("tooltip.background")};
}

.p-tooltip-left .p-tooltip-arrow {
    margin-top: calc(-1 * ${n("tooltip.gutter")});
    border-width: ${n("tooltip.gutter")} 0 ${n("tooltip.gutter")} ${n("tooltip.gutter")};
    border-left-color: ${n("tooltip.background")};
}

.p-tooltip-top .p-tooltip-arrow {
    margin-left: calc(-1 * ${n("tooltip.gutter")});
    border-width: ${n("tooltip.gutter")} ${n("tooltip.gutter")} 0 ${n("tooltip.gutter")};
    border-top-color: ${n("tooltip.background")};
    border-bottom-color: ${n("tooltip.background")};
}

.p-tooltip-bottom .p-tooltip-arrow {
    margin-left: calc(-1 * ${n("tooltip.gutter")});
    border-width: 0 ${n("tooltip.gutter")} ${n("tooltip.gutter")} ${n("tooltip.gutter")};
    border-top-color: ${n("tooltip.background")};
    border-bottom-color: ${n("tooltip.background")};
}
`,vo=({dt:n})=>`
.p-iconfield {
    position: relative;
}

.p-inputicon {
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * (${n("icon.size")} / 2));
    color: ${n("iconfield.icon.color")};
    line-height: 1;
    z-index: 1;
}

.p-iconfield .p-inputicon:first-child {
    inset-inline-start: ${n("form.field.padding.x")};
}

.p-iconfield .p-inputicon:last-child {
    inset-inline-end: ${n("form.field.padding.x")};
}

.p-iconfield .p-inputtext:not(:first-child),
.p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
    padding-inline-start: calc((${n("form.field.padding.x")} * 2) + ${n("icon.size")});
}

.p-iconfield .p-inputtext:not(:last-child) {
    padding-inline-end: calc((${n("form.field.padding.x")} * 2) + ${n("icon.size")});
}

.p-iconfield:has(.p-inputfield-sm) .p-inputicon {
    font-size: ${n("form.field.sm.font.size")};
    width: ${n("form.field.sm.font.size")};
    height: ${n("form.field.sm.font.size")};
    margin-top: calc(-1 * (${n("form.field.sm.font.size")} / 2));
}

.p-iconfield:has(.p-inputfield-lg) .p-inputicon {
    font-size: ${n("form.field.lg.font.size")};
    width: ${n("form.field.lg.font.size")};
    height: ${n("form.field.lg.font.size")};
    margin-top: calc(-1 * (${n("form.field.lg.font.size")} / 2));
}
`,ko=({dt:n})=>`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${n("inputtext.color")};
    background: ${n("inputtext.background")};
    padding-block: ${n("inputtext.padding.y")};
    padding-inline: ${n("inputtext.padding.x")};
    border: 1px solid ${n("inputtext.border.color")};
    transition: background ${n("inputtext.transition.duration")}, color ${n("inputtext.transition.duration")}, border-color ${n("inputtext.transition.duration")}, outline-color ${n("inputtext.transition.duration")}, box-shadow ${n("inputtext.transition.duration")};
    appearance: none;
    border-radius: ${n("inputtext.border.radius")};
    outline-color: transparent;
    box-shadow: ${n("inputtext.shadow")};
}

.p-inputtext:enabled:hover {
    border-color: ${n("inputtext.hover.border.color")};
}

.p-inputtext:enabled:focus {
    border-color: ${n("inputtext.focus.border.color")};
    box-shadow: ${n("inputtext.focus.ring.shadow")};
    outline: ${n("inputtext.focus.ring.width")} ${n("inputtext.focus.ring.style")} ${n("inputtext.focus.ring.color")};
    outline-offset: ${n("inputtext.focus.ring.offset")};
}

.p-inputtext.p-invalid {
    border-color: ${n("inputtext.invalid.border.color")};
}

.p-inputtext.p-variant-filled {
    background: ${n("inputtext.filled.background")};
}

.p-inputtext.p-variant-filled:enabled:hover {
    background: ${n("inputtext.filled.hover.background")};
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: ${n("inputtext.filled.focus.background")};
}

.p-inputtext:disabled {
    opacity: 1;
    background: ${n("inputtext.disabled.background")};
    color: ${n("inputtext.disabled.color")};
}

.p-inputtext::placeholder {
    color: ${n("inputtext.placeholder.color")};
}

.p-inputtext.p-invalid::placeholder {
    color: ${n("inputtext.invalid.placeholder.color")};
}

.p-inputtext-sm {
    font-size: ${n("inputtext.sm.font.size")};
    padding-block: ${n("inputtext.sm.padding.y")};
    padding-inline: ${n("inputtext.sm.padding.x")};
}

.p-inputtext-lg {
    font-size: ${n("inputtext.lg.font.size")};
    padding-block: ${n("inputtext.lg.padding.y")};
    padding-inline: ${n("inputtext.lg.padding.x")};
}

.p-inputtext-fluid {
    width: 100%;
}
`,yo=({dt:n})=>`
.p-virtualscroller-loader {
    background: ${n("virtualscroller.loader.mask.background")};
    color: ${n("virtualscroller.loader.mask.color")};
}

.p-virtualscroller-loading-icon {
    font-size: ${n("virtualscroller.loader.icon.size")};
    width: ${n("virtualscroller.loader.icon.size")};
    height: ${n("virtualscroller.loader.icon.size")};
}
`,wo=({dt:n})=>`
.p-listbox {
    background: ${n("listbox.background")};
    color: ${n("listbox.color")};
    border: 1px solid ${n("listbox.border.color")};
    border-radius: ${n("listbox.border.radius")};
    transition: background ${n("listbox.transition.duration")}, color ${n("listbox.transition.duration")}, border-color ${n("listbox.transition.duration")},
            box-shadow ${n("listbox.transition.duration")}, outline-color ${n("listbox.transition.duration")};
    outline-color: transparent;
    box-shadow: ${n("listbox.shadow")};
}

.p-listbox.p-disabled {
    opacity: 1;
    background: ${n("listbox.disabled.background")};
    color: ${n("listbox.disabled.color")};
}

.p-listbox.p-disabled .p-listbox-option {
    color: ${n("listbox.disabled.color")};
}

.p-listbox.p-invalid {
    border-color: ${n("listbox.invalid.border.color")};
}

.p-listbox-header {
    padding: ${n("listbox.list.header.padding")};
}

.p-listbox-filter {
    width: 100%;
}

.p-listbox-list-container {
    overflow: auto;
}

.p-listbox-list {
    list-style-type: none;
    margin: 0;
    padding: ${n("listbox.list.padding")};
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: ${n("listbox.list.gap")};
}

.p-listbox-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: ${n("listbox.option.padding")};
    border: 0 none;
    border-radius: ${n("listbox.option.border.radius")};
    color: ${n("listbox.option.color")};
    transition: background ${n("listbox.transition.duration")}, color ${n("listbox.transition.duration")}, border-color ${n("listbox.transition.duration")},
            box-shadow ${n("listbox.transition.duration")}, outline-color ${n("listbox.transition.duration")};
}

.p-listbox-striped li:nth-child(even of .p-listbox-option) {
    background: ${n("listbox.option.striped.background")};
}

.p-listbox .p-listbox-list .p-listbox-option.p-listbox-option-selected {
    background: ${n("listbox.option.selected.background")};
    color: ${n("listbox.option.selected.color")};
}

.p-listbox:not(.p-disabled) .p-listbox-option.p-listbox-option-selected.p-focus {
    background: ${n("listbox.option.selected.focus.background")};
    color: ${n("listbox.option.selected.focus.color")};
}

.p-listbox:not(.p-disabled) .p-listbox-option:not(.p-listbox-option-selected):not(.p-disabled).p-focus {
    background: ${n("listbox.option.focus.background")};
    color: ${n("listbox.option.focus.color")};
}

.p-listbox:not(.p-disabled) .p-listbox-option:not(.p-listbox-option-selected):not(.p-disabled):hover {
    background: ${n("listbox.option.focus.background")};
    color: ${n("listbox.option.focus.color")};
}

.p-listbox-option-blank-icon {
    flex-shrink: 0;
}

.p-listbox-option-check-icon {
    position: relative;
    flex-shrink: 0;
    margin-inline-start: ${n("listbox.checkmark.gutter.start")};
    margin-inline-end: ${n("listbox.checkmark.gutter.end")};
    color: ${n("listbox.checkmark.color")};
}

.p-listbox-option-group {
    margin: 0;
    padding: ${n("listbox.option.group.padding")};
    color: ${n("listbox.option.group.color")};
    background: ${n("listbox.option.group.background")};
    font-weight: ${n("listbox.option.group.font.weight")};
}

.p-listbox-empty-message {
    padding: ${n("listbox.empty.message.padding")};
}
`,zo=({dt:n})=>`
.p-inputnumber {
    display: inline-flex;
    position: relative;
}

.p-inputnumber-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    cursor: pointer;
    background: ${n("inputnumber.button.background")};
    color: ${n("inputnumber.button.color")};
    width: ${n("inputnumber.button.width")};
    transition: background ${n("inputnumber.transition.duration")}, color ${n("inputnumber.transition.duration")}, border-color ${n("inputnumber.transition.duration")}, outline-color ${n("inputnumber.transition.duration")};
}

.p-inputnumber-button:disabled {
    cursor: auto;
}

.p-inputnumber-button:not(:disabled):hover {
    background: ${n("inputnumber.button.hover.background")};
    color: ${n("inputnumber.button.hover.color")};
}

.p-inputnumber-button:not(:disabled):active {
    background: ${n("inputnumber.button.active.background")};
    color: ${n("inputnumber.button.active.color")};
}

.p-inputnumber-stacked .p-inputnumber-button {
    position: relative;
    border: 0 none;
}

.p-inputnumber-stacked .p-inputnumber-button-group {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset-block-start: 1px;
    inset-inline-end: 1px;
    height: calc(100% - 2px);
    z-index: 1;
}

.p-inputnumber-stacked .p-inputnumber-increment-button {
    padding: 0;
    border-start-end-radius: calc(${n("inputnumber.button.border.radius")} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-decrement-button {
    padding: 0;
    border-end-end-radius: calc(${n("inputnumber.button.border.radius")} - 1px);
}

.p-inputnumber-stacked .p-inputnumber-button {
    flex: 1 1 auto;
    border: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-button {
    border: 1px solid ${n("inputnumber.button.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-button:hover {
    border-color: ${n("inputnumber.button.hover.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-button:active {
    border-color: ${n("inputnumber.button.active.border.color")};
}

.p-inputnumber-horizontal .p-inputnumber-increment-button {
    order: 3;
    border-start-end-radius: ${n("inputnumber.button.border.radius")};
    border-end-end-radius: ${n("inputnumber.button.border.radius")};
    border-inline-start: 0 none;
}

.p-inputnumber-horizontal .p-inputnumber-input {
    order: 2;
    border-radius: 0;
}

.p-inputnumber-horizontal .p-inputnumber-decrement-button {
    order: 1;
    border-start-start-radius: ${n("inputnumber.button.border.radius")};
    border-end-start-radius: ${n("inputnumber.button.border.radius")};
    border-inline-end: 0 none;
}

.p-floatlabel:has(.p-inputnumber-horizontal) label {
    margin-inline-start: ${n("inputnumber.button.width")};
}

.p-inputnumber-vertical {
    flex-direction: column;
}

.p-inputnumber-vertical .p-inputnumber-button {
    border: 1px solid ${n("inputnumber.button.border.color")};
    padding: ${n("inputnumber.button.vertical.padding")};
}

.p-inputnumber-vertical .p-inputnumber-button:hover {
    border-color: ${n("inputnumber.button.hover.border.color")};
}

.p-inputnumber-vertical .p-inputnumber-button:active {
    border-color: ${n("inputnumber.button.active.border.color")};
}

.p-inputnumber-vertical .p-inputnumber-increment-button {
    order: 1;
    border-start-start-radius: ${n("inputnumber.button.border.radius")};
    border-start-end-radius: ${n("inputnumber.button.border.radius")};
    width: 100%;
    border-block-end: 0 none;
}

.p-inputnumber-vertical .p-inputnumber-input {
    order: 2;
    border-radius: 0;
    text-align: center;
}

.p-inputnumber-vertical .p-inputnumber-decrement-button {
    order: 3;
    border-end-start-radius: ${n("inputnumber.button.border.radius")};
    border-end-end-radius: ${n("inputnumber.button.border.radius")};
    width: 100%;
    border-block-start: 0 none;
}

.p-inputnumber-input {
    flex: 1 1 auto;
}

.p-inputnumber-fluid {
    width: 100%;
}

.p-inputnumber-fluid .p-inputnumber-input {
    width: 1%;
}

.p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
    width: 100%;
}

.p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
    font-size: ${n("form.field.sm.font.size")};
    width: ${n("form.field.sm.font.size")};
    height: ${n("form.field.sm.font.size")};
}

.p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
    font-size: ${n("form.field.lg.font.size")};
    width: ${n("form.field.lg.font.size")};
    height: ${n("form.field.lg.font.size")};
}
`,_o=({dt:n})=>`
.p-colorpicker {
    display: inline-block;
    position: relative;
}

.p-colorpicker-dragging {
    cursor: pointer;
}

.p-colorpicker-preview {
    width: ${n("colorpicker.preview.width")};
    height: ${n("colorpicker.preview.height")};
    padding: 0;
    border: 0 none;
    border-radius: ${n("colorpicker.preview.border.radius")};
    transition: background ${n("colorpicker.transition.duration")}, color ${n("colorpicker.transition.duration")}, border-color ${n("colorpicker.transition.duration")}, outline-color ${n("colorpicker.transition.duration")}, box-shadow ${n("colorpicker.transition.duration")};
    outline-color: transparent;
    cursor: pointer;
}

.p-colorpicker-preview:enabled:focus-visible {
    border-color: ${n("colorpicker.preview.focus.border.color")};
    box-shadow: ${n("colorpicker.preview.focus.ring.shadow")};
    outline: ${n("colorpicker.preview.focus.ring.width")} ${n("colorpicker.preview.focus.ring.style")} ${n("colorpicker.preview.focus.ring.color")};
    outline-offset: ${n("colorpicker.preview.focus.ring.offset")};
}

.p-colorpicker-panel {
    background: ${n("colorpicker.panel.background")};
    border: 1px solid ${n("colorpicker.panel.border.color")};
    border-radius: ${n("colorpicker.panel.border.radius")};
    box-shadow: ${n("colorpicker.panel.shadow")};
    width: 193px;
    height: 166px;
    position: absolute;
    top: 0;
    left: 0;
}

.p-colorpicker-panel-inline {
    box-shadow: none;
    position: static;
}

.p-colorpicker-content {
    position: relative;
}

.p-colorpicker-color-selector {
    width: 150px;
    height: 150px;
    inset-block-start: 8px;
    inset-inline-start: 8px;
    position: absolute;
}

.p-colorpicker-color-background {
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

.p-colorpicker-color-handle {
    position: absolute;
    inset-block-start: 0px;
    inset-inline-start: 150px;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    border-width: 1px;
    border-style: solid;
    margin: -5px 0 0 -5px;
    cursor: pointer;
    opacity: 0.85;
    border-color: ${n("colorpicker.handle.color")};
}

.p-colorpicker-hue {
    width: 17px;
    height: 150px;
    inset-block-start: 8px;
    inset-inline-start: 167px;
    position: absolute;
    opacity: 0.85;
    background: linear-gradient(0deg,
        red 0,
        #ff0 17%,
        #0f0 33%,
        #0ff 50%,
        #00f 67%,
        #f0f 83%,
        red);
}

.p-colorpicker-hue-handle {
    position: absolute;
    inset-block-start: 150px;
    inset-inline-start: 0px;
    width: 21px;
    margin-inline-start: -2px;
    margin-block-start: -5px;
    height: 10px;
    border-width: 2px;
    border-style: solid;
    opacity: 0.85;
    cursor: pointer;
    border-color: ${n("colorpicker.handle.color")};
}
`,So=({dt:n})=>`
.p-contextmenu {
    background: ${n("contextmenu.background")};
    color: ${n("contextmenu.color")};
    border: 1px solid ${n("contextmenu.border.color")};
    border-radius: ${n("contextmenu.border.radius")};
    box-shadow: ${n("contextmenu.shadow")};
    min-width: 12.5rem;
}

.p-contextmenu-root-list,
.p-contextmenu-submenu {
    margin: 0;
    padding: ${n("contextmenu.list.padding")};
    list-style: none;
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: ${n("contextmenu.list.gap")};
}

.p-contextmenu-submenu {
    position: absolute;
    display: flex;
    flex-direction: column;
    min-width: 100%;
    z-index: 1;
    background: ${n("contextmenu.background")};
    color: ${n("contextmenu.color")};
    border: 1px solid ${n("contextmenu.border.color")};
    border-radius: ${n("contextmenu.border.radius")};
    box-shadow: ${n("contextmenu.shadow")};
}

.p-contextmenu-item {
    position: relative;
}

.p-contextmenu-item-content {
    transition: background ${n("contextmenu.transition.duration")}, color ${n("contextmenu.transition.duration")};
    border-radius: ${n("contextmenu.item.border.radius")};
    color: ${n("contextmenu.item.color")};
}

.p-contextmenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${n("contextmenu.item.padding")};
    gap: ${n("contextmenu.item.gap")};
    user-select: none;
}

.p-contextmenu-item-label {
    line-height: 1;
}

.p-contextmenu-item-icon {
    color: ${n("contextmenu.item.icon.color")};
}

.p-contextmenu-submenu-icon {
    color: ${n("contextmenu.submenu.icon.color")};
    margin-left: auto;
    font-size: ${n("contextmenu.submenu.icon.size")};
    width: ${n("contextmenu.submenu.icon.size")};
    height: ${n("contextmenu.submenu.icon.size")};
}

.p-contextmenu-submenu-icon:dir(rtl) {
    margin-left: 0;
    margin-right: auto;
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content {
    color: ${n("contextmenu.item.focus.color")};
    background: ${n("contextmenu.item.focus.background")};
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-item-icon {
    color: ${n("contextmenu.item.icon.focus.color")};
}

.p-contextmenu-item.p-focus > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
    color: ${n("contextmenu.submenu.icon.focus.color")};
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover {
    color: ${n("contextmenu.item.focus.color")};
    background: ${n("contextmenu.item.focus.background")};
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-item-icon {
    color: ${n("contextmenu.item.icon.focus.color")};
}

.p-contextmenu-item:not(.p-disabled) > .p-contextmenu-item-content:hover .p-contextmenu-submenu-icon {
    color: ${n("contextmenu.submenu.icon.focus.color")};
}

.p-contextmenu-item-active > .p-contextmenu-item-content {
    color: ${n("contextmenu.item.active.color")};
    background: ${n("contextmenu.item.active.background")};
}

.p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-item-icon {
    color: ${n("contextmenu.item.icon.active.color")};
}

.p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
    color: ${n("contextmenu.submenu.icon.active.color")};
}

.p-contextmenu-separator {
    border-block-start: 1px solid ${n("contextmenu.separator.border.color")};
}

.p-contextmenu-enter-from,
.p-contextmenu-leave-active {
    opacity: 0;
}

.p-contextmenu-enter-active {
    transition: opacity 250ms;
}

.p-contextmenu-mobile .p-contextmenu-submenu {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-inline-start: ${n("tieredmenu.submenu.mobile.indent")};
    padding-inline-end: 0;
}

.p-contextmenu-mobile .p-contextmenu-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-contextmenu-mobile .p-contextmenu-item-active > .p-contextmenu-item-content .p-contextmenu-submenu-icon {
    transform: rotate(-90deg);
}
`,Co=({dt:n})=>`
.p-tieredmenu {
    background: ${n("tieredmenu.background")};
    color: ${n("tieredmenu.color")};
    border: 1px solid ${n("tieredmenu.border.color")};
    border-radius: ${n("tieredmenu.border.radius")};
    min-width: 12.5rem;
}

.p-tieredmenu-root-list,
.p-tieredmenu-submenu {
    margin: 0;
    padding: ${n("tieredmenu.list.padding")};
    list-style: none;
    outline: 0 none;
    display: flex;
    flex-direction: column;
    gap: ${n("tieredmenu.list.gap")};
}

.p-tieredmenu-submenu {
    position: absolute;
    min-width: 100%;
    z-index: 1;
    background: ${n("tieredmenu.background")};
    color: ${n("tieredmenu.color")};
    border: 1px solid ${n("tieredmenu.border.color")};
    border-radius: ${n("tieredmenu.border.radius")};
    box-shadow: ${n("tieredmenu.shadow")};
}

.p-tieredmenu-item {
    position: relative;
}

.p-tieredmenu-item-content {
    transition: background ${n("tieredmenu.transition.duration")}, color ${n("tieredmenu.transition.duration")};
    border-radius: ${n("tieredmenu.item.border.radius")};
    color: ${n("tieredmenu.item.color")};
}

.p-tieredmenu-item-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    color: inherit;
    padding: ${n("tieredmenu.item.padding")};
    gap: ${n("tieredmenu.item.gap")};
    user-select: none;
    outline: 0 none;
}

.p-tieredmenu-item-label {
    line-height: 1;
}

.p-tieredmenu-item-icon {
    color: ${n("tieredmenu.item.icon.color")};
}

.p-tieredmenu-submenu-icon {
    color: ${n("tieredmenu.submenu.icon.color")};
    margin-left: auto;
    font-size: ${n("tieredmenu.submenu.icon.size")};
    width: ${n("tieredmenu.submenu.icon.size")};
    height: ${n("tieredmenu.submenu.icon.size")};
}

.p-tieredmenu-submenu-icon:dir(rtl) {
    margin-left: 0;
    margin-right: auto;
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content {
    color: ${n("tieredmenu.item.focus.color")};
    background: ${n("tieredmenu.item.focus.background")};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${n("tieredmenu.item.icon.focus.color")};
}

.p-tieredmenu-item.p-focus > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${n("tieredmenu.submenu.icon.focus.color")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover {
    color: ${n("tieredmenu.item.focus.color")};
    background: ${n("tieredmenu.item.focus.background")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-item-icon {
    color: ${n("tieredmenu.item.icon.focus.color")};
}

.p-tieredmenu-item:not(.p-disabled) > .p-tieredmenu-item-content:hover .p-tieredmenu-submenu-icon {
    color: ${n("tieredmenu.submenu.icon.focus.color")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content {
    color: ${n("tieredmenu.item.active.color")};
    background: ${n("tieredmenu.item.active.background")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-item-icon {
    color: ${n("tieredmenu.item.icon.active.color")};
}

.p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    color: ${n("tieredmenu.submenu.icon.active.color")};
}

.p-tieredmenu-separator {
    border-block-start: 1px solid ${n("tieredmenu.separator.border.color")};
}

.p-tieredmenu-overlay {
    box-shadow: ${n("tieredmenu.shadow")};
}

.p-tieredmenu-enter-from,
.p-tieredmenu-leave-active {
    opacity: 0;
}

.p-tieredmenu-enter-active {
    transition: opacity 250ms;
}

.p-tieredmenu-mobile .p-tieredmenu-submenu {
    position: static;
    box-shadow: none;
    border: 0 none;
    padding-inline-start: ${n("tieredmenu.submenu.mobile.indent")};
    padding-inline-end: 0;
}

.p-tieredmenu-mobile .p-tieredmenu-submenu:dir(rtl) {
    padding-inline-start: 0;
    padding-inline-end: ${n("tieredmenu.submenu.mobile.indent")};
}

.p-tieredmenu-mobile .p-tieredmenu-submenu-icon {
    transition: transform 0.2s;
    transform: rotate(90deg);
}

.p-tieredmenu-mobile .p-tieredmenu-item-active > .p-tieredmenu-item-content .p-tieredmenu-submenu-icon {
    transform: rotate(-90deg);
}
`,Oo=({dt:n})=>`
.p-checkbox {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${n("checkbox.width")};
    height: ${n("checkbox.height")};
}

.p-checkbox-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: ${n("checkbox.border.radius")};
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${n("checkbox.border.radius")};
    border: 1px solid ${n("checkbox.border.color")};
    background: ${n("checkbox.background")};
    width: ${n("checkbox.width")};
    height: ${n("checkbox.height")};
    transition: background ${n("checkbox.transition.duration")}, color ${n("checkbox.transition.duration")}, border-color ${n("checkbox.transition.duration")}, box-shadow ${n("checkbox.transition.duration")}, outline-color ${n("checkbox.transition.duration")};
    outline-color: transparent;
    box-shadow: ${n("checkbox.shadow")};
}

.p-checkbox-icon {
    transition-duration: ${n("checkbox.transition.duration")};
    color: ${n("checkbox.icon.color")};
    font-size: ${n("checkbox.icon.size")};
    width: ${n("checkbox.icon.size")};
    height: ${n("checkbox.icon.size")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    border-color: ${n("checkbox.hover.border.color")};
}

.p-checkbox-checked .p-checkbox-box {
    border-color: ${n("checkbox.checked.border.color")};
    background: ${n("checkbox.checked.background")};
}

.p-checkbox-checked .p-checkbox-icon {
    color: ${n("checkbox.icon.checked.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${n("checkbox.checked.hover.background")};
    border-color: ${n("checkbox.checked.hover.border.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
    color: ${n("checkbox.icon.checked.hover.color")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${n("checkbox.focus.border.color")};
    box-shadow: ${n("checkbox.focus.ring.shadow")};
    outline: ${n("checkbox.focus.ring.width")} ${n("checkbox.focus.ring.style")} ${n("checkbox.focus.ring.color")};
    outline-offset: ${n("checkbox.focus.ring.offset")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${n("checkbox.checked.focus.border.color")};
}

.p-checkbox.p-invalid > .p-checkbox-box {
    border-color: ${n("checkbox.invalid.border.color")};
}

.p-checkbox.p-variant-filled .p-checkbox-box {
    background: ${n("checkbox.filled.background")};
}

.p-checkbox-checked.p-variant-filled .p-checkbox-box {
    background: ${n("checkbox.checked.background")};
}

.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${n("checkbox.checked.hover.background")};
}

.p-checkbox.p-disabled {
    opacity: 1;
}

.p-checkbox.p-disabled .p-checkbox-box {
    background: ${n("checkbox.disabled.background")};
    border-color: ${n("checkbox.checked.disabled.border.color")};
}

.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
    color: ${n("checkbox.icon.disabled.color")};
}

.p-checkbox-sm,
.p-checkbox-sm .p-checkbox-box {
    width: ${n("checkbox.sm.width")};
    height: ${n("checkbox.sm.height")};
}

.p-checkbox-sm .p-checkbox-icon {
    font-size: ${n("checkbox.icon.sm.size")};
    width: ${n("checkbox.icon.sm.size")};
    height: ${n("checkbox.icon.sm.size")};
}

.p-checkbox-lg,
.p-checkbox-lg .p-checkbox-box {
    width: ${n("checkbox.lg.width")};
    height: ${n("checkbox.lg.height")};
}

.p-checkbox-lg .p-checkbox-icon {
    font-size: ${n("checkbox.icon.lg.size")};
    width: ${n("checkbox.icon.lg.size")};
    height: ${n("checkbox.icon.lg.size")};
}
`,Eo=({dt:n})=>`
.p-chip {
    display: inline-flex;
    align-items: center;
    background: ${n("chip.background")};
    color: ${n("chip.color")};
    border-radius: ${n("chip.border.radius")};
    padding-block: ${n("chip.padding.y")};
    padding-inline: ${n("chip.padding.x")};
    gap: ${n("chip.gap")};
}

.p-chip-icon {
    color: ${n("chip.icon.color")};
    font-size: ${n("chip.icon.font.size")};
    width: ${n("chip.icon.size")};
    height: ${n("chip.icon.size")};
}

.p-chip-image {
    border-radius: 50%;
    width: ${n("chip.image.width")};
    height: ${n("chip.image.height")};
    margin-inline-start: calc(-1 * ${n("chip.padding.y")});
}

.p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: ${n("chip.padding.y")};
}

.p-chip:has(.p-chip-image) {
    padding-block-start: calc(${n("chip.padding.y")} / 2);
    padding-block-end: calc(${n("chip.padding.y")} / 2);
}

.p-chip-remove-icon {
    cursor: pointer;
    font-size: ${n("chip.remove.icon.size")};
    width: ${n("chip.remove.icon.size")};
    height: ${n("chip.remove.icon.size")};
    color: ${n("chip.remove.icon.color")};
    border-radius: 50%;
    transition: outline-color ${n("chip.transition.duration")}, box-shadow ${n("chip.transition.duration")};
    outline-color: transparent;
}

.p-chip-remove-icon:focus-visible {
    box-shadow: ${n("chip.remove.icon.focus.ring.shadow")};
    outline: ${n("chip.remove.icon.focus.ring.width")} ${n("chip.remove.icon.focus.ring.style")} ${n("chip.remove.icon.focus.ring.color")};
    outline-offset: ${n("chip.remove.icon.focus.ring.offset")};
}
`,Ro=({dt:n})=>`
.p-multiselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${n("multiselect.background")};
    border: 1px solid ${n("multiselect.border.color")};
    transition: background ${n("multiselect.transition.duration")}, color ${n("multiselect.transition.duration")}, border-color ${n("multiselect.transition.duration")}, outline-color ${n("multiselect.transition.duration")}, box-shadow ${n("multiselect.transition.duration")};
    border-radius: ${n("multiselect.border.radius")};
    outline-color: transparent;
    box-shadow: ${n("multiselect.shadow")};
}

.p-multiselect:not(.p-disabled):hover {
    border-color: ${n("multiselect.hover.border.color")};
}

.p-multiselect:not(.p-disabled).p-focus {
    border-color: ${n("multiselect.focus.border.color")};
    box-shadow: ${n("multiselect.focus.ring.shadow")};
    outline: ${n("multiselect.focus.ring.width")} ${n("multiselect.focus.ring.style")} ${n("multiselect.focus.ring.color")};
    outline-offset: ${n("multiselect.focus.ring.offset")};
}

.p-multiselect.p-variant-filled {
    background: ${n("multiselect.filled.background")};
}

.p-multiselect.p-variant-filled:not(.p-disabled):hover {
    background: ${n("multiselect.filled.hover.background")};
}

.p-multiselect.p-variant-filled.p-focus {
    background: ${n("multiselect.filled.focus.background")};
}

.p-multiselect.p-invalid {
    border-color: ${n("multiselect.invalid.border.color")};
}

.p-multiselect.p-disabled {
    opacity: 1;
    background: ${n("multiselect.disabled.background")};
}

.p-multiselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${n("multiselect.dropdown.color")};
    width: ${n("multiselect.dropdown.width")};
    border-start-end-radius: ${n("multiselect.border.radius")};
    border-end-end-radius: ${n("multiselect.border.radius")};
}

.p-multiselect-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    color: ${n("multiselect.clear.icon.color")};
    inset-inline-end: ${n("multiselect.dropdown.width")};
}

.p-multiselect-label-container {
    overflow: hidden;
    flex: 1 1 auto;
    cursor: pointer;
}

.p-multiselect-label {
    display: flex;
    align-items: center;
    gap: calc(${n("multiselect.padding.y")} / 2);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: ${n("multiselect.padding.y")} ${n("multiselect.padding.x")};
    color: ${n("multiselect.color")};
}

.p-multiselect-label.p-placeholder {
    color: ${n("multiselect.placeholder.color")};
}

.p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
    color: ${n("multiselect.invalid.placeholder.color")};
}

.p-multiselect.p-disabled .p-multiselect-label {
    color: ${n("multiselect.disabled.color")};
}

.p-multiselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-multiselect .p-multiselect-overlay {
    min-width: 100%;
}

.p-multiselect-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: ${n("multiselect.overlay.background")};
    color: ${n("multiselect.overlay.color")};
    border: 1px solid ${n("multiselect.overlay.border.color")};
    border-radius: ${n("multiselect.overlay.border.radius")};
    box-shadow: ${n("multiselect.overlay.shadow")};
}

.p-multiselect-header {
    display: flex;
    align-items: center;
    padding: ${n("multiselect.list.header.padding")};
}

.p-multiselect-header .p-checkbox {
    margin-inline-end: ${n("multiselect.option.gap")};
}

.p-multiselect-filter-container {
    flex: 1 1 auto;
}

.p-multiselect-filter {
    width: 100%;
}

.p-multiselect-list-container {
    overflow: auto;
}

.p-multiselect-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${n("multiselect.list.padding")};
    display: flex;
    flex-direction: column;
    gap: ${n("multiselect.list.gap")};
}

.p-multiselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: ${n("multiselect.option.gap")};
    padding: ${n("multiselect.option.padding")};
    border: 0 none;
    color: ${n("multiselect.option.color")};
    background: transparent;
    transition: background ${n("multiselect.transition.duration")}, color ${n("multiselect.transition.duration")}, border-color ${n("multiselect.transition.duration")}, box-shadow ${n("multiselect.transition.duration")}, outline-color ${n("multiselect.transition.duration")};
    border-radius: ${n("multiselect.option.border.radius")};
}

.p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
    background: ${n("multiselect.option.focus.background")};
    color: ${n("multiselect.option.focus.color")};
}

.p-multiselect-option.p-multiselect-option-selected {
    background: ${n("multiselect.option.selected.background")};
    color: ${n("multiselect.option.selected.color")};
}

.p-multiselect-option.p-multiselect-option-selected.p-focus {
    background: ${n("multiselect.option.selected.focus.background")};
    color: ${n("multiselect.option.selected.focus.color")};
}

.p-multiselect-option-group {
    cursor: auto;
    margin: 0;
    padding: ${n("multiselect.option.group.padding")};
    background: ${n("multiselect.option.group.background")};
    color: ${n("multiselect.option.group.color")};
    font-weight: ${n("multiselect.option.group.font.weight")};
}

.p-multiselect-empty-message {
    padding: ${n("multiselect.empty.message.padding")};
}

.p-multiselect-label .p-chip {
    padding-block-start: calc(${n("multiselect.padding.y")} / 2);
    padding-block-end: calc(${n("multiselect.padding.y")} / 2);
    border-radius: ${n("multiselect.chip.border.radius")};
}

.p-multiselect-label:has(.p-chip) {
    padding: calc(${n("multiselect.padding.y")} / 2) calc(${n("multiselect.padding.x")} / 2);
}

.p-multiselect-fluid {
    display: flex;
    width: 100%;
}

.p-multiselect-sm .p-multiselect-label {
    font-size: ${n("multiselect.sm.font.size")};
    padding-block: ${n("multiselect.sm.padding.y")};
    padding-inline: ${n("multiselect.sm.padding.x")};
}

.p-multiselect-sm .p-multiselect-dropdown .p-icon {
    font-size: ${n("multiselect.sm.font.size")};
    width: ${n("multiselect.sm.font.size")};
    height: ${n("multiselect.sm.font.size")};
}

.p-multiselect-lg .p-multiselect-label {
    font-size: ${n("multiselect.lg.font.size")};
    padding-block: ${n("multiselect.lg.padding.y")};
    padding-inline: ${n("multiselect.lg.padding.x")};
}

.p-multiselect-lg .p-multiselect-dropdown .p-icon {
    font-size: ${n("multiselect.lg.font.size")};
    width: ${n("multiselect.lg.font.size")};
    height: ${n("multiselect.lg.font.size")};
}
`,No=({dt:n})=>`
.p-password {
    display: inline-flex;
    position: relative;
}

.p-password .p-password-overlay {
    min-width: 100%;
}

.p-password-meter {
    height: ${n("password.meter.height")};
    background: ${n("password.meter.background")};
    border-radius: ${n("password.meter.border.radius")};
}

.p-password-meter-label {
    height: 100%;
    width: 0;
    transition: width 1s ease-in-out;
    border-radius: ${n("password.meter.border.radius")};
}

.p-password-meter-weak {
    background: ${n("password.strength.weak.background")};
}

.p-password-meter-medium {
    background: ${n("password.strength.medium.background")};
}

.p-password-meter-strong {
    background: ${n("password.strength.strong.background")};
}

.p-password-fluid {
    display: flex;
}

.p-password-fluid .p-password-input {
    width: 100%;
}

.p-password-input::-ms-reveal,
.p-password-input::-ms-clear {
    display: none;
}

.p-password-overlay {
    padding: ${n("password.overlay.padding")};
    background: ${n("password.overlay.background")};
    color: ${n("password.overlay.color")};
    border: 1px solid ${n("password.overlay.border.color")};
    box-shadow: ${n("password.overlay.shadow")};
    border-radius: ${n("password.overlay.border.radius")};
}

.p-password-content {
    display: flex;
    flex-direction: column;
    gap: ${n("password.content.gap")};
}

.p-password-toggle-mask-icon {
    inset-inline-end: ${n("form.field.padding.x")};
    color: ${n("password.icon.color")};
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * calc(${n("icon.size")} / 2));
    width: ${n("icon.size")};
    height: ${n("icon.size")};
}

.p-password:has(.p-password-toggle-mask-icon) .p-password-input {
    padding-inline-end: calc((${n("form.field.padding.x")} * 2) + ${n("icon.size")});
}
`,Lo=({dt:n})=>`
.p-card {
    background: ${n("card.background")};
    color: ${n("card.color")};
    box-shadow: ${n("card.shadow")};
    border-radius: ${n("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${n("card.caption.gap")};
}

.p-card-body {
    padding: ${n("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${n("card.body.gap")};
}

.p-card-title {
    font-size: ${n("card.title.font.size")};
    font-weight: ${n("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${n("card.subtitle.color")};
}
`,Ao=({dt:n})=>`
.p-dialog {
    max-height: 90%;
    transform: scale(1);
    border-radius: ${n("dialog.border.radius")};
    box-shadow: ${n("dialog.shadow")};
    background: ${n("dialog.background")};
    border: 1px solid ${n("dialog.border.color")};
    color: ${n("dialog.color")};
}

.p-dialog-content {
    overflow-y: auto;
    padding: ${n("dialog.content.padding")};
}

.p-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: ${n("dialog.header.padding")};
}

.p-dialog-title {
    font-weight: ${n("dialog.title.font.weight")};
    font-size: ${n("dialog.title.font.size")};
}

.p-dialog-footer {
    flex-shrink: 0;
    padding: ${n("dialog.footer.padding")};
    display: flex;
    justify-content: flex-end;
    gap: ${n("dialog.footer.gap")};
}

.p-dialog-header-actions {
    display: flex;
    align-items: center;
    gap: ${n("dialog.header.gap")};
}

.p-dialog-enter-active {
    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
}

.p-dialog-leave-active {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-dialog-enter-from,
.p-dialog-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

.p-dialog-top .p-dialog,
.p-dialog-bottom .p-dialog,
.p-dialog-left .p-dialog,
.p-dialog-right .p-dialog,
.p-dialog-topleft .p-dialog,
.p-dialog-topright .p-dialog,
.p-dialog-bottomleft .p-dialog,
.p-dialog-bottomright .p-dialog {
    margin: 0.75rem;
    transform: translate3d(0px, 0px, 0px);
}

.p-dialog-top .p-dialog-enter-active,
.p-dialog-top .p-dialog-leave-active,
.p-dialog-bottom .p-dialog-enter-active,
.p-dialog-bottom .p-dialog-leave-active,
.p-dialog-left .p-dialog-enter-active,
.p-dialog-left .p-dialog-leave-active,
.p-dialog-right .p-dialog-enter-active,
.p-dialog-right .p-dialog-leave-active,
.p-dialog-topleft .p-dialog-enter-active,
.p-dialog-topleft .p-dialog-leave-active,
.p-dialog-topright .p-dialog-enter-active,
.p-dialog-topright .p-dialog-leave-active,
.p-dialog-bottomleft .p-dialog-enter-active,
.p-dialog-bottomleft .p-dialog-leave-active,
.p-dialog-bottomright .p-dialog-enter-active,
.p-dialog-bottomright .p-dialog-leave-active {
    transition: all 0.3s ease-out;
}

.p-dialog-top .p-dialog-enter-from,
.p-dialog-top .p-dialog-leave-to {
    transform: translate3d(0px, -100%, 0px);
}

.p-dialog-bottom .p-dialog-enter-from,
.p-dialog-bottom .p-dialog-leave-to {
    transform: translate3d(0px, 100%, 0px);
}

.p-dialog-left .p-dialog-enter-from,
.p-dialog-left .p-dialog-leave-to,
.p-dialog-topleft .p-dialog-enter-from,
.p-dialog-topleft .p-dialog-leave-to,
.p-dialog-bottomleft .p-dialog-enter-from,
.p-dialog-bottomleft .p-dialog-leave-to {
    transform: translate3d(-100%, 0px, 0px);
}

.p-dialog-right .p-dialog-enter-from,
.p-dialog-right .p-dialog-leave-to,
.p-dialog-topright .p-dialog-enter-from,
.p-dialog-topright .p-dialog-leave-to,
.p-dialog-bottomright .p-dialog-enter-from,
.p-dialog-bottomright .p-dialog-leave-to {
    transform: translate3d(100%, 0px, 0px);
}

.p-dialog-left:dir(rtl) .p-dialog-enter-from,
.p-dialog-left:dir(rtl) .p-dialog-leave-to,
.p-dialog-topleft:dir(rtl) .p-dialog-enter-from,
.p-dialog-topleft:dir(rtl) .p-dialog-leave-to,
.p-dialog-bottomleft:dir(rtl) .p-dialog-enter-from,
.p-dialog-bottomleft:dir(rtl) .p-dialog-leave-to {
    transform: translate3d(100%, 0px, 0px);
}

.p-dialog-right:dir(rtl) .p-dialog-enter-from,
.p-dialog-right:dir(rtl) .p-dialog-leave-to,
.p-dialog-topright:dir(rtl) .p-dialog-enter-from,
.p-dialog-topright:dir(rtl) .p-dialog-leave-to,
.p-dialog-bottomright:dir(rtl) .p-dialog-enter-from,
.p-dialog-bottomright:dir(rtl) .p-dialog-leave-to {
    transform: translate3d(-100%, 0px, 0px);
}

.p-dialog-maximized {
    width: 100vw !important;
    height: 100vh !important;
    top: 0px !important;
    left: 0px !important;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
}

.p-dialog-maximized .p-dialog-content {
    flex-grow: 1;
}
`,Do=({dt:n})=>`
.p-select {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${n("select.background")};
    border: 1px solid ${n("select.border.color")};
    transition: background ${n("select.transition.duration")}, color ${n("select.transition.duration")}, border-color ${n("select.transition.duration")},
        outline-color ${n("select.transition.duration")}, box-shadow ${n("select.transition.duration")};
    border-radius: ${n("select.border.radius")};
    outline-color: transparent;
    box-shadow: ${n("select.shadow")};
}

.p-select:not(.p-disabled):hover {
    border-color: ${n("select.hover.border.color")};
}

.p-select:not(.p-disabled).p-focus {
    border-color: ${n("select.focus.border.color")};
    box-shadow: ${n("select.focus.ring.shadow")};
    outline: ${n("select.focus.ring.width")} ${n("select.focus.ring.style")} ${n("select.focus.ring.color")};
    outline-offset: ${n("select.focus.ring.offset")};
}

.p-select.p-variant-filled {
    background: ${n("select.filled.background")};
}

.p-select.p-variant-filled:not(.p-disabled):hover {
    background: ${n("select.filled.hover.background")};
}

.p-select.p-variant-filled:not(.p-disabled).p-focus {
    background: ${n("select.filled.focus.background")};
}

.p-select.p-invalid {
    border-color: ${n("select.invalid.border.color")};
}

.p-select.p-disabled {
    opacity: 1;
    background: ${n("select.disabled.background")};
}

.p-select-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    color: ${n("select.clear.icon.color")};
    inset-inline-end: ${n("select.dropdown.width")};
}

.p-select-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${n("select.dropdown.color")};
    width: ${n("select.dropdown.width")};
    border-start-end-radius: ${n("select.border.radius")};
    border-end-end-radius: ${n("select.border.radius")};
}

.p-select-label {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    flex: 1 1 auto;
    width: 1%;
    padding: ${n("select.padding.y")} ${n("select.padding.x")};
    text-overflow: ellipsis;
    cursor: pointer;
    color: ${n("select.color")};
    background: transparent;
    border: 0 none;
    outline: 0 none;
}

.p-select-label.p-placeholder {
    color: ${n("select.placeholder.color")};
}

.p-select.p-invalid .p-select-label.p-placeholder {
    color: ${n("select.invalid.placeholder.color")};
}

.p-select:has(.p-select-clear-icon) .p-select-label {
    padding-inline-end: calc(1rem + ${n("select.padding.x")});
}

.p-select.p-disabled .p-select-label {
    color: ${n("select.disabled.color")};
}

.p-select-label-empty {
    overflow: hidden;
    opacity: 0;
}

input.p-select-label {
    cursor: default;
}

.p-select .p-select-overlay {
    min-width: 100%;
}

.p-select-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: ${n("select.overlay.background")};
    color: ${n("select.overlay.color")};
    border: 1px solid ${n("select.overlay.border.color")};
    border-radius: ${n("select.overlay.border.radius")};
    box-shadow: ${n("select.overlay.shadow")};
}

.p-select-header {
    padding: ${n("select.list.header.padding")};
}

.p-select-filter {
    width: 100%;
}

.p-select-list-container {
    overflow: auto;
}

.p-select-option-group {
    cursor: auto;
    margin: 0;
    padding: ${n("select.option.group.padding")};
    background: ${n("select.option.group.background")};
    color: ${n("select.option.group.color")};
    font-weight: ${n("select.option.group.font.weight")};
}

.p-select-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: ${n("select.list.padding")};
    gap: ${n("select.list.gap")};
    display: flex;
    flex-direction: column;
}

.p-select-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: ${n("select.option.padding")};
    border: 0 none;
    color: ${n("select.option.color")};
    background: transparent;
    transition: background ${n("select.transition.duration")}, color ${n("select.transition.duration")}, border-color ${n("select.transition.duration")},
            box-shadow ${n("select.transition.duration")}, outline-color ${n("select.transition.duration")};
    border-radius: ${n("select.option.border.radius")};
}

.p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
    background: ${n("select.option.focus.background")};
    color: ${n("select.option.focus.color")};
}

.p-select-option.p-select-option-selected {
    background: ${n("select.option.selected.background")};
    color: ${n("select.option.selected.color")};
}

.p-select-option.p-select-option-selected.p-focus {
    background: ${n("select.option.selected.focus.background")};
    color: ${n("select.option.selected.focus.color")};
}

.p-select-option-blank-icon {
    flex-shrink: 0;
}

.p-select-option-check-icon {
    position: relative;
    flex-shrink: 0;
    margin-inline-start: ${n("select.checkmark.gutter.start")};
    margin-inline-end: ${n("select.checkmark.gutter.end")};
    color: ${n("select.checkmark.color")};
}

.p-select-empty-message {
    padding: ${n("select.empty.message.padding")};
}

.p-select-fluid {
    display: flex;
    width: 100%;
}

.p-select-sm .p-select-label {
    font-size: ${n("select.sm.font.size")};
    padding-block: ${n("select.sm.padding.y")};
    padding-inline: ${n("select.sm.padding.x")};
}

.p-select-sm .p-select-dropdown .p-icon {
    font-size: ${n("select.sm.font.size")};
    width: ${n("select.sm.font.size")};
    height: ${n("select.sm.font.size")};
}

.p-select-lg .p-select-label {
    font-size: ${n("select.lg.font.size")};
    padding-block: ${n("select.lg.padding.y")};
    padding-inline: ${n("select.lg.padding.x")};
}

.p-select-lg .p-select-dropdown .p-icon {
    font-size: ${n("select.lg.font.size")};
    width: ${n("select.lg.font.size")};
    height: ${n("select.lg.font.size")};
}
`,Po=({dt:n})=>`
.p-divider-horizontal {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    margin: ${n("divider.horizontal.margin")};
    padding: ${n("divider.horizontal.padding")};
}

.p-divider-horizontal:before {
    position: absolute;
    display: block;
    inset-block-start: 50%;
    inset-inline-start: 0;
    width: 100%;
    content: "";
    border-block-start: 1px solid ${n("divider.border.color")};
}

.p-divider-horizontal .p-divider-content {
    padding: ${n("divider.horizontal.content.padding")};
}

.p-divider-vertical {
    min-height: 100%;
    display: flex;
    position: relative;
    justify-content: center;
    margin: ${n("divider.vertical.margin")};
    padding: ${n("divider.vertical.padding")};
}

.p-divider-vertical:before {
    position: absolute;
    display: block;
    inset-block-start: 0;
    inset-inline-start: 50%;
    height: 100%;
    content: "";
    border-inline-start: 1px solid ${n("divider.border.color")};
}

.p-divider.p-divider-vertical .p-divider-content {
    padding: ${n("divider.vertical.content.padding")};
}

.p-divider-content {
    z-index: 1;
    background: ${n("divider.content.background")};
    color: ${n("divider.content.color")};
}

.p-divider-solid.p-divider-horizontal:before {
    border-block-start-style: solid;
}

.p-divider-solid.p-divider-vertical:before {
    border-inline-start-style: solid;
}

.p-divider-dashed.p-divider-horizontal:before {
    border-block-start-style: dashed;
}

.p-divider-dashed.p-divider-vertical:before {
    border-inline-start-style: dashed;
}

.p-divider-dotted.p-divider-horizontal:before {
    border-block-start-style: dotted;
}

.p-divider-dotted.p-divider-vertical:before {
    border-inline-start-style: dotted;
}

.p-divider-left:dir(rtl),
.p-divider-right:dir(rtl) {
    flex-direction: row-reverse;
}
`,To=({dt:n})=>`
.p-toggleswitch {
    display: inline-block;
    width: ${n("toggleswitch.width")};
    height: ${n("toggleswitch.height")};
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: ${n("toggleswitch.border.radius")};
}

.p-toggleswitch-slider {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: ${n("toggleswitch.border.width")};
    border-style: solid;
    border-color: ${n("toggleswitch.border.color")};
    background: ${n("toggleswitch.background")};
    transition: background ${n("toggleswitch.transition.duration")}, color ${n("toggleswitch.transition.duration")}, border-color ${n("toggleswitch.transition.duration")}, outline-color ${n("toggleswitch.transition.duration")}, box-shadow ${n("toggleswitch.transition.duration")};
    border-radius: ${n("toggleswitch.border.radius")};
    outline-color: transparent;
    box-shadow: ${n("toggleswitch.shadow")};
}

.p-toggleswitch-handle {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${n("toggleswitch.handle.background")};
    color: ${n("toggleswitch.handle.color")};
    width: ${n("toggleswitch.handle.size")};
    height: ${n("toggleswitch.handle.size")};
    inset-inline-start: ${n("toggleswitch.gap")};
    margin-block-start: calc(-1 * calc(${n("toggleswitch.handle.size")} / 2));
    border-radius: ${n("toggleswitch.handle.border.radius")};
    transition: background ${n("toggleswitch.transition.duration")}, color ${n("toggleswitch.transition.duration")}, inset-inline-start ${n("toggleswitch.slide.duration")}, box-shadow ${n("toggleswitch.slide.duration")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${n("toggleswitch.checked.background")};
    border-color: ${n("toggleswitch.checked.border.color")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${n("toggleswitch.handle.checked.background")};
    color: ${n("toggleswitch.handle.checked.color")};
    inset-inline-start: calc(${n("toggleswitch.width")} - calc(${n("toggleswitch.handle.size")} + ${n("toggleswitch.gap")}));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: ${n("toggleswitch.hover.background")};
    border-color: ${n("toggleswitch.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    background: ${n("toggleswitch.handle.hover.background")};
    color: ${n("toggleswitch.handle.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${n("toggleswitch.checked.hover.background")};
    border-color: ${n("toggleswitch.checked.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${n("toggleswitch.handle.checked.hover.background")};
    color: ${n("toggleswitch.handle.checked.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: ${n("toggleswitch.focus.ring.shadow")};
    outline: ${n("toggleswitch.focus.ring.width")} ${n("toggleswitch.focus.ring.style")} ${n("toggleswitch.focus.ring.color")};
    outline-offset: ${n("toggleswitch.focus.ring.offset")};
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: ${n("toggleswitch.invalid.border.color")};
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: ${n("toggleswitch.disabled.background")};
}

.p-toggleswitch.p-disabled .p-toggleswitch-handle {
    background: ${n("toggleswitch.handle.disabled.background")};
}
`,Fo=({dt:n})=>`
.p-scrollpanel-content-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    float: left;
}

.p-scrollpanel-content {
    height: calc(100% + calc(2 * ${n("scrollpanel.bar.size")}));
    width: calc(100% + calc(2 * ${n("scrollpanel.bar.size")}));
    padding-inline: 0 calc(2 * ${n("scrollpanel.bar.size")});
    padding-block: 0 calc(2 * ${n("scrollpanel.bar.size")});
    position: relative;
    overflow: auto;
    box-sizing: border-box;
    scrollbar-width: none;
}

.p-scrollpanel-content::-webkit-scrollbar {
    display: none;
}

.p-scrollpanel-bar {
    position: relative;
    border-radius: ${n("scrollpanel.bar.border.radius")};
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    outline-color: transparent;
    background: ${n("scrollpanel.bar.background")};
    border: 0 none;
    transition: outline-color ${n("scrollpanel.transition.duration")}, opacity ${n("scrollpanel.transition.duration")};
}

.p-scrollpanel-bar:focus-visible {
    box-shadow: ${n("scrollpanel.bar.focus.ring.shadow")};
    outline: ${n("scrollpanel.barfocus.ring.width")} ${n("scrollpanel.bar.focus.ring.style")} ${n("scrollpanel.bar.focus.ring.color")};
    outline-offset: ${n("scrollpanel.barfocus.ring.offset")};
}

.p-scrollpanel-bar-y {
    width: ${n("scrollpanel.bar.size")};
    inset-block-start: 0;
}

.p-scrollpanel-bar-x {
    height: ${n("scrollpanel.bar.size")};
    inset-block-end: 0;
}

.p-scrollpanel-hidden {
    visibility: hidden;
}

.p-scrollpanel:hover .p-scrollpanel-bar,
.p-scrollpanel:active .p-scrollpanel-bar {
    opacity: 1;
}

.p-scrollpanel-grabbed {
    user-select: none;
}
`,Io=({dt:n})=>`
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${n("tag.primary.background")};
    color: ${n("tag.primary.color")};
    font-size: ${n("tag.font.size")};
    font-weight: ${n("tag.font.weight")};
    padding: ${n("tag.padding")};
    border-radius: ${n("tag.border.radius")};
    gap: ${n("tag.gap")};
}

.p-tag-icon {
    font-size: ${n("tag.icon.size")};
    width: ${n("tag.icon.size")};
    height:${n("tag.icon.size")};
}

.p-tag-rounded {
    border-radius: ${n("tag.rounded.border.radius")};
}

.p-tag-success {
    background: ${n("tag.success.background")};
    color: ${n("tag.success.color")};
}

.p-tag-info {
    background: ${n("tag.info.background")};
    color: ${n("tag.info.color")};
}

.p-tag-warn {
    background: ${n("tag.warn.background")};
    color: ${n("tag.warn.color")};
}

.p-tag-danger {
    background: ${n("tag.danger.background")};
    color: ${n("tag.danger.color")};
}

.p-tag-secondary {
    background: ${n("tag.secondary.background")};
    color: ${n("tag.secondary.color")};
}

.p-tag-contrast {
    background: ${n("tag.contrast.background")};
    color: ${n("tag.contrast.color")};
}
`;export{wo as $,co as A,mo as B,ot as C,fo as D,mt as E,Zt as F,gn as G,Mt as H,Jt as I,dt as J,ht as K,gt as L,bn as M,Bt as N,$o as O,xo as P,et as Q,an as R,it as S,lt as T,Ht as U,oo as V,vo as W,ko as X,yo as Y,bo as Z,to as _,ro as a,lo as a0,ao as a1,qt as a2,Kt as a3,zo as a4,Vt as a5,Xt as a6,_o as a7,jt as a8,It as a9,So as aa,eo as ab,bt as ac,pt as ad,ct as ae,Co as af,Oo as ag,io as ah,Eo as ai,Ro as aj,On as ak,Yt as al,No as am,Ft as an,go as ao,Tt as ap,Lo as aq,no as ar,Ao as as,Do as at,Gt as au,Po as av,To as aw,Fo as ax,Io as ay,Qt as b,ho as c,P as d,g as e,zn as f,S as g,Ln as h,Wt as i,zt as j,O as k,Rn as l,vn as m,ut as n,N as o,cn as p,uo as q,R as r,Cn as s,xn as t,po as u,_ as v,Ut as w,yt as x,so as y,$n as z};
