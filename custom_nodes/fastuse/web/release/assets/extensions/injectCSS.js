const _=u;(function(x,a){const b=u,c=x();for(;;)try{if(-parseInt(b(432))/1*(-parseInt(b(428))/2)+-parseInt(b(424))/3*(parseInt(b(420))/4)+parseInt(b(398))/5*(-parseInt(b(433))/6)+-parseInt(b(397))/7+-parseInt(b(413))/8+parseInt(b(438))/9+parseInt(b(435))/10===a)break;c.push(c.shift())}catch{c.push(c.shift())}})(s,660869);const o=function(){const x=u,a={kdwnl:function(c,n){return c(n)},QwDVA:function(c,n){return c+n},PMHwO:x(415),WUama:function(c,n){return c!==n},ZbKhd:function(c,n){return c===n},yfYHF:x(443)};let b=!0;return function(c,n){const r=x,e={vZBVF:function(f,d){return a.WUama(f,d)},KYtxm:r(409)};if(a[r(446)](a[r(402)],a.yfYHF)){const f=b?function(){const d=r;if(e[d(403)](d(414),e[d(411)])){if(n){const t=n[d(447)](c,arguments);return n=null,t}}else{const t=_0x4e763e[d(416)][d(421)].bind(_0x2c1556),i=_0x2c8422[_0x2e97d0],p=_0x520651[i]||t;t.__proto__=_0x570c81[d(422)](_0x1e2a28),t[d(417)]=p[d(417)].bind(p),_0x293b6a[i]=t}}:function(){};return b=!1,f}else{let f;try{f=a[r(444)](_0x52fe86,a[r(423)](r(431),a[r(445)])+");")()}catch{f=_0x39efe1}return f}}}(),I=o(void 0,function(){const x=u,a={jCIGg:function(e,f){return e+f},vtywP:function(e,f){return e+f},PWWzW:x(431),gavrP:x(415),rvApG:function(e,f){return e===f},PwUEW:x(436),aHGgj:function(e,f){return e+f},UtACK:function(e){return e()},OIMhL:x(427),AZMwY:x(407),tPwkR:x(440),lSrfc:x(399),wGvXw:"trace"},b=function(){const e=x,f={wpBfX:function(d,t){return a[u(434)](d,t)},QeNZy:function(d,t){return a.vtywP(d,t)},GwZVV:a.PWWzW,XrTfP:a.gavrP};if(a[e(410)](a[e(439)],a[e(439)])){let d;try{d=Function(a[e(434)](a.aHGgj(a[e(404)],a[e(400)]),");"))()}catch{d=window}return d}else _0x485711=_0x2c9522(f[e(406)](f[e(442)](f[e(448)],f[e(412)]),");"))()},c=a[x(437)](b),n=c[x(408)]=c.console||{},r=[a.OIMhL,x(401),a[x(449)],x(430),a[x(425)],a.lSrfc,a[x(418)]];for(let e=0;e<r[x(451)];e++){const f=o[x(416)][x(421)][x(422)](o),d=r[e],t=n[d]||f;f[x(450)]=o[x(422)](o),f[x(417)]=t[x(417)][x(422)](t),n[d]=f}});function u(x,a){const b=s();return u=function(c,n){return c=c-397,b[c]},u(x,a)}I();let h=`
.grid-cols-3{
    grid-template-columns: repeat(3, minmax(0, 1fr));
}
.fastuse-theme,
.fastuse-primary {
  color: var(--theme-color-light);
}

.fastuse-theme.point:hover,
.fastuse-primary.point:hover {
  opacity: 0.8;
}

.fastuse-success {
  color: var(--success-color);
}

.fastuse-success.point:hover {
  opacity: 0.8;
}

.fastuse-error {
  color: var(--error-color);
}

.fastuse-error.point:hover {
  opacity: 0.8;
}

.fastuse-warning,
.fastuse-warn {
  color: var(--warning-color);
}

.fastuse-warning.point:hover,
.fastuse-warn.point:hover {
  opacity: 0.8;
}
.fastuse-toast {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
   justify-content: start;
}

.fastuse-toast-container {
  position: relative;
  height: fit-content;
  padding: 4px;
  margin-top: -100px;
  opacity: 0;
  z-index: 3;
  transition: opacity 0.3s, margin-top 0.3s, transform 0.3s;
}

.fastuse-toast-container:last-child {
  z-index: 1;
}

.fastuse-toast-container.show {
  opacity: 1;
  margin-top: 50px !important;
  transform: translateY(0%);
}

.fastuse-toast-container:not(.show) {
  z-index: 1;
}

.fastuse-toast-container > div {
  position: relative;
  background: rgba(0,0,0,0.7);
  color: var(--input-text);
  height: fit-content;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.88);
  padding: 9px 12px;
  border-radius: var(--border-radius);
  font-size: 14px;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fastuse-toast-container > div > span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fastuse-toast-container > div > span i {
  font-size: 16px;
  margin-right: 8px;
}

.fastuse-toast-container > div > span i.loading {
  animation: loading-rotate 1s linear infinite;
}

.fastuse-toast-container a {
  cursor: pointer;
  text-decoration: underline;
  color: var(--theme-color-light);
  margin-left: 4px;
  display: inline-block;
  line-height: 1;
}

.fastuse-toast-container a:hover {
  color: var(--theme-color-light);
  text-decoration: none;
}

@keyframes loading-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`;var l=document[_(441)](_(405));l[_(426)]=_(419),l[_(429)]=h,document[_(452)].appendChild(l);function s(){const x=["gavrP","warn","yfYHF","vZBVF","PWWzW","style","wpBfX","info","console","zHLTH","rvApG","KYtxm","XrTfP","8721456LrtSbL","LXEKT",'{}.constructor("return this")( )',"constructor","toString","wGvXw","text/css","12KEHWJL","prototype","bind","QwDVA","814467kOSFca","tPwkR","type","log","2vOVGqm","innerText","error","return (function() ","144487ugcLle","85962xKJJZZ","jCIGg","30711460JsljBT","UGlMG","UtACK","3311379VtAdAT","PwUEW","exception","createElement","QeNZy","cMmpc","kdwnl","PMHwO","ZbKhd","apply","GwZVV","AZMwY","__proto__","length","head","4318230KdrCcY","140MYcZFM","table"];return s=function(){return x},s()}
