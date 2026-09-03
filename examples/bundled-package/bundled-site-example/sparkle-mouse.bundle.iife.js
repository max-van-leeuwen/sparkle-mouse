/*!
 * This bundled file contains the following software:
 * 
 * ================================================================================
 * sparkle-mouse
 * ================================================================================
 * 
 * MIT License
 * 
 * Copyright (c) 2026 Max van Leeuwen (https://maxvanleeuwen.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * ================================================================================
 * Three.js
 * ================================================================================
 * 
 * The MIT License
 * 
 * Copyright © 2010-2025 three.js authors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * ================================================================================
 * omggif
 * ================================================================================
 * 
 * The MIT License
 * 
 * Copyright (c) 2013 Dean McNamee <dean@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

var Sm=Object.defineProperty;var Mm=(xt,yn,ii)=>yn in xt?Sm(xt,yn,{enumerable:!0,configurable:!0,writable:!0,value:ii}):xt[yn]=ii;var Ql=(xt,yn,ii)=>Mm(xt,typeof yn!="symbol"?yn+"":yn,ii);(function(xt){"use strict";const ii={version:"1.0.1"},jl="Sparkle Mouse Template! 🐁✨",Jl=ii.version;class ri{constructor(){this.callbacks=[]}add(e){typeof e=="function"?this.callbacks.push(e):console.warn("Callback.add: provided callback is not a function")}remove(e){const t=this.callbacks.indexOf(e);t>-1&&this.callbacks.splice(t,1)}clear(){this.callbacks=[]}call(...e){this.callbacks.forEach(t=>{t(...e)})}get length(){return this.callbacks.length}get hasCallbacks(){return this.callbacks.length>0}}function ai(n,e,t){return isNaN(n)?0:(!e&&e!==0&&(e=0),!t&&t!==0&&(t=1),Math.max(Math.min(n,Math.max(e,t)),Math.min(e,t)))}function Ft(n,e,t,i,a,r){i=i??0,a=a??1;var s=i+(a-i)*(n-e)/(t-e);return r?ai(s,i,a):s}function Is(n,e,t){const i=Math.cos(t),a=Math.sin(t);return{x:n*i-e*a,y:n*a+e*i}}function hn(n,e,t,i=0){if(t=ai(t,0,1),i=ai(i,0,1),i===0||n<0&&e>0||n>0&&e<0)return n+(e-n)*t;let a;if(n>=0&&e>=0){const s=Math.max(n,1e-4),o=Math.max(e,1e-4),l=Math.log(s),c=Math.log(o);a=Math.exp(l+(c-l)*t)}else if(n<=0&&e<=0){const s=Math.abs(n),o=Math.abs(e),l=Math.max(s,1e-4),c=Math.max(o,1e-4),d=Math.log(l),f=Math.log(c);a=-Math.exp(d+(f-d)*t)}if(i===1)return a;const r=n+(e-n)*t;return r+(a-r)*i}function $l(n,e,t,i=0){i=ai(i,0,1);const a=ai((t-n)/(e-n),0,1);if(i===0||n<0||e<0)return a;let r;{const s=Math.max(n,1e-4),o=Math.max(e,1e-4),l=Math.max(t,1e-4),c=Math.log(s),d=Math.log(o),f=Math.log(l);if(d===c)return 0;r=ai((f-c)/(d-c),0,1)}return i===1?r:a+(r-a)*i}function ec(n,e){const t={};for(const[i,a]of Object.entries(n)){const r=tc(i,a);r!==void 0&&(t[i]=r)}if(t["image-data"]&&t["image-data"].startsWith("image:")){const i=e==null?void 0:e[t["image-data"]];i&&(t["image-count"]===void 0&&i.imageCount!==void 0&&(t["image-count"]=i.imageCount),t["image-aspect-ratio"]===void 0&&i.aspectRatio!==void 0&&(t["image-aspect-ratio"]=i.aspectRatio),t["image-cycles"]===void 0&&i.cycles!==void 0&&(t["image-cycles"]=i.cycles))}return t}function tc(n,e){if(n==="image-count"){if(Array.isArray(e)){const a=e.map(r=>{const s=parseFloat(r);return isNaN(s)?1:Math.max(1,Math.floor(s))});return a.length>0?a:[1]}return[1]}if(n==="image-cycles"){if(Array.isArray(e)){const a=e.map(r=>{const s=parseInt(r,10);return!isNaN(s)&&s>=0?s:0});return a.length>0?a:[0]}return[0]}if(["amount","life","radius","size","gravity","outwards","spinning","turbulence","image-speed"].includes(n)){const a=parseFloat(e);return isNaN(a)?void 0:Math.max(0,Math.min(1,a))}if(["grow","shrink","fade","bouncy","glittery","glide","translucent","image-play-from-start","randomize-size-lifetime","align","flip"].includes(n))return typeof e=="string"?e.toLowerCase()==="true"?!0:e.toLowerCase()==="false"?!1:void 0:!!e;if(n==="image-data")return typeof e!="string"?void 0:e;if(n==="image-aspect-ratio"){const a=parseFloat(e);return!isNaN(a)&&a>0?a:void 0}if(n==="mouse-state")return typeof e=="string"&&["still","move","still-move"].includes(e)?e:void 0}async function Ls(...n){console.log(...n)}function nc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Us={},Fs,ic;function rc(n,e,t,r){var a=0,r=r===void 0?{}:r,s=r.loop===void 0?null:r.loop,o=r.palette===void 0?null:r.palette;if(e<=0||t<=0||e>65535||t>65535)throw new Error("Width/Height invalid.");function l(v){var u=v.length;if(u<2||u>256||u&u-1)throw new Error("Invalid code/color length, must be power of 2 and 2 .. 256.");return u}n[a++]=71,n[a++]=73,n[a++]=70,n[a++]=56,n[a++]=57,n[a++]=97;var c=0,d=0;if(o!==null){for(var f=l(o);f>>=1;)++c;if(f=1<<c,--c,r.background!==void 0){if(d=r.background,d>=f)throw new Error("Background index out of range.");if(d===0)throw new Error("Background index explicitly passed as 0.")}}if(n[a++]=e&255,n[a++]=e>>8&255,n[a++]=t&255,n[a++]=t>>8&255,n[a++]=(o!==null?128:0)|c,n[a++]=d,n[a++]=0,o!==null)for(var p=0,g=o.length;p<g;++p){var m=o[p];n[a++]=m>>16&255,n[a++]=m>>8&255,n[a++]=m&255}if(s!==null){if(s<0||s>65535)throw new Error("Loop count invalid.");n[a++]=33,n[a++]=255,n[a++]=11,n[a++]=78,n[a++]=69,n[a++]=84,n[a++]=83,n[a++]=67,n[a++]=65,n[a++]=80,n[a++]=69,n[a++]=50,n[a++]=46,n[a++]=48,n[a++]=3,n[a++]=1,n[a++]=s&255,n[a++]=s>>8&255,n[a++]=0}var M=!1;this.addFrame=function(v,u,x,y,A,R){if(M===!0&&(--a,M=!1),R=R===void 0?{}:R,v<0||u<0||v>65535||u>65535)throw new Error("x/y invalid.");if(x<=0||y<=0||x>65535||y>65535)throw new Error("Width/Height invalid.");if(A.length<x*y)throw new Error("Not enough pixels for the frame size.");var P=!0,E=R.palette;if(E==null&&(P=!1,E=o),E==null)throw new Error("Must supply either a local or global palette.");for(var L=l(E),w=0;L>>=1;)++w;L=1<<w;var T=R.delay===void 0?0:R.delay,U=R.disposal===void 0?0:R.disposal;if(U<0||U>3)throw new Error("Disposal out of range.");var z=!1,k=0;if(R.transparent!==void 0&&R.transparent!==null&&(z=!0,k=R.transparent,k<0||k>=L))throw new Error("Transparent color index.");if((U!==0||z||T!==0)&&(n[a++]=33,n[a++]=249,n[a++]=4,n[a++]=U<<2|(z===!0?1:0),n[a++]=T&255,n[a++]=T>>8&255,n[a++]=k,n[a++]=0),n[a++]=44,n[a++]=v&255,n[a++]=v>>8&255,n[a++]=u&255,n[a++]=u>>8&255,n[a++]=x&255,n[a++]=x>>8&255,n[a++]=y&255,n[a++]=y>>8&255,n[a++]=P===!0?128|w-1:0,P===!0)for(var W=0,Q=E.length;W<Q;++W){var X=E[W];n[a++]=X>>16&255,n[a++]=X>>8&255,n[a++]=X&255}return a=ac(n,a,w<2?2:w,A),a},this.end=function(){return M===!1&&(n[a++]=59,M=!0),a},this.getOutputBuffer=function(){return n},this.setOutputBuffer=function(v){n=v},this.getOutputBufferPosition=function(){return a},this.setOutputBufferPosition=function(v){a=v}}function ac(n,e,t,i){n[e++]=t;var a=e++,r=1<<t,s=r-1,o=r+1,l=o+1,c=t+1,d=0,f=0;function p(R){for(;d>=R;)n[e++]=f&255,f>>=8,d-=8,e===a+256&&(n[a]=255,a=e++)}function g(R){f|=R<<d,d+=c,p(8)}var m=i[0]&s,M={};g(r);for(var v=1,u=i.length;v<u;++v){var x=i[v]&s,y=m<<8|x,A=M[y];if(A===void 0){for(f|=m<<d,d+=c;d>=8;)n[e++]=f&255,f>>=8,d-=8,e===a+256&&(n[a]=255,a=e++);l===4096?(g(r),l=o+1,c=t+1,M={}):(l>=1<<c&&++c,M[y]=l++),m=x}else m=A}return g(m),g(o),p(1),a+1===e?n[a]=0:(n[a]=e-a-1,n[e++]=0),e}function sc(n){var e=0;if(n[e++]!==71||n[e++]!==73||n[e++]!==70||n[e++]!==56||(n[e++]+1&253)!==56||n[e++]!==97)throw new Error("Invalid GIF 87a/89a header.");var t=n[e++]|n[e++]<<8,i=n[e++]|n[e++]<<8,a=n[e++],r=a>>7,s=a&7,o=1<<s+1;n[e++],n[e++];var l=null,c=null;r&&(l=e,c=o,e+=o*3);var d=!0,f=[],p=0,g=null,m=0,M=null;for(this.width=t,this.height=i;d&&e<n.length;)switch(n[e++]){case 33:switch(n[e++]){case 255:if(n[e]!==11||n[e+1]==78&&n[e+2]==69&&n[e+3]==84&&n[e+4]==83&&n[e+5]==67&&n[e+6]==65&&n[e+7]==80&&n[e+8]==69&&n[e+9]==50&&n[e+10]==46&&n[e+11]==48&&n[e+12]==3&&n[e+13]==1&&n[e+16]==0)e+=14,M=n[e++]|n[e++]<<8,e++;else for(e+=12;;){var v=n[e++];if(!(v>=0))throw Error("Invalid block size");if(v===0)break;e+=v}break;case 249:if(n[e++]!==4||n[e+4]!==0)throw new Error("Invalid graphics extension block.");var u=n[e++];p=n[e++]|n[e++]<<8,g=n[e++],u&1||(g=null),m=u>>2&7,e++;break;case 254:for(;;){var v=n[e++];if(!(v>=0))throw Error("Invalid block size");if(v===0)break;e+=v}break;default:throw new Error("Unknown graphic control label: 0x"+n[e-1].toString(16))}break;case 44:var x=n[e++]|n[e++]<<8,y=n[e++]|n[e++]<<8,A=n[e++]|n[e++]<<8,R=n[e++]|n[e++]<<8,P=n[e++],E=P>>7,L=P>>6&1,w=P&7,T=1<<w+1,U=l,z=c,k=!1;if(E){var k=!0;U=e,z=T,e+=T*3}var W=e;for(e++;;){var v=n[e++];if(!(v>=0))throw Error("Invalid block size");if(v===0)break;e+=v}f.push({x,y,width:A,height:R,has_local_palette:k,palette_offset:U,palette_size:z,data_offset:W,data_length:e-W,transparent_index:g,interlaced:!!L,delay:p,disposal:m});break;case 59:d=!1;break;default:throw new Error("Unknown gif block: 0x"+n[e-1].toString(16))}this.numFrames=function(){return f.length},this.loopCount=function(){return M},this.frameInfo=function(Q){if(Q<0||Q>=f.length)throw new Error("Frame index out of range.");return f[Q]},this.decodeAndBlitFrameBGRA=function(Q,X){var Z=this.frameInfo(Q),V=Z.width*Z.height,ce=new Uint8Array(V);Ns(n,Z.data_offset,ce,V);var me=Z.palette_offset,Ee=Z.transparent_index;Ee===null&&(Ee=256);var Ae=Z.width,Pe=t-Ae,Fe=Ae,Ce=(Z.y*t+Z.x)*4,ee=((Z.y+Z.height)*t+Z.x)*4,ne=Ce,ue=Pe*4;Z.interlaced===!0&&(ue+=t*4*7);for(var de=8,_e=0,Oe=ce.length;_e<Oe;++_e){var ye=ce[_e];if(Fe===0&&(ne+=ue,Fe=Ae,ne>=ee&&(ue=Pe*4+t*4*(de-1),ne=Ce+(Ae+Pe)*(de<<1),de>>=1)),ye===Ee)ne+=4;else{var N=n[me+ye*3],Ye=n[me+ye*3+1],Be=n[me+ye*3+2];X[ne++]=Be,X[ne++]=Ye,X[ne++]=N,X[ne++]=255}--Fe}},this.decodeAndBlitFrameRGBA=function(Q,X){var Z=this.frameInfo(Q),V=Z.width*Z.height,ce=new Uint8Array(V);Ns(n,Z.data_offset,ce,V);var me=Z.palette_offset,Ee=Z.transparent_index;Ee===null&&(Ee=256);var Ae=Z.width,Pe=t-Ae,Fe=Ae,Ce=(Z.y*t+Z.x)*4,ee=((Z.y+Z.height)*t+Z.x)*4,ne=Ce,ue=Pe*4;Z.interlaced===!0&&(ue+=t*4*7);for(var de=8,_e=0,Oe=ce.length;_e<Oe;++_e){var ye=ce[_e];if(Fe===0&&(ne+=ue,Fe=Ae,ne>=ee&&(ue=Pe*4+t*4*(de-1),ne=Ce+(Ae+Pe)*(de<<1),de>>=1)),ye===Ee)ne+=4;else{var N=n[me+ye*3],Ye=n[me+ye*3+1],Be=n[me+ye*3+2];X[ne++]=N,X[ne++]=Ye,X[ne++]=Be,X[ne++]=255}--Fe}}}function Ns(n,e,t,i){for(var a=n[e++],r=1<<a,s=r+1,o=s+1,l=a+1,c=(1<<l)-1,d=0,f=0,p=0,g=n[e++],m=new Int32Array(4096),M=null;;){for(;d<16&&g!==0;)f|=n[e++]<<d,d+=8,g===1?g=n[e++]:--g;if(d<l)break;var v=f&c;if(f>>=l,d-=l,v===r){o=s+1,l=a+1,c=(1<<l)-1,M=null;continue}else if(v===s)break;for(var u=v<o?v:M,x=0,y=u;y>r;)y=m[y]>>8,++x;var A=y,R=p+x+(u!==v?1:0);if(R>i){console.log("Warning, gif stream longer than expected.");return}t[p++]=A,p+=x;var P=p;for(u!==v&&(t[p++]=A),y=u;x--;)y=m[y],t[--P]=y&255,y>>=8;M!==null&&o<4096&&(m[o++]=M<<8|A,o>=c+1&&l<12&&(++l,c=c<<1|1)),M=v}return p!==i&&console.log("Warning, gif stream shorter than expected."),t}try{ic=Us.GifWriter=rc,Fs=Us.GifReader=sc}catch{}function oc(n){throw new Error('Could not dynamically require "'+n+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Os={exports:{}},Hr={},Bs;function wn(){return Bs||(Bs=1,function(n){var e=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";function t(r,s){return Object.prototype.hasOwnProperty.call(r,s)}n.assign=function(r){for(var s=Array.prototype.slice.call(arguments,1);s.length;){var o=s.shift();if(o){if(typeof o!="object")throw new TypeError(o+"must be non-object");for(var l in o)t(o,l)&&(r[l]=o[l])}}return r},n.shrinkBuf=function(r,s){return r.length===s?r:r.subarray?r.subarray(0,s):(r.length=s,r)};var i={arraySet:function(r,s,o,l,c){if(s.subarray&&r.subarray){r.set(s.subarray(o,o+l),c);return}for(var d=0;d<l;d++)r[c+d]=s[o+d]},flattenChunks:function(r){var s,o,l,c,d,f;for(l=0,s=0,o=r.length;s<o;s++)l+=r[s].length;for(f=new Uint8Array(l),c=0,s=0,o=r.length;s<o;s++)d=r[s],f.set(d,c),c+=d.length;return f}},a={arraySet:function(r,s,o,l,c){for(var d=0;d<l;d++)r[c+d]=s[o+d]},flattenChunks:function(r){return[].concat.apply([],r)}};n.setTyped=function(r){r?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(e)}(Hr)),Hr}var si={},Jt={},zn={},zs;function lc(){if(zs)return zn;zs=1;var n=wn(),e=4,t=0,i=1,a=2;function r(C){for(var te=C.length;--te>=0;)C[te]=0}var s=0,o=1,l=2,c=3,d=258,f=29,p=256,g=p+1+f,m=30,M=19,v=2*g+1,u=15,x=16,y=7,A=256,R=16,P=17,E=18,L=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],w=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],T=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],U=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=512,k=new Array((g+2)*2);r(k);var W=new Array(m*2);r(W);var Q=new Array(z);r(Q);var X=new Array(d-c+1);r(X);var Z=new Array(f);r(Z);var V=new Array(m);r(V);function ce(C,te,K,se,B){this.static_tree=C,this.extra_bits=te,this.extra_base=K,this.elems=se,this.max_length=B,this.has_stree=C&&C.length}var me,Ee,Ae;function Pe(C,te){this.dyn_tree=C,this.max_code=0,this.stat_desc=te}function Fe(C){return C<256?Q[C]:Q[256+(C>>>7)]}function Ce(C,te){C.pending_buf[C.pending++]=te&255,C.pending_buf[C.pending++]=te>>>8&255}function ee(C,te,K){C.bi_valid>x-K?(C.bi_buf|=te<<C.bi_valid&65535,Ce(C,C.bi_buf),C.bi_buf=te>>x-C.bi_valid,C.bi_valid+=K-x):(C.bi_buf|=te<<C.bi_valid&65535,C.bi_valid+=K)}function ne(C,te,K){ee(C,K[te*2],K[te*2+1])}function ue(C,te){var K=0;do K|=C&1,C>>>=1,K<<=1;while(--te>0);return K>>>1}function de(C){C.bi_valid===16?(Ce(C,C.bi_buf),C.bi_buf=0,C.bi_valid=0):C.bi_valid>=8&&(C.pending_buf[C.pending++]=C.bi_buf&255,C.bi_buf>>=8,C.bi_valid-=8)}function _e(C,te){var K=te.dyn_tree,se=te.max_code,B=te.stat_desc.static_tree,q=te.stat_desc.has_stree,_=te.stat_desc.extra_bits,ie=te.stat_desc.extra_base,O=te.stat_desc.max_length,h,H,Y,S,I,G,pe=0;for(S=0;S<=u;S++)C.bl_count[S]=0;for(K[C.heap[C.heap_max]*2+1]=0,h=C.heap_max+1;h<v;h++)H=C.heap[h],S=K[K[H*2+1]*2+1]+1,S>O&&(S=O,pe++),K[H*2+1]=S,!(H>se)&&(C.bl_count[S]++,I=0,H>=ie&&(I=_[H-ie]),G=K[H*2],C.opt_len+=G*(S+I),q&&(C.static_len+=G*(B[H*2+1]+I)));if(pe!==0){do{for(S=O-1;C.bl_count[S]===0;)S--;C.bl_count[S]--,C.bl_count[S+1]+=2,C.bl_count[O]--,pe-=2}while(pe>0);for(S=O;S!==0;S--)for(H=C.bl_count[S];H!==0;)Y=C.heap[--h],!(Y>se)&&(K[Y*2+1]!==S&&(C.opt_len+=(S-K[Y*2+1])*K[Y*2],K[Y*2+1]=S),H--)}}function Oe(C,te,K){var se=new Array(u+1),B=0,q,_;for(q=1;q<=u;q++)se[q]=B=B+K[q-1]<<1;for(_=0;_<=te;_++){var ie=C[_*2+1];ie!==0&&(C[_*2]=ue(se[ie]++,ie))}}function ye(){var C,te,K,se,B,q=new Array(u+1);for(K=0,se=0;se<f-1;se++)for(Z[se]=K,C=0;C<1<<L[se];C++)X[K++]=se;for(X[K-1]=se,B=0,se=0;se<16;se++)for(V[se]=B,C=0;C<1<<w[se];C++)Q[B++]=se;for(B>>=7;se<m;se++)for(V[se]=B<<7,C=0;C<1<<w[se]-7;C++)Q[256+B++]=se;for(te=0;te<=u;te++)q[te]=0;for(C=0;C<=143;)k[C*2+1]=8,C++,q[8]++;for(;C<=255;)k[C*2+1]=9,C++,q[9]++;for(;C<=279;)k[C*2+1]=7,C++,q[7]++;for(;C<=287;)k[C*2+1]=8,C++,q[8]++;for(Oe(k,g+1,q),C=0;C<m;C++)W[C*2+1]=5,W[C*2]=ue(C,5);me=new ce(k,L,p+1,g,u),Ee=new ce(W,w,0,m,u),Ae=new ce(new Array(0),T,0,M,y)}function N(C){var te;for(te=0;te<g;te++)C.dyn_ltree[te*2]=0;for(te=0;te<m;te++)C.dyn_dtree[te*2]=0;for(te=0;te<M;te++)C.bl_tree[te*2]=0;C.dyn_ltree[A*2]=1,C.opt_len=C.static_len=0,C.last_lit=C.matches=0}function Ye(C){C.bi_valid>8?Ce(C,C.bi_buf):C.bi_valid>0&&(C.pending_buf[C.pending++]=C.bi_buf),C.bi_buf=0,C.bi_valid=0}function Be(C,te,K,se){Ye(C),Ce(C,K),Ce(C,~K),n.arraySet(C.pending_buf,C.window,te,K,C.pending),C.pending+=K}function Le(C,te,K,se){var B=te*2,q=K*2;return C[B]<C[q]||C[B]===C[q]&&se[te]<=se[K]}function Me(C,te,K){for(var se=C.heap[K],B=K<<1;B<=C.heap_len&&(B<C.heap_len&&Le(te,C.heap[B+1],C.heap[B],C.depth)&&B++,!Le(te,se,C.heap[B],C.depth));)C.heap[K]=C.heap[B],K=B,B<<=1;C.heap[K]=se}function Re(C,te,K){var se,B,q=0,_,ie;if(C.last_lit!==0)do se=C.pending_buf[C.d_buf+q*2]<<8|C.pending_buf[C.d_buf+q*2+1],B=C.pending_buf[C.l_buf+q],q++,se===0?ne(C,B,te):(_=X[B],ne(C,_+p+1,te),ie=L[_],ie!==0&&(B-=Z[_],ee(C,B,ie)),se--,_=Fe(se),ne(C,_,K),ie=w[_],ie!==0&&(se-=V[_],ee(C,se,ie)));while(q<C.last_lit);ne(C,A,te)}function Te(C,te){var K=te.dyn_tree,se=te.stat_desc.static_tree,B=te.stat_desc.has_stree,q=te.stat_desc.elems,_,ie,O=-1,h;for(C.heap_len=0,C.heap_max=v,_=0;_<q;_++)K[_*2]!==0?(C.heap[++C.heap_len]=O=_,C.depth[_]=0):K[_*2+1]=0;for(;C.heap_len<2;)h=C.heap[++C.heap_len]=O<2?++O:0,K[h*2]=1,C.depth[h]=0,C.opt_len--,B&&(C.static_len-=se[h*2+1]);for(te.max_code=O,_=C.heap_len>>1;_>=1;_--)Me(C,K,_);h=q;do _=C.heap[1],C.heap[1]=C.heap[C.heap_len--],Me(C,K,1),ie=C.heap[1],C.heap[--C.heap_max]=_,C.heap[--C.heap_max]=ie,K[h*2]=K[_*2]+K[ie*2],C.depth[h]=(C.depth[_]>=C.depth[ie]?C.depth[_]:C.depth[ie])+1,K[_*2+1]=K[ie*2+1]=h,C.heap[1]=h++,Me(C,K,1);while(C.heap_len>=2);C.heap[--C.heap_max]=C.heap[1],_e(C,te),Oe(K,O,C.bl_count)}function We(C,te,K){var se,B=-1,q,_=te[0*2+1],ie=0,O=7,h=4;for(_===0&&(O=138,h=3),te[(K+1)*2+1]=65535,se=0;se<=K;se++)q=_,_=te[(se+1)*2+1],!(++ie<O&&q===_)&&(ie<h?C.bl_tree[q*2]+=ie:q!==0?(q!==B&&C.bl_tree[q*2]++,C.bl_tree[R*2]++):ie<=10?C.bl_tree[P*2]++:C.bl_tree[E*2]++,ie=0,B=q,_===0?(O=138,h=3):q===_?(O=6,h=3):(O=7,h=4))}function lt(C,te,K){var se,B=-1,q,_=te[0*2+1],ie=0,O=7,h=4;for(_===0&&(O=138,h=3),se=0;se<=K;se++)if(q=_,_=te[(se+1)*2+1],!(++ie<O&&q===_)){if(ie<h)do ne(C,q,C.bl_tree);while(--ie!==0);else q!==0?(q!==B&&(ne(C,q,C.bl_tree),ie--),ne(C,R,C.bl_tree),ee(C,ie-3,2)):ie<=10?(ne(C,P,C.bl_tree),ee(C,ie-3,3)):(ne(C,E,C.bl_tree),ee(C,ie-11,7));ie=0,B=q,_===0?(O=138,h=3):q===_?(O=6,h=3):(O=7,h=4)}}function et(C){var te;for(We(C,C.dyn_ltree,C.l_desc.max_code),We(C,C.dyn_dtree,C.d_desc.max_code),Te(C,C.bl_desc),te=M-1;te>=3&&C.bl_tree[U[te]*2+1]===0;te--);return C.opt_len+=3*(te+1)+5+5+4,te}function F(C,te,K,se){var B;for(ee(C,te-257,5),ee(C,K-1,5),ee(C,se-4,4),B=0;B<se;B++)ee(C,C.bl_tree[U[B]*2+1],3);lt(C,C.dyn_ltree,te-1),lt(C,C.dyn_dtree,K-1)}function b(C){var te=4093624447,K;for(K=0;K<=31;K++,te>>>=1)if(te&1&&C.dyn_ltree[K*2]!==0)return t;if(C.dyn_ltree[9*2]!==0||C.dyn_ltree[10*2]!==0||C.dyn_ltree[13*2]!==0)return i;for(K=32;K<p;K++)if(C.dyn_ltree[K*2]!==0)return i;return t}var J=!1;function fe(C){J||(ye(),J=!0),C.l_desc=new Pe(C.dyn_ltree,me),C.d_desc=new Pe(C.dyn_dtree,Ee),C.bl_desc=new Pe(C.bl_tree,Ae),C.bi_buf=0,C.bi_valid=0,N(C)}function he(C,te,K,se){ee(C,(s<<1)+(se?1:0),3),Be(C,te,K)}function ae(C){ee(C,o<<1,3),ne(C,A,k),de(C)}function De(C,te,K,se){var B,q,_=0;C.level>0?(C.strm.data_type===a&&(C.strm.data_type=b(C)),Te(C,C.l_desc),Te(C,C.d_desc),_=et(C),B=C.opt_len+3+7>>>3,q=C.static_len+3+7>>>3,q<=B&&(B=q)):B=q=K+5,K+4<=B&&te!==-1?he(C,te,K,se):C.strategy===e||q===B?(ee(C,(o<<1)+(se?1:0),3),Re(C,k,W)):(ee(C,(l<<1)+(se?1:0),3),F(C,C.l_desc.max_code+1,C.d_desc.max_code+1,_+1),Re(C,C.dyn_ltree,C.dyn_dtree)),N(C),se&&Ye(C)}function Se(C,te,K){return C.pending_buf[C.d_buf+C.last_lit*2]=te>>>8&255,C.pending_buf[C.d_buf+C.last_lit*2+1]=te&255,C.pending_buf[C.l_buf+C.last_lit]=K&255,C.last_lit++,te===0?C.dyn_ltree[K*2]++:(C.matches++,te--,C.dyn_ltree[(X[K]+p+1)*2]++,C.dyn_dtree[Fe(te)*2]++),C.last_lit===C.lit_bufsize-1}return zn._tr_init=fe,zn._tr_stored_block=he,zn._tr_flush_block=De,zn._tr_tally=Se,zn._tr_align=ae,zn}var Gr,ks;function Hs(){if(ks)return Gr;ks=1;function n(e,t,i,a){for(var r=e&65535|0,s=e>>>16&65535|0,o=0;i!==0;){o=i>2e3?2e3:i,i-=o;do r=r+t[a++]|0,s=s+r|0;while(--o);r%=65521,s%=65521}return r|s<<16|0}return Gr=n,Gr}var Vr,Gs;function Vs(){if(Gs)return Vr;Gs=1;function n(){for(var i,a=[],r=0;r<256;r++){i=r;for(var s=0;s<8;s++)i=i&1?3988292384^i>>>1:i>>>1;a[r]=i}return a}var e=n();function t(i,a,r,s){var o=e,l=s+r;i^=-1;for(var c=s;c<l;c++)i=i>>>8^o[(i^a[c])&255];return i^-1}return Vr=t,Vr}var Wr,Ws;function Xr(){return Ws||(Ws=1,Wr={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}),Wr}var Xs;function cc(){if(Xs)return Jt;Xs=1;var n=wn(),e=lc(),t=Hs(),i=Vs(),a=Xr(),r=0,s=1,o=3,l=4,c=5,d=0,f=1,p=-2,g=-3,m=-5,M=-1,v=1,u=2,x=3,y=4,A=0,R=2,P=8,E=9,L=15,w=8,T=29,U=256,z=U+1+T,k=30,W=19,Q=2*z+1,X=15,Z=3,V=258,ce=V+Z+1,me=32,Ee=42,Ae=69,Pe=73,Fe=91,Ce=103,ee=113,ne=666,ue=1,de=2,_e=3,Oe=4,ye=3;function N(h,H){return h.msg=a[H],H}function Ye(h){return(h<<1)-(h>4?9:0)}function Be(h){for(var H=h.length;--H>=0;)h[H]=0}function Le(h){var H=h.state,Y=H.pending;Y>h.avail_out&&(Y=h.avail_out),Y!==0&&(n.arraySet(h.output,H.pending_buf,H.pending_out,Y,h.next_out),h.next_out+=Y,H.pending_out+=Y,h.total_out+=Y,h.avail_out-=Y,H.pending-=Y,H.pending===0&&(H.pending_out=0))}function Me(h,H){e._tr_flush_block(h,h.block_start>=0?h.block_start:-1,h.strstart-h.block_start,H),h.block_start=h.strstart,Le(h.strm)}function Re(h,H){h.pending_buf[h.pending++]=H}function Te(h,H){h.pending_buf[h.pending++]=H>>>8&255,h.pending_buf[h.pending++]=H&255}function We(h,H,Y,S){var I=h.avail_in;return I>S&&(I=S),I===0?0:(h.avail_in-=I,n.arraySet(H,h.input,h.next_in,I,Y),h.state.wrap===1?h.adler=t(h.adler,H,I,Y):h.state.wrap===2&&(h.adler=i(h.adler,H,I,Y)),h.next_in+=I,h.total_in+=I,I)}function lt(h,H){var Y=h.max_chain_length,S=h.strstart,I,G,pe=h.prev_length,ge=h.nice_match,ve=h.strstart>h.w_size-ce?h.strstart-(h.w_size-ce):0,Xe=h.window,gt=h.w_mask,dt=h.prev,Qe=h.strstart+V,mt=Xe[S+pe-1],Ie=Xe[S+pe];h.prev_length>=h.good_match&&(Y>>=2),ge>h.lookahead&&(ge=h.lookahead);do if(I=H,!(Xe[I+pe]!==Ie||Xe[I+pe-1]!==mt||Xe[I]!==Xe[S]||Xe[++I]!==Xe[S+1])){S+=2,I++;do;while(Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&Xe[++S]===Xe[++I]&&S<Qe);if(G=V-(Qe-S),S=Qe-V,G>pe){if(h.match_start=H,pe=G,G>=ge)break;mt=Xe[S+pe-1],Ie=Xe[S+pe]}}while((H=dt[H&gt])>ve&&--Y!==0);return pe<=h.lookahead?pe:h.lookahead}function et(h){var H=h.w_size,Y,S,I,G,pe;do{if(G=h.window_size-h.lookahead-h.strstart,h.strstart>=H+(H-ce)){n.arraySet(h.window,h.window,H,H,0),h.match_start-=H,h.strstart-=H,h.block_start-=H,S=h.hash_size,Y=S;do I=h.head[--Y],h.head[Y]=I>=H?I-H:0;while(--S);S=H,Y=S;do I=h.prev[--Y],h.prev[Y]=I>=H?I-H:0;while(--S);G+=H}if(h.strm.avail_in===0)break;if(S=We(h.strm,h.window,h.strstart+h.lookahead,G),h.lookahead+=S,h.lookahead+h.insert>=Z)for(pe=h.strstart-h.insert,h.ins_h=h.window[pe],h.ins_h=(h.ins_h<<h.hash_shift^h.window[pe+1])&h.hash_mask;h.insert&&(h.ins_h=(h.ins_h<<h.hash_shift^h.window[pe+Z-1])&h.hash_mask,h.prev[pe&h.w_mask]=h.head[h.ins_h],h.head[h.ins_h]=pe,pe++,h.insert--,!(h.lookahead+h.insert<Z)););}while(h.lookahead<ce&&h.strm.avail_in!==0)}function F(h,H){var Y=65535;for(Y>h.pending_buf_size-5&&(Y=h.pending_buf_size-5);;){if(h.lookahead<=1){if(et(h),h.lookahead===0&&H===r)return ue;if(h.lookahead===0)break}h.strstart+=h.lookahead,h.lookahead=0;var S=h.block_start+Y;if((h.strstart===0||h.strstart>=S)&&(h.lookahead=h.strstart-S,h.strstart=S,Me(h,!1),h.strm.avail_out===0)||h.strstart-h.block_start>=h.w_size-ce&&(Me(h,!1),h.strm.avail_out===0))return ue}return h.insert=0,H===l?(Me(h,!0),h.strm.avail_out===0?_e:Oe):(h.strstart>h.block_start&&(Me(h,!1),h.strm.avail_out===0),ue)}function b(h,H){for(var Y,S;;){if(h.lookahead<ce){if(et(h),h.lookahead<ce&&H===r)return ue;if(h.lookahead===0)break}if(Y=0,h.lookahead>=Z&&(h.ins_h=(h.ins_h<<h.hash_shift^h.window[h.strstart+Z-1])&h.hash_mask,Y=h.prev[h.strstart&h.w_mask]=h.head[h.ins_h],h.head[h.ins_h]=h.strstart),Y!==0&&h.strstart-Y<=h.w_size-ce&&(h.match_length=lt(h,Y)),h.match_length>=Z)if(S=e._tr_tally(h,h.strstart-h.match_start,h.match_length-Z),h.lookahead-=h.match_length,h.match_length<=h.max_lazy_match&&h.lookahead>=Z){h.match_length--;do h.strstart++,h.ins_h=(h.ins_h<<h.hash_shift^h.window[h.strstart+Z-1])&h.hash_mask,Y=h.prev[h.strstart&h.w_mask]=h.head[h.ins_h],h.head[h.ins_h]=h.strstart;while(--h.match_length!==0);h.strstart++}else h.strstart+=h.match_length,h.match_length=0,h.ins_h=h.window[h.strstart],h.ins_h=(h.ins_h<<h.hash_shift^h.window[h.strstart+1])&h.hash_mask;else S=e._tr_tally(h,0,h.window[h.strstart]),h.lookahead--,h.strstart++;if(S&&(Me(h,!1),h.strm.avail_out===0))return ue}return h.insert=h.strstart<Z-1?h.strstart:Z-1,H===l?(Me(h,!0),h.strm.avail_out===0?_e:Oe):h.last_lit&&(Me(h,!1),h.strm.avail_out===0)?ue:de}function J(h,H){for(var Y,S,I;;){if(h.lookahead<ce){if(et(h),h.lookahead<ce&&H===r)return ue;if(h.lookahead===0)break}if(Y=0,h.lookahead>=Z&&(h.ins_h=(h.ins_h<<h.hash_shift^h.window[h.strstart+Z-1])&h.hash_mask,Y=h.prev[h.strstart&h.w_mask]=h.head[h.ins_h],h.head[h.ins_h]=h.strstart),h.prev_length=h.match_length,h.prev_match=h.match_start,h.match_length=Z-1,Y!==0&&h.prev_length<h.max_lazy_match&&h.strstart-Y<=h.w_size-ce&&(h.match_length=lt(h,Y),h.match_length<=5&&(h.strategy===v||h.match_length===Z&&h.strstart-h.match_start>4096)&&(h.match_length=Z-1)),h.prev_length>=Z&&h.match_length<=h.prev_length){I=h.strstart+h.lookahead-Z,S=e._tr_tally(h,h.strstart-1-h.prev_match,h.prev_length-Z),h.lookahead-=h.prev_length-1,h.prev_length-=2;do++h.strstart<=I&&(h.ins_h=(h.ins_h<<h.hash_shift^h.window[h.strstart+Z-1])&h.hash_mask,Y=h.prev[h.strstart&h.w_mask]=h.head[h.ins_h],h.head[h.ins_h]=h.strstart);while(--h.prev_length!==0);if(h.match_available=0,h.match_length=Z-1,h.strstart++,S&&(Me(h,!1),h.strm.avail_out===0))return ue}else if(h.match_available){if(S=e._tr_tally(h,0,h.window[h.strstart-1]),S&&Me(h,!1),h.strstart++,h.lookahead--,h.strm.avail_out===0)return ue}else h.match_available=1,h.strstart++,h.lookahead--}return h.match_available&&(S=e._tr_tally(h,0,h.window[h.strstart-1]),h.match_available=0),h.insert=h.strstart<Z-1?h.strstart:Z-1,H===l?(Me(h,!0),h.strm.avail_out===0?_e:Oe):h.last_lit&&(Me(h,!1),h.strm.avail_out===0)?ue:de}function fe(h,H){for(var Y,S,I,G,pe=h.window;;){if(h.lookahead<=V){if(et(h),h.lookahead<=V&&H===r)return ue;if(h.lookahead===0)break}if(h.match_length=0,h.lookahead>=Z&&h.strstart>0&&(I=h.strstart-1,S=pe[I],S===pe[++I]&&S===pe[++I]&&S===pe[++I])){G=h.strstart+V;do;while(S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&S===pe[++I]&&I<G);h.match_length=V-(G-I),h.match_length>h.lookahead&&(h.match_length=h.lookahead)}if(h.match_length>=Z?(Y=e._tr_tally(h,1,h.match_length-Z),h.lookahead-=h.match_length,h.strstart+=h.match_length,h.match_length=0):(Y=e._tr_tally(h,0,h.window[h.strstart]),h.lookahead--,h.strstart++),Y&&(Me(h,!1),h.strm.avail_out===0))return ue}return h.insert=0,H===l?(Me(h,!0),h.strm.avail_out===0?_e:Oe):h.last_lit&&(Me(h,!1),h.strm.avail_out===0)?ue:de}function he(h,H){for(var Y;;){if(h.lookahead===0&&(et(h),h.lookahead===0)){if(H===r)return ue;break}if(h.match_length=0,Y=e._tr_tally(h,0,h.window[h.strstart]),h.lookahead--,h.strstart++,Y&&(Me(h,!1),h.strm.avail_out===0))return ue}return h.insert=0,H===l?(Me(h,!0),h.strm.avail_out===0?_e:Oe):h.last_lit&&(Me(h,!1),h.strm.avail_out===0)?ue:de}function ae(h,H,Y,S,I){this.good_length=h,this.max_lazy=H,this.nice_length=Y,this.max_chain=S,this.func=I}var De;De=[new ae(0,0,0,0,F),new ae(4,4,8,4,b),new ae(4,5,16,8,b),new ae(4,6,32,32,b),new ae(4,4,16,16,J),new ae(8,16,32,32,J),new ae(8,16,128,128,J),new ae(8,32,128,256,J),new ae(32,128,258,1024,J),new ae(32,258,258,4096,J)];function Se(h){h.window_size=2*h.w_size,Be(h.head),h.max_lazy_match=De[h.level].max_lazy,h.good_match=De[h.level].good_length,h.nice_match=De[h.level].nice_length,h.max_chain_length=De[h.level].max_chain,h.strstart=0,h.block_start=0,h.lookahead=0,h.insert=0,h.match_length=h.prev_length=Z-1,h.match_available=0,h.ins_h=0}function C(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=P,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new n.Buf16(Q*2),this.dyn_dtree=new n.Buf16((2*k+1)*2),this.bl_tree=new n.Buf16((2*W+1)*2),Be(this.dyn_ltree),Be(this.dyn_dtree),Be(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new n.Buf16(X+1),this.heap=new n.Buf16(2*z+1),Be(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new n.Buf16(2*z+1),Be(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function te(h){var H;return!h||!h.state?N(h,p):(h.total_in=h.total_out=0,h.data_type=R,H=h.state,H.pending=0,H.pending_out=0,H.wrap<0&&(H.wrap=-H.wrap),H.status=H.wrap?Ee:ee,h.adler=H.wrap===2?0:1,H.last_flush=r,e._tr_init(H),d)}function K(h){var H=te(h);return H===d&&Se(h.state),H}function se(h,H){return!h||!h.state||h.state.wrap!==2?p:(h.state.gzhead=H,d)}function B(h,H,Y,S,I,G){if(!h)return p;var pe=1;if(H===M&&(H=6),S<0?(pe=0,S=-S):S>15&&(pe=2,S-=16),I<1||I>E||Y!==P||S<8||S>15||H<0||H>9||G<0||G>y)return N(h,p);S===8&&(S=9);var ge=new C;return h.state=ge,ge.strm=h,ge.wrap=pe,ge.gzhead=null,ge.w_bits=S,ge.w_size=1<<ge.w_bits,ge.w_mask=ge.w_size-1,ge.hash_bits=I+7,ge.hash_size=1<<ge.hash_bits,ge.hash_mask=ge.hash_size-1,ge.hash_shift=~~((ge.hash_bits+Z-1)/Z),ge.window=new n.Buf8(ge.w_size*2),ge.head=new n.Buf16(ge.hash_size),ge.prev=new n.Buf16(ge.w_size),ge.lit_bufsize=1<<I+6,ge.pending_buf_size=ge.lit_bufsize*4,ge.pending_buf=new n.Buf8(ge.pending_buf_size),ge.d_buf=1*ge.lit_bufsize,ge.l_buf=3*ge.lit_bufsize,ge.level=H,ge.strategy=G,ge.method=Y,K(h)}function q(h,H){return B(h,H,P,L,w,A)}function _(h,H){var Y,S,I,G;if(!h||!h.state||H>c||H<0)return h?N(h,p):p;if(S=h.state,!h.output||!h.input&&h.avail_in!==0||S.status===ne&&H!==l)return N(h,h.avail_out===0?m:p);if(S.strm=h,Y=S.last_flush,S.last_flush=H,S.status===Ee)if(S.wrap===2)h.adler=0,Re(S,31),Re(S,139),Re(S,8),S.gzhead?(Re(S,(S.gzhead.text?1:0)+(S.gzhead.hcrc?2:0)+(S.gzhead.extra?4:0)+(S.gzhead.name?8:0)+(S.gzhead.comment?16:0)),Re(S,S.gzhead.time&255),Re(S,S.gzhead.time>>8&255),Re(S,S.gzhead.time>>16&255),Re(S,S.gzhead.time>>24&255),Re(S,S.level===9?2:S.strategy>=u||S.level<2?4:0),Re(S,S.gzhead.os&255),S.gzhead.extra&&S.gzhead.extra.length&&(Re(S,S.gzhead.extra.length&255),Re(S,S.gzhead.extra.length>>8&255)),S.gzhead.hcrc&&(h.adler=i(h.adler,S.pending_buf,S.pending,0)),S.gzindex=0,S.status=Ae):(Re(S,0),Re(S,0),Re(S,0),Re(S,0),Re(S,0),Re(S,S.level===9?2:S.strategy>=u||S.level<2?4:0),Re(S,ye),S.status=ee);else{var pe=P+(S.w_bits-8<<4)<<8,ge=-1;S.strategy>=u||S.level<2?ge=0:S.level<6?ge=1:S.level===6?ge=2:ge=3,pe|=ge<<6,S.strstart!==0&&(pe|=me),pe+=31-pe%31,S.status=ee,Te(S,pe),S.strstart!==0&&(Te(S,h.adler>>>16),Te(S,h.adler&65535)),h.adler=1}if(S.status===Ae)if(S.gzhead.extra){for(I=S.pending;S.gzindex<(S.gzhead.extra.length&65535)&&!(S.pending===S.pending_buf_size&&(S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),Le(h),I=S.pending,S.pending===S.pending_buf_size));)Re(S,S.gzhead.extra[S.gzindex]&255),S.gzindex++;S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),S.gzindex===S.gzhead.extra.length&&(S.gzindex=0,S.status=Pe)}else S.status=Pe;if(S.status===Pe)if(S.gzhead.name){I=S.pending;do{if(S.pending===S.pending_buf_size&&(S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),Le(h),I=S.pending,S.pending===S.pending_buf_size)){G=1;break}S.gzindex<S.gzhead.name.length?G=S.gzhead.name.charCodeAt(S.gzindex++)&255:G=0,Re(S,G)}while(G!==0);S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),G===0&&(S.gzindex=0,S.status=Fe)}else S.status=Fe;if(S.status===Fe)if(S.gzhead.comment){I=S.pending;do{if(S.pending===S.pending_buf_size&&(S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),Le(h),I=S.pending,S.pending===S.pending_buf_size)){G=1;break}S.gzindex<S.gzhead.comment.length?G=S.gzhead.comment.charCodeAt(S.gzindex++)&255:G=0,Re(S,G)}while(G!==0);S.gzhead.hcrc&&S.pending>I&&(h.adler=i(h.adler,S.pending_buf,S.pending-I,I)),G===0&&(S.status=Ce)}else S.status=Ce;if(S.status===Ce&&(S.gzhead.hcrc?(S.pending+2>S.pending_buf_size&&Le(h),S.pending+2<=S.pending_buf_size&&(Re(S,h.adler&255),Re(S,h.adler>>8&255),h.adler=0,S.status=ee)):S.status=ee),S.pending!==0){if(Le(h),h.avail_out===0)return S.last_flush=-1,d}else if(h.avail_in===0&&Ye(H)<=Ye(Y)&&H!==l)return N(h,m);if(S.status===ne&&h.avail_in!==0)return N(h,m);if(h.avail_in!==0||S.lookahead!==0||H!==r&&S.status!==ne){var ve=S.strategy===u?he(S,H):S.strategy===x?fe(S,H):De[S.level].func(S,H);if((ve===_e||ve===Oe)&&(S.status=ne),ve===ue||ve===_e)return h.avail_out===0&&(S.last_flush=-1),d;if(ve===de&&(H===s?e._tr_align(S):H!==c&&(e._tr_stored_block(S,0,0,!1),H===o&&(Be(S.head),S.lookahead===0&&(S.strstart=0,S.block_start=0,S.insert=0))),Le(h),h.avail_out===0))return S.last_flush=-1,d}return H!==l?d:S.wrap<=0?f:(S.wrap===2?(Re(S,h.adler&255),Re(S,h.adler>>8&255),Re(S,h.adler>>16&255),Re(S,h.adler>>24&255),Re(S,h.total_in&255),Re(S,h.total_in>>8&255),Re(S,h.total_in>>16&255),Re(S,h.total_in>>24&255)):(Te(S,h.adler>>>16),Te(S,h.adler&65535)),Le(h),S.wrap>0&&(S.wrap=-S.wrap),S.pending!==0?d:f)}function ie(h){var H;return!h||!h.state?p:(H=h.state.status,H!==Ee&&H!==Ae&&H!==Pe&&H!==Fe&&H!==Ce&&H!==ee&&H!==ne?N(h,p):(h.state=null,H===ee?N(h,g):d))}function O(h,H){var Y=H.length,S,I,G,pe,ge,ve,Xe,gt;if(!h||!h.state||(S=h.state,pe=S.wrap,pe===2||pe===1&&S.status!==Ee||S.lookahead))return p;for(pe===1&&(h.adler=t(h.adler,H,Y,0)),S.wrap=0,Y>=S.w_size&&(pe===0&&(Be(S.head),S.strstart=0,S.block_start=0,S.insert=0),gt=new n.Buf8(S.w_size),n.arraySet(gt,H,Y-S.w_size,S.w_size,0),H=gt,Y=S.w_size),ge=h.avail_in,ve=h.next_in,Xe=h.input,h.avail_in=Y,h.next_in=0,h.input=H,et(S);S.lookahead>=Z;){I=S.strstart,G=S.lookahead-(Z-1);do S.ins_h=(S.ins_h<<S.hash_shift^S.window[I+Z-1])&S.hash_mask,S.prev[I&S.w_mask]=S.head[S.ins_h],S.head[S.ins_h]=I,I++;while(--G);S.strstart=I,S.lookahead=Z-1,et(S)}return S.strstart+=S.lookahead,S.block_start=S.strstart,S.insert=S.lookahead,S.lookahead=0,S.match_length=S.prev_length=Z-1,S.match_available=0,h.next_in=ve,h.input=Xe,h.avail_in=ge,S.wrap=pe,d}return Jt.deflateInit=q,Jt.deflateInit2=B,Jt.deflateReset=K,Jt.deflateResetKeep=te,Jt.deflateSetHeader=se,Jt.deflate=_,Jt.deflateEnd=ie,Jt.deflateSetDictionary=O,Jt.deflateInfo="pako deflate (from Nodeca project)",Jt}var kn={},Ys;function qs(){if(Ys)return kn;Ys=1;var n=wn(),e=!0,t=!0;try{String.fromCharCode.apply(null,[0])}catch{e=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{t=!1}for(var i=new n.Buf8(256),a=0;a<256;a++)i[a]=a>=252?6:a>=248?5:a>=240?4:a>=224?3:a>=192?2:1;i[254]=i[254]=1,kn.string2buf=function(s){var o,l,c,d,f,p=s.length,g=0;for(d=0;d<p;d++)l=s.charCodeAt(d),(l&64512)===55296&&d+1<p&&(c=s.charCodeAt(d+1),(c&64512)===56320&&(l=65536+(l-55296<<10)+(c-56320),d++)),g+=l<128?1:l<2048?2:l<65536?3:4;for(o=new n.Buf8(g),f=0,d=0;f<g;d++)l=s.charCodeAt(d),(l&64512)===55296&&d+1<p&&(c=s.charCodeAt(d+1),(c&64512)===56320&&(l=65536+(l-55296<<10)+(c-56320),d++)),l<128?o[f++]=l:l<2048?(o[f++]=192|l>>>6,o[f++]=128|l&63):l<65536?(o[f++]=224|l>>>12,o[f++]=128|l>>>6&63,o[f++]=128|l&63):(o[f++]=240|l>>>18,o[f++]=128|l>>>12&63,o[f++]=128|l>>>6&63,o[f++]=128|l&63);return o};function r(s,o){if(o<65534&&(s.subarray&&t||!s.subarray&&e))return String.fromCharCode.apply(null,n.shrinkBuf(s,o));for(var l="",c=0;c<o;c++)l+=String.fromCharCode(s[c]);return l}return kn.buf2binstring=function(s){return r(s,s.length)},kn.binstring2buf=function(s){for(var o=new n.Buf8(s.length),l=0,c=o.length;l<c;l++)o[l]=s.charCodeAt(l);return o},kn.buf2string=function(s,o){var l,c,d,f,p=o||s.length,g=new Array(p*2);for(c=0,l=0;l<p;){if(d=s[l++],d<128){g[c++]=d;continue}if(f=i[d],f>4){g[c++]=65533,l+=f-1;continue}for(d&=f===2?31:f===3?15:7;f>1&&l<p;)d=d<<6|s[l++]&63,f--;if(f>1){g[c++]=65533;continue}d<65536?g[c++]=d:(d-=65536,g[c++]=55296|d>>10&1023,g[c++]=56320|d&1023)}return r(g,c)},kn.utf8border=function(s,o){var l;for(o=o||s.length,o>s.length&&(o=s.length),l=o-1;l>=0&&(s[l]&192)===128;)l--;return l<0||l===0?o:l+i[s[l]]>o?l:o},kn}var Yr,Zs;function Ks(){if(Zs)return Yr;Zs=1;function n(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}return Yr=n,Yr}var Qs;function fc(){if(Qs)return si;Qs=1;var n=cc(),e=wn(),t=qs(),i=Xr(),a=Ks(),r=Object.prototype.toString,s=0,o=4,l=0,c=1,d=2,f=-1,p=0,g=8;function m(x){if(!(this instanceof m))return new m(x);this.options=e.assign({level:f,method:g,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},x||{});var y=this.options;y.raw&&y.windowBits>0?y.windowBits=-y.windowBits:y.gzip&&y.windowBits>0&&y.windowBits<16&&(y.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new a,this.strm.avail_out=0;var A=n.deflateInit2(this.strm,y.level,y.method,y.windowBits,y.memLevel,y.strategy);if(A!==l)throw new Error(i[A]);if(y.header&&n.deflateSetHeader(this.strm,y.header),y.dictionary){var R;if(typeof y.dictionary=="string"?R=t.string2buf(y.dictionary):r.call(y.dictionary)==="[object ArrayBuffer]"?R=new Uint8Array(y.dictionary):R=y.dictionary,A=n.deflateSetDictionary(this.strm,R),A!==l)throw new Error(i[A]);this._dict_set=!0}}m.prototype.push=function(x,y){var A=this.strm,R=this.options.chunkSize,P,E;if(this.ended)return!1;E=y===~~y?y:y===!0?o:s,typeof x=="string"?A.input=t.string2buf(x):r.call(x)==="[object ArrayBuffer]"?A.input=new Uint8Array(x):A.input=x,A.next_in=0,A.avail_in=A.input.length;do{if(A.avail_out===0&&(A.output=new e.Buf8(R),A.next_out=0,A.avail_out=R),P=n.deflate(A,E),P!==c&&P!==l)return this.onEnd(P),this.ended=!0,!1;(A.avail_out===0||A.avail_in===0&&(E===o||E===d))&&(this.options.to==="string"?this.onData(t.buf2binstring(e.shrinkBuf(A.output,A.next_out))):this.onData(e.shrinkBuf(A.output,A.next_out)))}while((A.avail_in>0||A.avail_out===0)&&P!==c);return E===o?(P=n.deflateEnd(this.strm),this.onEnd(P),this.ended=!0,P===l):(E===d&&(this.onEnd(l),A.avail_out=0),!0)},m.prototype.onData=function(x){this.chunks.push(x)},m.prototype.onEnd=function(x){x===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=e.flattenChunks(this.chunks)),this.chunks=[],this.err=x,this.msg=this.strm.msg};function M(x,y){var A=new m(y);if(A.push(x,!0),A.err)throw A.msg||i[A.err];return A.result}function v(x,y){return y=y||{},y.raw=!0,M(x,y)}function u(x,y){return y=y||{},y.gzip=!0,M(x,y)}return si.Deflate=m,si.deflate=M,si.deflateRaw=v,si.gzip=u,si}var oi={},Yt={},qr,js;function uc(){if(js)return qr;js=1;var n=30,e=12;return qr=function(i,a){var r,s,o,l,c,d,f,p,g,m,M,v,u,x,y,A,R,P,E,L,w,T,U,z,k;r=i.state,s=i.next_in,z=i.input,o=s+(i.avail_in-5),l=i.next_out,k=i.output,c=l-(a-i.avail_out),d=l+(i.avail_out-257),f=r.dmax,p=r.wsize,g=r.whave,m=r.wnext,M=r.window,v=r.hold,u=r.bits,x=r.lencode,y=r.distcode,A=(1<<r.lenbits)-1,R=(1<<r.distbits)-1;e:do{u<15&&(v+=z[s++]<<u,u+=8,v+=z[s++]<<u,u+=8),P=x[v&A];t:for(;;){if(E=P>>>24,v>>>=E,u-=E,E=P>>>16&255,E===0)k[l++]=P&65535;else if(E&16){L=P&65535,E&=15,E&&(u<E&&(v+=z[s++]<<u,u+=8),L+=v&(1<<E)-1,v>>>=E,u-=E),u<15&&(v+=z[s++]<<u,u+=8,v+=z[s++]<<u,u+=8),P=y[v&R];n:for(;;){if(E=P>>>24,v>>>=E,u-=E,E=P>>>16&255,E&16){if(w=P&65535,E&=15,u<E&&(v+=z[s++]<<u,u+=8,u<E&&(v+=z[s++]<<u,u+=8)),w+=v&(1<<E)-1,w>f){i.msg="invalid distance too far back",r.mode=n;break e}if(v>>>=E,u-=E,E=l-c,w>E){if(E=w-E,E>g&&r.sane){i.msg="invalid distance too far back",r.mode=n;break e}if(T=0,U=M,m===0){if(T+=p-E,E<L){L-=E;do k[l++]=M[T++];while(--E);T=l-w,U=k}}else if(m<E){if(T+=p+m-E,E-=m,E<L){L-=E;do k[l++]=M[T++];while(--E);if(T=0,m<L){E=m,L-=E;do k[l++]=M[T++];while(--E);T=l-w,U=k}}}else if(T+=m-E,E<L){L-=E;do k[l++]=M[T++];while(--E);T=l-w,U=k}for(;L>2;)k[l++]=U[T++],k[l++]=U[T++],k[l++]=U[T++],L-=3;L&&(k[l++]=U[T++],L>1&&(k[l++]=U[T++]))}else{T=l-w;do k[l++]=k[T++],k[l++]=k[T++],k[l++]=k[T++],L-=3;while(L>2);L&&(k[l++]=k[T++],L>1&&(k[l++]=k[T++]))}}else if(E&64){i.msg="invalid distance code",r.mode=n;break e}else{P=y[(P&65535)+(v&(1<<E)-1)];continue n}break}}else if(E&64)if(E&32){r.mode=e;break e}else{i.msg="invalid literal/length code",r.mode=n;break e}else{P=x[(P&65535)+(v&(1<<E)-1)];continue t}break}}while(s<o&&l<d);L=u>>3,s-=L,u-=L<<3,v&=(1<<u)-1,i.next_in=s,i.next_out=l,i.avail_in=s<o?5+(o-s):5-(s-o),i.avail_out=l<d?257+(d-l):257-(l-d),r.hold=v,r.bits=u},qr}var Zr,Js;function dc(){if(Js)return Zr;Js=1;var n=wn(),e=15,t=852,i=592,a=0,r=1,s=2,o=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],c=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];return Zr=function(p,g,m,M,v,u,x,y){var A=y.bits,R=0,P=0,E=0,L=0,w=0,T=0,U=0,z=0,k=0,W=0,Q,X,Z,V,ce,me=null,Ee=0,Ae,Pe=new n.Buf16(e+1),Fe=new n.Buf16(e+1),Ce=null,ee=0,ne,ue,de;for(R=0;R<=e;R++)Pe[R]=0;for(P=0;P<M;P++)Pe[g[m+P]]++;for(w=A,L=e;L>=1&&Pe[L]===0;L--);if(w>L&&(w=L),L===0)return v[u++]=1<<24|64<<16|0,v[u++]=1<<24|64<<16|0,y.bits=1,0;for(E=1;E<L&&Pe[E]===0;E++);for(w<E&&(w=E),z=1,R=1;R<=e;R++)if(z<<=1,z-=Pe[R],z<0)return-1;if(z>0&&(p===a||L!==1))return-1;for(Fe[1]=0,R=1;R<e;R++)Fe[R+1]=Fe[R]+Pe[R];for(P=0;P<M;P++)g[m+P]!==0&&(x[Fe[g[m+P]]++]=P);if(p===a?(me=Ce=x,Ae=19):p===r?(me=o,Ee-=257,Ce=l,ee-=257,Ae=256):(me=c,Ce=d,Ae=-1),W=0,P=0,R=E,ce=u,T=w,U=0,Z=-1,k=1<<w,V=k-1,p===r&&k>t||p===s&&k>i)return 1;for(;;){ne=R-U,x[P]<Ae?(ue=0,de=x[P]):x[P]>Ae?(ue=Ce[ee+x[P]],de=me[Ee+x[P]]):(ue=96,de=0),Q=1<<R-U,X=1<<T,E=X;do X-=Q,v[ce+(W>>U)+X]=ne<<24|ue<<16|de|0;while(X!==0);for(Q=1<<R-1;W&Q;)Q>>=1;if(Q!==0?(W&=Q-1,W+=Q):W=0,P++,--Pe[R]===0){if(R===L)break;R=g[m+x[P]]}if(R>w&&(W&V)!==Z){for(U===0&&(U=w),ce+=E,T=R-U,z=1<<T;T+U<L&&(z-=Pe[T+U],!(z<=0));)T++,z<<=1;if(k+=1<<T,p===r&&k>t||p===s&&k>i)return 1;Z=W&V,v[Z]=w<<24|T<<16|ce-u|0}}return W!==0&&(v[ce+W]=R-U<<24|64<<16|0),y.bits=w,0},Zr}var $s;function hc(){if($s)return Yt;$s=1;var n=wn(),e=Hs(),t=Vs(),i=uc(),a=dc(),r=0,s=1,o=2,l=4,c=5,d=6,f=0,p=1,g=2,m=-2,M=-3,v=-4,u=-5,x=8,y=1,A=2,R=3,P=4,E=5,L=6,w=7,T=8,U=9,z=10,k=11,W=12,Q=13,X=14,Z=15,V=16,ce=17,me=18,Ee=19,Ae=20,Pe=21,Fe=22,Ce=23,ee=24,ne=25,ue=26,de=27,_e=28,Oe=29,ye=30,N=31,Ye=32,Be=852,Le=592,Me=15,Re=Me;function Te(B){return(B>>>24&255)+(B>>>8&65280)+((B&65280)<<8)+((B&255)<<24)}function We(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function lt(B){var q;return!B||!B.state?m:(q=B.state,B.total_in=B.total_out=q.total=0,B.msg="",q.wrap&&(B.adler=q.wrap&1),q.mode=y,q.last=0,q.havedict=0,q.dmax=32768,q.head=null,q.hold=0,q.bits=0,q.lencode=q.lendyn=new n.Buf32(Be),q.distcode=q.distdyn=new n.Buf32(Le),q.sane=1,q.back=-1,f)}function et(B){var q;return!B||!B.state?m:(q=B.state,q.wsize=0,q.whave=0,q.wnext=0,lt(B))}function F(B,q){var _,ie;return!B||!B.state||(ie=B.state,q<0?(_=0,q=-q):(_=(q>>4)+1,q<48&&(q&=15)),q&&(q<8||q>15))?m:(ie.window!==null&&ie.wbits!==q&&(ie.window=null),ie.wrap=_,ie.wbits=q,et(B))}function b(B,q){var _,ie;return B?(ie=new We,B.state=ie,ie.window=null,_=F(B,q),_!==f&&(B.state=null),_):m}function J(B){return b(B,Re)}var fe=!0,he,ae;function De(B){if(fe){var q;for(he=new n.Buf32(512),ae=new n.Buf32(32),q=0;q<144;)B.lens[q++]=8;for(;q<256;)B.lens[q++]=9;for(;q<280;)B.lens[q++]=7;for(;q<288;)B.lens[q++]=8;for(a(s,B.lens,0,288,he,0,B.work,{bits:9}),q=0;q<32;)B.lens[q++]=5;a(o,B.lens,0,32,ae,0,B.work,{bits:5}),fe=!1}B.lencode=he,B.lenbits=9,B.distcode=ae,B.distbits=5}function Se(B,q,_,ie){var O,h=B.state;return h.window===null&&(h.wsize=1<<h.wbits,h.wnext=0,h.whave=0,h.window=new n.Buf8(h.wsize)),ie>=h.wsize?(n.arraySet(h.window,q,_-h.wsize,h.wsize,0),h.wnext=0,h.whave=h.wsize):(O=h.wsize-h.wnext,O>ie&&(O=ie),n.arraySet(h.window,q,_-ie,O,h.wnext),ie-=O,ie?(n.arraySet(h.window,q,_-ie,ie,0),h.wnext=ie,h.whave=h.wsize):(h.wnext+=O,h.wnext===h.wsize&&(h.wnext=0),h.whave<h.wsize&&(h.whave+=O))),0}function C(B,q){var _,ie,O,h,H,Y,S,I,G,pe,ge,ve,Xe,gt,dt=0,Qe,mt,Ie,ze,rt,je,qe,at,tt=new n.Buf8(4),zt,Lt,ti=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!B||!B.state||!B.output||!B.input&&B.avail_in!==0)return m;_=B.state,_.mode===W&&(_.mode=Q),H=B.next_out,O=B.output,S=B.avail_out,h=B.next_in,ie=B.input,Y=B.avail_in,I=_.hold,G=_.bits,pe=Y,ge=S,at=f;e:for(;;)switch(_.mode){case y:if(_.wrap===0){_.mode=Q;break}for(;G<16;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(_.wrap&2&&I===35615){_.check=0,tt[0]=I&255,tt[1]=I>>>8&255,_.check=t(_.check,tt,2,0),I=0,G=0,_.mode=A;break}if(_.flags=0,_.head&&(_.head.done=!1),!(_.wrap&1)||(((I&255)<<8)+(I>>8))%31){B.msg="incorrect header check",_.mode=ye;break}if((I&15)!==x){B.msg="unknown compression method",_.mode=ye;break}if(I>>>=4,G-=4,qe=(I&15)+8,_.wbits===0)_.wbits=qe;else if(qe>_.wbits){B.msg="invalid window size",_.mode=ye;break}_.dmax=1<<qe,B.adler=_.check=1,_.mode=I&512?z:W,I=0,G=0;break;case A:for(;G<16;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(_.flags=I,(_.flags&255)!==x){B.msg="unknown compression method",_.mode=ye;break}if(_.flags&57344){B.msg="unknown header flags set",_.mode=ye;break}_.head&&(_.head.text=I>>8&1),_.flags&512&&(tt[0]=I&255,tt[1]=I>>>8&255,_.check=t(_.check,tt,2,0)),I=0,G=0,_.mode=R;case R:for(;G<32;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.head&&(_.head.time=I),_.flags&512&&(tt[0]=I&255,tt[1]=I>>>8&255,tt[2]=I>>>16&255,tt[3]=I>>>24&255,_.check=t(_.check,tt,4,0)),I=0,G=0,_.mode=P;case P:for(;G<16;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.head&&(_.head.xflags=I&255,_.head.os=I>>8),_.flags&512&&(tt[0]=I&255,tt[1]=I>>>8&255,_.check=t(_.check,tt,2,0)),I=0,G=0,_.mode=E;case E:if(_.flags&1024){for(;G<16;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.length=I,_.head&&(_.head.extra_len=I),_.flags&512&&(tt[0]=I&255,tt[1]=I>>>8&255,_.check=t(_.check,tt,2,0)),I=0,G=0}else _.head&&(_.head.extra=null);_.mode=L;case L:if(_.flags&1024&&(ve=_.length,ve>Y&&(ve=Y),ve&&(_.head&&(qe=_.head.extra_len-_.length,_.head.extra||(_.head.extra=new Array(_.head.extra_len)),n.arraySet(_.head.extra,ie,h,ve,qe)),_.flags&512&&(_.check=t(_.check,ie,ve,h)),Y-=ve,h+=ve,_.length-=ve),_.length))break e;_.length=0,_.mode=w;case w:if(_.flags&2048){if(Y===0)break e;ve=0;do qe=ie[h+ve++],_.head&&qe&&_.length<65536&&(_.head.name+=String.fromCharCode(qe));while(qe&&ve<Y);if(_.flags&512&&(_.check=t(_.check,ie,ve,h)),Y-=ve,h+=ve,qe)break e}else _.head&&(_.head.name=null);_.length=0,_.mode=T;case T:if(_.flags&4096){if(Y===0)break e;ve=0;do qe=ie[h+ve++],_.head&&qe&&_.length<65536&&(_.head.comment+=String.fromCharCode(qe));while(qe&&ve<Y);if(_.flags&512&&(_.check=t(_.check,ie,ve,h)),Y-=ve,h+=ve,qe)break e}else _.head&&(_.head.comment=null);_.mode=U;case U:if(_.flags&512){for(;G<16;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(I!==(_.check&65535)){B.msg="header crc mismatch",_.mode=ye;break}I=0,G=0}_.head&&(_.head.hcrc=_.flags>>9&1,_.head.done=!0),B.adler=_.check=0,_.mode=W;break;case z:for(;G<32;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}B.adler=_.check=Te(I),I=0,G=0,_.mode=k;case k:if(_.havedict===0)return B.next_out=H,B.avail_out=S,B.next_in=h,B.avail_in=Y,_.hold=I,_.bits=G,g;B.adler=_.check=1,_.mode=W;case W:if(q===c||q===d)break e;case Q:if(_.last){I>>>=G&7,G-=G&7,_.mode=de;break}for(;G<3;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}switch(_.last=I&1,I>>>=1,G-=1,I&3){case 0:_.mode=X;break;case 1:if(De(_),_.mode=Ae,q===d){I>>>=2,G-=2;break e}break;case 2:_.mode=ce;break;case 3:B.msg="invalid block type",_.mode=ye}I>>>=2,G-=2;break;case X:for(I>>>=G&7,G-=G&7;G<32;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if((I&65535)!==(I>>>16^65535)){B.msg="invalid stored block lengths",_.mode=ye;break}if(_.length=I&65535,I=0,G=0,_.mode=Z,q===d)break e;case Z:_.mode=V;case V:if(ve=_.length,ve){if(ve>Y&&(ve=Y),ve>S&&(ve=S),ve===0)break e;n.arraySet(O,ie,h,ve,H),Y-=ve,h+=ve,S-=ve,H+=ve,_.length-=ve;break}_.mode=W;break;case ce:for(;G<14;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(_.nlen=(I&31)+257,I>>>=5,G-=5,_.ndist=(I&31)+1,I>>>=5,G-=5,_.ncode=(I&15)+4,I>>>=4,G-=4,_.nlen>286||_.ndist>30){B.msg="too many length or distance symbols",_.mode=ye;break}_.have=0,_.mode=me;case me:for(;_.have<_.ncode;){for(;G<3;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.lens[ti[_.have++]]=I&7,I>>>=3,G-=3}for(;_.have<19;)_.lens[ti[_.have++]]=0;if(_.lencode=_.lendyn,_.lenbits=7,zt={bits:_.lenbits},at=a(r,_.lens,0,19,_.lencode,0,_.work,zt),_.lenbits=zt.bits,at){B.msg="invalid code lengths set",_.mode=ye;break}_.have=0,_.mode=Ee;case Ee:for(;_.have<_.nlen+_.ndist;){for(;dt=_.lencode[I&(1<<_.lenbits)-1],Qe=dt>>>24,mt=dt>>>16&255,Ie=dt&65535,!(Qe<=G);){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(Ie<16)I>>>=Qe,G-=Qe,_.lens[_.have++]=Ie;else{if(Ie===16){for(Lt=Qe+2;G<Lt;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(I>>>=Qe,G-=Qe,_.have===0){B.msg="invalid bit length repeat",_.mode=ye;break}qe=_.lens[_.have-1],ve=3+(I&3),I>>>=2,G-=2}else if(Ie===17){for(Lt=Qe+3;G<Lt;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}I>>>=Qe,G-=Qe,qe=0,ve=3+(I&7),I>>>=3,G-=3}else{for(Lt=Qe+7;G<Lt;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}I>>>=Qe,G-=Qe,qe=0,ve=11+(I&127),I>>>=7,G-=7}if(_.have+ve>_.nlen+_.ndist){B.msg="invalid bit length repeat",_.mode=ye;break}for(;ve--;)_.lens[_.have++]=qe}}if(_.mode===ye)break;if(_.lens[256]===0){B.msg="invalid code -- missing end-of-block",_.mode=ye;break}if(_.lenbits=9,zt={bits:_.lenbits},at=a(s,_.lens,0,_.nlen,_.lencode,0,_.work,zt),_.lenbits=zt.bits,at){B.msg="invalid literal/lengths set",_.mode=ye;break}if(_.distbits=6,_.distcode=_.distdyn,zt={bits:_.distbits},at=a(o,_.lens,_.nlen,_.ndist,_.distcode,0,_.work,zt),_.distbits=zt.bits,at){B.msg="invalid distances set",_.mode=ye;break}if(_.mode=Ae,q===d)break e;case Ae:_.mode=Pe;case Pe:if(Y>=6&&S>=258){B.next_out=H,B.avail_out=S,B.next_in=h,B.avail_in=Y,_.hold=I,_.bits=G,i(B,ge),H=B.next_out,O=B.output,S=B.avail_out,h=B.next_in,ie=B.input,Y=B.avail_in,I=_.hold,G=_.bits,_.mode===W&&(_.back=-1);break}for(_.back=0;dt=_.lencode[I&(1<<_.lenbits)-1],Qe=dt>>>24,mt=dt>>>16&255,Ie=dt&65535,!(Qe<=G);){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(mt&&!(mt&240)){for(ze=Qe,rt=mt,je=Ie;dt=_.lencode[je+((I&(1<<ze+rt)-1)>>ze)],Qe=dt>>>24,mt=dt>>>16&255,Ie=dt&65535,!(ze+Qe<=G);){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}I>>>=ze,G-=ze,_.back+=ze}if(I>>>=Qe,G-=Qe,_.back+=Qe,_.length=Ie,mt===0){_.mode=ue;break}if(mt&32){_.back=-1,_.mode=W;break}if(mt&64){B.msg="invalid literal/length code",_.mode=ye;break}_.extra=mt&15,_.mode=Fe;case Fe:if(_.extra){for(Lt=_.extra;G<Lt;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.length+=I&(1<<_.extra)-1,I>>>=_.extra,G-=_.extra,_.back+=_.extra}_.was=_.length,_.mode=Ce;case Ce:for(;dt=_.distcode[I&(1<<_.distbits)-1],Qe=dt>>>24,mt=dt>>>16&255,Ie=dt&65535,!(Qe<=G);){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(!(mt&240)){for(ze=Qe,rt=mt,je=Ie;dt=_.distcode[je+((I&(1<<ze+rt)-1)>>ze)],Qe=dt>>>24,mt=dt>>>16&255,Ie=dt&65535,!(ze+Qe<=G);){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}I>>>=ze,G-=ze,_.back+=ze}if(I>>>=Qe,G-=Qe,_.back+=Qe,mt&64){B.msg="invalid distance code",_.mode=ye;break}_.offset=Ie,_.extra=mt&15,_.mode=ee;case ee:if(_.extra){for(Lt=_.extra;G<Lt;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}_.offset+=I&(1<<_.extra)-1,I>>>=_.extra,G-=_.extra,_.back+=_.extra}if(_.offset>_.dmax){B.msg="invalid distance too far back",_.mode=ye;break}_.mode=ne;case ne:if(S===0)break e;if(ve=ge-S,_.offset>ve){if(ve=_.offset-ve,ve>_.whave&&_.sane){B.msg="invalid distance too far back",_.mode=ye;break}ve>_.wnext?(ve-=_.wnext,Xe=_.wsize-ve):Xe=_.wnext-ve,ve>_.length&&(ve=_.length),gt=_.window}else gt=O,Xe=H-_.offset,ve=_.length;ve>S&&(ve=S),S-=ve,_.length-=ve;do O[H++]=gt[Xe++];while(--ve);_.length===0&&(_.mode=Pe);break;case ue:if(S===0)break e;O[H++]=_.length,S--,_.mode=Pe;break;case de:if(_.wrap){for(;G<32;){if(Y===0)break e;Y--,I|=ie[h++]<<G,G+=8}if(ge-=S,B.total_out+=ge,_.total+=ge,ge&&(B.adler=_.check=_.flags?t(_.check,O,ge,H-ge):e(_.check,O,ge,H-ge)),ge=S,(_.flags?I:Te(I))!==_.check){B.msg="incorrect data check",_.mode=ye;break}I=0,G=0}_.mode=_e;case _e:if(_.wrap&&_.flags){for(;G<32;){if(Y===0)break e;Y--,I+=ie[h++]<<G,G+=8}if(I!==(_.total&4294967295)){B.msg="incorrect length check",_.mode=ye;break}I=0,G=0}_.mode=Oe;case Oe:at=p;break e;case ye:at=M;break e;case N:return v;case Ye:default:return m}return B.next_out=H,B.avail_out=S,B.next_in=h,B.avail_in=Y,_.hold=I,_.bits=G,(_.wsize||ge!==B.avail_out&&_.mode<ye&&(_.mode<de||q!==l))&&Se(B,B.output,B.next_out,ge-B.avail_out),pe-=B.avail_in,ge-=B.avail_out,B.total_in+=pe,B.total_out+=ge,_.total+=ge,_.wrap&&ge&&(B.adler=_.check=_.flags?t(_.check,O,ge,B.next_out-ge):e(_.check,O,ge,B.next_out-ge)),B.data_type=_.bits+(_.last?64:0)+(_.mode===W?128:0)+(_.mode===Ae||_.mode===Z?256:0),(pe===0&&ge===0||q===l)&&at===f&&(at=u),at}function te(B){if(!B||!B.state)return m;var q=B.state;return q.window&&(q.window=null),B.state=null,f}function K(B,q){var _;return!B||!B.state||(_=B.state,!(_.wrap&2))?m:(_.head=q,q.done=!1,f)}function se(B,q){var _=q.length,ie,O,h;return!B||!B.state||(ie=B.state,ie.wrap!==0&&ie.mode!==k)?m:ie.mode===k&&(O=1,O=e(O,q,_,0),O!==ie.check)?M:(h=Se(B,q,_,_),h?(ie.mode=N,v):(ie.havedict=1,f))}return Yt.inflateReset=et,Yt.inflateReset2=F,Yt.inflateResetKeep=lt,Yt.inflateInit=J,Yt.inflateInit2=b,Yt.inflate=C,Yt.inflateEnd=te,Yt.inflateGetHeader=K,Yt.inflateSetDictionary=se,Yt.inflateInfo="pako inflate (from Nodeca project)",Yt}var Kr,eo;function to(){return eo||(eo=1,Kr={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}),Kr}var Qr,no;function pc(){if(no)return Qr;no=1;function n(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}return Qr=n,Qr}var io;function mc(){if(io)return oi;io=1;var n=hc(),e=wn(),t=qs(),i=to(),a=Xr(),r=Ks(),s=pc(),o=Object.prototype.toString;function l(f){if(!(this instanceof l))return new l(f);this.options=e.assign({chunkSize:16384,windowBits:0,to:""},f||{});var p=this.options;p.raw&&p.windowBits>=0&&p.windowBits<16&&(p.windowBits=-p.windowBits,p.windowBits===0&&(p.windowBits=-15)),p.windowBits>=0&&p.windowBits<16&&!(f&&f.windowBits)&&(p.windowBits+=32),p.windowBits>15&&p.windowBits<48&&(p.windowBits&15||(p.windowBits|=15)),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new r,this.strm.avail_out=0;var g=n.inflateInit2(this.strm,p.windowBits);if(g!==i.Z_OK)throw new Error(a[g]);if(this.header=new s,n.inflateGetHeader(this.strm,this.header),p.dictionary&&(typeof p.dictionary=="string"?p.dictionary=t.string2buf(p.dictionary):o.call(p.dictionary)==="[object ArrayBuffer]"&&(p.dictionary=new Uint8Array(p.dictionary)),p.raw&&(g=n.inflateSetDictionary(this.strm,p.dictionary),g!==i.Z_OK)))throw new Error(a[g])}l.prototype.push=function(f,p){var g=this.strm,m=this.options.chunkSize,M=this.options.dictionary,v,u,x,y,A,R=!1;if(this.ended)return!1;u=p===~~p?p:p===!0?i.Z_FINISH:i.Z_NO_FLUSH,typeof f=="string"?g.input=t.binstring2buf(f):o.call(f)==="[object ArrayBuffer]"?g.input=new Uint8Array(f):g.input=f,g.next_in=0,g.avail_in=g.input.length;do{if(g.avail_out===0&&(g.output=new e.Buf8(m),g.next_out=0,g.avail_out=m),v=n.inflate(g,i.Z_NO_FLUSH),v===i.Z_NEED_DICT&&M&&(v=n.inflateSetDictionary(this.strm,M)),v===i.Z_BUF_ERROR&&R===!0&&(v=i.Z_OK,R=!1),v!==i.Z_STREAM_END&&v!==i.Z_OK)return this.onEnd(v),this.ended=!0,!1;g.next_out&&(g.avail_out===0||v===i.Z_STREAM_END||g.avail_in===0&&(u===i.Z_FINISH||u===i.Z_SYNC_FLUSH))&&(this.options.to==="string"?(x=t.utf8border(g.output,g.next_out),y=g.next_out-x,A=t.buf2string(g.output,x),g.next_out=y,g.avail_out=m-y,y&&e.arraySet(g.output,g.output,x,y,0),this.onData(A)):this.onData(e.shrinkBuf(g.output,g.next_out))),g.avail_in===0&&g.avail_out===0&&(R=!0)}while((g.avail_in>0||g.avail_out===0)&&v!==i.Z_STREAM_END);return v===i.Z_STREAM_END&&(u=i.Z_FINISH),u===i.Z_FINISH?(v=n.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===i.Z_OK):(u===i.Z_SYNC_FLUSH&&(this.onEnd(i.Z_OK),g.avail_out=0),!0)},l.prototype.onData=function(f){this.chunks.push(f)},l.prototype.onEnd=function(f){f===i.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=e.flattenChunks(this.chunks)),this.chunks=[],this.err=f,this.msg=this.strm.msg};function c(f,p){var g=new l(p);if(g.push(f,!0),g.err)throw g.msg||a[g.err];return g.result}function d(f,p){return p=p||{},p.raw=!0,c(f,p)}return oi.Inflate=l,oi.inflate=c,oi.inflateRaw=d,oi.ungzip=c,oi}var jr,ro;function gc(){if(ro)return jr;ro=1;var n=wn().assign,e=fc(),t=mc(),i=to(),a={};return n(a,e,t,i),jr=a,jr}(function(n){(function(){var e={},t;n.exports=e,typeof oc=="function"?t=gc():t=window.pako,function(i,a){i.toRGBA8=function(r){var s=r.width,o=r.height;if(r.tabs.acTL==null)return[i.toRGBA8.decodeImage(r.data,s,o,r).buffer];var l=[];r.frames[0].data==null&&(r.frames[0].data=r.data);for(var c,d=new Uint8Array(s*o*4),f=0;f<r.frames.length;f++){var p=r.frames[f],g=p.rect.x,m=p.rect.y,M=p.rect.width,v=p.rect.height,u=i.toRGBA8.decodeImage(p.data,M,v,r);if(f==0?c=u:p.blend==0?i._copyTile(u,M,v,c,s,o,g,m,0):p.blend==1&&i._copyTile(u,M,v,c,s,o,g,m,1),l.push(c.buffer),c=c.slice(0),p.dispose!=0){if(p.dispose==1)i._copyTile(d,M,v,c,s,o,g,m,0);else if(p.dispose==2){for(var x=f-1;r.frames[x].dispose==2;)x--;c=new Uint8Array(l[x]).slice(0)}}}return l},i.toRGBA8.decodeImage=function(r,s,o,l){var c=s*o,d=i.decode._getBPP(l),f=Math.ceil(s*d/8),p=new Uint8Array(c*4),g=new Uint32Array(p.buffer),m=l.ctype,M=l.depth,v=i._bin.readUshort;if(m==6){var u=c<<2;if(M==8)for(var x=0;x<u;x++)p[x]=r[x];if(M==16)for(var x=0;x<u;x++)p[x]=r[x<<1]}else if(m==2){var y=l.tabs.tRNS,A=-1,R=-1,P=-1;if(y&&(A=y[0],R=y[1],P=y[2]),M==8)for(var x=0;x<c;x++){var E=x<<2,L=x*3;p[E]=r[L],p[E+1]=r[L+1],p[E+2]=r[L+2],p[E+3]=255,A!=-1&&r[L]==A&&r[L+1]==R&&r[L+2]==P&&(p[E+3]=0)}if(M==16)for(var x=0;x<c;x++){var E=x<<2,L=x*6;p[E]=r[L],p[E+1]=r[L+2],p[E+2]=r[L+4],p[E+3]=255,A!=-1&&v(r,L)==A&&v(r,L+2)==R&&v(r,L+4)==P&&(p[E+3]=0)}}else if(m==3){var w=l.tabs.PLTE,T=l.tabs.tRNS,U=T?T.length:0;if(M==1)for(var z=0;z<o;z++)for(var k=z*f,W=z*s,x=0;x<s;x++){var E=W+x<<2,Q=r[k+(x>>3)]>>7-((x&7)<<0)&1,X=3*Q;p[E]=w[X],p[E+1]=w[X+1],p[E+2]=w[X+2],p[E+3]=Q<U?T[Q]:255}if(M==2)for(var z=0;z<o;z++)for(var k=z*f,W=z*s,x=0;x<s;x++){var E=W+x<<2,Q=r[k+(x>>2)]>>6-((x&3)<<1)&3,X=3*Q;p[E]=w[X],p[E+1]=w[X+1],p[E+2]=w[X+2],p[E+3]=Q<U?T[Q]:255}if(M==4)for(var z=0;z<o;z++)for(var k=z*f,W=z*s,x=0;x<s;x++){var E=W+x<<2,Q=r[k+(x>>1)]>>4-((x&1)<<2)&15,X=3*Q;p[E]=w[X],p[E+1]=w[X+1],p[E+2]=w[X+2],p[E+3]=Q<U?T[Q]:255}if(M==8)for(var x=0;x<c;x++){var E=x<<2,Q=r[x],X=3*Q;p[E]=w[X],p[E+1]=w[X+1],p[E+2]=w[X+2],p[E+3]=Q<U?T[Q]:255}}else if(m==4){if(M==8)for(var x=0;x<c;x++){var E=x<<2,Z=x<<1,V=r[Z];p[E]=V,p[E+1]=V,p[E+2]=V,p[E+3]=r[Z+1]}if(M==16)for(var x=0;x<c;x++){var E=x<<2,Z=x<<2,V=r[Z];p[E]=V,p[E+1]=V,p[E+2]=V,p[E+3]=r[Z+2]}}else if(m==0){var A=l.tabs.tRNS?l.tabs.tRNS:-1;if(M==1)for(var x=0;x<c;x++){var V=255*(r[x>>3]>>7-(x&7)&1),ce=V==A*255?0:255;g[x]=ce<<24|V<<16|V<<8|V}if(M==2)for(var x=0;x<c;x++){var V=85*(r[x>>2]>>6-((x&3)<<1)&3),ce=V==A*85?0:255;g[x]=ce<<24|V<<16|V<<8|V}if(M==4)for(var x=0;x<c;x++){var V=17*(r[x>>1]>>4-((x&1)<<2)&15),ce=V==A*17?0:255;g[x]=ce<<24|V<<16|V<<8|V}if(M==8)for(var x=0;x<c;x++){var V=r[x],ce=V==A?0:255;g[x]=ce<<24|V<<16|V<<8|V}if(M==16)for(var x=0;x<c;x++){var V=r[x<<1],ce=v(r,x<<1)==A?0:255;g[x]=ce<<24|V<<16|V<<8|V}}return p},i.decode=function(r){for(var s=new Uint8Array(r),o=8,l=i._bin,c=l.readUshort,d=l.readUint,f={tabs:{},frames:[]},p=new Uint8Array(s.length),g=0,m,M=0,v=[137,80,78,71,13,10,26,10],u=0;u<8;u++)if(s[u]!=v[u])throw"The input is not a PNG file!";for(;o<s.length;){var x=l.readUint(s,o);o+=4;var y=l.readASCII(s,o,4);if(o+=4,y=="IHDR")i.decode._IHDR(s,o,f);else if(y=="IDAT"){for(var u=0;u<x;u++)p[g+u]=s[o+u];g+=x}else if(y=="acTL")f.tabs[y]={num_frames:d(s,o),num_plays:d(s,o+4)},m=new Uint8Array(s.length);else if(y=="fcTL"){if(M!=0){var A=f.frames[f.frames.length-1];A.data=i.decode._decompress(f,m.slice(0,M),A.rect.width,A.rect.height),M=0}var R={x:d(s,o+12),y:d(s,o+16),width:d(s,o+4),height:d(s,o+8)},P=c(s,o+22);P=c(s,o+20)/(P==0?100:P);var E={rect:R,delay:Math.round(P*1e3),dispose:s[o+24],blend:s[o+25]};f.frames.push(E)}else if(y=="fdAT"){for(var u=0;u<x-4;u++)m[M+u]=s[o+u+4];M+=x-4}else if(y=="pHYs")f.tabs[y]=[l.readUint(s,o),l.readUint(s,o+4),s[o+8]];else if(y=="cHRM"){f.tabs[y]=[];for(var u=0;u<8;u++)f.tabs[y].push(l.readUint(s,o+u*4))}else if(y=="tEXt"){f.tabs[y]==null&&(f.tabs[y]={});var L=l.nextZero(s,o),w=l.readASCII(s,o,L-o),T=l.readASCII(s,L+1,o+x-L-1);f.tabs[y][w]=T}else if(y=="iTXt"){f.tabs[y]==null&&(f.tabs[y]={});var L=0,U=o;L=l.nextZero(s,U);var w=l.readASCII(s,U,L-U);U=L+1,s[U],s[U+1],U+=2,L=l.nextZero(s,U),l.readASCII(s,U,L-U),U=L+1,L=l.nextZero(s,U),l.readUTF8(s,U,L-U),U=L+1;var T=l.readUTF8(s,U,x-(U-o));f.tabs[y][w]=T}else if(y=="PLTE")f.tabs[y]=l.readBytes(s,o,x);else if(y=="hIST"){var z=f.tabs.PLTE.length/3;f.tabs[y]=[];for(var u=0;u<z;u++)f.tabs[y].push(c(s,o+u*2))}else if(y=="tRNS")f.ctype==3?f.tabs[y]=l.readBytes(s,o,x):f.ctype==0?f.tabs[y]=c(s,o):f.ctype==2&&(f.tabs[y]=[c(s,o),c(s,o+2),c(s,o+4)]);else if(y=="gAMA")f.tabs[y]=l.readUint(s,o)/1e5;else if(y=="sRGB")f.tabs[y]=s[o];else if(y=="bKGD")f.ctype==0||f.ctype==4?f.tabs[y]=[c(s,o)]:f.ctype==2||f.ctype==6?f.tabs[y]=[c(s,o),c(s,o+2),c(s,o+4)]:f.ctype==3&&(f.tabs[y]=s[o]);else if(y=="IEND"){if(M!=0){var A=f.frames[f.frames.length-1];A.data=i.decode._decompress(f,m.slice(0,M),A.rect.width,A.rect.height),M=0}f.data=i.decode._decompress(f,p,f.width,f.height);break}o+=x,l.readUint(s,o),o+=4}return delete f.compress,delete f.interlace,delete f.filter,f},i.decode._decompress=function(r,s,o,l){return r.compress==0&&(s=i.decode._inflate(s)),r.interlace==0?s=i.decode._filterZero(s,r,0,o,l):r.interlace==1&&(s=i.decode._readInterlace(s,r)),s},i.decode._inflate=function(r){return a.inflate(r)},i.decode._readInterlace=function(r,s){for(var o=s.width,l=s.height,c=i.decode._getBPP(s),d=c>>3,f=Math.ceil(o*c/8),p=new Uint8Array(l*f),g=0,m=[0,0,4,0,2,0,1],M=[0,4,0,2,0,1,0],v=[8,8,8,4,4,2,2],u=[8,8,4,4,2,2,1],x=0;x<7;){for(var y=v[x],A=u[x],R=0,P=0,E=m[x];E<l;)E+=y,P++;for(var L=M[x];L<o;)L+=A,R++;var w=Math.ceil(R*c/8);i.decode._filterZero(r,s,g,R,P);for(var T=0,U=m[x];U<l;){for(var z=M[x],k=g+T*w<<3;z<o;){if(c==1){var W=r[k>>3];W=W>>7-(k&7)&1,p[U*f+(z>>3)]|=W<<7-((z&3)<<0)}if(c==2){var W=r[k>>3];W=W>>6-(k&7)&3,p[U*f+(z>>2)]|=W<<6-((z&3)<<1)}if(c==4){var W=r[k>>3];W=W>>4-(k&7)&15,p[U*f+(z>>1)]|=W<<4-((z&1)<<2)}if(c>=8)for(var Q=U*f+z*d,X=0;X<d;X++)p[Q+X]=r[(k>>3)+X];k+=c,z+=A}T++,U+=y}R*P!=0&&(g+=P*(1+w)),x=x+1}return p},i.decode._getBPP=function(r){var s=[1,null,3,1,2,null,4][r.ctype];return s*r.depth},i.decode._filterZero=function(r,s,o,l,c){var d=i.decode._getBPP(s),f=Math.ceil(l*d/8),p=i.decode._paeth;d=Math.ceil(d/8);for(var g=0;g<c;g++){var m=o+g*f,M=m+g+1,v=r[M-1];if(v==0)for(var u=0;u<f;u++)r[m+u]=r[M+u];else if(v==1){for(var u=0;u<d;u++)r[m+u]=r[M+u];for(var u=d;u<f;u++)r[m+u]=r[M+u]+r[m+u-d]&255}else if(g==0){for(var u=0;u<d;u++)r[m+u]=r[M+u];if(v==2)for(var u=d;u<f;u++)r[m+u]=r[M+u]&255;if(v==3)for(var u=d;u<f;u++)r[m+u]=r[M+u]+(r[m+u-d]>>1)&255;if(v==4)for(var u=d;u<f;u++)r[m+u]=r[M+u]+p(r[m+u-d],0,0)&255}else{if(v==2)for(var u=0;u<f;u++)r[m+u]=r[M+u]+r[m+u-f]&255;if(v==3){for(var u=0;u<d;u++)r[m+u]=r[M+u]+(r[m+u-f]>>1)&255;for(var u=d;u<f;u++)r[m+u]=r[M+u]+(r[m+u-f]+r[m+u-d]>>1)&255}if(v==4){for(var u=0;u<d;u++)r[m+u]=r[M+u]+p(0,r[m+u-f],0)&255;for(var u=d;u<f;u++)r[m+u]=r[M+u]+p(r[m+u-d],r[m+u-f],r[m+u-d-f])&255}}}return r},i.decode._paeth=function(r,s,o){var l=r+s-o,c=Math.abs(l-r),d=Math.abs(l-s),f=Math.abs(l-o);return c<=d&&c<=f?r:d<=f?s:o},i.decode._IHDR=function(r,s,o){var l=i._bin;o.width=l.readUint(r,s),s+=4,o.height=l.readUint(r,s),s+=4,o.depth=r[s],s++,o.ctype=r[s],s++,o.compress=r[s],s++,o.filter=r[s],s++,o.interlace=r[s],s++},i._bin={nextZero:function(r,s){for(;r[s]!=0;)s++;return s},readUshort:function(r,s){return r[s]<<8|r[s+1]},writeUshort:function(r,s,o){r[s]=o>>8&255,r[s+1]=o&255},readUint:function(r,s){return r[s]*(256*256*256)+(r[s+1]<<16|r[s+2]<<8|r[s+3])},writeUint:function(r,s,o){r[s]=o>>24&255,r[s+1]=o>>16&255,r[s+2]=o>>8&255,r[s+3]=o&255},readASCII:function(r,s,o){for(var l="",c=0;c<o;c++)l+=String.fromCharCode(r[s+c]);return l},writeASCII:function(r,s,o){for(var l=0;l<o.length;l++)r[s+l]=o.charCodeAt(l)},readBytes:function(r,s,o){for(var l=[],c=0;c<o;c++)l.push(r[s+c]);return l},pad:function(r){return r.length<2?"0"+r:r},readUTF8:function(r,s,o){for(var l="",c,d=0;d<o;d++)l+="%"+i._bin.pad(r[s+d].toString(16));try{c=decodeURIComponent(l)}catch{return i._bin.readASCII(r,s,o)}return c}},i._copyTile=function(r,s,o,l,c,d,f,p,g){for(var m=Math.min(s,c),M=Math.min(o,d),v=0,u=0,x=0;x<M;x++)for(var y=0;y<m;y++)if(f>=0&&p>=0?(v=x*s+y<<2,u=(p+x)*c+f+y<<2):(v=(-p+x)*s-f+y<<2,u=x*c+y<<2),g==0)l[u]=r[v],l[u+1]=r[v+1],l[u+2]=r[v+2],l[u+3]=r[v+3];else if(g==1){var A=r[v+3]*.00392156862745098,R=r[v]*A,P=r[v+1]*A,E=r[v+2]*A,L=l[u+3]*(1/255),w=l[u]*L,T=l[u+1]*L,U=l[u+2]*L,z=1-A,k=A+L*z,W=k==0?0:1/k;l[u+3]=255*k,l[u+0]=(R+w*z)*W,l[u+1]=(P+T*z)*W,l[u+2]=(E+U*z)*W}else if(g==2){var A=r[v+3],R=r[v],P=r[v+1],E=r[v+2],L=l[u+3],w=l[u],T=l[u+1],U=l[u+2];A==L&&R==w&&P==T&&E==U?(l[u]=0,l[u+1]=0,l[u+2]=0,l[u+3]=0):(l[u]=R,l[u+1]=P,l[u+2]=E,l[u+3]=A)}else if(g==3){var A=r[v+3],R=r[v],P=r[v+1],E=r[v+2],L=l[u+3],w=l[u],T=l[u+1],U=l[u+2];if(A==L&&R==w&&P==T&&E==U)continue;if(A<220&&L>20)return!1}return!0},i.encode=function(r,s,o,l,c,d){l==null&&(l=0),d==null&&(d=!1);for(var f=new Uint8Array(r[0].byteLength*r.length+100),p=[137,80,78,71,13,10,26,10],g=0;g<8;g++)f[g]=p[g];var m=8,M=i._bin,v=i.crc.crc,u=M.writeUint,x=M.writeUshort,y=M.writeASCII,A=i.encode.compressPNG(r,s,o,l,d);u(f,m,13),m+=4,y(f,m,"IHDR"),m+=4,u(f,m,s),m+=4,u(f,m,o),m+=4,f[m]=A.depth,m++,f[m]=A.ctype,m++,f[m]=0,m++,f[m]=0,m++,f[m]=0,m++,u(f,m,v(f,m-17,17)),m+=4,u(f,m,1),m+=4,y(f,m,"sRGB"),m+=4,f[m]=1,m++,u(f,m,v(f,m-5,5)),m+=4;var R=r.length>1;if(R&&(u(f,m,8),m+=4,y(f,m,"acTL"),m+=4,u(f,m,r.length),m+=4,u(f,m,0),m+=4,u(f,m,v(f,m-12,12)),m+=4),A.ctype==3){var P=A.plte.length;u(f,m,P*3),m+=4,y(f,m,"PLTE"),m+=4;for(var g=0;g<P;g++){var E=g*3,L=A.plte[g],w=L&255,T=L>>8&255,U=L>>16&255;f[m+E+0]=w,f[m+E+1]=T,f[m+E+2]=U}if(m+=P*3,u(f,m,v(f,m-P*3-4,P*3+4)),m+=4,A.gotAlpha){u(f,m,P),m+=4,y(f,m,"tRNS"),m+=4;for(var g=0;g<P;g++)f[m+g]=A.plte[g]>>24&255;m+=P,u(f,m,v(f,m-P-4,P+4)),m+=4}}for(var z=0,k=0;k<A.frames.length;k++){var W=A.frames[k];R&&(u(f,m,26),m+=4,y(f,m,"fcTL"),m+=4,u(f,m,z++),m+=4,u(f,m,W.rect.width),m+=4,u(f,m,W.rect.height),m+=4,u(f,m,W.rect.x),m+=4,u(f,m,W.rect.y),m+=4,x(f,m,c[k]),m+=2,x(f,m,1e3),m+=2,f[m]=W.dispose,m++,f[m]=W.blend,m++,u(f,m,v(f,m-30,30)),m+=4);var Q=W.cimg,P=Q.length;u(f,m,P+(k==0?0:4)),m+=4;var X=m;y(f,m,k==0?"IDAT":"fdAT"),m+=4,k!=0&&(u(f,m,z++),m+=4);for(var g=0;g<P;g++)f[m+g]=Q[g];m+=P,u(f,m,v(f,X,m-X)),m+=4}return u(f,m,0),m+=4,y(f,m,"IEND"),m+=4,u(f,m,v(f,m-4,4)),m+=4,f.buffer.slice(0,m)},i.encode.compressPNG=function(r,s,o,l,c){for(var d=i.encode.compress(r,s,o,l,!1,c),f=0;f<r.length;f++){var p=d.frames[f];p.rect.width;var g=p.rect.height,m=p.bpl,M=p.bpp,v=new Uint8Array(g*m+g);p.cimg=i.encode._filterZero(p.img,g,M,m,v)}return d},i.encode.compress=function(r,s,o,l,c,d){d==null&&(d=!1);for(var f=6,p=8,g=4,m=255,M=0;M<r.length;M++)for(var v=new Uint8Array(r[M]),u=v.length,x=0;x<u;x+=4)m&=v[x+3];var y=m!=255,A={},R=[];if(r.length!=0&&(A[0]=0,R.push(0),l!=0&&l--),l!=0){var P=i.quantize(r,l,c);r=P.bufs;for(var x=0;x<P.plte.length;x++){var E=P.plte[x].est.rgba;A[E]==null&&(A[E]=R.length,R.push(E))}}else for(var M=0;M<r.length;M++)for(var L=new Uint32Array(r[M]),u=L.length,x=0;x<u;x++){var E=L[x];if((x<s||E!=L[x-1]&&E!=L[x-s])&&A[E]==null&&(A[E]=R.length,R.push(E),R.length>=300))break}var w=y?c:!1,T=R.length;T<=256&&d==!1&&(T<=2?p=1:T<=4?p=2:T<=16?p=4:p=8,c&&(p=8),y=!0);for(var U=[],M=0;M<r.length;M++){var z=new Uint8Array(r[M]),k=new Uint32Array(z.buffer),W=0,Q=0,X=s,Z=o,V=0;if(M!=0&&!w){for(var ce=c||M==1||U[U.length-2].dispose==2?1:2,me=0,Ee=1e9,Ae=0;Ae<ce;Ae++){for(var Oe=new Uint8Array(r[M-1-Ae]),Pe=new Uint32Array(r[M-1-Ae]),Fe=s,Ce=o,ee=-1,ne=-1,ue=0;ue<o;ue++)for(var de=0;de<s;de++){var x=ue*s+de;k[x]!=Pe[x]&&(de<Fe&&(Fe=de),de>ee&&(ee=de),ue<Ce&&(Ce=ue),ue>ne&&(ne=ue))}var _e=ee==-1?1:(ee-Fe+1)*(ne-Ce+1);_e<Ee&&(Ee=_e,me=Ae,ee==-1?(W=Q=0,X=Z=1):(W=Fe,Q=Ce,X=ee-Fe+1,Z=ne-Ce+1))}var Oe=new Uint8Array(r[M-1-me]);me==1&&(U[U.length-1].dispose=2);var ye=new Uint8Array(X*Z*4);new Uint32Array(ye.buffer),i._copyTile(Oe,s,o,ye,X,Z,-W,-Q,0),i._copyTile(z,s,o,ye,X,Z,-W,-Q,3)?(i._copyTile(z,s,o,ye,X,Z,-W,-Q,2),V=1):(i._copyTile(z,s,o,ye,X,Z,-W,-Q,0),V=0),z=ye,k=new Uint32Array(z.buffer)}var N=4*X;if(T<=256&&d==!1){N=Math.ceil(p*X/8);for(var ye=new Uint8Array(N*Z),ue=0;ue<Z;ue++){var x=ue*N,Ye=ue*X;if(p==8)for(var de=0;de<X;de++)ye[x+de]=A[k[Ye+de]];else if(p==4)for(var de=0;de<X;de++)ye[x+(de>>1)]|=A[k[Ye+de]]<<4-(de&1)*4;else if(p==2)for(var de=0;de<X;de++)ye[x+(de>>2)]|=A[k[Ye+de]]<<6-(de&3)*2;else if(p==1)for(var de=0;de<X;de++)ye[x+(de>>3)]|=A[k[Ye+de]]<<7-(de&7)*1}z=ye,f=3,g=1}else if(y==!1&&r.length==1){for(var ye=new Uint8Array(X*Z*3),Be=X*Z,x=0;x<Be;x++){var Le=x*3,Me=x*4;ye[Le]=z[Me],ye[Le+1]=z[Me+1],ye[Le+2]=z[Me+2]}z=ye,f=2,g=3,N=3*X}U.push({rect:{x:W,y:Q,width:X,height:Z},img:z,bpl:N,bpp:g,blend:V,dispose:w?1:0})}return{ctype:f,depth:p,plte:R,gotAlpha:y,frames:U}},i.encode._filterZero=function(r,s,o,l,c){for(var d=[],f=0;f<5;f++)if(!(s*l>5e5&&(f==2||f==3||f==4))){for(var p=0;p<s;p++)i.encode._filterLine(c,r,p,l,o,f);if(d.push(a.deflate(c)),o==1)break}for(var g,m=1e9,M=0;M<d.length;M++)d[M].length<m&&(g=M,m=d[M].length);return d[g]},i.encode._filterLine=function(r,s,o,l,c,d){var f=o*l,p=f+o,g=i.decode._paeth;if(r[p]=d,p++,d==0)for(var m=0;m<l;m++)r[p+m]=s[f+m];else if(d==1){for(var m=0;m<c;m++)r[p+m]=s[f+m];for(var m=c;m<l;m++)r[p+m]=s[f+m]-s[f+m-c]+256&255}else if(o==0){for(var m=0;m<c;m++)r[p+m]=s[f+m];if(d==2)for(var m=c;m<l;m++)r[p+m]=s[f+m];if(d==3)for(var m=c;m<l;m++)r[p+m]=s[f+m]-(s[f+m-c]>>1)+256&255;if(d==4)for(var m=c;m<l;m++)r[p+m]=s[f+m]-g(s[f+m-c],0,0)+256&255}else{if(d==2)for(var m=0;m<l;m++)r[p+m]=s[f+m]+256-s[f+m-l]&255;if(d==3){for(var m=0;m<c;m++)r[p+m]=s[f+m]+256-(s[f+m-l]>>1)&255;for(var m=c;m<l;m++)r[p+m]=s[f+m]+256-(s[f+m-l]+s[f+m-c]>>1)&255}if(d==4){for(var m=0;m<c;m++)r[p+m]=s[f+m]+256-g(0,s[f+m-l],0)&255;for(var m=c;m<l;m++)r[p+m]=s[f+m]+256-g(s[f+m-c],s[f+m-l],s[f+m-c-l])&255}}},i.crc={table:function(){for(var r=new Uint32Array(256),s=0;s<256;s++){for(var o=s,l=0;l<8;l++)o&1?o=3988292384^o>>>1:o=o>>>1;r[s]=o}return r}(),update:function(r,s,o,l){for(var c=0;c<l;c++)r=i.crc.table[(r^s[o+c])&255]^r>>>8;return r},crc:function(r,s,o){return i.crc.update(4294967295,r,s,o)^4294967295}},i.quantize=function(r,s,o){for(var l=[],c=0,d=0;d<r.length;d++)l.push(i.encode.alphaMul(new Uint8Array(r[d]),o)),c+=r[d].byteLength;for(var f=new Uint8Array(c),p=new Uint32Array(f.buffer),g=0,d=0;d<l.length;d++){for(var m=l[d],M=m.length,v=0;v<M;v++)f[g+v]=m[v];g+=M}var u={i0:0,i1:f.length,bst:null,est:null,tdst:0,left:null,right:null};u.bst=i.quantize.stats(f,u.i0,u.i1),u.est=i.quantize.estats(u.bst);for(var x=[u];x.length<s;){for(var y=0,A=0,d=0;d<x.length;d++)x[d].est.L>y&&(y=x[d].est.L,A=d);if(y<.001)break;var R=x[A],P=i.quantize.splitPixels(f,p,R.i0,R.i1,R.est.e,R.est.eMq255),E={i0:R.i0,i1:P,bst:null,est:null,tdst:0,left:null,right:null};E.bst=i.quantize.stats(f,E.i0,E.i1),E.est=i.quantize.estats(E.bst);var L={i0:P,i1:R.i1,bst:null,est:null,tdst:0,left:null,right:null};L.bst={R:[],m:[],N:R.bst.N-E.bst.N};for(var d=0;d<16;d++)L.bst.R[d]=R.bst.R[d]-E.bst.R[d];for(var d=0;d<4;d++)L.bst.m[d]=R.bst.m[d]-E.bst.m[d];L.est=i.quantize.estats(L.bst),R.left=E,R.right=L,x[A]=E,x.push(L)}x.sort(function(ce,me){return me.bst.N-ce.bst.N});for(var w=0;w<l.length;w++){for(var T=i.quantize.planeDst,U=new Uint8Array(l[w].buffer),z=new Uint32Array(l[w].buffer),k=U.length,d=0;d<k;d+=4){for(var W=U[d]*.00392156862745098,Q=U[d+1]*(1/255),X=U[d+2]*(1/255),Z=U[d+3]*(1/255),V=u;V.left;)V=T(V.est,W,Q,X,Z)<=0?V.left:V.right;z[d>>2]=V.est.rgba}l[w]=z.buffer}return{bufs:l,plte:x}},i.quantize.getNearest=function(r,s,o,l,c){if(r.left==null)return r.tdst=i.quantize.dist(r.est.q,s,o,l,c),r;var d=i.quantize.planeDst(r.est,s,o,l,c),f=r.left,p=r.right;d>0&&(f=r.right,p=r.left);var g=i.quantize.getNearest(f,s,o,l,c);if(g.tdst<=d*d)return g;var m=i.quantize.getNearest(p,s,o,l,c);return m.tdst<g.tdst?m:g},i.quantize.planeDst=function(r,s,o,l,c){var d=r.e;return d[0]*s+d[1]*o+d[2]*l+d[3]*c-r.eMq},i.quantize.dist=function(r,s,o,l,c){var d=s-r[0],f=o-r[1],p=l-r[2],g=c-r[3];return d*d+f*f+p*p+g*g},i.quantize.splitPixels=function(r,s,o,l,c,d){var f=i.quantize.vecDot;for(l-=4;o<l;){for(;f(r,o,c)<=d;)o+=4;for(;f(r,l,c)>d;)l-=4;if(o>=l)break;var p=s[o>>2];s[o>>2]=s[l>>2],s[l>>2]=p,o+=4,l-=4}for(;f(r,o,c)>d;)o-=4;return o+4},i.quantize.vecDot=function(r,s,o){return r[s]*o[0]+r[s+1]*o[1]+r[s+2]*o[2]+r[s+3]*o[3]},i.quantize.stats=function(r,s,o){for(var l=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],c=[0,0,0,0],d=o-s>>2,f=s;f<o;f+=4){var p=r[f]*.00392156862745098,g=r[f+1]*(1/255),m=r[f+2]*(1/255),M=r[f+3]*(1/255);c[0]+=p,c[1]+=g,c[2]+=m,c[3]+=M,l[0]+=p*p,l[1]+=p*g,l[2]+=p*m,l[3]+=p*M,l[5]+=g*g,l[6]+=g*m,l[7]+=g*M,l[10]+=m*m,l[11]+=m*M,l[15]+=M*M}return l[4]=l[1],l[8]=l[2],l[12]=l[3],l[9]=l[6],l[13]=l[7],l[14]=l[11],{R:l,m:c,N:d}},i.quantize.estats=function(r){var s=r.R,o=r.m,l=r.N,c=o[0],d=o[1],f=o[2],p=o[3],g=l==0?0:1/l,m=[s[0]-c*c*g,s[1]-c*d*g,s[2]-c*f*g,s[3]-c*p*g,s[4]-d*c*g,s[5]-d*d*g,s[6]-d*f*g,s[7]-d*p*g,s[8]-f*c*g,s[9]-f*d*g,s[10]-f*f*g,s[11]-f*p*g,s[12]-p*c*g,s[13]-p*d*g,s[14]-p*f*g,s[15]-p*p*g],M=m,v=i.M4,u=[.5,.5,.5,.5],x=0,y=0;if(l!=0)for(var A=0;A<10&&(u=v.multVec(M,u),y=Math.sqrt(v.dot(u,u)),u=v.sml(1/y,u),!(Math.abs(y-x)<1e-9));A++)x=y;var R=[c*g,d*g,f*g,p*g],P=v.dot(v.sml(255,R),u),E=R[3]<.001?0:1/R[3];return{Cov:m,q:R,e:u,L:x,eMq255:P,eMq:v.dot(u,R),rgba:(Math.round(255*R[3])<<24|Math.round(255*R[2]*E)<<16|Math.round(255*R[1]*E)<<8|Math.round(255*R[0]*E)<<0)>>>0}},i.M4={multVec:function(r,s){return[r[0]*s[0]+r[1]*s[1]+r[2]*s[2]+r[3]*s[3],r[4]*s[0]+r[5]*s[1]+r[6]*s[2]+r[7]*s[3],r[8]*s[0]+r[9]*s[1]+r[10]*s[2]+r[11]*s[3],r[12]*s[0]+r[13]*s[1]+r[14]*s[2]+r[15]*s[3]]},dot:function(r,s){return r[0]*s[0]+r[1]*s[1]+r[2]*s[2]+r[3]*s[3]},sml:function(r,s){return[r*s[0],r*s[1],r*s[2],r*s[3]]}},i.encode.alphaMul=function(r,s){for(var o=new Uint8Array(r.length),l=r.length>>2,c=0;c<l;c++){var d=c<<2,f=r[d+3];s&&(f=f<128?0:255);var p=f*(1/255);o[d+0]=r[d+0]*p,o[d+1]=r[d+1]*p,o[d+2]=r[d+2]*p,o[d+3]=f}return o}}(e,t)})()})(Os);var vc=Os.exports;const ao=nc(vc),$i=4096;async function _c(n){let e=[],t=[],i=[],a=[];const r=await Sc();for(const R of n)if(R instanceof HTMLImageElement)e.push(R),t.push(1),i.push(0);else if(typeof R=="string"&&R.toLowerCase().endsWith(".gif")){const P=await r(R);try{const E=await xc(P);e.push(...E.frames),t.push(E.frames.length),i.push(E.loopCount),E.fps&&!isNaN(E.fps)&&E.fps>0&&a.push(E.fps)}catch{if(so(P))try{const L=await oo(P);e.push(...L.frames),t.push(L.frames.length),i.push(L.loopCount),L.fps&&!isNaN(L.fps)&&L.fps>0&&a.push(L.fps)}catch{const w=await er(P,R);e.push(w),t.push(1),i.push(0)}else{const L=await er(P,R);e.push(L),t.push(1),i.push(0)}}}else{const P=await r(R);if(so(P))try{const E=await oo(P);e.push(...E.frames),t.push(E.frames.length),i.push(E.loopCount),E.fps&&!isNaN(E.fps)&&E.fps>0&&a.push(E.fps)}catch{const L=await er(P,R);e.push(L),t.push(1),i.push(0)}else{const E=await er(P,R);e.push(E),t.push(1),i.push(0)}}const s=a.length>0?a.reduce((R,P)=>R+P,0)/a.length:null,o=e;let l=0,c=0;o.forEach(R=>{l=Math.max(l,R.width),c=Math.max(c,R.height)});const d=o.length,f=Math.ceil(Math.sqrt(d)),p=Math.ceil(d/f);let g=l,m=c,M=g*f,v=m*p;if(M>$i||v>$i){const R=$i/M,P=$i/v,E=Math.min(R,P);g=Math.floor(g*E),m=Math.floor(m*E),M=g*f,v=m*p}const u=document.createElement("canvas");u.width=M,u.height=v;const x=u.getContext("2d");x.clearRect(0,0,M,v),o.forEach((R,P)=>{const E=P%f,L=Math.floor(P/f),w=E*g,T=L*m,U=g/R.width,z=m/R.height,k=Math.min(U,z),W=R.width*k,Q=R.height*k,X=(g-W)/2,Z=(m-Q)/2;x.drawImage(R,w+X,T+Z,W,Q)});const y=u.toDataURL("image/png"),A=g/m;return{base64:y,rows:p,cols:f,imageCount:d,cellWidth:g,cellHeight:m,textureWidth:M,textureHeight:v,animationSpeed:s,aspectRatio:A,imageCounts:t,cycleCounts:i}}async function er(n,e){const t=btoa(n.reduce((o,l)=>o+String.fromCharCode(l),"")),i=e.split(".").pop().toLowerCase(),s=`data:${{png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",bmp:"image/bmp"}[i]||"image/png"};base64,${t}`;return new Promise((o,l)=>{const c=new Image;c.onload=()=>{o(c)},c.onerror=d=>{l(new Error(`Failed to load image: ${e}`))},c.src=s})}async function xc(n){const e=new Fs(new Uint8Array(n)),t=e.numFrames(),i=e.width,a=e.height,r=e.loopCount(),s=r===null?1:r;let o=0;for(let M=0;M<t;M++){const v=e.frameInfo(M);o+=v.delay||10}const c=100/(o/t),d=document.createElement("canvas");d.width=i,d.height=a;const f=d.getContext("2d"),p=[],g=document.createElement("canvas");g.width=i,g.height=a;const m=g.getContext("2d");for(let M=0;M<t;M++){if(M>0){const P=e.frameInfo(M-1).disposal;P===2?f.clearRect(0,0,i,a):P===3&&(f.clearRect(0,0,i,a),f.drawImage(g,0,0))}m.clearRect(0,0,i,a),m.drawImage(d,0,0);const v=new Uint8ClampedArray(i*a*4);e.decodeAndBlitFrameRGBA(M,v);const u=document.createElement("canvas");u.width=i,u.height=a;const x=u.getContext("2d"),y=new ImageData(v,i,a);x.putImageData(y,0,0),f.drawImage(u,0,0);const A=await new Promise((R,P)=>{const E=new Image;E.onload=()=>R(E),E.onerror=P,E.src=d.toDataURL()});p.push(A)}return{frames:p,fps:c,loopCount:s}}function so(n){const e=new Uint8Array(n);if(e.length<8||e[0]!==137||e[1]!==80||e[2]!==78||e[3]!==71)return!1;let t=8;for(;t<e.length-8;){const i=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],a=String.fromCharCode(e[t+4],e[t+5],e[t+6],e[t+7]);if(a==="acTL")return!0;if(a==="IEND")break;t+=12+i}return!1}async function oo(n){var d,f;const e=ao.decode(n),t=e.frames.length,i=e.width,a=e.height,r=((f=(d=e.tabs)==null?void 0:d.acTL)==null?void 0:f.num_plays)??0;let s=0;for(let p=0;p<t;p++){const g=e.frames[p].delay||100;await Ls(`APNG frame ${p} delay: ${g}ms`),s+=g}const o=s/t,l=1e3/o;await Ls(`APNG total delay: ${s}ms, avg delay: ${o}ms, calculated FPS: ${l}`);const c=[];for(let p=0;p<t;p++){const g=ao.toRGBA8(e)[p],m=document.createElement("canvas");m.width=i,m.height=a;const M=m.getContext("2d"),v=new ImageData(new Uint8ClampedArray(g),i,a);M.putImageData(v,0,0);const u=await new Promise((x,y)=>{const A=new Image;A.onload=()=>x(A),A.onerror=y,A.src=m.toDataURL()});c.push(u)}return{frames:c,fps:l,loopCount:r}}async function Sc(){if((typeof __SPARKLE_MOUSE_DISABLE_TAURI__>"u"||!__SPARKLE_MOUSE_DISABLE_TAURI__)&&typeof window<"u"&&window.__TAURI__)try{return(await import("@tauri-apps/plugin-fs")).readFile}catch{}return async n=>{const t=await(await fetch(n)).arrayBuffer();return new Uint8Array(t)}}const lo=1.5;function Mc(n,e,t,i){const a=i.lastScreenSize,s=t.renderer.domElement.getBoundingClientRect(),o=n-s.left,l=e-s.top,c=o/a.x*2-1,d=1-2*(l/a.y),f=t.aspect,p=t.cameraScale;let g,m;return f>=1?(g=c*f/2*p,m=d*.5*p):(g=c*.5*p,m=d*1/(2*f)*p),{x:g,y:m}}function Ec(n,e,t,i){const r=t.renderer.domElement.getBoundingClientRect(),s=i.lastScreenSize,o=t.aspect,l=t.cameraScale;let c,d;o>=1?(c=n/(o/2*l),d=e/(.5*l)):(c=n/(.5*l),d=e/(1/(2*o)*l));const f=(c+1)/2*s.x,p=(1-d)/2*s.y,g=f+r.left,m=p+r.top;return{x:g,y:m}}function Ac(n,e,t,i,a=1){if(!n||!e||t&&!i)return;const r=[.2,.4],s=.15;if(t){const o=i.reduce((w,T)=>w+T.weight,0);let l=Math.random()*o,c=0;for(let w=0;w<i.length;w++)if(l-=i[w].weight,l<=0){c=w;break}let d=!1,f=0;const p=2e3,g=2e3;let m=g,M=0,v=0,u=1,x=1,y=0,A=0,R=0,P=0;const E=w=>{v=w.rotate?Math.random()*Math.PI*2:0,u=w.stretch?Ft(Math.random(),0,1,.6,1.6):1,x=Ft(Math.random(),0,1,r[0],r[1])*a;const T=Ft(x/a,r[0],r[1],1,2),U=w.speed;m=g*T/U;let z=1/0,k=-1/0,W=1/0,Q=-1/0;if(w.avoidEdges){for(const ne of w.points){let ue=ne.x,de=ne.y;w.stretch&&(ue*=u);const _e=Is(ue,de,v);ue=_e.x,de=_e.y;const Oe=window.innerWidth,ye=window.innerHeight,Ye=(Oe<ye?Math.hypot(Oe,ye)*lo:Math.min(Oe,ye))*x;ue*=Ye,de*=Ye,z=Math.min(z,ue),k=Math.max(k,ue),W=Math.min(W,de),Q=Math.max(Q,de)}const Ee=window.innerWidth,Ae=window.innerHeight,Pe=Math.abs(z)/Ee,Fe=Math.abs(k)/Ee,Ce=Math.abs(Q)/Ae,ee=Math.abs(W)/Ae;y=Ft(Math.random(),0,1,Pe,1-Fe),A=Ft(Math.random(),0,1,Ce,1-ee)}else{const Ee=w.stretch?s*u*.5:s;y=Ft(Math.random(),0,1,Ee,1-Ee),A=Ft(Math.random(),0,1,s,1-s)}const X=window.innerWidth,Z=window.innerHeight,V=X*y,ce=Z*A,me=Mc(V,ce,e,n);R=me.x,P=me.y};E(i[c]),M=Date.now(),n.breakInterpolation=!0;const L=()=>{if(!n.isDemoShapesDrawing)return;const w=Date.now();if(d)if(w-f>=p){const W=e.renderer.domElement.getBoundingClientRect();if(!(W.bottom>0&&W.top<window.innerHeight&&W.right>0&&W.left<window.innerWidth)){f=w,n.demoAnimationFrameId=requestAnimationFrame(L);return}d=!1;let X;do{const Z=i.reduce((ce,me)=>ce+me.weight,0);let V=Math.random()*Z;for(let ce=0;ce<i.length;ce++)if(V-=i[ce].weight,V<=0){X=ce;break}}while(X===c&&!i[X].stretch&&i.length>1);c=X,E(i[c]),M=w,n.breakInterpolation=!0}else{n.demoAnimationFrameId=requestAnimationFrame(L);return}const T=i[c],U=w-M,z=Math.min(U/m,1);if(z<1){const k=T.points.length,W=z*(k-1),Q=Math.floor(W),X=Math.min(Q+1,k-1),Z=W-Q,V=T.points[Q],ce=T.points[X],me=V.x+(ce.x-V.x)*Z,Ee=V.y+(ce.y-V.y)*Z;let Ae=me,Pe=Ee;T.stretch&&(Ae*=u);const Fe=Is(Ae,Pe,v);Ae=Fe.x,Pe=Fe.y;const Ce=window.innerWidth,ee=window.innerHeight,ne=Ce<ee?Math.hypot(Ce,ee)*lo:Math.min(Ce,ee),ue=e.aspect,de=e.cameraScale;let _e;ue>=1?_e=ue*de/Ce:_e=de/ee;const Oe=ne*x*_e;Ae*=Oe,Pe*=Oe;const ye=R+Ae,N=P+Pe,Ye=Ec(ye,N,e,n);n.emulateCursorPosition({x:Ye.x,y:Ye.y})}else n.breakInterpolation=!0,d=!0,f=w;n.demoAnimationFrameId=requestAnimationFrame(L)};n.isDemoShapesDrawing=!0,L()}else n.breakInterpolation=!0,n.isDemoShapesDrawing=!1,n.demoAnimationFrameId!==null&&n.demoAnimationFrameId!==void 0&&(cancelAnimationFrame(n.demoAnimationFrameId),n.demoAnimationFrameId=null)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jr="180",yc=0,co=1,wc=2,fo=1,Tc=2,pn=3,Tn=0,Nt=1,mn=2,bn=0,Hn=1,uo=2,ho=3,po=4,bc=5,Gn=100,Cc=101,Rc=102,Pc=103,Dc=104,Ic=200,Lc=201,Uc=202,Fc=203,$r=204,ea=205,Nc=206,Oc=207,Bc=208,zc=209,kc=210,Hc=211,Gc=212,Vc=213,Wc=214,ta=0,na=1,ia=2,li=3,ra=4,aa=5,sa=6,oa=7,mo=0,Xc=1,Yc=2,Cn=0,qc=1,Zc=2,Kc=3,Qc=4,jc=5,Jc=6,$c=7,go=300,ci=301,fi=302,la=303,ca=304,tr=306,fa=1e3,Vn=1001,Li=1002,$t=1003,ef=1004,nr=1005,en=1006,ua=1007,Rn=1008,gn=1009,vo=1010,_o=1011,Ui=1012,da=1013,Wn=1014,cn=1015,Fi=1016,ha=1017,pa=1018,Ni=1020,xo=35902,So=35899,Mo=1021,Eo=1022,tn=1023,Oi=1026,Bi=1027,Ao=1028,ma=1029,ga=1030,va=1031,_a=1033,ir=33776,rr=33777,ar=33778,sr=33779,xa=35840,Sa=35841,Ma=35842,Ea=35843,Aa=36196,ya=37492,wa=37496,Ta=37808,ba=37809,Ca=37810,Ra=37811,Pa=37812,Da=37813,Ia=37814,La=37815,Ua=37816,Fa=37817,Na=37818,Oa=37819,Ba=37820,za=37821,ka=36492,Ha=36494,Ga=36495,Va=36283,Wa=36284,Xa=36285,Ya=36286,tf=3200,nf=3201,rf=0,af=1,Pn="",qt="srgb",ui="srgb-linear",or="linear",ct="srgb",di=7680,yo=519,sf=512,of=513,lf=514,wo=515,cf=516,ff=517,uf=518,df=519,To=35044,bo="300 es",fn=2e3,lr=2001;class hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const r=a.indexOf(t);r!==-1&&a.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qa=Math.PI/180,Za=180/Math.PI;function zi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function hf(n,e){return(n%e+e)%e}function Ka(n,e,t){return(1-t)*n+t*e}function ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ot(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,t=0){Ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*i-s*a+e.x,this.y=r*a+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Hi{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,r,s,o){let l=i[a+0],c=i[a+1],d=i[a+2],f=i[a+3];const p=r[s+0],g=r[s+1],m=r[s+2],M=r[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f;return}if(o===1){e[t+0]=p,e[t+1]=g,e[t+2]=m,e[t+3]=M;return}if(f!==M||l!==p||c!==g||d!==m){let v=1-o;const u=l*p+c*g+d*m+f*M,x=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const R=Math.sqrt(y),P=Math.atan2(R,u*x);v=Math.sin(v*P)/R,o=Math.sin(o*P)/R}const A=o*x;if(l=l*v+p*A,c=c*v+g*A,d=d*v+m*A,f=f*v+M*A,v===1-o){const R=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=R,c*=R,d*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,a,r,s){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],f=r[s],p=r[s+1],g=r[s+2],m=r[s+3];return e[t]=o*m+d*f+l*g-c*p,e[t+1]=l*m+d*p+c*f-o*g,e[t+2]=c*m+d*g+o*p-l*f,e[t+3]=d*m-o*f-l*p-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,r=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),f=o(r/2),p=l(i/2),g=l(a/2),m=l(r/2);switch(s){case"XYZ":this._x=p*d*f+c*g*m,this._y=c*g*f-p*d*m,this._z=c*d*m+p*g*f,this._w=c*d*f-p*g*m;break;case"YXZ":this._x=p*d*f+c*g*m,this._y=c*g*f-p*d*m,this._z=c*d*m-p*g*f,this._w=c*d*f+p*g*m;break;case"ZXY":this._x=p*d*f-c*g*m,this._y=c*g*f+p*d*m,this._z=c*d*m+p*g*f,this._w=c*d*f-p*g*m;break;case"ZYX":this._x=p*d*f-c*g*m,this._y=c*g*f+p*d*m,this._z=c*d*m-p*g*f,this._w=c*d*f+p*g*m;break;case"YZX":this._x=p*d*f+c*g*m,this._y=c*g*f+p*d*m,this._z=c*d*m-p*g*f,this._w=c*d*f-p*g*m;break;case"XZY":this._x=p*d*f-c*g*m,this._y=c*g*f-p*d*m,this._z=c*d*m+p*g*f,this._w=c*d*f+p*g*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],r=t[8],s=t[1],o=t[5],l=t[9],c=t[2],d=t[6],f=t[10],p=i+o+f;if(p>0){const g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(d-l)*g,this._y=(r-c)*g,this._z=(s-a)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(d-l)/g,this._x=.25*g,this._y=(a+s)/g,this._z=(r+c)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(r-c)/g,this._x=(a+s)/g,this._y=.25*g,this._z=(l+d)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(s-a)/g,this._x=(r+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,r=e._z,s=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+s*o+a*c-r*l,this._y=a*d+s*l+r*o-i*c,this._z=r*d+s*c+i*l-a*o,this._w=s*d-i*o-a*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,r=this._z,s=this._w;let o=s*e._w+i*e._x+a*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=i,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-t;return this._w=g*s+t*this._w,this._x=g*i+t*this._x,this._y=g*a+t*this._y,this._z=g*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),f=Math.sin((1-t)*d)/c,p=Math.sin(t*d)/c;return this._w=s*f+this._w*p,this._x=i*f+this._x*p,this._y=a*f+this._y*p,this._z=r*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class oe{constructor(e=0,t=0,i=0){oe.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Co.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Co.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*a,this.y=r[1]*t+r[4]*i+r[7]*a,this.z=r[2]*t+r[5]*i+r[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,r=e.elements,s=1/(r[3]*t+r[7]*i+r[11]*a+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*a+r[12])*s,this.y=(r[1]*t+r[5]*i+r[9]*a+r[13])*s,this.z=(r[2]*t+r[6]*i+r[10]*a+r[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,r=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*a-o*i),d=2*(o*t-r*a),f=2*(r*i-s*t);return this.x=t+l*c+s*f-o*d,this.y=i+l*d+o*c-r*f,this.z=a+l*f+r*d-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a,this.y=r[1]*t+r[5]*i+r[9]*a,this.z=r[2]*t+r[6]*i+r[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,r=e.z,s=t.x,o=t.y,l=t.z;return this.x=a*l-r*o,this.y=r*s-i*l,this.z=i*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Qa.copy(this).projectOnVector(e),this.sub(Qa)}reflect(e){return this.sub(Qa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qa=new oe,Co=new Hi;class Je{constructor(e,t,i,a,r,s,o,l,c){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,r,s,o,l,c)}set(e,t,i,a,r,s,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,r=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],d=i[4],f=i[7],p=i[2],g=i[5],m=i[8],M=a[0],v=a[3],u=a[6],x=a[1],y=a[4],A=a[7],R=a[2],P=a[5],E=a[8];return r[0]=s*M+o*x+l*R,r[3]=s*v+o*y+l*P,r[6]=s*u+o*A+l*E,r[1]=c*M+d*x+f*R,r[4]=c*v+d*y+f*P,r[7]=c*u+d*A+f*E,r[2]=p*M+g*x+m*R,r[5]=p*v+g*y+m*P,r[8]=p*u+g*A+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*s*d-t*o*c-i*r*d+i*o*l+a*r*c-a*s*l}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=d*s-o*c,p=o*l-d*r,g=c*r-s*l,m=t*f+i*p+a*g;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(a*c-d*i)*M,e[2]=(o*i-a*s)*M,e[3]=p*M,e[4]=(d*t-a*l)*M,e[5]=(a*r-o*t)*M,e[6]=g*M,e[7]=(i*l-c*t)*M,e[8]=(s*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*s+c*o)+s+e,-a*c,a*l,-a*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ja.makeScale(e,t)),this}rotate(e){return this.premultiply(ja.makeRotation(-e)),this}translate(e,t){return this.premultiply(ja.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ja=new Je;function Ro(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function cr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function pf(){const n=cr("canvas");return n.style.display="block",n}const Po={};function Gi(n){n in Po||(Po[n]=!0,console.warn(n))}function mf(n,e,t){return new Promise(function(i,a){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Do=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Io=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gf(){const n={enabled:!0,workingColorSpace:ui,spaces:{},convert:function(a,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===ct&&(a.r=vn(a.r),a.g=vn(a.g),a.b=vn(a.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[r].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ct&&(a.r=pi(a.r),a.g=pi(a.g),a.b=pi(a.b))),a},workingToColorSpace:function(a,r){return this.convert(a,this.workingColorSpace,r)},colorSpaceToWorking:function(a,r){return this.convert(a,r,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Pn?or:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,r=this.workingColorSpace){return a.fromArray(this.spaces[r].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,r,s){return a.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,r){return Gi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(a,r)},toWorkingColorSpace:function(a,r){return Gi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(a,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ui]:{primaries:e,whitePoint:i,transfer:or,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:Do,fromXYZ:Io,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),n}const st=gf();function vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function pi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let mi;class vf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{mi===void 0&&(mi=cr("canvas")),mi.width=e.width,mi.height=e.height;const a=mi.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=mi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=vn(r[s]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(vn(t[i]/255)*255):t[i]=vn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _f=0;class Ja{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push($a(a[s].image)):r.push($a(a[s]))}else r=$a(a);i.url=r}return t||(e.images[this.uuid]=i),i}}function $a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xf=0;const es=new oe;class Dt extends hi{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,i=Vn,a=Vn,r=en,s=Rn,o=tn,l=gn,c=Dt.DEFAULT_ANISOTROPY,d=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xf++}),this.uuid=zi(),this.name="",this.source=new Ja(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(es).x}get height(){return this.source.getSize(es).y}get depth(){return this.source.getSize(es).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==go)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case Li:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case Li:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null,Dt.DEFAULT_MAPPING=go,Dt.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,i=0,a=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a+s[12]*r,this.y=s[1]*t+s[5]*i+s[9]*a+s[13]*r,this.z=s[2]*t+s[6]*i+s[10]*a+s[14]*r,this.w=s[3]*t+s[7]*i+s[11]*a+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,r;const l=e.elements,c=l[0],d=l[4],f=l[8],p=l[1],g=l[5],m=l[9],M=l[2],v=l[6],u=l[10];if(Math.abs(d-p)<.01&&Math.abs(f-M)<.01&&Math.abs(m-v)<.01){if(Math.abs(d+p)<.1&&Math.abs(f+M)<.1&&Math.abs(m+v)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,A=(g+1)/2,R=(u+1)/2,P=(d+p)/4,E=(f+M)/4,L=(m+v)/4;return y>A&&y>R?y<.01?(i=0,a=.707106781,r=.707106781):(i=Math.sqrt(y),a=P/i,r=E/i):A>R?A<.01?(i=.707106781,a=0,r=.707106781):(a=Math.sqrt(A),i=P/a,r=L/a):R<.01?(i=.707106781,a=.707106781,r=0):(r=Math.sqrt(R),i=E/r,a=L/r),this.set(i,a,r,t),this}let x=Math.sqrt((v-m)*(v-m)+(f-M)*(f-M)+(p-d)*(p-d));return Math.abs(x)<.001&&(x=1),this.x=(v-m)/x,this.y=(f-M)/x,this.z=(p-d)/x,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sf extends hi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const a={width:e,height:t,depth:i.depth},r=new Dt(a);this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new Ja(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends Sf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Lo extends Dt{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=$t,this.minFilter=$t,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mf extends Dt{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=$t,this.minFilter=$t,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vi{constructor(e=new oe(1/0,1/0,1/0),t=new oe(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,nn):nn.fromBufferAttribute(r,s),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fr.copy(i.boundingBox)),fr.applyMatrix4(e.matrixWorld),this.union(fr)}const a=e.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wi),ur.subVectors(this.max,Wi),gi.subVectors(e.a,Wi),vi.subVectors(e.b,Wi),_i.subVectors(e.c,Wi),In.subVectors(vi,gi),Ln.subVectors(_i,vi),Xn.subVectors(gi,_i);let t=[0,-In.z,In.y,0,-Ln.z,Ln.y,0,-Xn.z,Xn.y,In.z,0,-In.x,Ln.z,0,-Ln.x,Xn.z,0,-Xn.x,-In.y,In.x,0,-Ln.y,Ln.x,0,-Xn.y,Xn.x,0];return!ts(t,gi,vi,_i,ur)||(t=[1,0,0,0,1,0,0,0,1],!ts(t,gi,vi,_i,ur))?!1:(dr.crossVectors(In,Ln),t=[dr.x,dr.y,dr.z],ts(t,gi,vi,_i,ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new oe,new oe,new oe,new oe,new oe,new oe,new oe,new oe],nn=new oe,fr=new Vi,gi=new oe,vi=new oe,_i=new oe,In=new oe,Ln=new oe,Xn=new oe,Wi=new oe,ur=new oe,dr=new oe,Yn=new oe;function ts(n,e,t,i,a){for(let r=0,s=n.length-3;r<=s;r+=3){Yn.fromArray(n,r);const o=a.x*Math.abs(Yn.x)+a.y*Math.abs(Yn.y)+a.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),d=i.dot(Yn);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Ef=new Vi,Xi=new oe,ns=new oe;class is{constructor(e=new oe,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Ef.setFromPoints(e).getCenter(i);let a=0;for(let r=0,s=e.length;r<s;r++)a=Math.max(a,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xi.subVectors(e,this.center);const t=Xi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(Xi,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xi.copy(e.center).add(ns)),this.expandByPoint(Xi.copy(e.center).sub(ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xn=new oe,rs=new oe,hr=new oe,Un=new oe,as=new oe,pr=new oe,ss=new oe;class Af{constructor(e=new oe,t=new oe(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){rs.copy(e).add(t).multiplyScalar(.5),hr.copy(t).sub(e).normalize(),Un.copy(this.origin).sub(rs);const r=e.distanceTo(t)*.5,s=-this.direction.dot(hr),o=Un.dot(this.direction),l=-Un.dot(hr),c=Un.lengthSq(),d=Math.abs(1-s*s);let f,p,g,m;if(d>0)if(f=s*l-o,p=s*o-l,m=r*d,f>=0)if(p>=-m)if(p<=m){const M=1/d;f*=M,p*=M,g=f*(f+s*p+2*o)+p*(s*f+p+2*l)+c}else p=r,f=Math.max(0,-(s*p+o)),g=-f*f+p*(p+2*l)+c;else p=-r,f=Math.max(0,-(s*p+o)),g=-f*f+p*(p+2*l)+c;else p<=-m?(f=Math.max(0,-(-s*r+o)),p=f>0?-r:Math.min(Math.max(-r,-l),r),g=-f*f+p*(p+2*l)+c):p<=m?(f=0,p=Math.min(Math.max(-r,-l),r),g=p*(p+2*l)+c):(f=Math.max(0,-(s*r+o)),p=f>0?r:Math.min(Math.max(-r,-l),r),g=-f*f+p*(p+2*l)+c);else p=s>0?-r:r,f=Math.max(0,-(s*p+o)),g=-f*f+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),a&&a.copy(rs).addScaledVector(hr,p),g}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const i=xn.dot(this.direction),a=xn.dot(xn)-i*i,r=e.radius*e.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=i-s,l=i+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,r,s,o,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,a=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,a=(e.min.x-p.x)*c),d>=0?(r=(e.min.y-p.y)*d,s=(e.max.y-p.y)*d):(r=(e.max.y-p.y)*d,s=(e.min.y-p.y)*d),i>s||r>a||((r>i||isNaN(i))&&(i=r),(s<a||isNaN(a))&&(a=s),f>=0?(o=(e.min.z-p.z)*f,l=(e.max.z-p.z)*f):(o=(e.max.z-p.z)*f,l=(e.min.z-p.z)*f),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,i,a,r){as.subVectors(t,e),pr.subVectors(i,e),ss.crossVectors(as,pr);let s=this.direction.dot(ss),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Un.subVectors(this.origin,e);const l=o*this.direction.dot(pr.crossVectors(Un,pr));if(l<0)return null;const c=o*this.direction.dot(as.cross(Un));if(c<0||l+c>s)return null;const d=-o*Un.dot(ss);return d<0?null:this.at(d/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,a,r,s,o,l,c,d,f,p,g,m,M,v){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,r,s,o,l,c,d,f,p,g,m,M,v)}set(e,t,i,a,r,s,o,l,c,d,f,p,g,m,M,v){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=a,u[1]=r,u[5]=s,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=f,u[14]=p,u[3]=g,u[7]=m,u[11]=M,u[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/xi.setFromMatrixColumn(e,0).length(),r=1/xi.setFromMatrixColumn(e,1).length(),s=1/xi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,r=e.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const p=s*d,g=s*f,m=o*d,M=o*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=g+m*c,t[5]=p-M*c,t[9]=-o*l,t[2]=M-p*c,t[6]=m+g*c,t[10]=s*l}else if(e.order==="YXZ"){const p=l*d,g=l*f,m=c*d,M=c*f;t[0]=p+M*o,t[4]=m*o-g,t[8]=s*c,t[1]=s*f,t[5]=s*d,t[9]=-o,t[2]=g*o-m,t[6]=M+p*o,t[10]=s*l}else if(e.order==="ZXY"){const p=l*d,g=l*f,m=c*d,M=c*f;t[0]=p-M*o,t[4]=-s*f,t[8]=m+g*o,t[1]=g+m*o,t[5]=s*d,t[9]=M-p*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const p=s*d,g=s*f,m=o*d,M=o*f;t[0]=l*d,t[4]=m*c-g,t[8]=p*c+M,t[1]=l*f,t[5]=M*c+p,t[9]=g*c-m,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const p=s*l,g=s*c,m=o*l,M=o*c;t[0]=l*d,t[4]=M-p*f,t[8]=m*f+g,t[1]=f,t[5]=s*d,t[9]=-o*d,t[2]=-c*d,t[6]=g*f+m,t[10]=p-M*f}else if(e.order==="XZY"){const p=s*l,g=s*c,m=o*l,M=o*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=p*f+M,t[5]=s*d,t[9]=g*f-m,t[2]=m*f-g,t[6]=o*d,t[10]=M*f+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yf,e,wf)}lookAt(e,t,i){const a=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Fn.crossVectors(i,Ht),Fn.lengthSq()===0&&(Math.abs(i.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Fn.crossVectors(i,Ht)),Fn.normalize(),mr.crossVectors(Ht,Fn),a[0]=Fn.x,a[4]=mr.x,a[8]=Ht.x,a[1]=Fn.y,a[5]=mr.y,a[9]=Ht.y,a[2]=Fn.z,a[6]=mr.z,a[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,r=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],d=i[1],f=i[5],p=i[9],g=i[13],m=i[2],M=i[6],v=i[10],u=i[14],x=i[3],y=i[7],A=i[11],R=i[15],P=a[0],E=a[4],L=a[8],w=a[12],T=a[1],U=a[5],z=a[9],k=a[13],W=a[2],Q=a[6],X=a[10],Z=a[14],V=a[3],ce=a[7],me=a[11],Ee=a[15];return r[0]=s*P+o*T+l*W+c*V,r[4]=s*E+o*U+l*Q+c*ce,r[8]=s*L+o*z+l*X+c*me,r[12]=s*w+o*k+l*Z+c*Ee,r[1]=d*P+f*T+p*W+g*V,r[5]=d*E+f*U+p*Q+g*ce,r[9]=d*L+f*z+p*X+g*me,r[13]=d*w+f*k+p*Z+g*Ee,r[2]=m*P+M*T+v*W+u*V,r[6]=m*E+M*U+v*Q+u*ce,r[10]=m*L+M*z+v*X+u*me,r[14]=m*w+M*k+v*Z+u*Ee,r[3]=x*P+y*T+A*W+R*V,r[7]=x*E+y*U+A*Q+R*ce,r[11]=x*L+y*z+A*X+R*me,r[15]=x*w+y*k+A*Z+R*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],r=e[12],s=e[1],o=e[5],l=e[9],c=e[13],d=e[2],f=e[6],p=e[10],g=e[14],m=e[3],M=e[7],v=e[11],u=e[15];return m*(+r*l*f-a*c*f-r*o*p+i*c*p+a*o*g-i*l*g)+M*(+t*l*g-t*c*p+r*s*p-a*s*g+a*c*d-r*l*d)+v*(+t*c*f-t*o*g-r*s*f+i*s*g+r*o*d-i*c*d)+u*(-a*o*d-t*l*f+t*o*p+a*s*f-i*s*p+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],d=e[8],f=e[9],p=e[10],g=e[11],m=e[12],M=e[13],v=e[14],u=e[15],x=f*v*c-M*p*c+M*l*g-o*v*g-f*l*u+o*p*u,y=m*p*c-d*v*c-m*l*g+s*v*g+d*l*u-s*p*u,A=d*M*c-m*f*c+m*o*g-s*M*g-d*o*u+s*f*u,R=m*f*l-d*M*l-m*o*p+s*M*p+d*o*v-s*f*v,P=t*x+i*y+a*A+r*R;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/P;return e[0]=x*E,e[1]=(M*p*r-f*v*r-M*a*g+i*v*g+f*a*u-i*p*u)*E,e[2]=(o*v*r-M*l*r+M*a*c-i*v*c-o*a*u+i*l*u)*E,e[3]=(f*l*r-o*p*r-f*a*c+i*p*c+o*a*g-i*l*g)*E,e[4]=y*E,e[5]=(d*v*r-m*p*r+m*a*g-t*v*g-d*a*u+t*p*u)*E,e[6]=(m*l*r-s*v*r-m*a*c+t*v*c+s*a*u-t*l*u)*E,e[7]=(s*p*r-d*l*r+d*a*c-t*p*c-s*a*g+t*l*g)*E,e[8]=A*E,e[9]=(m*f*r-d*M*r-m*i*g+t*M*g+d*i*u-t*f*u)*E,e[10]=(s*M*r-m*o*r+m*i*c-t*M*c-s*i*u+t*o*u)*E,e[11]=(d*o*r-s*f*r-d*i*c+t*f*c+s*i*g-t*o*g)*E,e[12]=R*E,e[13]=(d*M*a-m*f*a+m*i*p-t*M*p-d*i*v+t*f*v)*E,e[14]=(m*o*a-s*M*a-m*i*l+t*M*l+s*i*v-t*o*v)*E,e[15]=(s*f*a-d*o*a+d*i*l-t*f*l-s*i*p+t*o*p)*E,this}scale(e){const t=this.elements,i=e.x,a=e.y,r=e.z;return t[0]*=i,t[4]*=a,t[8]*=r,t[1]*=i,t[5]*=a,t[9]*=r,t[2]*=i,t[6]*=a,t[10]*=r,t[3]*=i,t[7]*=a,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),r=1-i,s=e.x,o=e.y,l=e.z,c=r*s,d=r*o;return this.set(c*s+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*s,0,c*l-a*o,d*l+a*s,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,r,s){return this.set(1,i,r,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,r=t._x,s=t._y,o=t._z,l=t._w,c=r+r,d=s+s,f=o+o,p=r*c,g=r*d,m=r*f,M=s*d,v=s*f,u=o*f,x=l*c,y=l*d,A=l*f,R=i.x,P=i.y,E=i.z;return a[0]=(1-(M+u))*R,a[1]=(g+A)*R,a[2]=(m-y)*R,a[3]=0,a[4]=(g-A)*P,a[5]=(1-(p+u))*P,a[6]=(v+x)*P,a[7]=0,a[8]=(m+y)*E,a[9]=(v-x)*E,a[10]=(1-(p+M))*E,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let r=xi.set(a[0],a[1],a[2]).length();const s=xi.set(a[4],a[5],a[6]).length(),o=xi.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),e.x=a[12],e.y=a[13],e.z=a[14],rn.copy(this);const c=1/r,d=1/s,f=1/o;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=d,rn.elements[5]*=d,rn.elements[6]*=d,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,t.setFromRotationMatrix(rn),i.x=r,i.y=s,i.z=o,this}makePerspective(e,t,i,a,r,s,o=fn,l=!1){const c=this.elements,d=2*r/(t-e),f=2*r/(i-a),p=(t+e)/(t-e),g=(i+a)/(i-a);let m,M;if(l)m=r/(s-r),M=s*r/(s-r);else if(o===fn)m=-(s+r)/(s-r),M=-2*s*r/(s-r);else if(o===lr)m=-s/(s-r),M=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=f,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,r,s,o=fn,l=!1){const c=this.elements,d=2/(t-e),f=2/(i-a),p=-(t+e)/(t-e),g=-(i+a)/(i-a);let m,M;if(l)m=1/(s-r),M=s/(s-r);else if(o===fn)m=-2/(s-r),M=-(s+r)/(s-r);else if(o===lr)m=-1/(s-r),M=-r/(s-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=f,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const xi=new oe,rn=new yt,yf=new oe(0,0,0),wf=new oe(1,1,1),Fn=new oe,mr=new oe,Ht=new oe,Uo=new yt,Fo=new Hi;class Sn{constructor(e=0,t=0,i=0,a=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],d=a[9],f=a[2],p=a[6],g=a[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-it(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Uo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fo.setFromEuler(this),this.setFromQuaternion(Fo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class No{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tf=0;const Oo=new oe,Si=new Hi,Mn=new yt,gr=new oe,Yi=new oe,bf=new oe,Cf=new Hi,Bo=new oe(1,0,0),zo=new oe(0,1,0),ko=new oe(0,0,1),Ho={type:"added"},Rf={type:"removed"},Mi={type:"childadded",child:null},os={type:"childremoved",child:null};class Gt extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Gt.DEFAULT_UP.clone();const e=new oe,t=new Sn,i=new Hi,a=new oe(1,1,1);function r(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new yt},normalMatrix:{value:new Je}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=Gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new No,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(Bo,e)}rotateY(e){return this.rotateOnAxis(zo,e)}rotateZ(e){return this.rotateOnAxis(ko,e)}translateOnAxis(e,t){return Oo.copy(e).applyQuaternion(this.quaternion),this.position.add(Oo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bo,e)}translateY(e){return this.translateOnAxis(zo,e)}translateZ(e){return this.translateOnAxis(ko,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?gr.copy(e):gr.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mn.lookAt(Yi,gr,this.up):Mn.lookAt(gr,Yi,this.up),this.quaternion.setFromRotationMatrix(Mn),a&&(Mn.extractRotation(a.matrixWorld),Si.setFromRotationMatrix(Mn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ho),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rf),os.child=e,this.dispatchEvent(os),os.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ho),Mi.child=e,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,e,bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yi,Cf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));a.material=o}else a.material=r(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),d=s(e.images),f=s(e.shapes),p=s(e.skeletons),g=s(e.animations),m=s(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),m.length>0&&(i.nodes=m)}return i.object=a,i;function s(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Gt.DEFAULT_UP=new oe(0,1,0),Gt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new oe,En=new oe,ls=new oe,An=new oe,Ei=new oe,Ai=new oe,Go=new oe,cs=new oe,fs=new oe,us=new oe,ds=new Mt,hs=new Mt,ps=new Mt;class sn{constructor(e=new oe,t=new oe,i=new oe){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),an.subVectors(e,t),a.cross(an);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(e,t,i,a,r){an.subVectors(a,t),En.subVectors(i,t),ls.subVectors(e,t);const s=an.dot(an),o=an.dot(En),l=an.dot(ls),c=En.dot(En),d=En.dot(ls),f=s*c-o*o;if(f===0)return r.set(0,0,0),null;const p=1/f,g=(c*l-o*d)*p,m=(s*d-o*l)*p;return r.set(1-g-m,m,g)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(e,t,i,a,r,s,o,l){return this.getBarycoord(e,t,i,a,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(s,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(e,t,i,a,r,s){return ds.setScalar(0),hs.setScalar(0),ps.setScalar(0),ds.fromBufferAttribute(e,t),hs.fromBufferAttribute(e,i),ps.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(ds,r.x),s.addScaledVector(hs,r.y),s.addScaledVector(ps,r.z),s}static isFrontFacing(e,t,i,a){return an.subVectors(i,t),En.subVectors(e,t),an.cross(En).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),En.subVectors(this.a,this.b),an.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,i,a,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,r=this.c;let s,o;Ei.subVectors(a,i),Ai.subVectors(r,i),cs.subVectors(e,i);const l=Ei.dot(cs),c=Ai.dot(cs);if(l<=0&&c<=0)return t.copy(i);fs.subVectors(e,a);const d=Ei.dot(fs),f=Ai.dot(fs);if(d>=0&&f<=d)return t.copy(a);const p=l*f-d*c;if(p<=0&&l>=0&&d<=0)return s=l/(l-d),t.copy(i).addScaledVector(Ei,s);us.subVectors(e,r);const g=Ei.dot(us),m=Ai.dot(us);if(m>=0&&g<=m)return t.copy(r);const M=g*c-l*m;if(M<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Ai,o);const v=d*m-g*f;if(v<=0&&f-d>=0&&g-m>=0)return Go.subVectors(r,a),o=(f-d)/(f-d+(g-m)),t.copy(a).addScaledVector(Go,o);const u=1/(v+M+p);return s=M*u,o=p*u,t.copy(i).addScaledVector(Ei,s).addScaledVector(Ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},vr={h:0,s:0,l:0};function ms(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ft{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,a=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,a),this}setHSL(e,t,i,a=st.workingColorSpace){if(e=hf(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,s=2*i-r;this.r=ms(s,r,e+1/3),this.g=ms(s,r,e),this.b=ms(s,r,e-1/3)}return st.colorSpaceToWorking(this,a),this}setStyle(e,t=qt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const i=Vo[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vn(e.r),this.g=vn(e.g),this.b=vn(e.b),this}copyLinearToSRGB(e){return this.r=pi(e.r),this.g=pi(e.g),this.b=pi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return st.workingToColorSpace(Pt.copy(this),e),Math.round(it(Pt.r*255,0,255))*65536+Math.round(it(Pt.g*255,0,255))*256+Math.round(it(Pt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Pt.copy(this),t);const i=Pt.r,a=Pt.g,r=Pt.b,s=Math.max(i,a,r),o=Math.min(i,a,r);let l,c;const d=(o+s)/2;if(o===s)l=0,c=0;else{const f=s-o;switch(c=d<=.5?f/(s+o):f/(2-s-o),s){case i:l=(a-r)/f+(a<r?6:0);break;case a:l=(r-i)/f+2;break;case r:l=(i-a)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=qt){st.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,a=Pt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(vr);const i=Ka(Nn.h,vr.h,t),a=Ka(Nn.s,vr.s,t),r=Ka(Nn.l,vr.l,t);return this.setHSL(i,a,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*a,this.g=r[1]*t+r[4]*i+r[7]*a,this.b=r[2]*t+r[5]*i+r[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new ft;ft.NAMES=Vo;let Pf=0;class _r extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=zi(),this.name="",this.type="Material",this.blending=Hn,this.side=Tn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=ea,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=di,this.stencilZFail=di,this.stencilZPass=di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hn&&(i.blending=this.blending),this.side!==Tn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==$r&&(i.blendSrc=this.blendSrc),this.blendDst!==ea&&(i.blendDst=this.blendDst),this.blendEquation!==Gn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==li&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==di&&(i.stencilFail=this.stencilFail),this.stencilZFail!==di&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==di&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(t){const r=a(e.textures),s=a(e.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wo extends _r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=mo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new oe,xr=new Ke;let Df=0;class Bt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Df++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=To,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)xr.fromBufferAttribute(this,t),xr.applyMatrix3(e),this.setXY(t,xr.x,xr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ot(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array),a=Ot(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),i=Ot(i,this.array),a=Ot(a,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==To&&(e.usage=this.usage),e}}class Xo extends Bt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yo extends Bt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class qn extends Bt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let If=0;const Zt=new yt,gs=new Gt,yi=new oe,Vt=new Vi,qi=new Vi,bt=new oe;class On extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ro(e)?Yo:Xo)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zt.makeRotationFromQuaternion(e),this.applyMatrix4(Zt),this}rotateX(e){return Zt.makeRotationX(e),this.applyMatrix4(Zt),this}rotateY(e){return Zt.makeRotationY(e),this.applyMatrix4(Zt),this}rotateZ(e){return Zt.makeRotationZ(e),this.applyMatrix4(Zt),this}translate(e,t,i){return Zt.makeTranslation(e,t,i),this.applyMatrix4(Zt),this}scale(e,t,i){return Zt.makeScale(e,t,i),this.applyMatrix4(Zt),this}lookAt(e){return gs.lookAt(e),gs.updateMatrix(),this.applyMatrix4(gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let a=0,r=e.length;a<r;a++){const s=e[a];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new qn(i,3))}else{const i=Math.min(e.length,t.count);for(let a=0;a<i;a++){const r=e[a];t.setXYZ(a,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new oe(-1/0,-1/0,-1/0),new oe(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const r=t[i];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new oe,1/0);return}if(e){const i=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];qi.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Vt.min,qi.min),Vt.expandByPoint(bt),bt.addVectors(Vt.max,qi.max),Vt.expandByPoint(bt)):(Vt.expandByPoint(qi.min),Vt.expandByPoint(qi.max))}Vt.getCenter(i);let a=0;for(let r=0,s=e.count;r<s;r++)bt.fromBufferAttribute(e,r),a=Math.max(a,i.distanceToSquared(bt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)bt.fromBufferAttribute(o,c),l&&(yi.fromBufferAttribute(e,c),bt.add(yi)),a=Math.max(a,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bt(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<i.count;L++)o[L]=new oe,l[L]=new oe;const c=new oe,d=new oe,f=new oe,p=new Ke,g=new Ke,m=new Ke,M=new oe,v=new oe;function u(L,w,T){c.fromBufferAttribute(i,L),d.fromBufferAttribute(i,w),f.fromBufferAttribute(i,T),p.fromBufferAttribute(r,L),g.fromBufferAttribute(r,w),m.fromBufferAttribute(r,T),d.sub(c),f.sub(c),g.sub(p),m.sub(p);const U=1/(g.x*m.y-m.x*g.y);isFinite(U)&&(M.copy(d).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(U),v.copy(f).multiplyScalar(g.x).addScaledVector(d,-m.x).multiplyScalar(U),o[L].add(M),o[w].add(M),o[T].add(M),l[L].add(v),l[w].add(v),l[T].add(v))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let L=0,w=x.length;L<w;++L){const T=x[L],U=T.start,z=T.count;for(let k=U,W=U+z;k<W;k+=3)u(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const y=new oe,A=new oe,R=new oe,P=new oe;function E(L){R.fromBufferAttribute(a,L),P.copy(R);const w=o[L];y.copy(w),y.sub(R.multiplyScalar(R.dot(w))).normalize(),A.crossVectors(P,w);const U=A.dot(l[L])<0?-1:1;s.setXYZW(L,y.x,y.y,y.z,U)}for(let L=0,w=x.length;L<w;++L){const T=x[L],U=T.start,z=T.count;for(let k=U,W=U+z;k<W;k+=3)E(e.getX(k+0)),E(e.getX(k+1)),E(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,g=i.count;p<g;p++)i.setXYZ(p,0,0,0);const a=new oe,r=new oe,s=new oe,o=new oe,l=new oe,c=new oe,d=new oe,f=new oe;if(e)for(let p=0,g=e.count;p<g;p+=3){const m=e.getX(p+0),M=e.getX(p+1),v=e.getX(p+2);a.fromBufferAttribute(t,m),r.fromBufferAttribute(t,M),s.fromBufferAttribute(t,v),d.subVectors(s,r),f.subVectors(a,r),d.cross(f),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,v),o.add(d),l.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let p=0,g=t.count;p<g;p+=3)a.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),s.fromBufferAttribute(t,p+2),d.subVectors(s,r),f.subVectors(a,r),d.cross(f),i.setXYZ(p+0,d.x,d.y,d.z),i.setXYZ(p+1,d.x,d.y,d.z),i.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,f=o.normalized,p=new c.constructor(l.length*d);let g=0,m=0;for(let M=0,v=l.length;M<v;M++){o.isInterleavedBufferAttribute?g=l[M]*o.data.stride+o.offset:g=l[M]*d;for(let u=0;u<d;u++)p[m++]=c[g++]}return new Bt(p,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new On,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,f=c.length;d<f;d++){const p=c[d],g=e(p,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,p=c.length;f<p;f++){const g=c[f];d.push(g.toJSON(e.data))}d.length>0&&(a[l]=d,r=!0)}r&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],f=r[c];for(let p=0,g=f.length;p<g;p++)d.push(f[p].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,d=s.length;c<d;c++){const f=s[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qo=new yt,Zn=new Af,Sr=new is,Zo=new oe,Mr=new oe,Er=new oe,Ar=new oe,vs=new oe,yr=new oe,Ko=new oe,wr=new oe;class on extends Gt{constructor(e=new On,t=new Wo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(r&&o){yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],f=r[l];d!==0&&(vs.fromBufferAttribute(f,e),s?yr.addScaledVector(vs,d):yr.addScaledVector(vs.sub(t),d))}t.add(yr)}return t}raycast(e,t){const i=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(r),Zn.copy(e.ray).recast(e.near),!(Sr.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Sr,Zo)===null||Zn.origin.distanceToSquared(Zo)>(e.far-e.near)**2))&&(qo.copy(r).invert(),Zn.copy(e.ray).applyMatrix4(qo),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Zn)))}_computeIntersections(e,t,i){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,p=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(s))for(let m=0,M=p.length;m<M;m++){const v=p[m],u=s[v.materialIndex],x=Math.max(v.start,g.start),y=Math.min(o.count,Math.min(v.start+v.count,g.start+g.count));for(let A=x,R=y;A<R;A+=3){const P=o.getX(A),E=o.getX(A+1),L=o.getX(A+2);a=Tr(this,u,e,i,c,d,f,P,E,L),a&&(a.faceIndex=Math.floor(A/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const m=Math.max(0,g.start),M=Math.min(o.count,g.start+g.count);for(let v=m,u=M;v<u;v+=3){const x=o.getX(v),y=o.getX(v+1),A=o.getX(v+2);a=Tr(this,s,e,i,c,d,f,x,y,A),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,M=p.length;m<M;m++){const v=p[m],u=s[v.materialIndex],x=Math.max(v.start,g.start),y=Math.min(l.count,Math.min(v.start+v.count,g.start+g.count));for(let A=x,R=y;A<R;A+=3){const P=A,E=A+1,L=A+2;a=Tr(this,u,e,i,c,d,f,P,E,L),a&&(a.faceIndex=Math.floor(A/3),a.face.materialIndex=v.materialIndex,t.push(a))}}else{const m=Math.max(0,g.start),M=Math.min(l.count,g.start+g.count);for(let v=m,u=M;v<u;v+=3){const x=v,y=v+1,A=v+2;a=Tr(this,s,e,i,c,d,f,x,y,A),a&&(a.faceIndex=Math.floor(v/3),t.push(a))}}}}function Lf(n,e,t,i,a,r,s,o){let l;if(e.side===Nt?l=i.intersectTriangle(s,r,a,!0,o):l=i.intersectTriangle(a,r,s,e.side===Tn,o),l===null)return null;wr.copy(o),wr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(wr);return c<t.near||c>t.far?null:{distance:c,point:wr.clone(),object:n}}function Tr(n,e,t,i,a,r,s,o,l,c){n.getVertexPosition(o,Mr),n.getVertexPosition(l,Er),n.getVertexPosition(c,Ar);const d=Lf(n,e,t,i,Mr,Er,Ar,Ko);if(d){const f=new oe;sn.getBarycoord(Ko,Mr,Er,Ar,f),a&&(d.uv=sn.getInterpolatedAttribute(a,o,l,c,f,new Ke)),r&&(d.uv1=sn.getInterpolatedAttribute(r,o,l,c,f,new Ke)),s&&(d.normal=sn.getInterpolatedAttribute(s,o,l,c,f,new oe),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const p={a:o,b:l,c,normal:new oe,materialIndex:0};sn.getNormal(Mr,Er,Ar,p.normal),d.face=p,d.barycoord=f}return d}class Zi extends On{constructor(e=1,t=1,i=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],d=[],f=[];let p=0,g=0;m("z","y","x",-1,-1,i,t,e,s,r,0),m("z","y","x",1,-1,i,t,-e,s,r,1),m("x","z","y",1,1,e,i,t,a,s,2),m("x","z","y",1,-1,e,i,-t,a,s,3),m("x","y","z",1,-1,e,t,i,a,r,4),m("x","y","z",-1,-1,e,t,-i,a,r,5),this.setIndex(l),this.setAttribute("position",new qn(c,3)),this.setAttribute("normal",new qn(d,3)),this.setAttribute("uv",new qn(f,2));function m(M,v,u,x,y,A,R,P,E,L,w){const T=A/E,U=R/L,z=A/2,k=R/2,W=P/2,Q=E+1,X=L+1;let Z=0,V=0;const ce=new oe;for(let me=0;me<X;me++){const Ee=me*U-k;for(let Ae=0;Ae<Q;Ae++){const Pe=Ae*T-z;ce[M]=Pe*x,ce[v]=Ee*y,ce[u]=W,c.push(ce.x,ce.y,ce.z),ce[M]=0,ce[v]=0,ce[u]=P>0?1:-1,d.push(ce.x,ce.y,ce.z),f.push(Ae/E),f.push(1-me/L),Z+=1}}for(let me=0;me<L;me++)for(let Ee=0;Ee<E;Ee++){const Ae=p+Ee+Q*me,Pe=p+Ee+Q*(me+1),Fe=p+(Ee+1)+Q*(me+1),Ce=p+(Ee+1)+Q*me;l.push(Ae,Pe,Ce),l.push(Pe,Fe,Ce),V+=6}o.addGroup(g,V,w),g+=V,p+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function It(n){const e={};for(let t=0;t<n.length;t++){const i=wi(n[t]);for(const a in i)e[a]=i[a]}return e}function Uf(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Qo(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const Ff={clone:wi,merge:It};var Nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Of=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends _r{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nf,this.fragmentShader=Of,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wi(e.uniforms),this.uniformsGroups=Uf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?t.uniforms[a]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[a]={type:"m4",value:s.toArray()}:t.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class jo extends Gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new oe,Jo=new Ke,$o=new Ke;class ln extends jo{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Za*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(qa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Za*2*Math.atan(Math.tan(qa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Jo,$o),t.subVectors($o,Jo)}setViewOffset(e,t,i,a,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(qa*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,t-=s.offsetY*i/c,a*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ti=-90,bi=1;class Bf extends Gt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new ln(Ti,bi,e,t);a.layers=this.layers,this.add(a);const r=new ln(Ti,bi,e,t);r.layers=this.layers,this.add(r);const s=new ln(Ti,bi,e,t);s.layers=this.layers,this.add(s);const o=new ln(Ti,bi,e,t);o.layers=this.layers,this.add(o);const l=new ln(Ti,bi,e,t);l.layers=this.layers,this.add(l);const c=new ln(Ti,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,r,s,o,l]=t;for(const c of t)this.remove(c);if(e===fn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,d]=this.children,f=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,r),e.setRenderTarget(i,1,a),e.render(t,s),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,l),e.setRenderTarget(i,4,a),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,a),e.render(t,d),e.setRenderTarget(f,p,g),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class el extends Dt{constructor(e=[],t=ci,i,a,r,s,o,l,c,d){super(e,t,i,a,r,s,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zf extends Dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new el(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Zi(5,5,5),r=new un({name:"CubemapFromEquirect",uniforms:wi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nt,blending:bn});r.uniforms.tEquirect.value=t;const s=new on(a,r),o=t.minFilter;return t.minFilter===Rn&&(t.minFilter=en),new Bf(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,a=!0){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,a);e.setRenderTarget(r)}}class br extends Gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kf={type:"move"};class _s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new br,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new br,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new oe,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new oe),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new br,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new oe,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new oe),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const M of e.hand.values()){const v=t.getJointPose(M,i),u=this._getHandJoint(c,M);v!==null&&(u.matrix.fromArray(v.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=v.radius),u.visible=v!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],p=d.position.distanceTo(f.position),g=.02,m=.005;c.inputState.pinching&&p>g+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=g-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kf)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new br;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class tl extends Gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xs extends Bt{constructor(e,t,i,a=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ss=new oe,Hf=new oe,Gf=new Je;class Kn{constructor(e=new oe(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=Ss.subVectors(i,t).cross(Hf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ss),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Gf.getNormalMatrix(e),a=this.coplanarPoint(Ss).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new is,Vf=new Ke(.5,.5),Cr=new oe;class nl{constructor(e=new Kn,t=new Kn,i=new Kn,a=new Kn,r=new Kn,s=new Kn){this.planes=[e,t,i,a,r,s]}set(e,t,i,a,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fn,i=!1){const a=this.planes,r=e.elements,s=r[0],o=r[1],l=r[2],c=r[3],d=r[4],f=r[5],p=r[6],g=r[7],m=r[8],M=r[9],v=r[10],u=r[11],x=r[12],y=r[13],A=r[14],R=r[15];if(a[0].setComponents(c-s,g-d,u-m,R-x).normalize(),a[1].setComponents(c+s,g+d,u+m,R+x).normalize(),a[2].setComponents(c+o,g+f,u+M,R+y).normalize(),a[3].setComponents(c-o,g-f,u-M,R-y).normalize(),i)a[4].setComponents(l,p,v,A).normalize(),a[5].setComponents(c-l,g-p,u-v,R-A).normalize();else if(a[4].setComponents(c-l,g-p,u-v,R-A).normalize(),t===fn)a[5].setComponents(c+l,g+p,u+v,R+A).normalize();else if(t===lr)a[5].setComponents(l,p,v,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(e){Qn.center.set(0,0,0);const t=Vf.distanceTo(e.center);return Qn.radius=.7071067811865476+t,Qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(Cr.x=a.normal.x>0?e.max.x:e.min.x,Cr.y=a.normal.y>0?e.max.y:e.min.y,Cr.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Cr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class il extends Dt{constructor(e,t,i=Wn,a,r,s,o=$t,l=$t,c,d=Oi,f=1){if(d!==Oi&&d!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:f};super(p,a,r,s,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ja(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class rl extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ki extends On{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const r=e/2,s=t/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,f=e/o,p=t/l,g=[],m=[],M=[],v=[];for(let u=0;u<d;u++){const x=u*p-s;for(let y=0;y<c;y++){const A=y*f-r;m.push(A,-x,0),M.push(0,0,1),v.push(y/o),v.push(1-u/l)}}for(let u=0;u<l;u++)for(let x=0;x<o;x++){const y=x+c*u,A=x+c*(u+1),R=x+1+c*(u+1),P=x+1+c*u;g.push(y,A,P),g.push(A,R,P)}this.setIndex(g),this.setAttribute("position",new qn(m,3)),this.setAttribute("normal",new qn(M,3)),this.setAttribute("uv",new qn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wf extends _r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=tf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xf extends _r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ms extends jo{constructor(e=-1,t=1,i=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=i-e,s=i+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yf extends On{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class qf extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function al(n,e,t,i){const a=Zf(i);switch(t){case Mo:return n*e;case Ao:return n*e/a.components*a.byteLength;case ma:return n*e/a.components*a.byteLength;case ga:return n*e*2/a.components*a.byteLength;case va:return n*e*2/a.components*a.byteLength;case Eo:return n*e*3/a.components*a.byteLength;case tn:return n*e*4/a.components*a.byteLength;case _a:return n*e*4/a.components*a.byteLength;case ir:case rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ar:case sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sa:case Ea:return Math.max(n,16)*Math.max(e,8)/4;case xa:case Ma:return Math.max(n,8)*Math.max(e,8)/2;case Aa:case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case wa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Da:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case La:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Na:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Oa:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case za:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ka:case Ha:case Ga:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Va:case Wa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xa:case Ya:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zf(n){switch(n){case gn:case vo:return{byteLength:1,components:1};case Ui:case _o:case Fi:return{byteLength:2,components:1};case ha:case pa:return{byteLength:2,components:4};case Wn:case da:case cn:return{byteLength:4,components:1};case xo:case So:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jr}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jr);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sl(){let n=null,e=!1,t=null,i=null;function a(r,s){t(r,s),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Kf(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,f=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,d),o.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const d=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((g,m)=>g.start-m.start);let p=0;for(let g=1;g<f.length;g++){const m=f[p],M=f[g];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++p,f[p]=M)}f.length=p+1;for(let g=0,m=f.length;g<m;g++){const M=f[g];n.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}var Qf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,jf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$f=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,iu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ru=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,su=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_u=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,xu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Su=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Au=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tu="gl_FragColor = linearToOutputTexel( gl_FragColor );",bu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ru=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Iu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ou=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ku=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Gu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Vu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Zu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ku=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ju=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ju=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$u=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ed=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,td=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ad=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,od=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ld=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ud=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,md=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_d=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Md=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ed=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ad=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Td=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Id=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ld=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ud=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Od=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Zd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $e={alphahash_fragment:Qf,alphahash_pars_fragment:jf,alphamap_fragment:Jf,alphamap_pars_fragment:$f,alphatest_fragment:eu,alphatest_pars_fragment:tu,aomap_fragment:nu,aomap_pars_fragment:iu,batching_pars_vertex:ru,batching_vertex:au,begin_vertex:su,beginnormal_vertex:ou,bsdfs:lu,iridescence_fragment:cu,bumpmap_pars_fragment:fu,clipping_planes_fragment:uu,clipping_planes_pars_fragment:du,clipping_planes_pars_vertex:hu,clipping_planes_vertex:pu,color_fragment:mu,color_pars_fragment:gu,color_pars_vertex:vu,color_vertex:_u,common:xu,cube_uv_reflection_fragment:Su,defaultnormal_vertex:Mu,displacementmap_pars_vertex:Eu,displacementmap_vertex:Au,emissivemap_fragment:yu,emissivemap_pars_fragment:wu,colorspace_fragment:Tu,colorspace_pars_fragment:bu,envmap_fragment:Cu,envmap_common_pars_fragment:Ru,envmap_pars_fragment:Pu,envmap_pars_vertex:Du,envmap_physical_pars_fragment:Gu,envmap_vertex:Iu,fog_vertex:Lu,fog_pars_vertex:Uu,fog_fragment:Fu,fog_pars_fragment:Nu,gradientmap_pars_fragment:Ou,lightmap_pars_fragment:Bu,lights_lambert_fragment:zu,lights_lambert_pars_fragment:ku,lights_pars_begin:Hu,lights_toon_fragment:Vu,lights_toon_pars_fragment:Wu,lights_phong_fragment:Xu,lights_phong_pars_fragment:Yu,lights_physical_fragment:qu,lights_physical_pars_fragment:Zu,lights_fragment_begin:Ku,lights_fragment_maps:Qu,lights_fragment_end:ju,logdepthbuf_fragment:Ju,logdepthbuf_pars_fragment:$u,logdepthbuf_pars_vertex:ed,logdepthbuf_vertex:td,map_fragment:nd,map_pars_fragment:id,map_particle_fragment:rd,map_particle_pars_fragment:ad,metalnessmap_fragment:sd,metalnessmap_pars_fragment:od,morphinstance_vertex:ld,morphcolor_vertex:cd,morphnormal_vertex:fd,morphtarget_pars_vertex:ud,morphtarget_vertex:dd,normal_fragment_begin:hd,normal_fragment_maps:pd,normal_pars_fragment:md,normal_pars_vertex:gd,normal_vertex:vd,normalmap_pars_fragment:_d,clearcoat_normal_fragment_begin:xd,clearcoat_normal_fragment_maps:Sd,clearcoat_pars_fragment:Md,iridescence_pars_fragment:Ed,opaque_fragment:Ad,packing:yd,premultiplied_alpha_fragment:wd,project_vertex:Td,dithering_fragment:bd,dithering_pars_fragment:Cd,roughnessmap_fragment:Rd,roughnessmap_pars_fragment:Pd,shadowmap_pars_fragment:Dd,shadowmap_pars_vertex:Id,shadowmap_vertex:Ld,shadowmask_pars_fragment:Ud,skinbase_vertex:Fd,skinning_pars_vertex:Nd,skinning_vertex:Od,skinnormal_vertex:Bd,specularmap_fragment:zd,specularmap_pars_fragment:kd,tonemapping_fragment:Hd,tonemapping_pars_fragment:Gd,transmission_fragment:Vd,transmission_pars_fragment:Wd,uv_pars_fragment:Xd,uv_pars_vertex:Yd,uv_vertex:qd,worldpos_vertex:Zd,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},we={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},dn={basic:{uniforms:It([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:It([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ft(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:It([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:It([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:It([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new ft(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:It([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:It([we.points,we.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:It([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:It([we.common,we.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:It([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:It([we.sprite,we.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:It([we.common,we.displacementmap,{referencePosition:{value:new oe},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:It([we.lights,we.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};dn.physical={uniforms:It([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Rr={r:0,b:0,g:0},jn=new Sn,Kd=new yt;function Qd(n,e,t,i,a,r,s){const o=new ft(0);let l=r===!0?0:1,c,d,f=null,p=0,g=null;function m(y){let A=y.isScene===!0?y.background:null;return A&&A.isTexture&&(A=(y.backgroundBlurriness>0?t:e).get(A)),A}function M(y){let A=!1;const R=m(y);R===null?u(o,l):R&&R.isColor&&(u(R,1),A=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,A){const R=m(A);R&&(R.isCubeTexture||R.mapping===tr)?(d===void 0&&(d=new on(new Zi(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:wi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(P,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),jn.copy(A.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),d.material.uniforms.envMap.value=R,d.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Kd.makeRotationFromEuler(jn)),d.material.toneMapped=st.getTransfer(R.colorSpace)!==ct,(f!==R||p!==R.version||g!==n.toneMapping)&&(d.material.needsUpdate=!0,f=R,p=R.version,g=n.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new on(new Ki(2,2),new un({name:"BackgroundMaterial",uniforms:wi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=st.getTransfer(R.colorSpace)!==ct,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(f!==R||p!==R.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,f=R,p=R.version,g=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,A){y.getRGB(Rr,Qo(n)),i.buffers.color.setClear(Rr.r,Rr.g,Rr.b,A,s)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,A=1){o.set(y),l=A,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(o,l)},render:M,addToRenderList:v,dispose:x}}function jd(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=p(null);let r=a,s=!1;function o(T,U,z,k,W){let Q=!1;const X=f(k,z,U);r!==X&&(r=X,c(r.object)),Q=g(T,k,z,W),Q&&m(T,k,z,W),W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(Q||s)&&(s=!1,A(T,U,z,k),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function d(T){return n.deleteVertexArray(T)}function f(T,U,z){const k=z.wireframe===!0;let W=i[T.id];W===void 0&&(W={},i[T.id]=W);let Q=W[U.id];Q===void 0&&(Q={},W[U.id]=Q);let X=Q[k];return X===void 0&&(X=p(l()),Q[k]=X),X}function p(T){const U=[],z=[],k=[];for(let W=0;W<t;W++)U[W]=0,z[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:k,object:T,attributes:{},index:null}}function g(T,U,z,k){const W=r.attributes,Q=U.attributes;let X=0;const Z=z.getAttributes();for(const V in Z)if(Z[V].location>=0){const me=W[V];let Ee=Q[V];if(Ee===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(Ee=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(Ee=T.instanceColor)),me===void 0||me.attribute!==Ee||Ee&&me.data!==Ee.data)return!0;X++}return r.attributesNum!==X||r.index!==k}function m(T,U,z,k){const W={},Q=U.attributes;let X=0;const Z=z.getAttributes();for(const V in Z)if(Z[V].location>=0){let me=Q[V];me===void 0&&(V==="instanceMatrix"&&T.instanceMatrix&&(me=T.instanceMatrix),V==="instanceColor"&&T.instanceColor&&(me=T.instanceColor));const Ee={};Ee.attribute=me,me&&me.data&&(Ee.data=me.data),W[V]=Ee,X++}r.attributes=W,r.attributesNum=X,r.index=k}function M(){const T=r.newAttributes;for(let U=0,z=T.length;U<z;U++)T[U]=0}function v(T){u(T,0)}function u(T,U){const z=r.newAttributes,k=r.enabledAttributes,W=r.attributeDivisors;z[T]=1,k[T]===0&&(n.enableVertexAttribArray(T),k[T]=1),W[T]!==U&&(n.vertexAttribDivisor(T,U),W[T]=U)}function x(){const T=r.newAttributes,U=r.enabledAttributes;for(let z=0,k=U.length;z<k;z++)U[z]!==T[z]&&(n.disableVertexAttribArray(z),U[z]=0)}function y(T,U,z,k,W,Q,X){X===!0?n.vertexAttribIPointer(T,U,z,W,Q):n.vertexAttribPointer(T,U,z,k,W,Q)}function A(T,U,z,k){M();const W=k.attributes,Q=z.getAttributes(),X=U.defaultAttributeValues;for(const Z in Q){const V=Q[Z];if(V.location>=0){let ce=W[Z];if(ce===void 0&&(Z==="instanceMatrix"&&T.instanceMatrix&&(ce=T.instanceMatrix),Z==="instanceColor"&&T.instanceColor&&(ce=T.instanceColor)),ce!==void 0){const me=ce.normalized,Ee=ce.itemSize,Ae=e.get(ce);if(Ae===void 0)continue;const Pe=Ae.buffer,Fe=Ae.type,Ce=Ae.bytesPerElement,ee=Fe===n.INT||Fe===n.UNSIGNED_INT||ce.gpuType===da;if(ce.isInterleavedBufferAttribute){const ne=ce.data,ue=ne.stride,de=ce.offset;if(ne.isInstancedInterleavedBuffer){for(let _e=0;_e<V.locationSize;_e++)u(V.location+_e,ne.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let _e=0;_e<V.locationSize;_e++)v(V.location+_e);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let _e=0;_e<V.locationSize;_e++)y(V.location+_e,Ee/V.locationSize,Fe,me,ue*Ce,(de+Ee/V.locationSize*_e)*Ce,ee)}else{if(ce.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)u(V.location+ne,ce.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ne=0;ne<V.locationSize;ne++)v(V.location+ne);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let ne=0;ne<V.locationSize;ne++)y(V.location+ne,Ee/V.locationSize,Fe,me,Ee*Ce,Ee/V.locationSize*ne*Ce,ee)}}else if(X!==void 0){const me=X[Z];if(me!==void 0)switch(me.length){case 2:n.vertexAttrib2fv(V.location,me);break;case 3:n.vertexAttrib3fv(V.location,me);break;case 4:n.vertexAttrib4fv(V.location,me);break;default:n.vertexAttrib1fv(V.location,me)}}}}x()}function R(){L();for(const T in i){const U=i[T];for(const z in U){const k=U[z];for(const W in k)d(k[W].object),delete k[W];delete U[z]}delete i[T]}}function P(T){if(i[T.id]===void 0)return;const U=i[T.id];for(const z in U){const k=U[z];for(const W in k)d(k[W].object),delete k[W];delete U[z]}delete i[T.id]}function E(T){for(const U in i){const z=i[U];if(z[T.id]===void 0)continue;const k=z[T.id];for(const W in k)d(k[W].object),delete k[W];delete z[T.id]}}function L(){w(),s=!0,r!==a&&(r=a,c(r.object))}function w(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:L,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:P,releaseStatesOfProgram:E,initAttributes:M,enableAttribute:v,disableUnusedAttributes:x}}function Jd(n,e,t){let i;function a(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function s(c,d,f){f!==0&&(n.drawArraysInstanced(i,c,d,f),t.update(d,i,f))}function o(c,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,f);let g=0;for(let m=0;m<f;m++)g+=d[m];t.update(g,i,1)}function l(c,d,f,p){if(f===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<c.length;m++)s(c[m],d[m],p[m]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,d,0,p,0,f);let m=0;for(let M=0;M<f;M++)m+=d[M]*p[M];t.update(m,i,1)}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function $d(n,e,t,i){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(E){return!(E!==tn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const L=E===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==gn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==cn&&!L)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:g,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:v,maxAttributes:u,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:A,vertexTextures:R,maxSamples:P}}function eh(n){const e=this;let t=null,i=0,a=!1,r=!1;const s=new Kn,o=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const g=f.length!==0||p||i!==0||a;return a=p,i=f.length,g},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,p){t=d(f,p,0)},this.setState=function(f,p,g){const m=f.clippingPlanes,M=f.clipIntersection,v=f.clipShadows,u=n.get(f);if(!a||m===null||m.length===0||r&&!v)r?d(null):c();else{const x=r?0:i,y=x*4;let A=u.clippingState||null;l.value=A,A=d(m,p,y,g);for(let R=0;R!==y;++R)A[R]=t[R];u.clippingState=A,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,p,g,m){const M=f!==null?f.length:0;let v=null;if(M!==0){if(v=l.value,m!==!0||v===null){const u=g+M*4,x=p.matrixWorldInverse;o.getNormalMatrix(x),(v===null||v.length<u)&&(v=new Float32Array(u));for(let y=0,A=g;y!==M;++y,A+=4)s.copy(f[y]).applyMatrix4(x,o),s.normal.toArray(v,A),v[A+3]=s.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,v}}function th(n){let e=new WeakMap;function t(s,o){return o===la?s.mapping=ci:o===ca&&(s.mapping=fi),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===la||o===ca)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new zf(l.height);return c.fromEquirectangularTexture(n,s),e.set(s,c),s.addEventListener("dispose",a),t(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Ci=4,ol=[.125,.215,.35,.446,.526,.582],Jn=20,Es=new Ms,ll=new ft;let As=null,ys=0,ws=0,Ts=!1;const $n=(1+Math.sqrt(5))/2,Ri=1/$n,cl=[new oe(-$n,Ri,0),new oe($n,Ri,0),new oe(-Ri,0,$n),new oe(Ri,0,$n),new oe(0,$n,-Ri),new oe(0,$n,Ri),new oe(-1,1,-1),new oe(1,1,-1),new oe(-1,1,1),new oe(1,1,1)],nh=new oe;class fl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100,r={}){const{size:s=256,position:o=nh}=r;As=this._renderer.getRenderTarget(),ys=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(As,ys,ws),this._renderer.xr.enabled=Ts,e.scissorTest=!1,Pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ci||e.mapping===fi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),As=this._renderer.getRenderTarget(),ys=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Ts=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:Fi,format:tn,colorSpace:ui,depthBuffer:!1},a=ul(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ul(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ih(r)),this._blurMaterial=rh(r,e,t)}return a}_compileMaterial(e){const t=new on(this._lodPlanes[0],e);this._renderer.compile(t,Es)}_sceneToCubeUV(e,t,i,a,r){const l=new ln(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,g=f.toneMapping;f.getClearColor(ll),f.toneMapping=Cn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(a),f.clearDepth(),f.setRenderTarget(null));const M=new Wo({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),v=new on(new Zi,M);let u=!1;const x=e.background;x?x.isColor&&(M.color.copy(x),e.background=null,u=!0):(M.color.copy(ll),u=!0);for(let y=0;y<6;y++){const A=y%3;A===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[y],r.y,r.z)):A===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[y]));const R=this._cubeSize;Pr(a,A*R,y>2?R:0,R,R),f.setRenderTarget(a),u&&f.render(v,l),f.render(e,l)}v.geometry.dispose(),v.material.dispose(),f.toneMapping=g,f.autoClear=p,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===ci||e.mapping===fi;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new on(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Pr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(s,Es)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=cl[(a-r-1)%cl.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,a,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,a,"latitudinal",r),this._halfBlur(s,e,i,i,a,"longitudinal",r)}_halfBlur(e,t,i,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new on(this._lodPlanes[a],c),p=c.uniforms,g=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Jn-1),M=r/m,v=isFinite(r)?1+Math.floor(d*M):Jn;v>Jn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Jn}`);const u=[];let x=0;for(let E=0;E<Jn;++E){const L=E/M,w=Math.exp(-L*L/2);u.push(w),E===0?x+=w:E<v&&(x+=2*w)}for(let E=0;E<u.length;E++)u[E]=u[E]/x;p.envMap.value=e.texture,p.samples.value=v,p.weights.value=u,p.latitudinal.value=s==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:y}=this;p.dTheta.value=m,p.mipInt.value=y-i;const A=this._sizeLods[a],R=3*A*(a>y-Ci?a-y+Ci:0),P=4*(this._cubeSize-A);Pr(t,R,P,3*A,2*A),l.setRenderTarget(t),l.render(f,Es)}}function ih(n){const e=[],t=[],i=[];let a=n;const r=n-Ci+1+ol.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);t.push(o);let l=1/o;s>n-Ci?l=ol[s-n+Ci-1]:s===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,f=1+c,p=[d,d,f,d,f,f,d,d,f,f,d,f],g=6,m=6,M=3,v=2,u=1,x=new Float32Array(M*m*g),y=new Float32Array(v*m*g),A=new Float32Array(u*m*g);for(let P=0;P<g;P++){const E=P%3*2/3-1,L=P>2?0:-1,w=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];x.set(w,M*m*P),y.set(p,v*m*P);const T=[P,P,P,P,P,P];A.set(T,u*m*P)}const R=new On;R.setAttribute("position",new Bt(x,M)),R.setAttribute("uv",new Bt(y,v)),R.setAttribute("faceIndex",new Bt(A,u)),e.push(R),a>Ci&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ul(n,e,t){const i=new Dn(n,e,t);return i.texture.mapping=tr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pr(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function rh(n,e,t){const i=new Float32Array(Jn),a=new oe(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:Jn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function dl(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function hl(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function bs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ah(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===la||l===ca,d=l===ci||l===fi;if(c||d){let f=e.get(o);const p=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return t===null&&(t=new fl(n)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const g=o.image;return c&&g&&g.height>0||d&&g&&a(g)?(t===null&&(t=new fl(n)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",r),f.texture):null}}}return o}function a(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function sh(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&Gi("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function oh(n,e,t,i){const a={},r=new WeakMap;function s(f){const p=f.target;p.index!==null&&e.remove(p.index);for(const m in p.attributes)e.remove(p.attributes[m]);p.removeEventListener("dispose",s),delete a[p.id];const g=r.get(p);g&&(e.remove(g),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(f,p){return a[p.id]===!0||(p.addEventListener("dispose",s),a[p.id]=!0,t.memory.geometries++),p}function l(f){const p=f.attributes;for(const g in p)e.update(p[g],n.ARRAY_BUFFER)}function c(f){const p=[],g=f.index,m=f.attributes.position;let M=0;if(g!==null){const x=g.array;M=g.version;for(let y=0,A=x.length;y<A;y+=3){const R=x[y+0],P=x[y+1],E=x[y+2];p.push(R,P,P,E,E,R)}}else if(m!==void 0){const x=m.array;M=m.version;for(let y=0,A=x.length/3-1;y<A;y+=3){const R=y+0,P=y+1,E=y+2;p.push(R,P,P,E,E,R)}}else return;const v=new(Ro(p)?Yo:Xo)(p,1);v.version=M;const u=r.get(f);u&&e.remove(u),r.set(f,v)}function d(f){const p=r.get(f);if(p){const g=f.index;g!==null&&p.version<g.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function lh(n,e,t){let i;function a(p){i=p}let r,s;function o(p){r=p.type,s=p.bytesPerElement}function l(p,g){n.drawElements(i,g,r,p*s),t.update(g,i,1)}function c(p,g,m){m!==0&&(n.drawElementsInstanced(i,g,r,p*s,m),t.update(g,i,m))}function d(p,g,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,r,p,0,m);let v=0;for(let u=0;u<m;u++)v+=g[u];t.update(v,i,1)}function f(p,g,m,M){if(m===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let u=0;u<p.length;u++)c(p[u]/s,g[u],M[u]);else{v.multiDrawElementsInstancedWEBGL(i,g,0,r,p,0,M,0,m);let u=0;for(let x=0;x<m;x++)u+=g[x]*M[x];t.update(u,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function ch(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function fh(n,e,t){const i=new WeakMap,a=new Mt;function r(s,o,l){const c=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let p=i.get(o);if(p===void 0||p.count!==f){let w=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",w)};p!==void 0&&p.texture.dispose();const g=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,v=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),m===!0&&(y=2),M===!0&&(y=3);let A=o.attributes.position.count*y,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const P=new Float32Array(A*R*4*f),E=new Lo(P,A,R,f);E.type=cn,E.needsUpdate=!0;const L=y*4;for(let T=0;T<f;T++){const U=v[T],z=u[T],k=x[T],W=A*R*4*T;for(let Q=0;Q<U.count;Q++){const X=Q*L;g===!0&&(a.fromBufferAttribute(U,Q),P[W+X+0]=a.x,P[W+X+1]=a.y,P[W+X+2]=a.z,P[W+X+3]=0),m===!0&&(a.fromBufferAttribute(z,Q),P[W+X+4]=a.x,P[W+X+5]=a.y,P[W+X+6]=a.z,P[W+X+7]=0),M===!0&&(a.fromBufferAttribute(k,Q),P[W+X+8]=a.x,P[W+X+9]=a.y,P[W+X+10]=a.z,P[W+X+11]=k.itemSize===4?a.w:1)}}p={count:f,texture:E,size:new Ke(A,R)},i.set(o,p),o.addEventListener("dispose",w)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let g=0;for(let M=0;M<c.length;M++)g+=c[M];const m=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:r}}function uh(n,e,t,i){let a=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,f=e.get(l,d);if(a.get(f)!==c&&(e.update(f),a.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;a.get(p)!==c&&(p.update(),a.set(p,c))}return f}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:s}}const pl=new Dt,ml=new il(1,1),gl=new Lo,vl=new Mf,_l=new el,xl=[],Sl=[],Ml=new Float32Array(16),El=new Float32Array(9),Al=new Float32Array(4);function Pi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let r=xl[a];if(r===void 0&&(r=new Float32Array(a),xl[a]=r),e!==0){i.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(r,o)}return r}function wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Tt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Dr(n,e){let t=Sl[e];t===void 0&&(t=new Int32Array(e),Sl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function dh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function hh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2fv(this.addr,e),Tt(t,e)}}function ph(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(wt(t,e))return;n.uniform3fv(this.addr,e),Tt(t,e)}}function mh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4fv(this.addr,e),Tt(t,e)}}function gh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Al.set(i),n.uniformMatrix2fv(this.addr,!1,Al),Tt(t,i)}}function vh(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;El.set(i),n.uniformMatrix3fv(this.addr,!1,El),Tt(t,i)}}function _h(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(wt(t,i))return;Ml.set(i),n.uniformMatrix4fv(this.addr,!1,Ml),Tt(t,i)}}function xh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Sh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2iv(this.addr,e),Tt(t,e)}}function Mh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3iv(this.addr,e),Tt(t,e)}}function Eh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4iv(this.addr,e),Tt(t,e)}}function Ah(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function yh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(wt(t,e))return;n.uniform2uiv(this.addr,e),Tt(t,e)}}function wh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(wt(t,e))return;n.uniform3uiv(this.addr,e),Tt(t,e)}}function Th(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(wt(t,e))return;n.uniform4uiv(this.addr,e),Tt(t,e)}}function bh(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let r;this.type===n.SAMPLER_2D_SHADOW?(ml.compareFunction=wo,r=ml):r=pl,t.setTexture2D(e||r,a)}function Ch(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||vl,a)}function Rh(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||_l,a)}function Ph(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||gl,a)}function Dh(n){switch(n){case 5126:return dh;case 35664:return hh;case 35665:return ph;case 35666:return mh;case 35674:return gh;case 35675:return vh;case 35676:return _h;case 5124:case 35670:return xh;case 35667:case 35671:return Sh;case 35668:case 35672:return Mh;case 35669:case 35673:return Eh;case 5125:return Ah;case 36294:return yh;case 36295:return wh;case 36296:return Th;case 35678:case 36198:case 36298:case 36306:case 35682:return bh;case 35679:case 36299:case 36307:return Ch;case 35680:case 36300:case 36308:case 36293:return Rh;case 36289:case 36303:case 36311:case 36292:return Ph}}function Ih(n,e){n.uniform1fv(this.addr,e)}function Lh(n,e){const t=Pi(e,this.size,2);n.uniform2fv(this.addr,t)}function Uh(n,e){const t=Pi(e,this.size,3);n.uniform3fv(this.addr,t)}function Fh(n,e){const t=Pi(e,this.size,4);n.uniform4fv(this.addr,t)}function Nh(n,e){const t=Pi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Oh(n,e){const t=Pi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Bh(n,e){const t=Pi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function zh(n,e){n.uniform1iv(this.addr,e)}function kh(n,e){n.uniform2iv(this.addr,e)}function Hh(n,e){n.uniform3iv(this.addr,e)}function Gh(n,e){n.uniform4iv(this.addr,e)}function Vh(n,e){n.uniform1uiv(this.addr,e)}function Wh(n,e){n.uniform2uiv(this.addr,e)}function Xh(n,e){n.uniform3uiv(this.addr,e)}function Yh(n,e){n.uniform4uiv(this.addr,e)}function qh(n,e,t){const i=this.cache,a=e.length,r=Dr(t,a);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let s=0;s!==a;++s)t.setTexture2D(e[s]||pl,r[s])}function Zh(n,e,t){const i=this.cache,a=e.length,r=Dr(t,a);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||vl,r[s])}function Kh(n,e,t){const i=this.cache,a=e.length,r=Dr(t,a);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||_l,r[s])}function Qh(n,e,t){const i=this.cache,a=e.length,r=Dr(t,a);wt(i,r)||(n.uniform1iv(this.addr,r),Tt(i,r));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||gl,r[s])}function jh(n){switch(n){case 5126:return Ih;case 35664:return Lh;case 35665:return Uh;case 35666:return Fh;case 35674:return Nh;case 35675:return Oh;case 35676:return Bh;case 5124:case 35670:return zh;case 35667:case 35671:return kh;case 35668:case 35672:return Hh;case 35669:case 35673:return Gh;case 5125:return Vh;case 36294:return Wh;case 36295:return Xh;case 36296:return Yh;case 35678:case 36198:case 36298:case 36306:case 35682:return qh;case 35679:case 36299:case 36307:return Zh;case 35680:case 36300:case 36308:case 36293:return Kh;case 36289:case 36303:case 36311:case 36292:return Qh}}class Jh{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Dh(t.type)}}class $h{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jh(t.type)}}class ep{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(e,t[o.id],i)}}}const Cs=/(\w+)(\])?(\[|\.)?/g;function yl(n,e){n.seq.push(e),n.map[e.id]=e}function tp(n,e,t){const i=n.name,a=i.length;for(Cs.lastIndex=0;;){const r=Cs.exec(i),s=Cs.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){yl(t,c===void 0?new Jh(o,n,e):new $h(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new ep(o),yl(t,f)),t=f}}}class Ir{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=e.getActiveUniform(t,a),s=e.getUniformLocation(t,r.name);tp(r,s,this)}}setValue(e,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let r=0,s=t.length;r!==s;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,r=e.length;a!==r;++a){const s=e[a];s.id in t&&i.push(s)}return i}}function wl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const np=37297;let ip=0;function rp(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=a;s<r;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const Tl=new Je;function ap(n){st._getMatrix(Tl,st.workingColorSpace,n);const e=`mat3( ${Tl.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case or:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+rp(n.getShaderSource(e),o)}else return r}function sp(n,e){const t=ap(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function op(n,e){let t;switch(e){case qc:t="Linear";break;case Zc:t="Reinhard";break;case Kc:t="Cineon";break;case Qc:t="ACESFilmic";break;case Jc:t="AgX";break;case $c:t="Neutral";break;case jc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Lr=new oe;function lp(){st.getLuminanceCoefficients(Lr);const n=Lr.x.toFixed(4),e=Lr.y.toFixed(4),t=Lr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function cp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qi).join(`
`)}function fp(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function up(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=n.getActiveAttrib(e,a),s=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Qi(n){return n!==""}function Cl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rs(n){return n.replace(dp,pp)}const hp=new Map;function pp(n,e){let t=$e[e];if(t===void 0){const i=hp.get(e);if(i!==void 0)t=$e[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Rs(t)}const mp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(n){return n.replace(mp,gp)}function gp(n,e,t,i){let a="";for(let r=parseInt(e);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Dl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vp(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===fo?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Tc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===pn&&(e="SHADOWMAP_TYPE_VSM"),e}function _p(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ci:case fi:e="ENVMAP_TYPE_CUBE";break;case tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xp(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case fi:e="ENVMAP_MODE_REFRACTION";break}return e}function Sp(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case mo:e="ENVMAP_BLENDING_MULTIPLY";break;case Xc:e="ENVMAP_BLENDING_MIX";break;case Yc:e="ENVMAP_BLENDING_ADD";break}return e}function Mp(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Ep(n,e,t,i){const a=n.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=vp(t),c=_p(t),d=xp(t),f=Sp(t),p=Mp(t),g=cp(t),m=fp(r),M=a.createProgram();let v,u,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qi).join(`
`),v.length>0&&(v+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Qi).join(`
`),u.length>0&&(u+=`
`)):(v=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qi).join(`
`),u=[Dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?$e.tonemapping_pars_fragment:"",t.toneMapping!==Cn?op("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,sp("linearToOutputTexel",t.outputColorSpace),lp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qi).join(`
`)),s=Rs(s),s=Cl(s,t),s=Rl(s,t),o=Rs(o),o=Cl(o,t),o=Rl(o,t),s=Pl(s),o=Pl(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,v=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,u=["#define varying in",t.glslVersion===bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=x+v+s,A=x+u+o,R=wl(a,a.VERTEX_SHADER,y),P=wl(a,a.FRAGMENT_SHADER,A);a.attachShader(M,R),a.attachShader(M,P),t.index0AttributeName!==void 0?a.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(M,0,"position"),a.linkProgram(M);function E(U){if(n.debug.checkShaderErrors){const z=a.getProgramInfoLog(M)||"",k=a.getShaderInfoLog(R)||"",W=a.getShaderInfoLog(P)||"",Q=z.trim(),X=k.trim(),Z=W.trim();let V=!0,ce=!0;if(a.getProgramParameter(M,a.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,M,R,P);else{const me=bl(a,R,"vertex"),Ee=bl(a,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(M,a.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Q+`
`+me+`
`+Ee)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(X===""||Z==="")&&(ce=!1);ce&&(U.diagnostics={runnable:V,programLog:Q,vertexShader:{log:X,prefix:v},fragmentShader:{log:Z,prefix:u}})}a.deleteShader(R),a.deleteShader(P),L=new Ir(a,M),w=up(a,M)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let T=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=a.getProgramParameter(M,np)),T},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ip++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=R,this.fragmentShader=P,this}let Ap=0;class yp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),r=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new wp(e),t.set(e,i)),i}}class wp{constructor(e){this.id=Ap++,this.code=e,this.usedTimes=0}}function Tp(n,e,t,i,a,r,s){const o=new No,l=new yp,c=new Set,d=[],f=a.logarithmicDepthBuffer,p=a.vertexTextures;let g=a.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(w){return c.add(w),w===0?"uv":`uv${w}`}function v(w,T,U,z,k){const W=z.fog,Q=k.geometry,X=w.isMeshStandardMaterial?z.environment:null,Z=(w.isMeshStandardMaterial?t:e).get(w.envMap||X),V=Z&&Z.mapping===tr?Z.image.height:null,ce=m[w.type];w.precision!==null&&(g=a.getMaxPrecision(w.precision),g!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ee=me!==void 0?me.length:0;let Ae=0;Q.morphAttributes.position!==void 0&&(Ae=1),Q.morphAttributes.normal!==void 0&&(Ae=2),Q.morphAttributes.color!==void 0&&(Ae=3);let Pe,Fe,Ce,ee;if(ce){const ve=dn[ce];Pe=ve.vertexShader,Fe=ve.fragmentShader}else Pe=w.vertexShader,Fe=w.fragmentShader,l.update(w),Ce=l.getVertexShaderID(w),ee=l.getFragmentShaderID(w);const ne=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),de=k.isInstancedMesh===!0,_e=k.isBatchedMesh===!0,Oe=!!w.map,ye=!!w.matcap,N=!!Z,Ye=!!w.aoMap,Be=!!w.lightMap,Le=!!w.bumpMap,Me=!!w.normalMap,Re=!!w.displacementMap,Te=!!w.emissiveMap,We=!!w.metalnessMap,lt=!!w.roughnessMap,et=w.anisotropy>0,F=w.clearcoat>0,b=w.dispersion>0,J=w.iridescence>0,fe=w.sheen>0,he=w.transmission>0,ae=et&&!!w.anisotropyMap,De=F&&!!w.clearcoatMap,Se=F&&!!w.clearcoatNormalMap,C=F&&!!w.clearcoatRoughnessMap,te=J&&!!w.iridescenceMap,K=J&&!!w.iridescenceThicknessMap,se=fe&&!!w.sheenColorMap,B=fe&&!!w.sheenRoughnessMap,q=!!w.specularMap,_=!!w.specularColorMap,ie=!!w.specularIntensityMap,O=he&&!!w.transmissionMap,h=he&&!!w.thicknessMap,H=!!w.gradientMap,Y=!!w.alphaMap,S=w.alphaTest>0,I=!!w.alphaHash,G=!!w.extensions;let pe=Cn;w.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(pe=n.toneMapping);const ge={shaderID:ce,shaderType:w.type,shaderName:w.name,vertexShader:Pe,fragmentShader:Fe,defines:w.defines,customVertexShaderID:Ce,customFragmentShaderID:ee,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,batching:_e,batchingColor:_e&&k._colorsTexture!==null,instancing:de,instancingColor:de&&k.instanceColor!==null,instancingMorph:de&&k.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ui,alphaToCoverage:!!w.alphaToCoverage,map:Oe,matcap:ye,envMap:N,envMapMode:N&&Z.mapping,envMapCubeUVHeight:V,aoMap:Ye,lightMap:Be,bumpMap:Le,normalMap:Me,displacementMap:p&&Re,emissiveMap:Te,normalMapObjectSpace:Me&&w.normalMapType===af,normalMapTangentSpace:Me&&w.normalMapType===rf,metalnessMap:We,roughnessMap:lt,anisotropy:et,anisotropyMap:ae,clearcoat:F,clearcoatMap:De,clearcoatNormalMap:Se,clearcoatRoughnessMap:C,dispersion:b,iridescence:J,iridescenceMap:te,iridescenceThicknessMap:K,sheen:fe,sheenColorMap:se,sheenRoughnessMap:B,specularMap:q,specularColorMap:_,specularIntensityMap:ie,transmission:he,transmissionMap:O,thicknessMap:h,gradientMap:H,opaque:w.transparent===!1&&w.blending===Hn&&w.alphaToCoverage===!1,alphaMap:Y,alphaTest:S,alphaHash:I,combine:w.combine,mapUv:Oe&&M(w.map.channel),aoMapUv:Ye&&M(w.aoMap.channel),lightMapUv:Be&&M(w.lightMap.channel),bumpMapUv:Le&&M(w.bumpMap.channel),normalMapUv:Me&&M(w.normalMap.channel),displacementMapUv:Re&&M(w.displacementMap.channel),emissiveMapUv:Te&&M(w.emissiveMap.channel),metalnessMapUv:We&&M(w.metalnessMap.channel),roughnessMapUv:lt&&M(w.roughnessMap.channel),anisotropyMapUv:ae&&M(w.anisotropyMap.channel),clearcoatMapUv:De&&M(w.clearcoatMap.channel),clearcoatNormalMapUv:Se&&M(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:C&&M(w.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&M(w.iridescenceMap.channel),iridescenceThicknessMapUv:K&&M(w.iridescenceThicknessMap.channel),sheenColorMapUv:se&&M(w.sheenColorMap.channel),sheenRoughnessMapUv:B&&M(w.sheenRoughnessMap.channel),specularMapUv:q&&M(w.specularMap.channel),specularColorMapUv:_&&M(w.specularColorMap.channel),specularIntensityMapUv:ie&&M(w.specularIntensityMap.channel),transmissionMapUv:O&&M(w.transmissionMap.channel),thicknessMapUv:h&&M(w.thicknessMap.channel),alphaMapUv:Y&&M(w.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Me||et),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Q.attributes.uv&&(Oe||Y),fog:!!W,useFog:w.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ue,skinning:k.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ae,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:pe,decodeVideoTexture:Oe&&w.map.isVideoTexture===!0&&st.getTransfer(w.map.colorSpace)===ct,decodeVideoTextureEmissive:Te&&w.emissiveMap.isVideoTexture===!0&&st.getTransfer(w.emissiveMap.colorSpace)===ct,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===mn,flipSided:w.side===Nt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:G&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(G&&w.extensions.multiDraw===!0||_e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function u(w){const T=[];if(w.shaderID?T.push(w.shaderID):(T.push(w.customVertexShaderID),T.push(w.customFragmentShaderID)),w.defines!==void 0)for(const U in w.defines)T.push(U),T.push(w.defines[U]);return w.isRawShaderMaterial===!1&&(x(T,w),y(T,w),T.push(n.outputColorSpace)),T.push(w.customProgramCacheKey),T.join()}function x(w,T){w.push(T.precision),w.push(T.outputColorSpace),w.push(T.envMapMode),w.push(T.envMapCubeUVHeight),w.push(T.mapUv),w.push(T.alphaMapUv),w.push(T.lightMapUv),w.push(T.aoMapUv),w.push(T.bumpMapUv),w.push(T.normalMapUv),w.push(T.displacementMapUv),w.push(T.emissiveMapUv),w.push(T.metalnessMapUv),w.push(T.roughnessMapUv),w.push(T.anisotropyMapUv),w.push(T.clearcoatMapUv),w.push(T.clearcoatNormalMapUv),w.push(T.clearcoatRoughnessMapUv),w.push(T.iridescenceMapUv),w.push(T.iridescenceThicknessMapUv),w.push(T.sheenColorMapUv),w.push(T.sheenRoughnessMapUv),w.push(T.specularMapUv),w.push(T.specularColorMapUv),w.push(T.specularIntensityMapUv),w.push(T.transmissionMapUv),w.push(T.thicknessMapUv),w.push(T.combine),w.push(T.fogExp2),w.push(T.sizeAttenuation),w.push(T.morphTargetsCount),w.push(T.morphAttributeCount),w.push(T.numDirLights),w.push(T.numPointLights),w.push(T.numSpotLights),w.push(T.numSpotLightMaps),w.push(T.numHemiLights),w.push(T.numRectAreaLights),w.push(T.numDirLightShadows),w.push(T.numPointLightShadows),w.push(T.numSpotLightShadows),w.push(T.numSpotLightShadowsWithMaps),w.push(T.numLightProbes),w.push(T.shadowMapType),w.push(T.toneMapping),w.push(T.numClippingPlanes),w.push(T.numClipIntersection),w.push(T.depthPacking)}function y(w,T){o.disableAll(),T.supportsVertexTextures&&o.enable(0),T.instancing&&o.enable(1),T.instancingColor&&o.enable(2),T.instancingMorph&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),T.dispersion&&o.enable(20),T.batchingColor&&o.enable(21),T.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),w.push(o.mask)}function A(w){const T=m[w.type];let U;if(T){const z=dn[T];U=Ff.clone(z.uniforms)}else U=w.uniforms;return U}function R(w,T){let U;for(let z=0,k=d.length;z<k;z++){const W=d[z];if(W.cacheKey===T){U=W,++U.usedTimes;break}}return U===void 0&&(U=new Ep(n,T,w,r),d.push(U)),U}function P(w){if(--w.usedTimes===0){const T=d.indexOf(w);d[T]=d[d.length-1],d.pop(),w.destroy()}}function E(w){l.remove(w)}function L(){l.dispose()}return{getParameters:v,getProgramCacheKey:u,getUniforms:A,acquireProgram:R,releaseProgram:P,releaseShaderCache:E,programs:d,dispose:L}}function bp(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function a(s,o,l){n.get(s)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:r}}function Cp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Il(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ll(){const n=[];let e=0;const t=[],i=[],a=[];function r(){e=0,t.length=0,i.length=0,a.length=0}function s(f,p,g,m,M,v){let u=n[e];return u===void 0?(u={id:f.id,object:f,geometry:p,material:g,groupOrder:m,renderOrder:f.renderOrder,z:M,group:v},n[e]=u):(u.id=f.id,u.object=f,u.geometry=p,u.material=g,u.groupOrder=m,u.renderOrder=f.renderOrder,u.z=M,u.group=v),e++,u}function o(f,p,g,m,M,v){const u=s(f,p,g,m,M,v);g.transmission>0?i.push(u):g.transparent===!0?a.push(u):t.push(u)}function l(f,p,g,m,M,v){const u=s(f,p,g,m,M,v);g.transmission>0?i.unshift(u):g.transparent===!0?a.unshift(u):t.unshift(u)}function c(f,p){t.length>1&&t.sort(f||Cp),i.length>1&&i.sort(p||Il),a.length>1&&a.sort(p||Il)}function d(){for(let f=e,p=n.length;f<p;f++){const g=n[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:o,unshift:l,finish:d,sort:c}}function Rp(){let n=new WeakMap;function e(i,a){const r=n.get(i);let s;return r===void 0?(s=new Ll,n.set(i,[s])):a>=r.length?(s=new Ll,r.push(s)):s=r[a],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function Pp(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new oe,color:new ft};break;case"SpotLight":t={position:new oe,direction:new oe,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new oe,color:new ft,distance:0,decay:0};break;case"HemisphereLight":t={direction:new oe,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":t={color:new ft,position:new oe,halfWidth:new oe,halfHeight:new oe};break}return n[e.id]=t,t}}}function Dp(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Ip=0;function Lp(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Up(n){const e=new Pp,t=Dp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new oe);const a=new oe,r=new yt,s=new yt;function o(c){let d=0,f=0,p=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let g=0,m=0,M=0,v=0,u=0,x=0,y=0,A=0,R=0,P=0,E=0;c.sort(Lp);for(let w=0,T=c.length;w<T;w++){const U=c[w],z=U.color,k=U.intensity,W=U.distance,Q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=z.r*k,f+=z.g*k,p+=z.b*k;else if(U.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(U.sh.coefficients[X],k);E++}else if(U.isDirectionalLight){const X=e.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const Z=U.shadow,V=t.get(U);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.directionalShadow[g]=V,i.directionalShadowMap[g]=Q,i.directionalShadowMatrix[g]=U.shadow.matrix,x++}i.directional[g]=X,g++}else if(U.isSpotLight){const X=e.get(U);X.position.setFromMatrixPosition(U.matrixWorld),X.color.copy(z).multiplyScalar(k),X.distance=W,X.coneCos=Math.cos(U.angle),X.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),X.decay=U.decay,i.spot[M]=X;const Z=U.shadow;if(U.map&&(i.spotLightMap[R]=U.map,R++,Z.updateMatrices(U),U.castShadow&&P++),i.spotLightMatrix[M]=Z.matrix,U.castShadow){const V=t.get(U);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.spotShadow[M]=V,i.spotShadowMap[M]=Q,A++}M++}else if(U.isRectAreaLight){const X=e.get(U);X.color.copy(z).multiplyScalar(k),X.halfWidth.set(U.width*.5,0,0),X.halfHeight.set(0,U.height*.5,0),i.rectArea[v]=X,v++}else if(U.isPointLight){const X=e.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),X.distance=U.distance,X.decay=U.decay,U.castShadow){const Z=U.shadow,V=t.get(U);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,i.pointShadow[m]=V,i.pointShadowMap[m]=Q,i.pointShadowMatrix[m]=U.shadow.matrix,y++}i.point[m]=X,m++}else if(U.isHemisphereLight){const X=e.get(U);X.skyColor.copy(U.color).multiplyScalar(k),X.groundColor.copy(U.groundColor).multiplyScalar(k),i.hemi[u]=X,u++}}v>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=p;const L=i.hash;(L.directionalLength!==g||L.pointLength!==m||L.spotLength!==M||L.rectAreaLength!==v||L.hemiLength!==u||L.numDirectionalShadows!==x||L.numPointShadows!==y||L.numSpotShadows!==A||L.numSpotMaps!==R||L.numLightProbes!==E)&&(i.directional.length=g,i.spot.length=M,i.rectArea.length=v,i.point.length=m,i.hemi.length=u,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=A+R-P,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=E,L.directionalLength=g,L.pointLength=m,L.spotLength=M,L.rectAreaLength=v,L.hemiLength=u,L.numDirectionalShadows=x,L.numPointShadows=y,L.numSpotShadows=A,L.numSpotMaps=R,L.numLightProbes=E,i.version=Ip++)}function l(c,d){let f=0,p=0,g=0,m=0,M=0;const v=d.matrixWorldInverse;for(let u=0,x=c.length;u<x;u++){const y=c[u];if(y.isDirectionalLight){const A=i.directional[f];A.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(a),A.direction.transformDirection(v),f++}else if(y.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(v),A.direction.setFromMatrixPosition(y.matrixWorld),a.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(a),A.direction.transformDirection(v),g++}else if(y.isRectAreaLight){const A=i.rectArea[m];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(v),s.identity(),r.copy(y.matrixWorld),r.premultiply(v),s.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),m++}else if(y.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(v),p++}else if(y.isHemisphereLight){const A=i.hemi[M];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(v),M++}}}return{setup:o,setupView:l,state:i}}function Ul(n){const e=new Up(n),t=[],i=[];function a(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function s(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function Fp(n){let e=new WeakMap;function t(a,r=0){const s=e.get(a);let o;return s===void 0?(o=new Ul(n),e.set(a,[o])):r>=s.length?(o=new Ul(n),s.push(o)):o=s[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Np=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Op=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Bp(n,e,t){let i=new nl;const a=new Ke,r=new Ke,s=new Mt,o=new Wf({depthPacking:nf}),l=new Xf,c={},d=t.maxTextureSize,f={[Tn]:Nt,[Nt]:Tn,[mn]:mn},p=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:Np,fragmentShader:Op}),g=p.clone();g.defines.HORIZONTAL_PASS=1;const m=new On;m.setAttribute("position",new Bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new on(m,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fo;let u=this.type;this.render=function(P,E,L){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||P.length===0)return;const w=n.getRenderTarget(),T=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),z=n.state;z.setBlending(bn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const k=u!==pn&&this.type===pn,W=u===pn&&this.type!==pn;for(let Q=0,X=P.length;Q<X;Q++){const Z=P[Q],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const ce=V.getFrameExtents();if(a.multiply(ce),r.copy(V.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(r.x=Math.floor(d/ce.x),a.x=r.x*ce.x,V.mapSize.x=r.x),a.y>d&&(r.y=Math.floor(d/ce.y),a.y=r.y*ce.y,V.mapSize.y=r.y)),V.map===null||k===!0||W===!0){const Ee=this.type!==pn?{minFilter:$t,magFilter:$t}:{};V.map!==null&&V.map.dispose(),V.map=new Dn(a.x,a.y,Ee),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const me=V.getViewportCount();for(let Ee=0;Ee<me;Ee++){const Ae=V.getViewport(Ee);s.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),z.viewport(s),V.updateMatrices(Z,Ee),i=V.getFrustum(),A(E,L,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===pn&&x(V,L),V.needsUpdate=!1}u=this.type,v.needsUpdate=!1,n.setRenderTarget(w,T,U)};function x(P,E){const L=e.update(M);p.defines.VSM_SAMPLES!==P.blurSamples&&(p.defines.VSM_SAMPLES=P.blurSamples,g.defines.VSM_SAMPLES=P.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Dn(a.x,a.y)),p.uniforms.shadow_pass.value=P.map.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(E,null,L,p,M,null),g.uniforms.shadow_pass.value=P.mapPass.texture,g.uniforms.resolution.value=P.mapSize,g.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(E,null,L,g,M,null)}function y(P,E,L,w){let T=null;const U=L.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)T=U;else if(T=L.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const z=T.uuid,k=E.uuid;let W=c[z];W===void 0&&(W={},c[z]=W);let Q=W[k];Q===void 0&&(Q=T.clone(),W[k]=Q,E.addEventListener("dispose",R)),T=Q}if(T.visible=E.visible,T.wireframe=E.wireframe,w===pn?T.side=E.shadowSide!==null?E.shadowSide:E.side:T.side=E.shadowSide!==null?E.shadowSide:f[E.side],T.alphaMap=E.alphaMap,T.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,T.map=E.map,T.clipShadows=E.clipShadows,T.clippingPlanes=E.clippingPlanes,T.clipIntersection=E.clipIntersection,T.displacementMap=E.displacementMap,T.displacementScale=E.displacementScale,T.displacementBias=E.displacementBias,T.wireframeLinewidth=E.wireframeLinewidth,T.linewidth=E.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const z=n.properties.get(T);z.light=L}return T}function A(P,E,L,w,T){if(P.visible===!1)return;if(P.layers.test(E.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&T===pn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,P.matrixWorld);const k=e.update(P),W=P.material;if(Array.isArray(W)){const Q=k.groups;for(let X=0,Z=Q.length;X<Z;X++){const V=Q[X],ce=W[V.materialIndex];if(ce&&ce.visible){const me=y(P,ce,w,T);P.onBeforeShadow(n,P,E,L,k,me,V),n.renderBufferDirect(L,null,k,me,P,V),P.onAfterShadow(n,P,E,L,k,me,V)}}}else if(W.visible){const Q=y(P,W,w,T);P.onBeforeShadow(n,P,E,L,k,Q,null),n.renderBufferDirect(L,null,k,Q,P,null),P.onAfterShadow(n,P,E,L,k,Q,null)}}const z=P.children;for(let k=0,W=z.length;k<W;k++)A(z[k],E,L,w,T)}function R(P){P.target.removeEventListener("dispose",R);for(const L in c){const w=c[L],T=P.target.uuid;T in w&&(w[T].dispose(),delete w[T])}}}const zp={[ta]:na,[ia]:sa,[ra]:oa,[li]:aa,[na]:ta,[sa]:ia,[oa]:ra,[aa]:li};function kp(n,e){function t(){let O=!1;const h=new Mt;let H=null;const Y=new Mt(0,0,0,0);return{setMask:function(S){H!==S&&!O&&(n.colorMask(S,S,S,S),H=S)},setLocked:function(S){O=S},setClear:function(S,I,G,pe,ge){ge===!0&&(S*=pe,I*=pe,G*=pe),h.set(S,I,G,pe),Y.equals(h)===!1&&(n.clearColor(S,I,G,pe),Y.copy(h))},reset:function(){O=!1,H=null,Y.set(-1,0,0,0)}}}function i(){let O=!1,h=!1,H=null,Y=null,S=null;return{setReversed:function(I){if(h!==I){const G=e.get("EXT_clip_control");I?G.clipControlEXT(G.LOWER_LEFT_EXT,G.ZERO_TO_ONE_EXT):G.clipControlEXT(G.LOWER_LEFT_EXT,G.NEGATIVE_ONE_TO_ONE_EXT),h=I;const pe=S;S=null,this.setClear(pe)}},getReversed:function(){return h},setTest:function(I){I?ne(n.DEPTH_TEST):ue(n.DEPTH_TEST)},setMask:function(I){H!==I&&!O&&(n.depthMask(I),H=I)},setFunc:function(I){if(h&&(I=zp[I]),Y!==I){switch(I){case ta:n.depthFunc(n.NEVER);break;case na:n.depthFunc(n.ALWAYS);break;case ia:n.depthFunc(n.LESS);break;case li:n.depthFunc(n.LEQUAL);break;case ra:n.depthFunc(n.EQUAL);break;case aa:n.depthFunc(n.GEQUAL);break;case sa:n.depthFunc(n.GREATER);break;case oa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Y=I}},setLocked:function(I){O=I},setClear:function(I){S!==I&&(h&&(I=1-I),n.clearDepth(I),S=I)},reset:function(){O=!1,H=null,Y=null,S=null,h=!1}}}function a(){let O=!1,h=null,H=null,Y=null,S=null,I=null,G=null,pe=null,ge=null;return{setTest:function(ve){O||(ve?ne(n.STENCIL_TEST):ue(n.STENCIL_TEST))},setMask:function(ve){h!==ve&&!O&&(n.stencilMask(ve),h=ve)},setFunc:function(ve,Xe,gt){(H!==ve||Y!==Xe||S!==gt)&&(n.stencilFunc(ve,Xe,gt),H=ve,Y=Xe,S=gt)},setOp:function(ve,Xe,gt){(I!==ve||G!==Xe||pe!==gt)&&(n.stencilOp(ve,Xe,gt),I=ve,G=Xe,pe=gt)},setLocked:function(ve){O=ve},setClear:function(ve){ge!==ve&&(n.clearStencil(ve),ge=ve)},reset:function(){O=!1,h=null,H=null,Y=null,S=null,I=null,G=null,pe=null,ge=null}}}const r=new t,s=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},f={},p=new WeakMap,g=[],m=null,M=!1,v=null,u=null,x=null,y=null,A=null,R=null,P=null,E=new ft(0,0,0),L=0,w=!1,T=null,U=null,z=null,k=null,W=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Z=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),X=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),X=Z>=2);let ce=null,me={};const Ee=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),Pe=new Mt().fromArray(Ee),Fe=new Mt().fromArray(Ae);function Ce(O,h,H,Y){const S=new Uint8Array(4),I=n.createTexture();n.bindTexture(O,I),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let G=0;G<H;G++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(h,0,n.RGBA,1,1,Y,0,n.RGBA,n.UNSIGNED_BYTE,S):n.texImage2D(h+G,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,S);return I}const ee={};ee[n.TEXTURE_2D]=Ce(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=Ce(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=Ce(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=Ce(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),s.setFunc(li),Le(!1),Me(co),ne(n.CULL_FACE),Ye(bn);function ne(O){d[O]!==!0&&(n.enable(O),d[O]=!0)}function ue(O){d[O]!==!1&&(n.disable(O),d[O]=!1)}function de(O,h){return f[O]!==h?(n.bindFramebuffer(O,h),f[O]=h,O===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=h),O===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=h),!0):!1}function _e(O,h){let H=g,Y=!1;if(O){H=p.get(h),H===void 0&&(H=[],p.set(h,H));const S=O.textures;if(H.length!==S.length||H[0]!==n.COLOR_ATTACHMENT0){for(let I=0,G=S.length;I<G;I++)H[I]=n.COLOR_ATTACHMENT0+I;H.length=S.length,Y=!0}}else H[0]!==n.BACK&&(H[0]=n.BACK,Y=!0);Y&&n.drawBuffers(H)}function Oe(O){return m!==O?(n.useProgram(O),m=O,!0):!1}const ye={[Gn]:n.FUNC_ADD,[Cc]:n.FUNC_SUBTRACT,[Rc]:n.FUNC_REVERSE_SUBTRACT};ye[Pc]=n.MIN,ye[Dc]=n.MAX;const N={[Ic]:n.ZERO,[Lc]:n.ONE,[Uc]:n.SRC_COLOR,[$r]:n.SRC_ALPHA,[kc]:n.SRC_ALPHA_SATURATE,[Bc]:n.DST_COLOR,[Nc]:n.DST_ALPHA,[Fc]:n.ONE_MINUS_SRC_COLOR,[ea]:n.ONE_MINUS_SRC_ALPHA,[zc]:n.ONE_MINUS_DST_COLOR,[Oc]:n.ONE_MINUS_DST_ALPHA,[Hc]:n.CONSTANT_COLOR,[Gc]:n.ONE_MINUS_CONSTANT_COLOR,[Vc]:n.CONSTANT_ALPHA,[Wc]:n.ONE_MINUS_CONSTANT_ALPHA};function Ye(O,h,H,Y,S,I,G,pe,ge,ve){if(O===bn){M===!0&&(ue(n.BLEND),M=!1);return}if(M===!1&&(ne(n.BLEND),M=!0),O!==bc){if(O!==v||ve!==w){if((u!==Gn||A!==Gn)&&(n.blendEquation(n.FUNC_ADD),u=Gn,A=Gn),ve)switch(O){case Hn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case uo:n.blendFunc(n.ONE,n.ONE);break;case ho:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case po:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Hn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case uo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ho:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case po:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,y=null,R=null,P=null,E.set(0,0,0),L=0,v=O,w=ve}return}S=S||h,I=I||H,G=G||Y,(h!==u||S!==A)&&(n.blendEquationSeparate(ye[h],ye[S]),u=h,A=S),(H!==x||Y!==y||I!==R||G!==P)&&(n.blendFuncSeparate(N[H],N[Y],N[I],N[G]),x=H,y=Y,R=I,P=G),(pe.equals(E)===!1||ge!==L)&&(n.blendColor(pe.r,pe.g,pe.b,ge),E.copy(pe),L=ge),v=O,w=!1}function Be(O,h){O.side===mn?ue(n.CULL_FACE):ne(n.CULL_FACE);let H=O.side===Nt;h&&(H=!H),Le(H),O.blending===Hn&&O.transparent===!1?Ye(bn):Ye(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),r.setMask(O.colorWrite);const Y=O.stencilWrite;o.setTest(Y),Y&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Te(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):ue(n.SAMPLE_ALPHA_TO_COVERAGE)}function Le(O){T!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),T=O)}function Me(O){O!==yc?(ne(n.CULL_FACE),O!==U&&(O===co?n.cullFace(n.BACK):O===wc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ue(n.CULL_FACE),U=O}function Re(O){O!==z&&(X&&n.lineWidth(O),z=O)}function Te(O,h,H){O?(ne(n.POLYGON_OFFSET_FILL),(k!==h||W!==H)&&(n.polygonOffset(h,H),k=h,W=H)):ue(n.POLYGON_OFFSET_FILL)}function We(O){O?ne(n.SCISSOR_TEST):ue(n.SCISSOR_TEST)}function lt(O){O===void 0&&(O=n.TEXTURE0+Q-1),ce!==O&&(n.activeTexture(O),ce=O)}function et(O,h,H){H===void 0&&(ce===null?H=n.TEXTURE0+Q-1:H=ce);let Y=me[H];Y===void 0&&(Y={type:void 0,texture:void 0},me[H]=Y),(Y.type!==O||Y.texture!==h)&&(ce!==H&&(n.activeTexture(H),ce=H),n.bindTexture(O,h||ee[O]),Y.type=O,Y.texture=h)}function F(){const O=me[ce];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function he(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ae(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function De(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Se(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function C(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function se(O){Pe.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Pe.copy(O))}function B(O){Fe.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),Fe.copy(O))}function q(O,h){let H=c.get(h);H===void 0&&(H=new WeakMap,c.set(h,H));let Y=H.get(O);Y===void 0&&(Y=n.getUniformBlockIndex(h,O.name),H.set(O,Y))}function _(O,h){const Y=c.get(h).get(O);l.get(h)!==Y&&(n.uniformBlockBinding(h,Y,O.__bindingPointIndex),l.set(h,Y))}function ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ce=null,me={},f={},p=new WeakMap,g=[],m=null,M=!1,v=null,u=null,x=null,y=null,A=null,R=null,P=null,E=new ft(0,0,0),L=0,w=!1,T=null,U=null,z=null,k=null,W=null,Pe.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ne,disable:ue,bindFramebuffer:de,drawBuffers:_e,useProgram:Oe,setBlending:Ye,setMaterial:Be,setFlipSided:Le,setCullFace:Me,setLineWidth:Re,setPolygonOffset:Te,setScissorTest:We,activeTexture:lt,bindTexture:et,unbindTexture:F,compressedTexImage2D:b,compressedTexImage3D:J,texImage2D:te,texImage3D:K,updateUBOMapping:q,uniformBlockBinding:_,texStorage2D:Se,texStorage3D:C,texSubImage2D:fe,texSubImage3D:he,compressedTexSubImage2D:ae,compressedTexSubImage3D:De,scissor:se,viewport:B,reset:ie}}function Hp(n,e,t,i,a,r,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ke,d=new WeakMap;let f;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(F,b){return g?new OffscreenCanvas(F,b):cr("canvas")}function M(F,b,J){let fe=1;const he=et(F);if((he.width>J||he.height>J)&&(fe=J/Math.max(he.width,he.height)),fe<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const ae=Math.floor(fe*he.width),De=Math.floor(fe*he.height);f===void 0&&(f=m(ae,De));const Se=b?m(ae,De):f;return Se.width=ae,Se.height=De,Se.getContext("2d").drawImage(F,0,0,ae,De),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+ae+"x"+De+")."),Se}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),F;return F}function v(F){return F.generateMipmaps}function u(F){n.generateMipmap(F)}function x(F){return F.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?n.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(F,b,J,fe,he=!1){if(F!==null){if(n[F]!==void 0)return n[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let ae=b;if(b===n.RED&&(J===n.FLOAT&&(ae=n.R32F),J===n.HALF_FLOAT&&(ae=n.R16F),J===n.UNSIGNED_BYTE&&(ae=n.R8)),b===n.RED_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.R8UI),J===n.UNSIGNED_SHORT&&(ae=n.R16UI),J===n.UNSIGNED_INT&&(ae=n.R32UI),J===n.BYTE&&(ae=n.R8I),J===n.SHORT&&(ae=n.R16I),J===n.INT&&(ae=n.R32I)),b===n.RG&&(J===n.FLOAT&&(ae=n.RG32F),J===n.HALF_FLOAT&&(ae=n.RG16F),J===n.UNSIGNED_BYTE&&(ae=n.RG8)),b===n.RG_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RG8UI),J===n.UNSIGNED_SHORT&&(ae=n.RG16UI),J===n.UNSIGNED_INT&&(ae=n.RG32UI),J===n.BYTE&&(ae=n.RG8I),J===n.SHORT&&(ae=n.RG16I),J===n.INT&&(ae=n.RG32I)),b===n.RGB_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RGB8UI),J===n.UNSIGNED_SHORT&&(ae=n.RGB16UI),J===n.UNSIGNED_INT&&(ae=n.RGB32UI),J===n.BYTE&&(ae=n.RGB8I),J===n.SHORT&&(ae=n.RGB16I),J===n.INT&&(ae=n.RGB32I)),b===n.RGBA_INTEGER&&(J===n.UNSIGNED_BYTE&&(ae=n.RGBA8UI),J===n.UNSIGNED_SHORT&&(ae=n.RGBA16UI),J===n.UNSIGNED_INT&&(ae=n.RGBA32UI),J===n.BYTE&&(ae=n.RGBA8I),J===n.SHORT&&(ae=n.RGBA16I),J===n.INT&&(ae=n.RGBA32I)),b===n.RGB&&(J===n.UNSIGNED_INT_5_9_9_9_REV&&(ae=n.RGB9_E5),J===n.UNSIGNED_INT_10F_11F_11F_REV&&(ae=n.R11F_G11F_B10F)),b===n.RGBA){const De=he?or:st.getTransfer(fe);J===n.FLOAT&&(ae=n.RGBA32F),J===n.HALF_FLOAT&&(ae=n.RGBA16F),J===n.UNSIGNED_BYTE&&(ae=De===ct?n.SRGB8_ALPHA8:n.RGBA8),J===n.UNSIGNED_SHORT_4_4_4_4&&(ae=n.RGBA4),J===n.UNSIGNED_SHORT_5_5_5_1&&(ae=n.RGB5_A1)}return(ae===n.R16F||ae===n.R32F||ae===n.RG16F||ae===n.RG32F||ae===n.RGBA16F||ae===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function A(F,b){let J;return F?b===null||b===Wn||b===Ni?J=n.DEPTH24_STENCIL8:b===cn?J=n.DEPTH32F_STENCIL8:b===Ui&&(J=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Wn||b===Ni?J=n.DEPTH_COMPONENT24:b===cn?J=n.DEPTH_COMPONENT32F:b===Ui&&(J=n.DEPTH_COMPONENT16),J}function R(F,b){return v(F)===!0||F.isFramebufferTexture&&F.minFilter!==$t&&F.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?b.mipmaps.length:1}function P(F){const b=F.target;b.removeEventListener("dispose",P),L(b),b.isVideoTexture&&d.delete(b)}function E(F){const b=F.target;b.removeEventListener("dispose",E),T(b)}function L(F){const b=i.get(F);if(b.__webglInit===void 0)return;const J=F.source,fe=p.get(J);if(fe){const he=fe[b.__cacheKey];he.usedTimes--,he.usedTimes===0&&w(F),Object.keys(fe).length===0&&p.delete(J)}i.remove(F)}function w(F){const b=i.get(F);n.deleteTexture(b.__webglTexture);const J=F.source,fe=p.get(J);delete fe[b.__cacheKey],s.memory.textures--}function T(F){const b=i.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),i.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let fe=0;fe<6;fe++){if(Array.isArray(b.__webglFramebuffer[fe]))for(let he=0;he<b.__webglFramebuffer[fe].length;he++)n.deleteFramebuffer(b.__webglFramebuffer[fe][he]);else n.deleteFramebuffer(b.__webglFramebuffer[fe]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[fe])}else{if(Array.isArray(b.__webglFramebuffer))for(let fe=0;fe<b.__webglFramebuffer.length;fe++)n.deleteFramebuffer(b.__webglFramebuffer[fe]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let fe=0;fe<b.__webglColorRenderbuffer.length;fe++)b.__webglColorRenderbuffer[fe]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[fe]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const J=F.textures;for(let fe=0,he=J.length;fe<he;fe++){const ae=i.get(J[fe]);ae.__webglTexture&&(n.deleteTexture(ae.__webglTexture),s.memory.textures--),i.remove(J[fe])}i.remove(F)}let U=0;function z(){U=0}function k(){const F=U;return F>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+a.maxTextures),U+=1,F}function W(F){const b=[];return b.push(F.wrapS),b.push(F.wrapT),b.push(F.wrapR||0),b.push(F.magFilter),b.push(F.minFilter),b.push(F.anisotropy),b.push(F.internalFormat),b.push(F.format),b.push(F.type),b.push(F.generateMipmaps),b.push(F.premultiplyAlpha),b.push(F.flipY),b.push(F.unpackAlignment),b.push(F.colorSpace),b.join()}function Q(F,b){const J=i.get(F);if(F.isVideoTexture&&We(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&J.__version!==F.version){const fe=F.image;if(fe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(J,F,b);return}}else F.isExternalTexture&&(J.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,J.__webglTexture,n.TEXTURE0+b)}function X(F,b){const J=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&J.__version!==F.version){ee(J,F,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,J.__webglTexture,n.TEXTURE0+b)}function Z(F,b){const J=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&J.__version!==F.version){ee(J,F,b);return}t.bindTexture(n.TEXTURE_3D,J.__webglTexture,n.TEXTURE0+b)}function V(F,b){const J=i.get(F);if(F.version>0&&J.__version!==F.version){ne(J,F,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture,n.TEXTURE0+b)}const ce={[fa]:n.REPEAT,[Vn]:n.CLAMP_TO_EDGE,[Li]:n.MIRRORED_REPEAT},me={[$t]:n.NEAREST,[ef]:n.NEAREST_MIPMAP_NEAREST,[nr]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[ua]:n.LINEAR_MIPMAP_NEAREST,[Rn]:n.LINEAR_MIPMAP_LINEAR},Ee={[sf]:n.NEVER,[df]:n.ALWAYS,[of]:n.LESS,[wo]:n.LEQUAL,[lf]:n.EQUAL,[uf]:n.GEQUAL,[cf]:n.GREATER,[ff]:n.NOTEQUAL};function Ae(F,b){if(b.type===cn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===ua||b.magFilter===nr||b.magFilter===Rn||b.minFilter===en||b.minFilter===ua||b.minFilter===nr||b.minFilter===Rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(F,n.TEXTURE_WRAP_S,ce[b.wrapS]),n.texParameteri(F,n.TEXTURE_WRAP_T,ce[b.wrapT]),(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)&&n.texParameteri(F,n.TEXTURE_WRAP_R,ce[b.wrapR]),n.texParameteri(F,n.TEXTURE_MAG_FILTER,me[b.magFilter]),n.texParameteri(F,n.TEXTURE_MIN_FILTER,me[b.minFilter]),b.compareFunction&&(n.texParameteri(F,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(F,n.TEXTURE_COMPARE_FUNC,Ee[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===$t||b.minFilter!==nr&&b.minFilter!==Rn||b.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");n.texParameterf(F,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,a.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Pe(F,b){let J=!1;F.__webglInit===void 0&&(F.__webglInit=!0,b.addEventListener("dispose",P));const fe=b.source;let he=p.get(fe);he===void 0&&(he={},p.set(fe,he));const ae=W(b);if(ae!==F.__cacheKey){he[ae]===void 0&&(he[ae]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,J=!0),he[ae].usedTimes++;const De=he[F.__cacheKey];De!==void 0&&(he[F.__cacheKey].usedTimes--,De.usedTimes===0&&w(b)),F.__cacheKey=ae,F.__webglTexture=he[ae].texture}return J}function Fe(F,b,J){return Math.floor(Math.floor(F/J)/b)}function Ce(F,b,J,fe){const ae=F.updateRanges;if(ae.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,J,fe,b.data);else{ae.sort((K,se)=>K.start-se.start);let De=0;for(let K=1;K<ae.length;K++){const se=ae[De],B=ae[K],q=se.start+se.count,_=Fe(B.start,b.width,4),ie=Fe(se.start,b.width,4);B.start<=q+1&&_===ie&&Fe(B.start+B.count-1,b.width,4)===_?se.count=Math.max(se.count,B.start+B.count-se.start):(++De,ae[De]=B)}ae.length=De+1;const Se=n.getParameter(n.UNPACK_ROW_LENGTH),C=n.getParameter(n.UNPACK_SKIP_PIXELS),te=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let K=0,se=ae.length;K<se;K++){const B=ae[K],q=Math.floor(B.start/4),_=Math.ceil(B.count/4),ie=q%b.width,O=Math.floor(q/b.width),h=_,H=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,ie,O,h,H,J,fe,b.data)}F.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,Se),n.pixelStorei(n.UNPACK_SKIP_PIXELS,C),n.pixelStorei(n.UNPACK_SKIP_ROWS,te)}}function ee(F,b,J){let fe=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(fe=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(fe=n.TEXTURE_3D);const he=Pe(F,b),ae=b.source;t.bindTexture(fe,F.__webglTexture,n.TEXTURE0+J);const De=i.get(ae);if(ae.version!==De.__version||he===!0){t.activeTexture(n.TEXTURE0+J);const Se=st.getPrimaries(st.workingColorSpace),C=b.colorSpace===Pn?null:st.getPrimaries(b.colorSpace),te=b.colorSpace===Pn||Se===C?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let K=M(b.image,!1,a.maxTextureSize);K=lt(b,K);const se=r.convert(b.format,b.colorSpace),B=r.convert(b.type);let q=y(b.internalFormat,se,B,b.colorSpace,b.isVideoTexture);Ae(fe,b);let _;const ie=b.mipmaps,O=b.isVideoTexture!==!0,h=De.__version===void 0||he===!0,H=ae.dataReady,Y=R(b,K);if(b.isDepthTexture)q=A(b.format===Bi,b.type),h&&(O?t.texStorage2D(n.TEXTURE_2D,1,q,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,q,K.width,K.height,0,se,B,null));else if(b.isDataTexture)if(ie.length>0){O&&h&&t.texStorage2D(n.TEXTURE_2D,Y,q,ie[0].width,ie[0].height);for(let S=0,I=ie.length;S<I;S++)_=ie[S],O?H&&t.texSubImage2D(n.TEXTURE_2D,S,0,0,_.width,_.height,se,B,_.data):t.texImage2D(n.TEXTURE_2D,S,q,_.width,_.height,0,se,B,_.data);b.generateMipmaps=!1}else O?(h&&t.texStorage2D(n.TEXTURE_2D,Y,q,K.width,K.height),H&&Ce(b,K,se,B)):t.texImage2D(n.TEXTURE_2D,0,q,K.width,K.height,0,se,B,K.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){O&&h&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Y,q,ie[0].width,ie[0].height,K.depth);for(let S=0,I=ie.length;S<I;S++)if(_=ie[S],b.format!==tn)if(se!==null)if(O){if(H)if(b.layerUpdates.size>0){const G=al(_.width,_.height,b.format,b.type);for(const pe of b.layerUpdates){const ge=_.data.subarray(pe*G/_.data.BYTES_PER_ELEMENT,(pe+1)*G/_.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,S,0,0,pe,_.width,_.height,1,se,ge)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,S,0,0,0,_.width,_.height,K.depth,se,_.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,S,q,_.width,_.height,K.depth,0,_.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,S,0,0,0,_.width,_.height,K.depth,se,B,_.data):t.texImage3D(n.TEXTURE_2D_ARRAY,S,q,_.width,_.height,K.depth,0,se,B,_.data)}else{O&&h&&t.texStorage2D(n.TEXTURE_2D,Y,q,ie[0].width,ie[0].height);for(let S=0,I=ie.length;S<I;S++)_=ie[S],b.format!==tn?se!==null?O?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,S,0,0,_.width,_.height,se,_.data):t.compressedTexImage2D(n.TEXTURE_2D,S,q,_.width,_.height,0,_.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?H&&t.texSubImage2D(n.TEXTURE_2D,S,0,0,_.width,_.height,se,B,_.data):t.texImage2D(n.TEXTURE_2D,S,q,_.width,_.height,0,se,B,_.data)}else if(b.isDataArrayTexture)if(O){if(h&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Y,q,K.width,K.height,K.depth),H)if(b.layerUpdates.size>0){const S=al(K.width,K.height,b.format,b.type);for(const I of b.layerUpdates){const G=K.data.subarray(I*S/K.data.BYTES_PER_ELEMENT,(I+1)*S/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,I,K.width,K.height,1,se,B,G)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,se,B,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,q,K.width,K.height,K.depth,0,se,B,K.data);else if(b.isData3DTexture)O?(h&&t.texStorage3D(n.TEXTURE_3D,Y,q,K.width,K.height,K.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,se,B,K.data)):t.texImage3D(n.TEXTURE_3D,0,q,K.width,K.height,K.depth,0,se,B,K.data);else if(b.isFramebufferTexture){if(h)if(O)t.texStorage2D(n.TEXTURE_2D,Y,q,K.width,K.height);else{let S=K.width,I=K.height;for(let G=0;G<Y;G++)t.texImage2D(n.TEXTURE_2D,G,q,S,I,0,se,B,null),S>>=1,I>>=1}}else if(ie.length>0){if(O&&h){const S=et(ie[0]);t.texStorage2D(n.TEXTURE_2D,Y,q,S.width,S.height)}for(let S=0,I=ie.length;S<I;S++)_=ie[S],O?H&&t.texSubImage2D(n.TEXTURE_2D,S,0,0,se,B,_):t.texImage2D(n.TEXTURE_2D,S,q,se,B,_);b.generateMipmaps=!1}else if(O){if(h){const S=et(K);t.texStorage2D(n.TEXTURE_2D,Y,q,S.width,S.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,B,K)}else t.texImage2D(n.TEXTURE_2D,0,q,se,B,K);v(b)&&u(fe),De.__version=ae.version,b.onUpdate&&b.onUpdate(b)}F.__version=b.version}function ne(F,b,J){if(b.image.length!==6)return;const fe=Pe(F,b),he=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+J);const ae=i.get(he);if(he.version!==ae.__version||fe===!0){t.activeTexture(n.TEXTURE0+J);const De=st.getPrimaries(st.workingColorSpace),Se=b.colorSpace===Pn?null:st.getPrimaries(b.colorSpace),C=b.colorSpace===Pn||De===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,C);const te=b.isCompressedTexture||b.image[0].isCompressedTexture,K=b.image[0]&&b.image[0].isDataTexture,se=[];for(let I=0;I<6;I++)!te&&!K?se[I]=M(b.image[I],!0,a.maxCubemapSize):se[I]=K?b.image[I].image:b.image[I],se[I]=lt(b,se[I]);const B=se[0],q=r.convert(b.format,b.colorSpace),_=r.convert(b.type),ie=y(b.internalFormat,q,_,b.colorSpace),O=b.isVideoTexture!==!0,h=ae.__version===void 0||fe===!0,H=he.dataReady;let Y=R(b,B);Ae(n.TEXTURE_CUBE_MAP,b);let S;if(te){O&&h&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Y,ie,B.width,B.height);for(let I=0;I<6;I++){S=se[I].mipmaps;for(let G=0;G<S.length;G++){const pe=S[G];b.format!==tn?q!==null?O?H&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G,0,0,pe.width,pe.height,q,pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G,ie,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G,0,0,pe.width,pe.height,q,_,pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G,ie,pe.width,pe.height,0,q,_,pe.data)}}}else{if(S=b.mipmaps,O&&h){S.length>0&&Y++;const I=et(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Y,ie,I.width,I.height)}for(let I=0;I<6;I++)if(K){O?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,0,0,se[I].width,se[I].height,q,_,se[I].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,ie,se[I].width,se[I].height,0,q,_,se[I].data);for(let G=0;G<S.length;G++){const ge=S[G].image[I].image;O?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G+1,0,0,ge.width,ge.height,q,_,ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G+1,ie,ge.width,ge.height,0,q,_,ge.data)}}else{O?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,0,0,q,_,se[I]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,ie,q,_,se[I]);for(let G=0;G<S.length;G++){const pe=S[G];O?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G+1,0,0,q,_,pe.image[I]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+I,G+1,ie,q,_,pe.image[I])}}}v(b)&&u(n.TEXTURE_CUBE_MAP),ae.__version=he.version,b.onUpdate&&b.onUpdate(b)}F.__version=b.version}function ue(F,b,J,fe,he,ae){const De=r.convert(J.format,J.colorSpace),Se=r.convert(J.type),C=y(J.internalFormat,De,Se,J.colorSpace),te=i.get(b),K=i.get(J);if(K.__renderTarget=b,!te.__hasExternalTextures){const se=Math.max(1,b.width>>ae),B=Math.max(1,b.height>>ae);he===n.TEXTURE_3D||he===n.TEXTURE_2D_ARRAY?t.texImage3D(he,ae,C,se,B,b.depth,0,De,Se,null):t.texImage2D(he,ae,C,se,B,0,De,Se,null)}t.bindFramebuffer(n.FRAMEBUFFER,F),Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,he,K.__webglTexture,0,Re(b)):(he===n.TEXTURE_2D||he>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,fe,he,K.__webglTexture,ae),t.bindFramebuffer(n.FRAMEBUFFER,null)}function de(F,b,J){if(n.bindRenderbuffer(n.RENDERBUFFER,F),b.depthBuffer){const fe=b.depthTexture,he=fe&&fe.isDepthTexture?fe.type:null,ae=A(b.stencilBuffer,he),De=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=Re(b);Te(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Se,ae,b.width,b.height):J?n.renderbufferStorageMultisample(n.RENDERBUFFER,Se,ae,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ae,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,De,n.RENDERBUFFER,F)}else{const fe=b.textures;for(let he=0;he<fe.length;he++){const ae=fe[he],De=r.convert(ae.format,ae.colorSpace),Se=r.convert(ae.type),C=y(ae.internalFormat,De,Se,ae.colorSpace),te=Re(b);J&&Te(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,C,b.width,b.height):Te(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,C,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,C,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _e(F,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,F),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const fe=i.get(b.depthTexture);fe.__renderTarget=b,(!fe.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Q(b.depthTexture,0);const he=fe.__webglTexture,ae=Re(b);if(b.depthTexture.format===Oi)Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(b.depthTexture.format===Bi)Te(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function Oe(F){const b=i.get(F),J=F.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==F.depthTexture){const fe=F.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),fe){const he=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,fe.removeEventListener("dispose",he)};fe.addEventListener("dispose",he),b.__depthDisposeCallback=he}b.__boundDepthTexture=fe}if(F.depthTexture&&!b.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const fe=F.texture.mipmaps;fe&&fe.length>0?_e(b.__webglFramebuffer[0],F):_e(b.__webglFramebuffer,F)}else if(J){b.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[fe]),b.__webglDepthbuffer[fe]===void 0)b.__webglDepthbuffer[fe]=n.createRenderbuffer(),de(b.__webglDepthbuffer[fe],F,!1);else{const he=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=b.__webglDepthbuffer[fe];n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,ae)}}else{const fe=F.texture.mipmaps;if(fe&&fe.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),de(b.__webglDepthbuffer,F,!1);else{const he=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,ae)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(F,b,J){const fe=i.get(F);b!==void 0&&ue(fe.__webglFramebuffer,F,F.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),J!==void 0&&Oe(F)}function N(F){const b=F.texture,J=i.get(F),fe=i.get(b);F.addEventListener("dispose",E);const he=F.textures,ae=F.isWebGLCubeRenderTarget===!0,De=he.length>1;if(De||(fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture()),fe.__version=b.version,s.memory.textures++),ae){J.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer[Se]=[];for(let C=0;C<b.mipmaps.length;C++)J.__webglFramebuffer[Se][C]=n.createFramebuffer()}else J.__webglFramebuffer[Se]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){J.__webglFramebuffer=[];for(let Se=0;Se<b.mipmaps.length;Se++)J.__webglFramebuffer[Se]=n.createFramebuffer()}else J.__webglFramebuffer=n.createFramebuffer();if(De)for(let Se=0,C=he.length;Se<C;Se++){const te=i.get(he[Se]);te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture(),s.memory.textures++)}if(F.samples>0&&Te(F)===!1){J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Se=0;Se<he.length;Se++){const C=he[Se];J.__webglColorRenderbuffer[Se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,J.__webglColorRenderbuffer[Se]);const te=r.convert(C.format,C.colorSpace),K=r.convert(C.type),se=y(C.internalFormat,te,K,C.colorSpace,F.isXRRenderTarget===!0),B=Re(F);n.renderbufferStorageMultisample(n.RENDERBUFFER,B,se,F.width,F.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,J.__webglColorRenderbuffer[Se])}n.bindRenderbuffer(n.RENDERBUFFER,null),F.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),de(J.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ae){t.bindTexture(n.TEXTURE_CUBE_MAP,fe.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,b);for(let Se=0;Se<6;Se++)if(b.mipmaps&&b.mipmaps.length>0)for(let C=0;C<b.mipmaps.length;C++)ue(J.__webglFramebuffer[Se][C],F,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,C);else ue(J.__webglFramebuffer[Se],F,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);v(b)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(De){for(let Se=0,C=he.length;Se<C;Se++){const te=he[Se],K=i.get(te);let se=n.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(se=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,K.__webglTexture),Ae(se,te),ue(J.__webglFramebuffer,F,te,n.COLOR_ATTACHMENT0+Se,se,0),v(te)&&u(se)}t.unbindTexture()}else{let Se=n.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(Se=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Se,fe.__webglTexture),Ae(Se,b),b.mipmaps&&b.mipmaps.length>0)for(let C=0;C<b.mipmaps.length;C++)ue(J.__webglFramebuffer[C],F,b,n.COLOR_ATTACHMENT0,Se,C);else ue(J.__webglFramebuffer,F,b,n.COLOR_ATTACHMENT0,Se,0);v(b)&&u(Se),t.unbindTexture()}F.depthBuffer&&Oe(F)}function Ye(F){const b=F.textures;for(let J=0,fe=b.length;J<fe;J++){const he=b[J];if(v(he)){const ae=x(F),De=i.get(he).__webglTexture;t.bindTexture(ae,De),u(ae),t.unbindTexture()}}}const Be=[],Le=[];function Me(F){if(F.samples>0){if(Te(F)===!1){const b=F.textures,J=F.width,fe=F.height;let he=n.COLOR_BUFFER_BIT;const ae=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,De=i.get(F),Se=b.length>1;if(Se)for(let te=0;te<b.length;te++)t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,De.__webglMultisampledFramebuffer);const C=F.texture.mipmaps;C&&C.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglFramebuffer);for(let te=0;te<b.length;te++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(he|=n.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(he|=n.STENCIL_BUFFER_BIT)),Se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,De.__webglColorRenderbuffer[te]);const K=i.get(b[te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,K,0)}n.blitFramebuffer(0,0,J,fe,0,0,J,fe,he,n.NEAREST),l===!0&&(Be.length=0,Le.length=0,Be.push(n.COLOR_ATTACHMENT0+te),F.depthBuffer&&F.resolveDepthBuffer===!1&&(Be.push(ae),Le.push(ae),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Le)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Se)for(let te=0;te<b.length;te++){t.bindFramebuffer(n.FRAMEBUFFER,De.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+te,n.RENDERBUFFER,De.__webglColorRenderbuffer[te]);const K=i.get(b[te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,De.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+te,n.TEXTURE_2D,K,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,De.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&l){const b=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Re(F){return Math.min(a.maxSamples,F.samples)}function Te(F){const b=i.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function We(F){const b=s.render.frame;d.get(F)!==b&&(d.set(F,b),F.update())}function lt(F,b){const J=F.colorSpace,fe=F.format,he=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||J!==ui&&J!==Pn&&(st.getTransfer(J)===ct?(fe!==tn||he!==gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),b}function et(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(c.width=F.naturalWidth||F.width,c.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(c.width=F.displayWidth,c.height=F.displayHeight):(c.width=F.width,c.height=F.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=X,this.setTexture3D=Z,this.setTextureCube=V,this.rebindTextures=ye,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Te}function Gp(n,e){function t(i,a=Pn){let r;const s=st.getTransfer(a);if(i===gn)return n.UNSIGNED_BYTE;if(i===ha)return n.UNSIGNED_SHORT_4_4_4_4;if(i===pa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===xo)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===So)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===vo)return n.BYTE;if(i===_o)return n.SHORT;if(i===Ui)return n.UNSIGNED_SHORT;if(i===da)return n.INT;if(i===Wn)return n.UNSIGNED_INT;if(i===cn)return n.FLOAT;if(i===Fi)return n.HALF_FLOAT;if(i===Mo)return n.ALPHA;if(i===Eo)return n.RGB;if(i===tn)return n.RGBA;if(i===Oi)return n.DEPTH_COMPONENT;if(i===Bi)return n.DEPTH_STENCIL;if(i===Ao)return n.RED;if(i===ma)return n.RED_INTEGER;if(i===ga)return n.RG;if(i===va)return n.RG_INTEGER;if(i===_a)return n.RGBA_INTEGER;if(i===ir||i===rr||i===ar||i===sr)if(s===ct)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ir)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ir)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xa||i===Sa||i===Ma||i===Ea)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ea)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Aa||i===ya||i===wa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Aa||i===ya)return s===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wa)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ta||i===ba||i===Ca||i===Ra||i===Pa||i===Da||i===Ia||i===La||i===Ua||i===Fa||i===Na||i===Oa||i===Ba||i===za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ta)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ba)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ca)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ra)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pa)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Da)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ia)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===La)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ua)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fa)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Na)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Oa)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ba)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===za)return s===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ka||i===Ha||i===Ga)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ka)return s===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Va||i===Wa||i===Xa||i===Ya)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Va)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ya)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ni?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Vp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new rl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new un({vertexShader:Vp,fragmentShader:Wp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new on(new Ki(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yp extends hi{constructor(e,t){super();const i=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,d=null,f=null,p=null,g=null,m=null;const M=typeof XRWebGLBinding<"u",v=new Xp,u={},x=t.getContextAttributes();let y=null,A=null;const R=[],P=[],E=new Ke;let L=null;const w=new ln;w.viewport=new Mt;const T=new ln;T.viewport=new Mt;const U=[w,T],z=new qf;let k=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ne=R[ee];return ne===void 0&&(ne=new _s,R[ee]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(ee){let ne=R[ee];return ne===void 0&&(ne=new _s,R[ee]=ne),ne.getGripSpace()},this.getHand=function(ee){let ne=R[ee];return ne===void 0&&(ne=new _s,R[ee]=ne),ne.getHandSpace()};function Q(ee){const ne=P.indexOf(ee.inputSource);if(ne===-1)return;const ue=R[ne];ue!==void 0&&(ue.update(ee.inputSource,ee.frame,c||s),ue.dispatchEvent({type:ee.type,data:ee.inputSource}))}function X(){a.removeEventListener("select",Q),a.removeEventListener("selectstart",Q),a.removeEventListener("selectend",Q),a.removeEventListener("squeeze",Q),a.removeEventListener("squeezestart",Q),a.removeEventListener("squeezeend",Q),a.removeEventListener("end",X),a.removeEventListener("inputsourceschange",Z);for(let ee=0;ee<R.length;ee++){const ne=P[ee];ne!==null&&(P[ee]=null,R[ee].disconnect(ne))}k=null,W=null,v.reset();for(const ee in u)delete u[ee];e.setRenderTarget(y),g=null,p=null,f=null,a=null,A=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(a,t)),f},this.getFrame=function(){return m},this.getSession=function(){return a},this.setSession=async function(ee){if(a=ee,a!==null){if(y=e.getRenderTarget(),a.addEventListener("select",Q),a.addEventListener("selectstart",Q),a.addEventListener("selectend",Q),a.addEventListener("squeeze",Q),a.addEventListener("squeezestart",Q),a.addEventListener("squeezeend",Q),a.addEventListener("end",X),a.addEventListener("inputsourceschange",Z),x.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(E),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,de=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ue=x.stencil?Bi:Oi,de=x.stencil?Ni:Wn);const Oe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};f=this.getBinding(),p=f.createProjectionLayer(Oe),a.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),A=new Dn(p.textureWidth,p.textureHeight,{format:tn,type:gn,depthTexture:new il(p.textureWidth,p.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ue={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(a,t,ue),a.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),A=new Dn(g.framebufferWidth,g.framebufferHeight,{format:tn,type:gn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),Ce.setContext(a),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(ee){for(let ne=0;ne<ee.removed.length;ne++){const ue=ee.removed[ne],de=P.indexOf(ue);de>=0&&(P[de]=null,R[de].disconnect(ue))}for(let ne=0;ne<ee.added.length;ne++){const ue=ee.added[ne];let de=P.indexOf(ue);if(de===-1){for(let Oe=0;Oe<R.length;Oe++)if(Oe>=P.length){P.push(ue),de=Oe;break}else if(P[Oe]===null){P[Oe]=ue,de=Oe;break}if(de===-1)break}const _e=R[de];_e&&_e.connect(ue)}}const V=new oe,ce=new oe;function me(ee,ne,ue){V.setFromMatrixPosition(ne.matrixWorld),ce.setFromMatrixPosition(ue.matrixWorld);const de=V.distanceTo(ce),_e=ne.projectionMatrix.elements,Oe=ue.projectionMatrix.elements,ye=_e[14]/(_e[10]-1),N=_e[14]/(_e[10]+1),Ye=(_e[9]+1)/_e[5],Be=(_e[9]-1)/_e[5],Le=(_e[8]-1)/_e[0],Me=(Oe[8]+1)/Oe[0],Re=ye*Le,Te=ye*Me,We=de/(-Le+Me),lt=We*-Le;if(ne.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(lt),ee.translateZ(We),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),_e[10]===-1)ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const et=ye+We,F=N+We,b=Re-lt,J=Te+(de-lt),fe=Ye*N/F*et,he=Be*N/F*et;ee.projectionMatrix.makePerspective(b,J,fe,he,et,F),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function Ee(ee,ne){ne===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ne.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(a===null)return;let ne=ee.near,ue=ee.far;v.texture!==null&&(v.depthNear>0&&(ne=v.depthNear),v.depthFar>0&&(ue=v.depthFar)),z.near=T.near=w.near=ne,z.far=T.far=w.far=ue,(k!==z.near||W!==z.far)&&(a.updateRenderState({depthNear:z.near,depthFar:z.far}),k=z.near,W=z.far),z.layers.mask=ee.layers.mask|6,w.layers.mask=z.layers.mask&3,T.layers.mask=z.layers.mask&5;const de=ee.parent,_e=z.cameras;Ee(z,de);for(let Oe=0;Oe<_e.length;Oe++)Ee(_e[Oe],de);_e.length===2?me(z,w,T):z.projectionMatrix.copy(w.projectionMatrix),Ae(ee,z,de)};function Ae(ee,ne,ue){ue===null?ee.matrix.copy(ne.matrixWorld):(ee.matrix.copy(ue.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ne.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ne.projectionMatrix),ee.projectionMatrixInverse.copy(ne.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Za*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(p===null&&g===null))return l},this.setFoveation=function(ee){l=ee,p!==null&&(p.fixedFoveation=ee),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=ee)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(z)},this.getCameraTexture=function(ee){return u[ee]};let Pe=null;function Fe(ee,ne){if(d=ne.getViewerPose(c||s),m=ne,d!==null){const ue=d.views;g!==null&&(e.setRenderTargetFramebuffer(A,g.framebuffer),e.setRenderTarget(A));let de=!1;ue.length!==z.cameras.length&&(z.cameras.length=0,de=!0);for(let N=0;N<ue.length;N++){const Ye=ue[N];let Be=null;if(g!==null)Be=g.getViewport(Ye);else{const Me=f.getViewSubImage(p,Ye);Be=Me.viewport,N===0&&(e.setRenderTargetTextures(A,Me.colorTexture,Me.depthStencilTexture),e.setRenderTarget(A))}let Le=U[N];Le===void 0&&(Le=new ln,Le.layers.enable(N),Le.viewport=new Mt,U[N]=Le),Le.matrix.fromArray(Ye.transform.matrix),Le.matrix.decompose(Le.position,Le.quaternion,Le.scale),Le.projectionMatrix.fromArray(Ye.projectionMatrix),Le.projectionMatrixInverse.copy(Le.projectionMatrix).invert(),Le.viewport.set(Be.x,Be.y,Be.width,Be.height),N===0&&(z.matrix.copy(Le.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),de===!0&&z.cameras.push(Le)}const _e=a.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const N=f.getDepthInformation(ue[0]);N&&N.isValid&&N.texture&&v.init(N,a.renderState)}if(_e&&_e.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let N=0;N<ue.length;N++){const Ye=ue[N].camera;if(Ye){let Be=u[Ye];Be||(Be=new rl,u[Ye]=Be);const Le=f.getCameraImage(Ye);Be.sourceTexture=Le}}}}for(let ue=0;ue<R.length;ue++){const de=P[ue],_e=R[ue];de!==null&&_e!==void 0&&_e.update(de,ne,c||s)}Pe&&Pe(ee,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),m=null}const Ce=new sl;Ce.setAnimationLoop(Fe),this.setAnimationLoop=function(ee){Pe=ee},this.dispose=function(){}}}const ei=new Sn,qp=new yt;function Zp(n,e){function t(v,u){v.matrixAutoUpdate===!0&&v.updateMatrix(),u.value.copy(v.matrix)}function i(v,u){u.color.getRGB(v.fogColor.value,Qo(n)),u.isFog?(v.fogNear.value=u.near,v.fogFar.value=u.far):u.isFogExp2&&(v.fogDensity.value=u.density)}function a(v,u,x,y,A){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(v,u):u.isMeshToonMaterial?(r(v,u),f(v,u)):u.isMeshPhongMaterial?(r(v,u),d(v,u)):u.isMeshStandardMaterial?(r(v,u),p(v,u),u.isMeshPhysicalMaterial&&g(v,u,A)):u.isMeshMatcapMaterial?(r(v,u),m(v,u)):u.isMeshDepthMaterial?r(v,u):u.isMeshDistanceMaterial?(r(v,u),M(v,u)):u.isMeshNormalMaterial?r(v,u):u.isLineBasicMaterial?(s(v,u),u.isLineDashedMaterial&&o(v,u)):u.isPointsMaterial?l(v,u,x,y):u.isSpriteMaterial?c(v,u):u.isShadowMaterial?(v.color.value.copy(u.color),v.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(v,u){v.opacity.value=u.opacity,u.color&&v.diffuse.value.copy(u.color),u.emissive&&v.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(v.map.value=u.map,t(u.map,v.mapTransform)),u.alphaMap&&(v.alphaMap.value=u.alphaMap,t(u.alphaMap,v.alphaMapTransform)),u.bumpMap&&(v.bumpMap.value=u.bumpMap,t(u.bumpMap,v.bumpMapTransform),v.bumpScale.value=u.bumpScale,u.side===Nt&&(v.bumpScale.value*=-1)),u.normalMap&&(v.normalMap.value=u.normalMap,t(u.normalMap,v.normalMapTransform),v.normalScale.value.copy(u.normalScale),u.side===Nt&&v.normalScale.value.negate()),u.displacementMap&&(v.displacementMap.value=u.displacementMap,t(u.displacementMap,v.displacementMapTransform),v.displacementScale.value=u.displacementScale,v.displacementBias.value=u.displacementBias),u.emissiveMap&&(v.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,v.emissiveMapTransform)),u.specularMap&&(v.specularMap.value=u.specularMap,t(u.specularMap,v.specularMapTransform)),u.alphaTest>0&&(v.alphaTest.value=u.alphaTest);const x=e.get(u),y=x.envMap,A=x.envMapRotation;y&&(v.envMap.value=y,ei.copy(A),ei.x*=-1,ei.y*=-1,ei.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),v.envMapRotation.value.setFromMatrix4(qp.makeRotationFromEuler(ei)),v.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=u.reflectivity,v.ior.value=u.ior,v.refractionRatio.value=u.refractionRatio),u.lightMap&&(v.lightMap.value=u.lightMap,v.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,v.lightMapTransform)),u.aoMap&&(v.aoMap.value=u.aoMap,v.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,v.aoMapTransform))}function s(v,u){v.diffuse.value.copy(u.color),v.opacity.value=u.opacity,u.map&&(v.map.value=u.map,t(u.map,v.mapTransform))}function o(v,u){v.dashSize.value=u.dashSize,v.totalSize.value=u.dashSize+u.gapSize,v.scale.value=u.scale}function l(v,u,x,y){v.diffuse.value.copy(u.color),v.opacity.value=u.opacity,v.size.value=u.size*x,v.scale.value=y*.5,u.map&&(v.map.value=u.map,t(u.map,v.uvTransform)),u.alphaMap&&(v.alphaMap.value=u.alphaMap,t(u.alphaMap,v.alphaMapTransform)),u.alphaTest>0&&(v.alphaTest.value=u.alphaTest)}function c(v,u){v.diffuse.value.copy(u.color),v.opacity.value=u.opacity,v.rotation.value=u.rotation,u.map&&(v.map.value=u.map,t(u.map,v.mapTransform)),u.alphaMap&&(v.alphaMap.value=u.alphaMap,t(u.alphaMap,v.alphaMapTransform)),u.alphaTest>0&&(v.alphaTest.value=u.alphaTest)}function d(v,u){v.specular.value.copy(u.specular),v.shininess.value=Math.max(u.shininess,1e-4)}function f(v,u){u.gradientMap&&(v.gradientMap.value=u.gradientMap)}function p(v,u){v.metalness.value=u.metalness,u.metalnessMap&&(v.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,v.metalnessMapTransform)),v.roughness.value=u.roughness,u.roughnessMap&&(v.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,v.roughnessMapTransform)),u.envMap&&(v.envMapIntensity.value=u.envMapIntensity)}function g(v,u,x){v.ior.value=u.ior,u.sheen>0&&(v.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),v.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(v.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,v.sheenColorMapTransform)),u.sheenRoughnessMap&&(v.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,v.sheenRoughnessMapTransform))),u.clearcoat>0&&(v.clearcoat.value=u.clearcoat,v.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(v.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,v.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(v.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Nt&&v.clearcoatNormalScale.value.negate())),u.dispersion>0&&(v.dispersion.value=u.dispersion),u.iridescence>0&&(v.iridescence.value=u.iridescence,v.iridescenceIOR.value=u.iridescenceIOR,v.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(v.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,v.iridescenceMapTransform)),u.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),u.transmission>0&&(v.transmission.value=u.transmission,v.transmissionSamplerMap.value=x.texture,v.transmissionSamplerSize.value.set(x.width,x.height),u.transmissionMap&&(v.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,v.transmissionMapTransform)),v.thickness.value=u.thickness,u.thicknessMap&&(v.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=u.attenuationDistance,v.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(v.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(v.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=u.specularIntensity,v.specularColor.value.copy(u.specularColor),u.specularColorMap&&(v.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,v.specularColorMapTransform)),u.specularIntensityMap&&(v.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,v.specularIntensityMapTransform))}function m(v,u){u.matcap&&(v.matcap.value=u.matcap)}function M(v,u){const x=e.get(u).light;v.referencePosition.value.setFromMatrixPosition(x.matrixWorld),v.nearDistance.value=x.shadow.camera.near,v.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Kp(n,e,t,i){let a={},r={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const A=y.program;i.uniformBlockBinding(x,A)}function c(x,y){let A=a[x.id];A===void 0&&(m(x),A=d(x),a[x.id]=A,x.addEventListener("dispose",v));const R=y.program;i.updateUBOMapping(x,R);const P=e.render.frame;r[x.id]!==P&&(p(x),r[x.id]=P)}function d(x){const y=f();x.__bindingPointIndex=y;const A=n.createBuffer(),R=x.__size,P=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,R,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,A),A}function f(){for(let x=0;x<o;x++)if(s.indexOf(x)===-1)return s.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(x){const y=a[x.id],A=x.uniforms,R=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let P=0,E=A.length;P<E;P++){const L=Array.isArray(A[P])?A[P]:[A[P]];for(let w=0,T=L.length;w<T;w++){const U=L[w];if(g(U,P,w,R)===!0){const z=U.__offset,k=Array.isArray(U.value)?U.value:[U.value];let W=0;for(let Q=0;Q<k.length;Q++){const X=k[Q],Z=M(X);typeof X=="number"||typeof X=="boolean"?(U.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,z+W,U.__data)):X.isMatrix3?(U.__data[0]=X.elements[0],U.__data[1]=X.elements[1],U.__data[2]=X.elements[2],U.__data[3]=0,U.__data[4]=X.elements[3],U.__data[5]=X.elements[4],U.__data[6]=X.elements[5],U.__data[7]=0,U.__data[8]=X.elements[6],U.__data[9]=X.elements[7],U.__data[10]=X.elements[8],U.__data[11]=0):(X.toArray(U.__data,W),W+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(x,y,A,R){const P=x.value,E=y+"_"+A;if(R[E]===void 0)return typeof P=="number"||typeof P=="boolean"?R[E]=P:R[E]=P.clone(),!0;{const L=R[E];if(typeof P=="number"||typeof P=="boolean"){if(L!==P)return R[E]=P,!0}else if(L.equals(P)===!1)return L.copy(P),!0}return!1}function m(x){const y=x.uniforms;let A=0;const R=16;for(let E=0,L=y.length;E<L;E++){const w=Array.isArray(y[E])?y[E]:[y[E]];for(let T=0,U=w.length;T<U;T++){const z=w[T],k=Array.isArray(z.value)?z.value:[z.value];for(let W=0,Q=k.length;W<Q;W++){const X=k[W],Z=M(X),V=A%R,ce=V%Z.boundary,me=V+ce;A+=ce,me!==0&&R-me<Z.storage&&(A+=R-me),z.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=A,A+=Z.storage}}}const P=A%R;return P>0&&(A+=R-P),x.__size=A,x.__cache={},this}function M(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function v(x){const y=x.target;y.removeEventListener("dispose",v);const A=s.indexOf(y.__bindingPointIndex);s.splice(A,1),n.deleteBuffer(a[y.id]),delete a[y.id],delete r[y.id]}function u(){for(const x in a)n.deleteBuffer(a[x]);s=[],a={},r={}}return{bind:l,update:c,dispose:u}}class Qp{constructor(e={}){const{canvas:t=pf(),context:i=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=s;const m=new Uint32Array(4),M=new Int32Array(4);let v=null,u=null;const x=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let R=!1;this._outputColorSpace=qt;let P=0,E=0,L=null,w=-1,T=null;const U=new Mt,z=new Mt;let k=null;const W=new ft(0);let Q=0,X=t.width,Z=t.height,V=1,ce=null,me=null;const Ee=new Mt(0,0,X,Z),Ae=new Mt(0,0,X,Z);let Pe=!1;const Fe=new nl;let Ce=!1,ee=!1;const ne=new yt,ue=new oe,de=new Mt,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Oe=!1;function ye(){return L===null?V:1}let N=i;function Ye(D,j){return t.getContext(D,j)}try{const D={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jr}`),t.addEventListener("webglcontextlost",H,!1),t.addEventListener("webglcontextrestored",Y,!1),t.addEventListener("webglcontextcreationerror",S,!1),N===null){const j="webgl2";if(N=Ye(j,D),N===null)throw Ye(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Be,Le,Me,Re,Te,We,lt,et,F,b,J,fe,he,ae,De,Se,C,te,K,se,B,q,_,ie;function O(){Be=new sh(N),Be.init(),q=new Gp(N,Be),Le=new $d(N,Be,e,q),Me=new kp(N,Be),Le.reversedDepthBuffer&&p&&Me.buffers.depth.setReversed(!0),Re=new ch(N),Te=new bp,We=new Hp(N,Be,Me,Te,Le,q,Re),lt=new th(A),et=new ah(A),F=new Kf(N),_=new jd(N,F),b=new oh(N,F,Re,_),J=new uh(N,b,F,Re),K=new fh(N,Le,We),Se=new eh(Te),fe=new Tp(A,lt,et,Be,Le,_,Se),he=new Zp(A,Te),ae=new Rp,De=new Fp(Be),te=new Qd(A,lt,et,Me,J,g,l),C=new Bp(A,J,Le),ie=new Kp(N,Re,Le,Me),se=new Jd(N,Be,Re),B=new lh(N,Be,Re),Re.programs=fe.programs,A.capabilities=Le,A.extensions=Be,A.properties=Te,A.renderLists=ae,A.shadowMap=C,A.state=Me,A.info=Re}O();const h=new Yp(A,N);this.xr=h,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const D=Be.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Be.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(D){D!==void 0&&(V=D,this.setSize(X,Z,!1))},this.getSize=function(D){return D.set(X,Z)},this.setSize=function(D,j,re=!0){if(h.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=D,Z=j,t.width=Math.floor(D*V),t.height=Math.floor(j*V),re===!0&&(t.style.width=D+"px",t.style.height=j+"px"),this.setViewport(0,0,D,j)},this.getDrawingBufferSize=function(D){return D.set(X*V,Z*V).floor()},this.setDrawingBufferSize=function(D,j,re){X=D,Z=j,V=re,t.width=Math.floor(D*re),t.height=Math.floor(j*re),this.setViewport(0,0,D,j)},this.getCurrentViewport=function(D){return D.copy(U)},this.getViewport=function(D){return D.copy(Ee)},this.setViewport=function(D,j,re,le){D.isVector4?Ee.set(D.x,D.y,D.z,D.w):Ee.set(D,j,re,le),Me.viewport(U.copy(Ee).multiplyScalar(V).round())},this.getScissor=function(D){return D.copy(Ae)},this.setScissor=function(D,j,re,le){D.isVector4?Ae.set(D.x,D.y,D.z,D.w):Ae.set(D,j,re,le),Me.scissor(z.copy(Ae).multiplyScalar(V).round())},this.getScissorTest=function(){return Pe},this.setScissorTest=function(D){Me.setScissorTest(Pe=D)},this.setOpaqueSort=function(D){ce=D},this.setTransparentSort=function(D){me=D},this.getClearColor=function(D){return D.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor(...arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha(...arguments)},this.clear=function(D=!0,j=!0,re=!0){let le=0;if(D){let $=!1;if(L!==null){const xe=L.texture.format;$=xe===_a||xe===va||xe===ma}if($){const xe=L.texture.type,be=xe===gn||xe===Wn||xe===Ui||xe===Ni||xe===ha||xe===pa,Ne=te.getClearColor(),Ue=te.getClearAlpha(),Ge=Ne.r,Ze=Ne.g,He=Ne.b;be?(m[0]=Ge,m[1]=Ze,m[2]=He,m[3]=Ue,N.clearBufferuiv(N.COLOR,0,m)):(M[0]=Ge,M[1]=Ze,M[2]=He,M[3]=Ue,N.clearBufferiv(N.COLOR,0,M))}else le|=N.COLOR_BUFFER_BIT}j&&(le|=N.DEPTH_BUFFER_BIT),re&&(le|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",H,!1),t.removeEventListener("webglcontextrestored",Y,!1),t.removeEventListener("webglcontextcreationerror",S,!1),te.dispose(),ae.dispose(),De.dispose(),Te.dispose(),lt.dispose(),et.dispose(),J.dispose(),_.dispose(),ie.dispose(),fe.dispose(),h.dispose(),h.removeEventListener("sessionstart",gt),h.removeEventListener("sessionend",dt),Qe.stop()};function H(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Y(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const D=Re.autoReset,j=C.enabled,re=C.autoUpdate,le=C.needsUpdate,$=C.type;O(),Re.autoReset=D,C.enabled=j,C.autoUpdate=re,C.needsUpdate=le,C.type=$}function S(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function I(D){const j=D.target;j.removeEventListener("dispose",I),G(j)}function G(D){pe(D),Te.remove(D)}function pe(D){const j=Te.get(D).programs;j!==void 0&&(j.forEach(function(re){fe.releaseProgram(re)}),D.isShaderMaterial&&fe.releaseShaderCache(D))}this.renderBufferDirect=function(D,j,re,le,$,xe){j===null&&(j=_e);const be=$.isMesh&&$.matrixWorld.determinant()<0,Ne=zt(D,j,re,le,$);Me.setMaterial(le,be);let Ue=re.index,Ge=1;if(le.wireframe===!0){if(Ue=b.getWireframeAttribute(re),Ue===void 0)return;Ge=2}const Ze=re.drawRange,He=re.attributes.position;let nt=Ze.start*Ge,ut=(Ze.start+Ze.count)*Ge;xe!==null&&(nt=Math.max(nt,xe.start*Ge),ut=Math.min(ut,(xe.start+xe.count)*Ge)),Ue!==null?(nt=Math.max(nt,0),ut=Math.min(ut,Ue.count)):He!=null&&(nt=Math.max(nt,0),ut=Math.min(ut,He.count));const St=ut-nt;if(St<0||St===1/0)return;_.setup($,le,Ne,re,Ue);let pt,ht=se;if(Ue!==null&&(pt=F.get(Ue),ht=B,ht.setIndex(pt)),$.isMesh)le.wireframe===!0?(Me.setLineWidth(le.wireframeLinewidth*ye()),ht.setMode(N.LINES)):ht.setMode(N.TRIANGLES);else if($.isLine){let Ve=le.linewidth;Ve===void 0&&(Ve=1),Me.setLineWidth(Ve*ye()),$.isLineSegments?ht.setMode(N.LINES):$.isLineLoop?ht.setMode(N.LINE_LOOP):ht.setMode(N.LINE_STRIP)}else $.isPoints?ht.setMode(N.POINTS):$.isSprite&&ht.setMode(N.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)Gi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ht.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Ve=$._multiDrawStarts,vt=$._multiDrawCounts,ot=$._multiDrawCount,Wt=Ue?F.get(Ue).bytesPerElement:1,Ii=Te.get(le).currentProgram.getUniforms();for(let Xt=0;Xt<ot;Xt++)Ii.setValue(N,"_gl_DrawID",Xt),ht.render(Ve[Xt]/Wt,vt[Xt])}else if($.isInstancedMesh)ht.renderInstances(nt,St,$.count);else if(re.isInstancedBufferGeometry){const Ve=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,vt=Math.min(re.instanceCount,Ve);ht.renderInstances(nt,St,vt)}else ht.render(nt,St)};function ge(D,j,re){D.transparent===!0&&D.side===mn&&D.forceSinglePass===!1?(D.side=Nt,D.needsUpdate=!0,qe(D,j,re),D.side=Tn,D.needsUpdate=!0,qe(D,j,re),D.side=mn):qe(D,j,re)}this.compile=function(D,j,re=null){re===null&&(re=D),u=De.get(re),u.init(j),y.push(u),re.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(u.pushLight($),$.castShadow&&u.pushShadow($))}),D!==re&&D.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(u.pushLight($),$.castShadow&&u.pushShadow($))}),u.setupLights();const le=new Set;return D.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const xe=$.material;if(xe)if(Array.isArray(xe))for(let be=0;be<xe.length;be++){const Ne=xe[be];ge(Ne,re,$),le.add(Ne)}else ge(xe,re,$),le.add(xe)}),u=y.pop(),le},this.compileAsync=function(D,j,re=null){const le=this.compile(D,j,re);return new Promise($=>{function xe(){if(le.forEach(function(be){Te.get(be).currentProgram.isReady()&&le.delete(be)}),le.size===0){$(D);return}setTimeout(xe,10)}Be.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let ve=null;function Xe(D){ve&&ve(D)}function gt(){Qe.stop()}function dt(){Qe.start()}const Qe=new sl;Qe.setAnimationLoop(Xe),typeof self<"u"&&Qe.setContext(self),this.setAnimationLoop=function(D){ve=D,h.setAnimationLoop(D),D===null?Qe.stop():Qe.start()},h.addEventListener("sessionstart",gt),h.addEventListener("sessionend",dt),this.render=function(D,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),h.enabled===!0&&h.isPresenting===!0&&(h.cameraAutoUpdate===!0&&h.updateCamera(j),j=h.getCamera()),D.isScene===!0&&D.onBeforeRender(A,D,j,L),u=De.get(D,y.length),u.init(j),y.push(u),ne.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Fe.setFromProjectionMatrix(ne,fn,j.reversedDepth),ee=this.localClippingEnabled,Ce=Se.init(this.clippingPlanes,ee),v=ae.get(D,x.length),v.init(),x.push(v),h.enabled===!0&&h.isPresenting===!0){const xe=A.xr.getDepthSensingMesh();xe!==null&&mt(xe,j,-1/0,A.sortObjects)}mt(D,j,0,A.sortObjects),v.finish(),A.sortObjects===!0&&v.sort(ce,me),Oe=h.enabled===!1||h.isPresenting===!1||h.hasDepthSensing()===!1,Oe&&te.addToRenderList(v,D),this.info.render.frame++,Ce===!0&&Se.beginShadows();const re=u.state.shadowsArray;C.render(re,D,j),Ce===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset();const le=v.opaque,$=v.transmissive;if(u.setupLights(),j.isArrayCamera){const xe=j.cameras;if($.length>0)for(let be=0,Ne=xe.length;be<Ne;be++){const Ue=xe[be];ze(le,$,D,Ue)}Oe&&te.render(D);for(let be=0,Ne=xe.length;be<Ne;be++){const Ue=xe[be];Ie(v,D,Ue,Ue.viewport)}}else $.length>0&&ze(le,$,D,j),Oe&&te.render(D),Ie(v,D,j);L!==null&&E===0&&(We.updateMultisampleRenderTarget(L),We.updateRenderTargetMipmap(L)),D.isScene===!0&&D.onAfterRender(A,D,j),_.resetDefaultState(),w=-1,T=null,y.pop(),y.length>0?(u=y[y.length-1],Ce===!0&&Se.setGlobalState(A.clippingPlanes,u.state.camera)):u=null,x.pop(),x.length>0?v=x[x.length-1]:v=null};function mt(D,j,re,le){if(D.visible===!1)return;if(D.layers.test(j.layers)){if(D.isGroup)re=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(j);else if(D.isLight)u.pushLight(D),D.castShadow&&u.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||Fe.intersectsSprite(D)){le&&de.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ne);const be=J.update(D),Ne=D.material;Ne.visible&&v.push(D,be,Ne,re,de.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||Fe.intersectsObject(D))){const be=J.update(D),Ne=D.material;if(le&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),de.copy(D.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),de.copy(be.boundingSphere.center)),de.applyMatrix4(D.matrixWorld).applyMatrix4(ne)),Array.isArray(Ne)){const Ue=be.groups;for(let Ge=0,Ze=Ue.length;Ge<Ze;Ge++){const He=Ue[Ge],nt=Ne[He.materialIndex];nt&&nt.visible&&v.push(D,be,nt,re,de.z,He)}}else Ne.visible&&v.push(D,be,Ne,re,de.z,null)}}const xe=D.children;for(let be=0,Ne=xe.length;be<Ne;be++)mt(xe[be],j,re,le)}function Ie(D,j,re,le){const $=D.opaque,xe=D.transmissive,be=D.transparent;u.setupLightsView(re),Ce===!0&&Se.setGlobalState(A.clippingPlanes,re),le&&Me.viewport(U.copy(le)),$.length>0&&rt($,j,re),xe.length>0&&rt(xe,j,re),be.length>0&&rt(be,j,re),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function ze(D,j,re,le){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[le.id]===void 0&&(u.state.transmissionRenderTarget[le.id]=new Dn(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Fi:gn,minFilter:Rn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const xe=u.state.transmissionRenderTarget[le.id],be=le.viewport||U;xe.setSize(be.z*A.transmissionResolutionScale,be.w*A.transmissionResolutionScale);const Ne=A.getRenderTarget(),Ue=A.getActiveCubeFace(),Ge=A.getActiveMipmapLevel();A.setRenderTarget(xe),A.getClearColor(W),Q=A.getClearAlpha(),Q<1&&A.setClearColor(16777215,.5),A.clear(),Oe&&te.render(re);const Ze=A.toneMapping;A.toneMapping=Cn;const He=le.viewport;if(le.viewport!==void 0&&(le.viewport=void 0),u.setupLightsView(le),Ce===!0&&Se.setGlobalState(A.clippingPlanes,le),rt(D,re,le),We.updateMultisampleRenderTarget(xe),We.updateRenderTargetMipmap(xe),Be.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let ut=0,St=j.length;ut<St;ut++){const pt=j[ut],ht=pt.object,Ve=pt.geometry,vt=pt.material,ot=pt.group;if(vt.side===mn&&ht.layers.test(le.layers)){const Wt=vt.side;vt.side=Nt,vt.needsUpdate=!0,je(ht,re,le,Ve,vt,ot),vt.side=Wt,vt.needsUpdate=!0,nt=!0}}nt===!0&&(We.updateMultisampleRenderTarget(xe),We.updateRenderTargetMipmap(xe))}A.setRenderTarget(Ne,Ue,Ge),A.setClearColor(W,Q),He!==void 0&&(le.viewport=He),A.toneMapping=Ze}function rt(D,j,re){const le=j.isScene===!0?j.overrideMaterial:null;for(let $=0,xe=D.length;$<xe;$++){const be=D[$],Ne=be.object,Ue=be.geometry,Ge=be.group;let Ze=be.material;Ze.allowOverride===!0&&le!==null&&(Ze=le),Ne.layers.test(re.layers)&&je(Ne,j,re,Ue,Ze,Ge)}}function je(D,j,re,le,$,xe){D.onBeforeRender(A,j,re,le,$,xe),D.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),$.onBeforeRender(A,j,re,le,D,xe),$.transparent===!0&&$.side===mn&&$.forceSinglePass===!1?($.side=Nt,$.needsUpdate=!0,A.renderBufferDirect(re,j,le,$,D,xe),$.side=Tn,$.needsUpdate=!0,A.renderBufferDirect(re,j,le,$,D,xe),$.side=mn):A.renderBufferDirect(re,j,le,$,D,xe),D.onAfterRender(A,j,re,le,$,xe)}function qe(D,j,re){j.isScene!==!0&&(j=_e);const le=Te.get(D),$=u.state.lights,xe=u.state.shadowsArray,be=$.state.version,Ne=fe.getParameters(D,$.state,xe,j,re),Ue=fe.getProgramCacheKey(Ne);let Ge=le.programs;le.environment=D.isMeshStandardMaterial?j.environment:null,le.fog=j.fog,le.envMap=(D.isMeshStandardMaterial?et:lt).get(D.envMap||le.environment),le.envMapRotation=le.environment!==null&&D.envMap===null?j.environmentRotation:D.envMapRotation,Ge===void 0&&(D.addEventListener("dispose",I),Ge=new Map,le.programs=Ge);let Ze=Ge.get(Ue);if(Ze!==void 0){if(le.currentProgram===Ze&&le.lightsStateVersion===be)return tt(D,Ne),Ze}else Ne.uniforms=fe.getUniforms(D),D.onBeforeCompile(Ne,A),Ze=fe.acquireProgram(Ne,Ue),Ge.set(Ue,Ze),le.uniforms=Ne.uniforms;const He=le.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(He.clippingPlanes=Se.uniform),tt(D,Ne),le.needsLights=ti(D),le.lightsStateVersion=be,le.needsLights&&(He.ambientLightColor.value=$.state.ambient,He.lightProbe.value=$.state.probe,He.directionalLights.value=$.state.directional,He.directionalLightShadows.value=$.state.directionalShadow,He.spotLights.value=$.state.spot,He.spotLightShadows.value=$.state.spotShadow,He.rectAreaLights.value=$.state.rectArea,He.ltc_1.value=$.state.rectAreaLTC1,He.ltc_2.value=$.state.rectAreaLTC2,He.pointLights.value=$.state.point,He.pointLightShadows.value=$.state.pointShadow,He.hemisphereLights.value=$.state.hemi,He.directionalShadowMap.value=$.state.directionalShadowMap,He.directionalShadowMatrix.value=$.state.directionalShadowMatrix,He.spotShadowMap.value=$.state.spotShadowMap,He.spotLightMatrix.value=$.state.spotLightMatrix,He.spotLightMap.value=$.state.spotLightMap,He.pointShadowMap.value=$.state.pointShadowMap,He.pointShadowMatrix.value=$.state.pointShadowMatrix),le.currentProgram=Ze,le.uniformsList=null,Ze}function at(D){if(D.uniformsList===null){const j=D.currentProgram.getUniforms();D.uniformsList=Ir.seqWithValue(j.seq,D.uniforms)}return D.uniformsList}function tt(D,j){const re=Te.get(D);re.outputColorSpace=j.outputColorSpace,re.batching=j.batching,re.batchingColor=j.batchingColor,re.instancing=j.instancing,re.instancingColor=j.instancingColor,re.instancingMorph=j.instancingMorph,re.skinning=j.skinning,re.morphTargets=j.morphTargets,re.morphNormals=j.morphNormals,re.morphColors=j.morphColors,re.morphTargetsCount=j.morphTargetsCount,re.numClippingPlanes=j.numClippingPlanes,re.numIntersection=j.numClipIntersection,re.vertexAlphas=j.vertexAlphas,re.vertexTangents=j.vertexTangents,re.toneMapping=j.toneMapping}function zt(D,j,re,le,$){j.isScene!==!0&&(j=_e),We.resetTextureUnits();const xe=j.fog,be=le.isMeshStandardMaterial?j.environment:null,Ne=L===null?A.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ui,Ue=(le.isMeshStandardMaterial?et:lt).get(le.envMap||be),Ge=le.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,Ze=!!re.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),He=!!re.morphAttributes.position,nt=!!re.morphAttributes.normal,ut=!!re.morphAttributes.color;let St=Cn;le.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(St=A.toneMapping);const pt=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,ht=pt!==void 0?pt.length:0,Ve=Te.get(le),vt=u.state.lights;if(Ce===!0&&(ee===!0||D!==T)){const Ut=D===T&&le.id===w;Se.setState(le,D,Ut)}let ot=!1;le.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==vt.state.version||Ve.outputColorSpace!==Ne||$.isBatchedMesh&&Ve.batching===!1||!$.isBatchedMesh&&Ve.batching===!0||$.isBatchedMesh&&Ve.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ve.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ve.instancing===!1||!$.isInstancedMesh&&Ve.instancing===!0||$.isSkinnedMesh&&Ve.skinning===!1||!$.isSkinnedMesh&&Ve.skinning===!0||$.isInstancedMesh&&Ve.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ve.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ve.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ve.instancingMorph===!1&&$.morphTexture!==null||Ve.envMap!==Ue||le.fog===!0&&Ve.fog!==xe||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Se.numPlanes||Ve.numIntersection!==Se.numIntersection)||Ve.vertexAlphas!==Ge||Ve.vertexTangents!==Ze||Ve.morphTargets!==He||Ve.morphNormals!==nt||Ve.morphColors!==ut||Ve.toneMapping!==St||Ve.morphTargetsCount!==ht)&&(ot=!0):(ot=!0,Ve.__version=le.version);let Wt=Ve.currentProgram;ot===!0&&(Wt=qe(le,j,$));let Ii=!1,Xt=!1,Ji=!1;const _t=Wt.getUniforms(),Qt=Ve.uniforms;if(Me.useProgram(Wt.program)&&(Ii=!0,Xt=!0,Ji=!0),le.id!==w&&(w=le.id,Xt=!0),Ii||T!==D){Me.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),_t.setValue(N,"projectionMatrix",D.projectionMatrix),_t.setValue(N,"viewMatrix",D.matrixWorldInverse);const kt=_t.map.cameraPosition;kt!==void 0&&kt.setValue(N,ue.setFromMatrixPosition(D.matrixWorld)),Le.logarithmicDepthBuffer&&_t.setValue(N,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&_t.setValue(N,"isOrthographic",D.isOrthographicCamera===!0),T!==D&&(T=D,Xt=!0,Ji=!0)}if($.isSkinnedMesh){_t.setOptional(N,$,"bindMatrix"),_t.setOptional(N,$,"bindMatrixInverse");const Ut=$.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),_t.setValue(N,"boneTexture",Ut.boneTexture,We))}$.isBatchedMesh&&(_t.setOptional(N,$,"batchingTexture"),_t.setValue(N,"batchingTexture",$._matricesTexture,We),_t.setOptional(N,$,"batchingIdTexture"),_t.setValue(N,"batchingIdTexture",$._indirectTexture,We),_t.setOptional(N,$,"batchingColorTexture"),$._colorsTexture!==null&&_t.setValue(N,"batchingColorTexture",$._colorsTexture,We));const jt=re.morphAttributes;if((jt.position!==void 0||jt.normal!==void 0||jt.color!==void 0)&&K.update($,re,Wt),(Xt||Ve.receiveShadow!==$.receiveShadow)&&(Ve.receiveShadow=$.receiveShadow,_t.setValue(N,"receiveShadow",$.receiveShadow)),le.isMeshGouraudMaterial&&le.envMap!==null&&(Qt.envMap.value=Ue,Qt.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),le.isMeshStandardMaterial&&le.envMap===null&&j.environment!==null&&(Qt.envMapIntensity.value=j.environmentIntensity),Xt&&(_t.setValue(N,"toneMappingExposure",A.toneMappingExposure),Ve.needsLights&&Lt(Qt,Ji),xe&&le.fog===!0&&he.refreshFogUniforms(Qt,xe),he.refreshMaterialUniforms(Qt,le,V,Z,u.state.transmissionRenderTarget[D.id]),Ir.upload(N,at(Ve),Qt,We)),le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Ir.upload(N,at(Ve),Qt,We),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&_t.setValue(N,"center",$.center),_t.setValue(N,"modelViewMatrix",$.modelViewMatrix),_t.setValue(N,"normalMatrix",$.normalMatrix),_t.setValue(N,"modelMatrix",$.matrixWorld),le.isShaderMaterial||le.isRawShaderMaterial){const Ut=le.uniformsGroups;for(let kt=0,Ds=Ut.length;kt<Ds;kt++){const ni=Ut[kt];ie.update(ni,Wt),ie.bind(ni,Wt)}}return Wt}function Lt(D,j){D.ambientLightColor.needsUpdate=j,D.lightProbe.needsUpdate=j,D.directionalLights.needsUpdate=j,D.directionalLightShadows.needsUpdate=j,D.pointLights.needsUpdate=j,D.pointLightShadows.needsUpdate=j,D.spotLights.needsUpdate=j,D.spotLightShadows.needsUpdate=j,D.rectAreaLights.needsUpdate=j,D.hemisphereLights.needsUpdate=j}function ti(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(D,j,re){const le=Te.get(D);le.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,le.__autoAllocateDepthBuffer===!1&&(le.__useRenderToTexture=!1),Te.get(D.texture).__webglTexture=j,Te.get(D.depthTexture).__webglTexture=le.__autoAllocateDepthBuffer?void 0:re,le.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,j){const re=Te.get(D);re.__webglFramebuffer=j,re.__useDefaultFramebuffer=j===void 0};const zr=N.createFramebuffer();this.setRenderTarget=function(D,j=0,re=0){L=D,P=j,E=re;let le=!0,$=null,xe=!1,be=!1;if(D){const Ue=Te.get(D);if(Ue.__useDefaultFramebuffer!==void 0)Me.bindFramebuffer(N.FRAMEBUFFER,null),le=!1;else if(Ue.__webglFramebuffer===void 0)We.setupRenderTarget(D);else if(Ue.__hasExternalTextures)We.rebindTextures(D,Te.get(D.texture).__webglTexture,Te.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const He=D.depthTexture;if(Ue.__boundDepthTexture!==He){if(He!==null&&Te.has(He)&&(D.width!==He.image.width||D.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(D)}}const Ge=D.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(be=!0);const Ze=Te.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Ze[j])?$=Ze[j][re]:$=Ze[j],xe=!0):D.samples>0&&We.useMultisampledRTT(D)===!1?$=Te.get(D).__webglMultisampledFramebuffer:Array.isArray(Ze)?$=Ze[re]:$=Ze,U.copy(D.viewport),z.copy(D.scissor),k=D.scissorTest}else U.copy(Ee).multiplyScalar(V).floor(),z.copy(Ae).multiplyScalar(V).floor(),k=Pe;if(re!==0&&($=zr),Me.bindFramebuffer(N.FRAMEBUFFER,$)&&le&&Me.drawBuffers(D,$),Me.viewport(U),Me.scissor(z),Me.setScissorTest(k),xe){const Ue=Te.get(D.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ue.__webglTexture,re)}else if(be){const Ue=j;for(let Ge=0;Ge<D.textures.length;Ge++){const Ze=Te.get(D.textures[Ge]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ge,Ze.__webglTexture,re,Ue)}}else if(D!==null&&re!==0){const Ue=Te.get(D.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ue.__webglTexture,re)}w=-1},this.readRenderTargetPixels=function(D,j,re,le,$,xe,be,Ne=0){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Te.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue){Me.bindFramebuffer(N.FRAMEBUFFER,Ue);try{const Ge=D.textures[Ne],Ze=Ge.format,He=Ge.type;if(!Le.textureFormatReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=D.width-le&&re>=0&&re<=D.height-$&&(D.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ne),N.readPixels(j,re,le,$,q.convert(Ze),q.convert(He),xe))}finally{const Ge=L!==null?Te.get(L).__webglFramebuffer:null;Me.bindFramebuffer(N.FRAMEBUFFER,Ge)}}},this.readRenderTargetPixelsAsync=async function(D,j,re,le,$,xe,be,Ne=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Te.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&be!==void 0&&(Ue=Ue[be]),Ue)if(j>=0&&j<=D.width-le&&re>=0&&re<=D.height-$){Me.bindFramebuffer(N.FRAMEBUFFER,Ue);const Ge=D.textures[Ne],Ze=Ge.format,He=Ge.type;if(!Le.textureFormatReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const nt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,nt),N.bufferData(N.PIXEL_PACK_BUFFER,xe.byteLength,N.STREAM_READ),D.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ne),N.readPixels(j,re,le,$,q.convert(Ze),q.convert(He),0);const ut=L!==null?Te.get(L).__webglFramebuffer:null;Me.bindFramebuffer(N.FRAMEBUFFER,ut);const St=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await mf(N,St,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,nt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,xe),N.deleteBuffer(nt),N.deleteSync(St),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,j=null,re=0){const le=Math.pow(2,-re),$=Math.floor(D.image.width*le),xe=Math.floor(D.image.height*le),be=j!==null?j.x:0,Ne=j!==null?j.y:0;We.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,re,0,0,be,Ne,$,xe),Me.unbindTexture()};const kr=N.createFramebuffer(),Ct=N.createFramebuffer();this.copyTextureToTexture=function(D,j,re=null,le=null,$=0,xe=null){xe===null&&($!==0?(Gi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xe=$,$=0):xe=0);let be,Ne,Ue,Ge,Ze,He,nt,ut,St;const pt=D.isCompressedTexture?D.mipmaps[xe]:D.image;if(re!==null)be=re.max.x-re.min.x,Ne=re.max.y-re.min.y,Ue=re.isBox3?re.max.z-re.min.z:1,Ge=re.min.x,Ze=re.min.y,He=re.isBox3?re.min.z:0;else{const jt=Math.pow(2,-$);be=Math.floor(pt.width*jt),Ne=Math.floor(pt.height*jt),D.isDataArrayTexture?Ue=pt.depth:D.isData3DTexture?Ue=Math.floor(pt.depth*jt):Ue=1,Ge=0,Ze=0,He=0}le!==null?(nt=le.x,ut=le.y,St=le.z):(nt=0,ut=0,St=0);const ht=q.convert(j.format),Ve=q.convert(j.type);let vt;j.isData3DTexture?(We.setTexture3D(j,0),vt=N.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(We.setTexture2DArray(j,0),vt=N.TEXTURE_2D_ARRAY):(We.setTexture2D(j,0),vt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,j.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,j.unpackAlignment);const ot=N.getParameter(N.UNPACK_ROW_LENGTH),Wt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ii=N.getParameter(N.UNPACK_SKIP_PIXELS),Xt=N.getParameter(N.UNPACK_SKIP_ROWS),Ji=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,He);const _t=D.isDataArrayTexture||D.isData3DTexture,Qt=j.isDataArrayTexture||j.isData3DTexture;if(D.isDepthTexture){const jt=Te.get(D),Ut=Te.get(j),kt=Te.get(jt.__renderTarget),Ds=Te.get(Ut.__renderTarget);Me.bindFramebuffer(N.READ_FRAMEBUFFER,kt.__webglFramebuffer),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ds.__webglFramebuffer);for(let ni=0;ni<Ue;ni++)_t&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.get(D).__webglTexture,$,He+ni),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.get(j).__webglTexture,xe,St+ni)),N.blitFramebuffer(Ge,Ze,be,Ne,nt,ut,be,Ne,N.DEPTH_BUFFER_BIT,N.NEAREST);Me.bindFramebuffer(N.READ_FRAMEBUFFER,null),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if($!==0||D.isRenderTargetTexture||Te.has(D)){const jt=Te.get(D),Ut=Te.get(j);Me.bindFramebuffer(N.READ_FRAMEBUFFER,kr),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,Ct);for(let kt=0;kt<Ue;kt++)_t?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,jt.__webglTexture,$,He+kt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,jt.__webglTexture,$),Qt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ut.__webglTexture,xe,St+kt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ut.__webglTexture,xe),$!==0?N.blitFramebuffer(Ge,Ze,be,Ne,nt,ut,be,Ne,N.COLOR_BUFFER_BIT,N.NEAREST):Qt?N.copyTexSubImage3D(vt,xe,nt,ut,St+kt,Ge,Ze,be,Ne):N.copyTexSubImage2D(vt,xe,nt,ut,Ge,Ze,be,Ne);Me.bindFramebuffer(N.READ_FRAMEBUFFER,null),Me.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Qt?D.isDataTexture||D.isData3DTexture?N.texSubImage3D(vt,xe,nt,ut,St,be,Ne,Ue,ht,Ve,pt.data):j.isCompressedArrayTexture?N.compressedTexSubImage3D(vt,xe,nt,ut,St,be,Ne,Ue,ht,pt.data):N.texSubImage3D(vt,xe,nt,ut,St,be,Ne,Ue,ht,Ve,pt):D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,xe,nt,ut,be,Ne,ht,Ve,pt.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,xe,nt,ut,pt.width,pt.height,ht,pt.data):N.texSubImage2D(N.TEXTURE_2D,xe,nt,ut,be,Ne,ht,Ve,pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,ot),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Wt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ii),N.pixelStorei(N.UNPACK_SKIP_ROWS,Xt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ji),xe===0&&j.generateMipmaps&&N.generateMipmap(vt),Me.unbindTexture()},this.initRenderTarget=function(D){Te.get(D).__webglFramebuffer===void 0&&We.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?We.setTextureCube(D,0):D.isData3DTexture?We.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?We.setTexture2DArray(D,0):We.setTexture2D(D,0),Me.unbindTexture()},this.resetState=function(){P=0,E=0,L=null,Me.reset(),_.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}const Kt={rotate:!1,stretch:!1,speed:1,weight:1,avoidEdges:!0,points:[]};for(let n=0;n<30;n++){if(n==13||n==17)continue;const e=n/30*Math.PI*2,t=16*Math.pow(Math.sin(e),3),i=10*Math.cos(e)-5*Math.cos(2*e)-2*Math.cos(3*e)-Math.cos(4*e),a=t/22,r=i/23;Kt.points.push(new Ke(a,r))}let Ur=0;for(let n=1;n<Kt.points.length;n++)Kt.points[n].y<Kt.points[Ur].y&&(Ur=n);Kt.points=Kt.points.slice(Ur).concat(Kt.points.slice(0,Ur)),Kt.points.push(Kt.points[0]);const Fr={rotate:!0,stretch:!0,speed:1,weight:1,avoidEdges:!1,points:[]};for(let n=0;n<30;n++){const e=(n-15)*.12,t=Math.sin(n*.8)*.4;Fr.points.push(new Ke(e,t))}const Ps={rotate:!1,stretch:!1,speed:1,weight:1,avoidEdges:!0,points:[new Ke(0,.785),new Ke(.176,.244),new Ke(.747,.243),new Ke(.287,-.091),new Ke(.462,-.634),new Ke(0,-.3),new Ke(-.46,-.634),new Ke(-.287,-.091),new Ke(-.747,.243),new Ke(-.176,.243),new Ke(0,.785)]},Nr={rotate:!0,stretch:!1,speed:1,weight:1,avoidEdges:!0,points:[]};for(let n=0;n<30;n++){const e=n/30*1.1,t=19*e,i=e*Math.cos(t),a=e*Math.sin(t);Nr.points.push(new Ke(i,a))}async function jp(n,e,t=1){const i={renderer:null,camera:null,scene:null,requestedFrameId:null,resetParticles:null,onResize:new ri,aspect:1,cameraScale:1,globalScale:t,pause:async()=>{i.isPaused=!0,i.isPerformancePaused||i.onPause.call(!0),i.resetParticles&&i.resetParticles(),c.clear(!0,!0,!0)},resume:async()=>{i.isPaused=!1,i.isPerformancePaused||i.onPause.call(!1)},isPaused:!1,isPerformancePaused:!0,onPause:new ri,onRenderingActive:new ri},a=new tl;i.scene=a,a.background=null;const r=new Ms(-1,1,1,-1,.1,10);i.camera=r,a.add(r),r.position.z=1;const s=n.tagName==="CANVAS",o=()=>{if(s){const m=n.getBoundingClientRect();return{width:m.width,height:m.height}}return{width:window.innerWidth,height:window.innerHeight}},l=()=>window.devicePixelRatio||1,c=new Qp({canvas:s?n:void 0,powerPreference:"high-performance",depth:!1,alpha:!0,precision:"mediump",antialias:!1,stencil:!1});i.renderer=c,c.debug.checkShaderErrors=!1,c.sortObjects=!0,c.setClearColor(0,0),c.setPixelRatio(l());const d=o();c.setSize(d.width,d.height,!s);const f=c.domElement;f.addEventListener("webglcontextlost",async g=>{g.preventDefault(),i&&i.requestedFrameId&&(cancelAnimationFrame(i.requestedFrameId),i.requestedFrameId=null),i.onRenderingActive(!1)},!1),f.addEventListener("webglcontextrestored",async()=>{c.setClearColor(0,0),c.setPixelRatio(l());const g=o();c.setSize(g.width,g.height,!s),i.resetParticles&&!i.isPaused&&(await stopScene(),await startScene()),i.onRenderingActive(!0)},!1);async function p(){await e.updateScreenDimensions();const g=o(),m=g.width/g.height;i.aspect=m;const M=i.globalScale||1,x=(m>=1?1:1/Math.max(1/m*1.35,1))/M;i.cameraScale=x,m>=1?(r.left=-m/2*x,r.right=m/2*x,r.top=.5*x,r.bottom=-.5*x):(r.left=-.5*x,r.right=.5*x,r.top=1/(2*m)*x,r.bottom=-1/(2*m)*x),r.updateProjectionMatrix(),c.setPixelRatio(l()),c.setSize(g.width,g.height,!s),i.onResize.call(g)}if(i.updateCamera=p,s&&typeof ResizeObserver<"u"){let g=null;new ResizeObserver(()=>{g&&clearTimeout(g),g=setTimeout(()=>{p()},16)}).observe(f)}else window.addEventListener("resize",p);return await p(),c.clear(!0,!0,!0),s||n.appendChild(c.domElement),i}const Jp=`// Max van Leeuwen

// particles vertex stage



attribute vec3 instancePosition; // per-instance position
attribute float startTime; // this particle's spawn time (once per cycle, -1 when unused)
attribute vec4 randValues; // pre-computed random values (0-1, normalized Uint8)
attribute vec2 quadCoord; // quad coordinates (-.5 to .5 for each vertex) - per-vertex, shared across instances
uniform float currentTime; // clock
uniform float deltaTime; // frame delta time (s)
uniform float aspectRatio; // width/height ratio for texture
uniform float life; // maximum lifetime
uniform bool grow; // particle scale-in animation duration (0-.25x)
uniform bool shrink; // scale-out anim
uniform bool fade; // fade anim
uniform float size; // overall particle scale
uniform bool randomizeSizeLifeTime; // randomize size and lifetime
uniform float bouncySpeed; // fluctuating size speed (-1 if unused)
uniform float glitterySpeed; // fluctuating lightness speed (-1 if unused)
uniform float gravity; // falling
uniform float outwards; // flying away from start, random direction
uniform float spinning; // spinning
uniform bool align; // align particles with velocity direction
uniform bool flip; // flip texture horizontally when moving left
uniform sampler2D turbulenceTex; // turbulence texture
uniform float turbulenceStrength; // turbulence strength
uniform float glide; // flying away horizontally
uniform float imageCount; // sprite sheet texture count
uniform bool fromStart; // if playing sequence from start instead of random frames (for GIFs)
uniform float speed; // fps, can be 0
uniform bool randomizeLifeTime; // allow randomization of lifetime
uniform float spriteCols; // pre-calculated sprite sheet columns
uniform float spriteRows; // pre-calculated sprite sheet rows
uniform vec2 spriteCellSize; // pre-calculated cell size (1/cols, 1/rows)
uniform float fileCount; // number of separate images/GIFs
uniform float imageStarts[128]; // start index for each file (max 64 files)
uniform float imageCounts[128]; // frame count for each file
uniform float imageCycles[128]; // cycle count for each file (0 = infinite)
uniform bool isFlipbook; // true if all files have 1 frame (flipbook mode), false otherwise

// send to fragment stage
varying float dontRender; // skip rendering this particle
varying float alpha; // transparency
varying float lightness; // lightness of particle
varying vec2 vUv; // texture coordinates for fragment shader

// params
const float idealInTime = .17; // scaling and fading time (s)
const float inset = 0.005; // tiny uv inset to prevent edge bleeding

const float EPS = 0.0001; // epsilon >0
const float EPS1 = 0.9999; // epsilon <1
const float EPS11 = 1.0001; // epsilon >1
const float PI2 = 6.2831853; // PI*2



// helpers


    // simple remap function (clamped)
    float remap(float value, float minSrc, float maxSrc, float minDst, float maxDst){
        float result = minDst + (value - minSrc) * (maxDst - minDst) / (maxSrc - minSrc);
        return clamp(result, min(minDst, maxDst), max(minDst, maxDst));
    }

    // derive new random value from vec4 of randoms using an index
    float deriveRandom(float index){
        vec4 p = randValues * 127.1;
        p.xyz += index * vec3(1.0, 1.3, 1.7);
        p.w += startTime * 0.1;
        return fract(p.x * p.y + p.z * p.w);
    }

    // cubic ease-out curve (starts fast, ends slow)
    float easeOutCubic(float t){
        float a = 1. - t;
        return 1. - a * a * a;
    }

    // mod/div for whole numbers stored as floats
    // plain mod(x, y) = x - y*floor(x/y) can return y itself when the GPU rounds x/y a hair below a whole number
    float intDiv(float x, float y){
        return floor((x + .5) / y);
    }
    float intMod(float x, float y){
        return x - intDiv(x, y) * y;
    }



void main(){

    // age

        // get lifetime
        float lifeTime = life; // maximum lifetime
        if(randomizeLifeTime && randomizeSizeLifeTime) lifeTime *= remap(deriveRandom(7.), 0., 1., .5, 1.); // randomized lifetime
        float isActive = step(0., startTime); // 0 if startTime < 0, 1 if startTime >= 0
        float age = mix(0., currentTime-startTime, isActive); // time since particles start (s)
        float t = age/lifeTime; // lifetime ratio (0-1)

        // alive check
        dontRender = step(1., t) + step(t, EPS); // 1 if dead, 0 if alive
        if(dontRender > 0.5){
            gl_Position = vec4(0., 0., 0., 0.);
            return;
        }

        // dynamic inTime
        float halfLifeTime = lifeTime * .5;
        float inTime = min(halfLifeTime, idealInTime); // inTime should not be longer than half of lifeTime, prevents out-anim glitches (only relevant for very short-lived particles)

    // position

        // velocity tracking
        vec2 velocity = vec2(0., 0.);
        float glideDirection = 0.; // store glide direction for flip persistence

        // derive random size
        float decodedRandSize = mix(1., mix(.75, 1.25, deriveRandom(8.)), float(randomizeSizeLifeTime));

        // horizontal fly-away
        float hor = 0.;
        if(glide > EPS){
            glideDirection = remap(deriveRandom(9.), 0., 1., -glide, glide); // random horizontal direction on spawn
            float a = 1. - min(age*.7, 1.); // cheaper than pow
            float horMultiplier = (1. - a*a*a) * 1.5; // imitating a horizontal force on spawn
            hor = glideDirection * horMultiplier;
            
            // derivative for velocity
            if((align || flip) && age < 1.43){ // a = 0 when age*.7 >= 1, so at age=1.43 this calculation is not needed
                velocity.x += glideDirection * 1.5 * 3. * a * a * 0.7;
            }
        }

        // down
        float downForce = 0.;
        if(abs(gravity) > EPS){
            downForce = -age*age*gravity - age*gravity*.4*remap(decodedRandSize, .5, 1., 1., 2.); // stylized gravity, larger particles fall faster
            
            // derivative for velocity
            if((align || flip)){
                velocity.y += -2. * age * gravity - gravity * .4 * remap(decodedRandSize, .5, 1., 1., 2.);
            }
        }

        // outwards
        vec2 outwardsOffset = vec2(0., 0.);
        if(outwards > EPS){
            float outwardsAngle = deriveRandom(10.) * PI2; // rad
            float outwardsSpeed = deriveRandom(11.)*.5+.5; // different speeds (.5-1x)
            
            // calculate accumulated distance with decreasing speed over time (100% to 30%)
            float accumulatedDistance = t - .35 * t * t; // integral of speed(t) = 1-.7t
            outwardsOffset = vec2(cos(outwardsAngle), sin(outwardsAngle)) * accumulatedDistance * outwards * outwardsSpeed * lifeTime;
            
            // derivative for velocity
            if((align || flip)){
                float velocityMagnitude = (1. - .7 * t) * outwards * outwardsSpeed;
                velocity += vec2(cos(outwardsAngle), sin(outwardsAngle)) * velocityMagnitude;
            }
        }

    // size

        // in/out scaling
        float outDelayRange = remap(lifeTime, .29, life, .3, .56); // the longer the particle lives, the more its out-animation is delayed
        float outDelay = (lifeTime-inTime) * (lifeTime < .29 ? 0. : outDelayRange); // delay within available out-anim, none when lifetime is too short
        float particleGrowShrinkScale = grow ? clamp(age/inTime, 0., 1.) : 1.; // scale-in (0-1x mult)
        float scaleOut = remap(age, inTime + outDelay, lifeTime, 1., 0.);
        if(shrink){
            particleGrowShrinkScale *= scaleOut; // scale-out starts when inTime is over
        }
        particleGrowShrinkScale = smoothstep(0., 1., particleGrowShrinkScale); // smooth curve

        // bouncy / fluctuating scale
        float fluctuatingSize = 1.;
        if(bouncySpeed > -.5){
            float a = 1.-scaleOut; // cheaper than pow
            float scaleOutReduce = shrink ? (1.-a*a) : 1.; // multiplier to reduce bounciness on scale-out
            float bouncyRand = deriveRandom(0.);
            float bouncyStrength = sin( age*bouncySpeed + bouncyRand*6.) * scaleOutReduce; // bounciness
            float bouncyAmount = remap(lifeTime, .7, 1.6, .8, .42); // stronger bouncyness on shorter lifetimes (in both directions max = 1)
            fluctuatingSize = remap(bouncyStrength, -1., 1., 1.-bouncyAmount, 1.+bouncyAmount); // particle scale multiplier
        }

        // final scale (multiply quad vtx positions instead of using gl_pointSize because of varying limits for ALIASED_POINT_SIZE_RANGE)
        float finalScale = decodedRandSize * size * particleGrowShrinkScale * fluctuatingSize;
            
        // turbulence displacement
        vec2 turbulenceOffset = vec2(0., 0.);
        if(turbulenceStrength > EPS){
            float turbulenceMagnitude = remap(turbulenceStrength, 0., .5, .3, 1.); // the turbulence magnitude is determined by the first half of the slider
            float turbulenceSpeed = remap(turbulenceStrength, .25, 1., .005, .03); // the speed is not affected in the first 25% of the slider
            float scaledTurbulenceMagnitude = turbulenceMagnitude * remap(size, 0., 1., .8, 2.7); // turbulence magnitude is smaller for smaller particles
            
            vec2 screenUV = instancePosition.xy + vec2( // random sampling direction for turbulence scrolling
                deriveRandom(13.),
                deriveRandom(14.)
            );
            vec2 turbulenceDirection = normalize(vec2(
                deriveRandom(15.) * 2. - 1.,
                deriveRandom(16.) * 2. - 1.
            ));
            vec2 startOffset = texture2D(turbulenceTex, screenUV).rg;
            screenUV += turbulenceDirection * age * turbulenceSpeed;
            vec2 turbulence = texture2D(turbulenceTex, screenUV).rg;
            turbulenceOffset = (turbulence - startOffset) * (2. * scaledTurbulenceMagnitude);
            
            // velocity from turbulence
            if((align || flip)){
                float finiteDiffTime = .1; // larger time step looks less choppy
                vec2 prevScreenUV = screenUV - turbulenceDirection * finiteDiffTime * turbulenceSpeed;
                vec2 prevTurbulence = texture2D(turbulenceTex, prevScreenUV).rg;
                vec2 turbulenceVelocity = (turbulence - prevTurbulence) * (2. * scaledTurbulenceMagnitude) / finiteDiffTime;
                velocity += turbulenceVelocity;
            }
        }

        float totalRotation = 0.;
        
        // velocity-following rotation
        if(align){
            vec2 rotationVelocity = velocity;
            
            // when glide is the only horizontal motion, preserve glide direction when horizontal velocity becomes 0
            if(glide > EPS && turbulenceStrength < EPS && outwards < EPS && abs(velocity.x) < EPS){
                rotationVelocity.x = glideDirection;
            }
            
            if(length(rotationVelocity) > EPS){
                totalRotation += atan(rotationVelocity.y, rotationVelocity.x) - 1.571; // -pi/2, up = 0 degrees
            }
        }
        
        // spinning rotation
        if(!align && !flip && spinning > EPS){
            float spinRand1 = deriveRandom(1.);
            float spinRand2 = deriveRandom(2.);
            float spinRand3 = deriveRandom(3.);
            
            float spinSpeed = spinRand1*.5+.5; // [.5 - 1]
            float flipDirection = step(spinRand2, .5); // 1 if flip, 0 if not
            spinSpeed = mix(spinSpeed, -spinSpeed, flipDirection); // [-1 - -.5] | [.5 - 1]

            // accumulated rotation with decreasing speed over time
            float accumulatedRotation = t - 0.4 * t * t; // integral of speed(t) = 1-.8t, because spinning speed goes from 100%-20% over lifetime
            totalRotation += ( spinRand3 * PI2) + (accumulatedRotation * spinning * spinSpeed * lifeTime);
        }
            
        vec2 adjustedQuadCoord = vec2(quadCoord.x * aspectRatio, quadCoord.y); // aspect ratio
        vec2 rotatedQuadCoord = adjustedQuadCoord;
        
        // mesh rotation
        if(abs(totalRotation) > EPS){
            float cosAngle = cos(totalRotation);
            float sinAngle = sin(totalRotation);
            rotatedQuadCoord = vec2(
                adjustedQuadCoord.x * cosAngle - adjustedQuadCoord.y * sinAngle,
                adjustedQuadCoord.x * sinAngle + adjustedQuadCoord.y * cosAngle
            );
        }
            
        // expand quad in world space
        vec3 particlePosition = vec3(
            instancePosition.x + hor + outwardsOffset.x + turbulenceOffset.x,
            instancePosition.y + downForce + outwardsOffset.y + turbulenceOffset.y,
            instancePosition.z
        );
        particlePosition.xy += rotatedQuadCoord * finalScale;
            
        // set projected position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(particlePosition, 1.);

    // color

        // lightness
        lightness = -1.; // -1 when unused
        if(glitterySpeed > -.5){
            float glitteryRand = deriveRandom(4.);
            lightness = sin( age*glitterySpeed + glitteryRand*6. )*.5+.5; // fluctuating lightness between 0 to 1
        }

        // transparency
        alpha = 1.;
        if(fade){
            // fade-in when not scaling in, or when both grow and shrink
            float doFadeIn = (!grow || (grow && shrink)) ? 1. : 0.;
            float fadeIn = remap(age, 0., inTime, 0., 1.);
            alpha = mix(alpha, fadeIn, doFadeIn);

            // fade-out when not scaling out, or when both grow and shrink
            float doFadeOut = (!shrink || (grow && shrink)) ? 1. : 0.;
            float fadeOut = remap(age, inTime + outDelay, lifeTime, 1., 0.);
            alpha *= mix(1., fadeOut, doFadeOut);

            alpha = smoothstep(0., 1., alpha);
        }

        // coords
        if(imageCount > EPS11){ // if multiple images in sprite sheet

            // use pre-calculated grid values from uniforms
            float spriteRand1 = deriveRandom(5.);
            float spriteRand2 = deriveRandom(6.);
            
            // multi-image, each particle picks a random file and animates within it
            if(fileCount > 1. && !isFlipbook) {
                // pick a random file index
                float fileIndexFloat = floor(spriteRand1 * fileCount);
                fileIndexFloat = min(fileIndexFloat, fileCount - 1.); // clamp to valid range
                int fileIndex = int(fileIndexFloat);
                
                // get file frame range
                float fileStart = imageStarts[fileIndex];
                float fileFrameCount = imageCounts[fileIndex];
                float fileCycles = imageCycles[fileIndex];
                
                // animate through frames based on speed
                float hasSpeed = step(EPS, speed);
                
                // determine random starting frame offset within range (0 - fileFrameCount-1)
                // only start at 0 if fromStart is true and speed > 0 (for GIF playback)
                float shouldStartAtZero = fromStart ? hasSpeed : 0.;
                float randomStartOffset = mix(min(floor(deriveRandom(17.) * fileFrameCount), fileFrameCount - 1.), 0., shouldStartAtZero);
                
                float frameOffset = mix(0., floor(age * speed + spriteRand2), hasSpeed);
                
                // add random start offset to animation
                float totalFrameOffset = frameOffset + randomStartOffset;
                
                // apply loop count for this file
                float maxFrames = fileCycles * fileFrameCount;
                float infiniteLoop = intMod(totalFrameOffset, fileFrameCount); // wrap around within file frames
                float finiteLoop = min(totalFrameOffset, maxFrames - 1.); // clamp to last frame of all cycles
                float isInfinite = step(fileCycles, EPS);
                float localFrameIndex = mix(intMod(finiteLoop, fileFrameCount), infiniteLoop, isInfinite);
                localFrameIndex = clamp(localFrameIndex, 0., fileFrameCount - 1.); // never leave this file's range
                float spriteIndex = fileStart + localFrameIndex; // sprite index in sprite sheet
                float row = intDiv(spriteIndex, spriteCols);
                float col = spriteIndex - row * spriteCols;
                
                vec2 cellOffset = vec2(col * spriteCellSize.x, (spriteRows - 1. - row) * spriteCellSize.y);
                vec2 localUv = quadCoord + .5;
                
                // flip horizontally when moving left
                float flipDecision = velocity.x;
                if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = glideDirection; // use glide direction if only gliding
                } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
                }
                if(flip && flipDecision < -EPS){
                    localUv.x = 1. - localUv.x;
                }
                
                // inset UVs to prevent sampling neighboring frames
                vec2 insetLocalUv = mix(vec2(inset), vec2(1. - inset), localUv);
                
                vUv = cellOffset + insetLocalUv * spriteCellSize;
                
            // flipbook, cycle through all frames
            } else {
                // animate through frames based on speed
                float hasSpeed = step(EPS, speed);
                
                // pick starting frame: only start at 0 if fromStart is true and speed > 0 (for GIF playback)
                float shouldStartAtZero = fromStart ? hasSpeed : 0.;
                float startIndex = mix(min(floor(spriteRand1 * imageCount), imageCount - 1.), 0., shouldStartAtZero); // random frame (clamped) or 0
                
                float frameOffset = mix(0., floor(age * speed + spriteRand2), hasSpeed);
                float fileCycles = imageCycles[0];
                float maxFrames = fileCycles * imageCount;
                float infiniteLoop = intMod(startIndex + frameOffset, imageCount);
                float finiteLoop = min(startIndex + frameOffset, maxFrames - 1.);
                float isInfinite = step(fileCycles, EPS);
                float spriteIndex = mix(intMod(finiteLoop, imageCount), infiniteLoop, isInfinite);
                spriteIndex = clamp(spriteIndex, 0., imageCount - 1.); // stay on the sheet
                float row = intDiv(spriteIndex, spriteCols);
                float col = spriteIndex - row * spriteCols;
                
                vec2 cellOffset = vec2(col * spriteCellSize.x, (spriteRows - 1. - row) * spriteCellSize.y);
                vec2 localUv = quadCoord + .5;
                
                // flip horizontally when moving left
                float flipDecision = velocity.x;
                if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = glideDirection; // use glide direction if only gliding
                } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                    flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
                }
                if(flip && flipDecision < -EPS){
                    localUv.x = 1. - localUv.x;
                }
                
                // inset UVs to prevent sampling from neighboring frames
                vec2 insetLocalUv = mix(vec2(inset), vec2(1. - inset), localUv);
                
                vUv = cellOffset + insetLocalUv * spriteCellSize;
            }

        }else{ // if only one image in sprite sheet
        
            // convert quad coordinates (-.5 to .5) to texture coordinates (0 to 1)
            vUv = quadCoord + .5;
            
            // flip horizontally when moving left
            float flipDecision = velocity.x;
            if(glide > EPS && turbulenceStrength < EPS && outwards < EPS){
                flipDecision = glideDirection; // use glide direction if only gliding
            } else if(abs(velocity.x) < EPS && turbulenceStrength < EPS && outwards < EPS){
                flipDecision = deriveRandom(18.) - 0.5; // no motion, randomly flip for variation
            }
            if(flip && flipDecision < -EPS){
                vUv.x = 1. - vUv.x;
            }
        }
}`,$p=`// Max van Leeuwen

// particles fragment stage



// attributes
uniform sampler2D tex;
uniform float currentTime; // clock
uniform float life; // maximum lifetime
uniform float translucent; // transparency, 0 to 1
varying float dontRender; // > .5 = true
varying float alpha; // 0 to 1 multiplier
varying float lightness; // get fluctuating lightness amount 0 to 1, -1 = unused
varying vec2 vUv; // texture coordinates from vertex shader

uniform bool isActive;

// epsilon
const float EPS = 0.0001;
const float EPS1 = 0.9999;



void main(){

    // don't render tiny or no-scale particles
    if(dontRender > .5){
        discard;
    }

    // texture (premultiplied)
    vec4 texColor = texture2D(tex, vUv);
    if(texColor.a < EPS){
        discard;
    }

    // apply fluctuating lightness to texture (lightness == -1 when unused)
    if(lightness > EPS){
        // brightness
        float lightness2 = lightness * lightness; // cheaper than pow(6.)
        float brightFlash = lightness2 * lightness2 * lightness2; // 0 to 1 bright flash with bias to low end

        // unpremult
        vec3 unpremulted = texColor.rgb / texColor.a;

        // apply brightness
        unpremulted *= 1. + brightFlash * 1.39; // brightness
        unpremulted += brightFlash * .06; // offset

        // premult and clamp
        texColor.rgb = clamp(unpremulted, 0., 1.) * texColor.a;
    }

    // transparency
    texColor *= alpha * translucent;
    
    // // debugging active mesh visualizer (alternatingMeshes==true)
    // if(!isActive){ // make red
    //     texColor.g = 0.;
    //     texColor.b = 0.;
    // }

    // set color
    gl_FragColor = texColor;
}`,em=`// turbulence vertex



varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
`,tm=`// turbulence fragment



uniform vec2 resolution;
uniform float turbulenceScale;
uniform float aspectRatio;
uniform float seed;
varying vec2 vUv;

// 2D Simplex Noise (within [-1, 1]) by Ken Perlin, implemented by Ian McEwan, Ashima Arts
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    // aspect ratio
    vec2 correctedUv = vUv;
    correctedUv.x *= aspectRatio;
    vec2 coord = correctedUv * turbulenceScale + seed;
    
    // 1st (-0.875, 0.875)
    float turb1X = snoise(coord * 1.) * 0.5 + 
                   snoise(coord * 2. + vec2(100.)) * .25 + 
                   snoise(coord * 4. + vec2(200.)) * .125;
    float turb1Y = snoise(coord * 1. + vec2(50.)) * .5 + 
                   snoise(coord * 2. + vec2(150.)) * .25 + 
                   snoise(coord * 4. + vec2(250.)) * .125;
    
    // 2nd
    float turb2X = snoise(coord * 1. + vec2(300.)) * 0.5 + 
                   snoise(coord * 2. + vec2(400.)) * .25 + 
                   snoise(coord * 4. + vec2(500.)) * .125;
    float turb2Y = snoise(coord * 1. + vec2(350.)) * .5 + 
                   snoise(coord * 2. + vec2(450.)) * .25 + 
                   snoise(coord * 4. + vec2(550.)) * .125;
    
    // multiplied (-.765625, 765625)
    float noiseX = turb1X * turb2X;
    float noiseY = turb1Y * turb2Y;

    // large-scale noise for low-freq motion variation
    float largeNoiseX = snoise(coord * 0.25 + vec2(600.));
    float largeNoiseY = snoise(coord * 0.25 + vec2(650.));
    
    // combine with large noise (-1, 1)
    noiseX += largeNoiseX * 0.234375;
    noiseY += largeNoiseY * 0.234375;
    
    // 0-1 rg for texture storage
    gl_FragColor = vec4(noiseX * .5 + .5, noiseY * .5 + .5, 0., 0.);
}
`,nm=60,Or=1/20,Fl=1800,ke={onStill:[!1,!0],onMove:[!1,!0],amount:[.05,2e3],amountWhenLowest:1e4,getDensityLowBoundForAmount:function(n){return n<.2?1:.15},densityOnStill:.5,life:[.1,5],radius:[0,.42],grow:[!1,!0],shrink:[!1,!0],fade:[!1,!0],size:[.007,1],randSizeLifeTime:[!1,!0],bouncy:[!1,!0],getBouncySpeedByLife:function(n){return Ft(n,4,8,12,5,!0)},glittery:[!1,!0],getGlitterySpeedByLife:function(n){return Ft(n,4,8,24,14,!0)},getGravity:function(n){const e=[-.3,.3];if(n<.5){const t=n/.5;return hn(e[0],0,t,.5)}else{const t=(n-.5)/.5;return hn(0,e[1],t,.5)}},outwards:[0,1],spinning:[0,20],align:[!1,!0],flip:[!1,!0],glide:[0,.03],getGlideMultBySize:function(n){return Ft(n,ke.size[0],ke.size[1],.5,2.2)},getTranslucency:n=>{const e=[.56,.4];return hn(e[0],e[1],n,1)},imageCount:n=>n.reduce((e,t)=>e+t,0),fromStart:[!1,!0],speed:n=>n*nm,doRandomizeLifetime:(n,e,t,i)=>{if(i.length===1||i.every(c=>c===1)||n==0||!e)return!0;const r=i.reduce((c,d)=>c+d,0)/n,s=$l(ke.life[0],ke.life[1],r,1);return Math.abs(t-s)>.025},cyclesPrepare:n=>n||[0],aspectRatioPrepare:n=>n!==void 0?n:1};async function im(n,e,t,i,a=!0){let r=!0,s=null,o=null,l=!1;const c=new ri,d=performance.now()/1e3,f=()=>performance.now()/1e3-d,p=()=>{if(a)return!0;const ze=t.renderer.domElement.getBoundingClientRect();return ze.bottom>0&&ze.top<window.innerHeight},g=Ie=>{l!==Ie&&(l=Ie,c.call(Ie))},m=n["mouse-state"]=="still"||n["mouse-state"]=="still-move"?ke.onStill[1]:ke.onStill[0],M=n["mouse-state"]=="move"||n["mouse-state"]=="still-move"?ke.onMove[1]:ke.onMove[0],v=n.amount===0?ke.amountWhenLowest:hn(ke.amount[0],ke.amount[1],1-n.amount,1),u=hn(ke.life[0],ke.life[1],n.life,1),x=n.radius===1?1:hn(ke.radius[0],ke.radius[1],n.radius,.5),y=n.grow?ke.grow[1]:ke.grow[0],A=n.shrink?ke.shrink[1]:ke.shrink[0],R=n.fade?ke.fade[1]:ke.fade[0],P=hn(ke.size[0],ke.size[1],n.size,1),E=n["randomize-size-lifetime"]?ke.randSizeLifeTime[1]:ke.randSizeLifeTime[0],L=n.bouncy?ke.bouncy[1]:ke.bouncy[0],w=n.glittery?ke.glittery[1]:ke.glittery[0],T=ke.getGravity(n.gravity),U=hn(ke.outwards[0],ke.outwards[1],n.outwards),z=hn(ke.spinning[0],ke.spinning[1],n.spinning),k=n.align?ke.align[1]:ke.align[0],W=n.flip?ke.flip[1]:ke.flip[0],Q=n.turbulence??0,X=n.glide?ke.glide[1]:ke.glide[0],Z=n.translucent?ke.getTranslucency(n.amount):1,V=ke.imageCount(n["image-count"]),ce=n["image-play-from-start"]?ke.fromStart[1]:ke.fromStart[0],me=ke.speed(n["image-speed"]),Ee=ke.cyclesPrepare(n["image-cycles"]),Ae=ke.aspectRatioPrepare(n["image-aspect-ratio"]),Pe=n["image-count"],Fe=[];let Ce=0;for(let Ie=0;Ie<Pe.length;Ie++){const ze=Pe[Ie];Fe.push({start:Ce,end:Ce+ze-1,count:ze,cycles:Ee[Ie]||0}),Ce+=ze}const ee=Math.ceil(Math.sqrt(V)),ne=Math.ceil(V/ee),ue={x:1/ee,y:1/ne},de=v/1e3,_e=Math.ceil(u/de),Oe=1,ye=.04*(P/150),N=X*ke.getGlideMultBySize(P),Ye=L?ke.getBouncySpeedByLife(u):-1,Be=w?ke.getGlitterySpeedByLife(u):-1,Le=ke.doRandomizeLifetime(me,ce,n.life,Pe),Me=t.renderer,Re=t.camera,Te=t.scene;let We=null;n.turbulence>0&&(We=await rm(Me));const lt=2,et=[],F=[],b=[],J=[],fe=[],he=new Yf,ae=new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0]),De=new Float32Array([-.5,-.5,.5,-.5,-.5,.5,.5,.5]),Se=new Uint32Array([0,1,2,1,3,2]);he.setAttribute("position",new Bt(ae,3)),he.setAttribute("quadCoord",new Bt(De,2)),he.setIndex(new Bt(Se,1));const C=new Uint8Array(_e*4);for(let Ie=0;Ie<_e*4;Ie++)C[Ie]=Math.floor(Math.random()*256);const te=await new Promise((Ie,ze)=>{const rt=new Image;rt.onload=()=>{const je=new Dt(rt);je.needsUpdate=!0,je.premultiplyAlpha=!0,Ie(je)},rt.onerror=je=>ze(je),rt.src=e}),K={value:0},se={value:0};for(let Ie=0;Ie<lt;Ie++){const ze=he.clone(),rt=new Float32Array(_e*3),je=new Float32Array(_e);je.fill(-1),ze.setAttribute("instancePosition",new xs(rt,3)),ze.setAttribute("startTime",new xs(je,1)),ze.setAttribute("randValues",new xs(C,4,!0)),ze.instanceCount=_e,et.push(ze),F.push(rt),b.push(je);const qe=new un({premultipliedAlpha:!0,uniforms:{currentTime:K,deltaTime:se,life:{value:u},grow:{value:y},shrink:{value:A},fade:{value:R},size:{value:P},randomizeSizeLifeTime:{value:E},bouncySpeed:{value:Ye},glitterySpeed:{value:Be},gravity:{value:T},outwards:{value:U},spinning:{value:z},align:{value:k},flip:{value:W},turbulenceTex:{value:We},turbulenceStrength:{value:Q},glide:{value:N},tex:{value:te},translucent:{value:Z},imageCount:{value:V},fromStart:{value:ce},speed:{value:me},randomizeLifeTime:{value:Le},aspectRatio:{value:Ae},spriteCols:{value:ee},spriteRows:{value:ne},spriteCellSize:{value:new Ke(ue.x,ue.y)},isActive:{value:Ie===0},fileCount:{value:Fe.length},imageStarts:{value:Fe.map(tt=>tt.start)},imageCounts:{value:Fe.map(tt=>tt.count)},imageCycles:{value:Fe.map(tt=>tt.cycles)},isFlipbook:{value:Fe.every(tt=>tt.count===1)}},transparent:!0,depthWrite:!1,depthTest:!1,blending:Hn,forceSinglePass:!0,vertexShader:Jp,fragmentShader:$p}),at=new on(et[Ie],qe);at.renderOrder=Ie===0?2:1,Te.add(at),J.push(qe),fe.push(at)}const B=Math.max(9973,_e),q=new Float32Array(B);for(let Ie=0;Ie<B;Ie++)q[Ie]=Math.random();let _=0,ie=0,O=!1,h=_e,H=-1;function Y(){if(O){const Ie=et[ie],ze=Ie.attributes.instancePosition,rt=Ie.attributes.startTime,je=h,qe=H+1;ze.updateRange={offset:je*3,count:(qe-je)*3},rt.updateRange={offset:je,count:qe-je},ze.needsUpdate=!0,rt.needsUpdate=!0,o=new Date().getTime(),g(!0),O=!1,h=_e,H=-1}}function S(Ie,ze,rt){const je=F[ie],qe=b[ie],at=_*3;if(je[at]=Ie,je[at+1]=ze,je[at+2]=0,qe[_]=rt,O=!0,_<h&&(h=_),_>H&&(H=_),_++,_>=_e){_=0;{Y();const tt=1-ie;fe[ie].renderOrder=1,fe[tt].renderOrder=2,J[ie].uniforms.isActive.value=!1,J[tt].uniforms.isActive.value=!0,ie=tt}}}let I=f(),G=0;function pe(Ie,ze){Ie&&(I=ze-Xe);const je=Math.min(ze-I,Or)/de;if(I=ze,G+=je,G>=1){const qe=Math.floor(G);return G-=qe,qe}return 0}function ge(Ie,ze){O=!1,ze&&(i.breakInterpolation=!0);let rt=i.getInterpolatedPositions();if(rt===null&&x===1&&(rt={getPosition:()=>({x:0,y:0}),velocity:0,distance:0,trackingDeltaTime:null,finalize:()=>{}}),rt===null)return;let je=1;if(ze)je=ke.densityOnStill;else{const Ct=ke.getDensityLowBoundForAmount(v);if(Ct==1)je=1;else{const D=rt.velocity/Oe;je=Ft(D,0,1,Ct,1,!0)}}const qe=f(),at=pe(Ie&&!ze,qe),tt=Math.floor(qe*1e3),zt=.25;let Lt=Re.left,ti=Re.right,zr=Re.bottom,kr=Re.top;if(x===1){const Ct=Math.min(P*.5*Ae*zt,Math.max(0,(Re.right-Re.left)/2)),D=Math.min(P*.5*zt,Math.max(0,(Re.top-Re.bottom)/2));Lt+=Ct,ti-=Ct,zr+=D,kr-=D}for(let Ct=0;Ct<at;Ct++){let D=0;if(je!=1){if(Math.random()>je)continue;const $=q[(_+Ct+1e3)%q.length];D=Ft($,0,1,-.35,1)*ye}const j=E?q[(_+Ct+1500)%q.length]:Ct/at;let re=rt.getPosition(j);if(!re)continue;if(re.y+=D,x===1)re.x=Ft(q[(_+Ct+tt+2e3)%q.length],0,1,Lt,ti),re.y=Ft(q[(_+Ct+tt+2500)%q.length],0,1,zr,kr);else if(x>0){const xe=q[(_+Ct+tt+2e3)%q.length]*Math.PI*2,be=Math.sqrt(q[(_+Ct+tt+2500)%q.length]),Ne=x*be,Ue=Math.cos(xe)*Ne,Ge=Math.sin(xe)*Ne;re.x+=Ue,re.y+=Ge}const le=Ct*1e-5;S(re.x,re.y,qe+le)}Y(),rt.finalize()}function ve(){for(let Ie=0;Ie<lt;Ie++)b[Ie].fill(-1),et[Ie].attributes.startTime.needsUpdate=!0;_=0,ie=0,fe[0].renderOrder=2,J[0].uniforms.isActive.value=!0,fe[1]&&(fe[1].renderOrder=1,J[1].uniforms.isActive.value=!1),s()}if(s=()=>{I=f(),G=0,i.resetPathTracking()},m){let ze=0;i.onStop.add((rt,je)=>{if(!r||i.isHoveringSettings&&x!==1||!p())return;const qe=f();let at=rt||je;at&&!je&&(at=qe-ze>.2),ze=qe,je&&(I=qe),ge(at,!0)})}if(M){let ze=0;i.onMove.add((rt,je)=>{if(!r||i.isHoveringSettings&&x!==1||!p())return;const qe=f();let at=rt||je;at&&!je&&(at=qe-ze>.2),ze=qe,je&&(I=qe),ge(at,!1)})}let Xe=Or,gt=f();function dt(){const Ie=f();Xe=Ie-gt,Xe>Or&&(Xe=Or),gt=Ie,K.value=Ie,se.value=Xe,l&&o!=null&&new Date().getTime()-o>u*1e3&&g(!1),!t.isPaused&&!t.isPerformancePaused&&Me.render(Te,Re)}return{animate:dt,resetParticles:ve,getSpawning:()=>r,setSpawning:Ie=>{const ze=r;r=Ie,Ie&&!ze&&s&&s()},onParticleActivityChange:c}}function rm(n){return new Promise(t=>{const i=Fl,a=Fl,r=new Dn(i,a,{minFilter:Rn,magFilter:en,format:ga,type:cn,wrapS:Li,wrapT:Li,generateMipmaps:!0}),s=new tl,o=new Ms(-1,1,1,-1,0,1),l=new Ki(2,2),c=new un({uniforms:{resolution:{value:new Ke(i,a)},turbulenceScale:{value:10},aspectRatio:{value:i/a},seed:{value:Math.random()*1e3}},vertexShader:em,fragmentShader:tm}),d=new on(l,c);s.add(d);const f=n.getRenderTarget();n.setRenderTarget(r),n.render(s,o),n.setRenderTarget(f),l.dispose(),c.dispose(),s.remove(d),t(r.texture)})}let ji=null,Nl=!1;function am(){if(Nl)return;Nl=!0;function n(e,t){ji={x:e,y:t}}window.addEventListener("mousemove",e=>{n(e.clientX,e.clientY)}),window.addEventListener("mouseout",e=>{ji=null}),window.addEventListener("touchstart",e=>{if(e.touches.length>0){const t=e.touches[0];n(t.clientX,t.clientY)}}),window.addEventListener("touchmove",e=>{if(e.touches.length>0){const t=e.touches[0];n(t.clientX,t.clientY)}})}async function sm(n){am();const e={lastCursorPosition:void 0,lastWorldPosition:void 0,lastScreenSize:void 0,isMoving:!1,isHoveringSettings:!1,breakInterpolation:!1,onMove:new ri,onStop:new ri,getCursorPosition:c,getScreenSize:d,updateCursorTracking:f,clearCallbacks:p,updateScreenDimensions:g,enableCursorTracking:m,getCursorTrackingEnabled:M,emulateCursorPosition:v,getVelocities:u,getInterpolatedPositions:x,resetPathTracking:y};let t=!0,i,a=null,r=null,s=!1,o=0;const l=3;function c(R){let P;if(R)P={x:R.x,y:R.y};else{if(!ji)return null;P={x:ji.x,y:ji.y}}if(n&&n.tagName==="CANVAS"){const T=n.getBoundingClientRect();P={x:P.x-T.left,y:P.y-T.top}}const E=e.lastScreenSize.x,L=e.lastScreenSize.y,w={x:P.x/E*2-1,y:1-2*(P.y/L)};return e.lastCursorPosition=w,w}function d(){if(n&&n.tagName==="CANVAS"){const P=n.getBoundingClientRect();return{x:P.width,y:P.height}}return{x:window.innerWidth,y:window.innerHeight}}function f(R){const P=e.lastCursorPosition?{x:e.lastCursorPosition.x,y:e.lastCursorPosition.y}:null;let E;if(t?E=e.getCursorPosition():i!==void 0&&(E=e.getCursorPosition(i),i=void 0),E){R.requestedFrameId!=null?e.lastWorldPosition=om(E,R.aspect,R.cameraScale):e.lastWorldPosition=void 0;const L=A(P);L?o=0:o++;const w=o>=l;!e.isMoving&&L?(e.isMoving=!0,o=0,e.onMove.call(!0)):e.isMoving&&w?(e.isMoving=!1,e.onStop.call(!0)):e.isMoving&&L?e.onMove.call(!1):!e.isMoving&&!L&&e.onStop.call(!1)}else{o++;const L=o>=l;e.isMoving&&L?(e.isMoving=!1,e.onStop.call(!0)):e.isMoving||e.onStop.call(!1)}e.breakInterpolation=!1}function p(){e.onMove.clear(),e.onStop.clear()}function g(){e.lastScreenSize=e.getScreenSize()}function m(R){const P=!t;t=R,R&&P&&(i=void 0,y(),e.breakInterpolation=!0,o=0)}function M(){return t}function v(R){i=R}function u(){const R=performance.now(),P=r?(R-r)/1e3:0;if(!a||!e.lastWorldPosition)return{velocity:0,distance:0,trackingDeltaTime:null};const E=e.lastWorldPosition;if(E.x===a.x&&E.y===a.y)return{velocity:0,distance:0,trackingDeltaTime:null};const L=Math.hypot(E.x-a.x,E.y-a.y);return{velocity:P?L/P:0,distance:L,trackingDeltaTime:P}}function x(){if(e.breakInterpolation&&(s=!0),s&&(a=null,r=null,s=!1),!e.lastWorldPosition)return null;const R={x:e.lastWorldPosition.x,y:e.lastWorldPosition.y},P=a&&!e.breakInterpolation;return{getPosition:E=>{let L;return P?L={x:a.x+(R.x-a.x)*E,y:a.y+(R.y-a.y)*E}:L={x:R.x,y:R.y},L},...e.getVelocities(),finalize:()=>{e.lastWorldPosition&&(a={x:R.x,y:R.y},r=performance.now())}}}function y(){a=null,r=null,s=!1}e.updateScreenDimensions(),window.addEventListener("resize",()=>{e.updateScreenDimensions()});function A(R){const P=e.lastCursorPosition;return!P||!R?!1:P.x!=R.x||P.y!=R.y}return e}function om(n,e,t){const i=new oe;return e>=1?(i.x=n.x*e/2*t,i.y=n.y*.5*t):(i.x=n.x*.5*t,i.y=n.y*1/(2*e)*t),i}function lm(n,e,t,i){let a,r;e>=1?(a=n.x/(e/2*i),r=n.y/(.5*i)):(a=n.x/(.5*i),r=n.y/(1/(2*e)*i));const s=(a+1)/2*t.x,o=(1-r)/2*t.y;return{x:s,y:o}}async function cm(n,e,t=!1,i=1,a=!0){const r={cursorAPI:null,rendererAPI:null,currentSettings:null,currentImageData:null,displayAPI:{aspect:null,isCustomCanvas:!1},isLoadingScene:!1,renderOutOfView:a};if(typeof e=="string")if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")&&!e.startsWith("//")||e.startsWith("./")||e.startsWith("../"))try{const d=await(await fetch(e)).text();r.currentSettings=Di.parseSparkleFile(d)}catch(c){throw c}else try{r.currentSettings=Di.parseSparkleFile(e)}catch(c){throw c}else if(typeof e=="object")r.currentSettings=e;else throw new Error("sparkleData must be a string (URL/path or raw content) or settings object");if(r.currentSettings=ec(r.currentSettings,{}),r.currentImageData=r.currentSettings["image-data"],!r.currentImageData)throw new Error("No image data found in sparkle settings");r.currentImageData.includes("*")&&(r.currentImageData=r.currentImageData.split("*").pop());const o=(()=>{if(n&&n.tagName==="CANVAS"){const l=n.getBoundingClientRect();return{width:l.width,height:l.height}}return{width:window.innerWidth,height:window.innerHeight}})();r.displayAPI.aspect=o.width/o.height,r.displayAPI.isCustomCanvas=t;try{r.cursorAPI=await sm(n),r.rendererAPI=await jp(n,r.cursorAPI,i)}catch(l){throw l}return r.rendererAPI.onResize.add(l=>{const c=l.width/l.height;r.displayAPI.aspect=c}),r}async function fm(n,e,t=!1,i=1,a=!0){const r=await cm(n,e,t,i,a);return await um(r),r}async function um(n){if(!n.isLoadingScene){n.isLoadingScene=!0;try{n.rendererAPI.requestedFrameId!=null&&await Ol(n);try{const e=n.rendererAPI.renderer.domElement,t=e&&e.tagName==="CANVAS"&&(e.id||e.className)||"canvas",i=()=>{n.rendererAPI.isPerformancePaused||(n.rendererAPI.isPerformancePaused=!0,n.rendererAPI.renderer.clear(!0,!0,!0),n.rendererAPI.isPaused||n.rendererAPI.onPause.call(!0))},a=()=>{n.rendererAPI.isPerformancePaused&&(n.rendererAPI.isPerformancePaused=!1,n.rendererAPI.isPaused||n.rendererAPI.onPause.call(!1))},{animate:r,resetParticles:s,getSpawning:o,setSpawning:l,onParticleActivityChange:c}=await im(n.currentSettings,n.currentImageData,n.rendererAPI,n.cursorAPI,n.renderOutOfView);c.add(f=>{f?a():i()}),n.rendererAPI.resetParticles=s,n.getSpawning=o,n.setSpawning=l;let d=()=>{n.rendererAPI.requestedFrameId=requestAnimationFrame(d),n.cursorAPI.updateCursorTracking(n.rendererAPI),!(n.rendererAPI.isPaused||n.rendererAPI.isPerformancePaused)&&r()};d()}catch(e){throw e}}finally{n.isLoadingScene=!1}}}async function dm(n){await Ol(n)}async function Ol(n){if(n.rendererAPI&&n.rendererAPI.requestedFrameId!=null&&(cancelAnimationFrame(n.rendererAPI.requestedFrameId),n.rendererAPI.requestedFrameId=null),n.cursorAPI&&n.cursorAPI.clearCallbacks(),n.rendererAPI){const e=n.rendererAPI.renderer,t=n.rendererAPI.camera,i=n.rendererAPI.scene;i.children.filter(r=>r!==t).forEach(r=>{i.remove(r),r.geometry&&r.geometry.dispose(),r.material&&(Array.isArray(r.material)?r.material.forEach(s=>s.dispose()):r.material.dispose())}),e.render(i,t)}}function hm(n){n.rendererAPI&&n.rendererAPI.pause()}function pm(n){n.rendererAPI&&n.rendererAPI.resume()}function Bl(n,e){n.cursorAPI&&n.cursorAPI.enableCursorTracking(e)}function zl(n){return n.cursorAPI?n.cursorAPI.getCursorTrackingEnabled():!1}function mm(n,e,t){n.cursorAPI&&(e===void 0?(n.cursorAPI.breakInterpolation=!0,n.cursorAPI.lastWorldPosition=void 0):n.cursorAPI.emulateCursorPosition({x:e,y:t}))}function gm(n,e,t){if(n.cursorAPI&&n.rendererAPI)if(e===void 0)n.cursorAPI.breakInterpolation=!0,n.cursorAPI.lastWorldPosition=void 0;else{const i=n.rendererAPI.aspect,a=n.rendererAPI.cameraScale,r=n.cursorAPI.getScreenSize(),s=lm({x:e,y:t},i,r,a),l=n.rendererAPI.renderer.domElement.getBoundingClientRect(),c={x:s.x+l.left,y:s.y+l.top};n.cursorAPI.emulateCursorPosition(c)}}function vm(n){if(n.rendererAPI&&n.rendererAPI.camera){const e=n.rendererAPI.camera;return{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.right-e.left,height:e.top-e.bottom}}return null}const Br=JSON.parse(`{
  "about": "Sparkle Mouse Template! 🐁✨",
  "amount": 0.7,
  "radius": 0.06,
  "life": 0.6,
  "size": 0.15,
  "randomize-size-lifetime": true,
  "mouse-state": "move",
  "translucent": false,
  "spinning": 0,
  "align":false,
  "turbulence": 0,
  "gravity": 0.53,
  "glide": true,
  "outwards": 0.03,
  "grow": true,
  "shrink": true,
  "fade": false,
  "bouncy": true,
  "glittery": true,
  "flip":false,
  "image-speed": 0,
  "image-play-from-start": false,
  "image-count": [1],
  "image-aspect-ratio": 1,
  "image-cycles": [0],
  "image-data": "image:sparkles*data:image/png;base64,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"
}`),_m=Br["image-data"],xm=[Kt,Fr,Ps,Nr];class Di{constructor(e,t=1){this.isCustomCanvas=!!e,this.globalScale=t,this.renderOutOfView=!0,e||(e=document.createElement("canvas"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100%",e.style.height="100%",e.style.pointerEvents="none",e.style.zIndex="99999",document.body.appendChild(e)),this.canvas=e,this.isStarted=!1,this.isPaused=!1,this.context=null}getCanvas(){return this.canvas}async start(e){this.isStarted&&await this.stop(),e||(e={...Br}),this.context=await fm(this.canvas,e,this.isCustomCanvas,this.globalScale,this.renderOutOfView),this.isStarted=!0,this.isPaused=!1}setCursorTracking(e){zl(this.context)!==e&&Bl(this.context,e)}getCursorTracking(){return zl(this.context)}drawAtScreenPosition(e,t){mm(this.context,e,t)}drawAtCanvasPosition(e,t){gm(this.context,e,t)}getCanvasRect(){return vm(this.context)}pause(){hm(this.context),this.isPaused=!0}resume(){pm(this.context),this.isPaused=!1}async stop(){await dm(this.context),this.isStarted=!1,this.isPaused=!1}setScale(e){this.globalScale=e,this.context&&this.context.rendererAPI&&this.context.rendererAPI.updateCamera&&(this.context.rendererAPI.globalScale=e,this.context.rendererAPI.updateCamera())}setOutOfViewRendering(e){this.renderOutOfView=e,this.context&&(this.context.renderOutOfView=e)}setDemoShapesDrawing(e,t,i=1){this.context&&this.context.cursorAPI&&this.context.cursorAPI.isDemoShapesDrawing===e||(e&&Bl(this.context,!1),t||(t=xm),Ac(this.context.cursorAPI,this.context.rendererAPI,e,t,i))}static async createSparkleSettings(e,t,i=!1){const a={...Br};a["image-data"]&&a["image-data"].includes("*")&&(a["image-data"]=a["image-data"].split("*").pop());const r=["about","image-data"],s=["image-count","image-aspect-ratio","image-cycles","image-speed","image-play-from-start"],l=Object.keys(a).filter(f=>!r.includes(f)&&!s.includes(f)).filter(f=>!(f in t));if(l.length>0)throw new Error(`Missing required settings: ${l.join(", ")}`);const c=await _c(e),d={about:jl,version:Jl,...t};if(d["image-data"]=c.base64,"image-speed"in t||(d["image-speed"]=c.animationSpeed?c.animationSpeed/60:0),"image-count"in t||(d["image-count"]=c.imageCounts),"image-aspect-ratio"in t||(d["image-aspect-ratio"]=c.aspectRatio),"image-cycles"in t||(d["image-cycles"]=c.cycleCounts),"image-play-from-start"in t||(d["image-play-from-start"]=!1),i){const f=JSON.stringify(d,null,2),p=new Blob([f],{type:"application/json"}),g=URL.createObjectURL(p),m=document.createElement("a");m.href=g,m.download="template.sparkle",document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(g)}return d}static parseSparkleFile(e){const t=JSON.parse(e);return t["image-data"]==="image:sparkles"&&(t["image-data"]=_m),t}}Ql(Di,"defaultSparkle",Br);let Et=null;async function kl(n,e){return Et&&await Et.stop(),Et=new Di(e),await Et.start(n),Et}async function Hl(){Et&&(await Et.stop(),Et=null)}function Gl(){Et&&Et.pause()}function Vl(){Et&&Et.resume()}function Wl(n){Et&&Et.setCursorTracking(n)}function Xl(){return Et?Et.getCursorTracking():!1}function Yl(n,e){Et&&Et.drawAtPosition(n,e)}function ql(n,e){Et&&Et.drawAtCanvasPosition(n,e)}function Zl(){return Et}const Kl={start:kl,stop:Hl,pause:Gl,resume:Vl,setCursorTracking:Wl,getCursorTracking:Xl,drawAtPosition:Yl,drawAtCanvasPosition:ql,getInstance:Zl,shapeHeart:Kt,shapeSquiggly:Fr,shapeStar:Ps,shapeSwirl:Nr,SparkleMouse:Di};typeof window<"u"&&(window.SparkleMouse=Kl),xt.SparkleMouse=Di,xt.default=Kl,xt.drawAtCanvasPosition=ql,xt.drawAtPosition=Yl,xt.getCursorTracking=Xl,xt.getInstance=Zl,xt.pause=Gl,xt.resume=Vl,xt.setCursorTracking=Wl,xt.shapeHeart=Kt,xt.shapeSquiggly=Fr,xt.shapeStar=Ps,xt.shapeSwirl=Nr,xt.start=kl,xt.stop=Hl,Object.defineProperties(xt,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})})(this.SparkleMouse=this.SparkleMouse||{});
