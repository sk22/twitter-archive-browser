(this["webpackJsonptwitter-archive-browser"]=this["webpackJsonptwitter-archive-browser"]||[]).push([[0],{20:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2),jszip__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(21),jszip__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_4__),react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__),styled_components__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(3),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__),_templateObject,_templateObject2,ErrorOutput=styled_components__WEBPACK_IMPORTED_MODULE_6__.c.div(_templateObject||(_templateObject=Object(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.a)(["\n  color: red;\n"]))),FileInput=styled_components__WEBPACK_IMPORTED_MODULE_6__.c.input(_templateObject2||(_templateObject2=Object(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_3__.a)(["\n  width: 100%;\n"]))),TweetsLoader=function TweetsLoader(_ref){var setTweets=_ref.setTweets,_useState=Object(react__WEBPACK_IMPORTED_MODULE_5__.useState)(null),_useState2=Object(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a)(_useState,2),error=_useState2[0],setError=_useState2[1],inputRef=Object(react__WEBPACK_IMPORTED_MODULE_5__.createRef)(),handleTweets=function(e){var t=e.tweet,n=Object.keys(t).flatMap((function(e){return t[e]})).filter((function(e){return Boolean(e.tweet)})).map((function(e){return e.tweet}));setTweets(n)},handleTweetJs=function handleTweetJs(jsText){window.YTD={tweet:{}},eval(jsText),handleTweets(window.YTD)},handleFileChange=function(){var e=Object(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a)(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark((function e(){var t,n,r,c,a;return _home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(setError(null),!inputRef.current){e.next=26;break}if(!(t=inputRef.current.files[0])||!t.name.endsWith(".js")){e.next=10;break}(n=new FileReader).readAsText(t,"utf-8"),n.addEventListener("load",(function(e){handleTweetJs(e.target.result)})),n.addEventListener("error",(function(e){setError(["file",e.toString()])})),e.next=26;break;case 10:if(!t||!t.name.endsWith(".zip")){e.next=26;break}return e.prev=11,e.next=14,jszip__WEBPACK_IMPORTED_MODULE_4___default.a.loadAsync(t);case 14:return r=e.sent,c=r.file(/data\/tweet.js/),e.next=18,c[0].async("string");case 18:a=e.sent,handleTweetJs(a),e.next=26;break;case 22:e.prev=22,e.t0=e.catch(11),setError(["zip",e.t0.toString()]),console.error(e.t0);case 26:case"end":return e.stop()}}),e,null,[[11,22]])})));return function(){return e.apply(this,arguments)}}(),errorMessages={zip:function(){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("p",{children:["Could not read the ZIP archive or its contained ",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("code",{children:"tweet.js"})," ","file. The ZIP file might be too big \u2013 maybe try manually extracting the tweet.js file from the archive ZIP's ",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("code",{children:"data"})," subdirectory and using it directly."]})},file:function(){return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p",{children:"An error occured while trying to read the file."})}};return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(FileInput,{type:"file",ref:inputRef,onChange:handleFileChange}),error&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(ErrorOutput,{children:[errorMessages[error[0]](),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("pre",{children:error[1]})]})]})};__webpack_exports__.a=TweetsLoader},38:function(e,t,n){"use strict";n.r(t);var r,c,a,s,i,o=n(1),_=n.n(o),u=n(16),l=n.n(u),d=n(7),b=n(8),j=n(4),O=n(2),h=n(3),p=Object(h.b)(r||(r=Object(O.a)(["\n  width: 100%;\n  padding: 1.5rem;\n  background: white;\n  border-radius: 0.5rem;\n  border: var(--border);\n  margin: 10px 0;\n"]))),m=h.c.section(c||(c=Object(O.a)(["\n  ","\n"])),p),f=h.c.hr(a||(a=Object(O.a)(["\n  border: var(--border);\n  border-top: none;\n  width: calc(100% + 2 * 1.5rem);\n  margin: 1rem 0;\n  margin-left: -1.5rem;\n"]))),x=h.c.h2(s||(s=Object(O.a)(["\n  text-transform: uppercase;\n  font-size: 0.9rem;\n  font-weight: bold;\n  margin: 0;\n  margin-bottom: 1rem;\n"]))),w=h.c.section(i||(i=Object(O.a)(["\n  width: 100%;\n  & > .twitter-tweet:not(.twitter-tweet-rendered) {\n    ","\n    margin-left: 0;\n    p {\n      margin-top: 0;\n    }\n  }\n"])),p),g=m,v=n(20);var E=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(t,n){var r=function(e){return new Date(e.created_at).getTime()};return r(e?n:t)-r(e?t:n)}},T=function(e){var t=e instanceof Date?e:new Date(e),n=function(e){return 1===e.toString().length?"0".concat(e):e.toString()},r=t.getDate(),c=t.getMonth()+1,a=t.getFullYear();return"".concat(a,"-").concat(n(c),"-").concat(n(r))},D={random:function(e,t){for(var n,r,c=[],a=0;a<t&&a<e.length;a++){var s=(n=0,r=e.length-1,n=Math.ceil(n),r=Math.floor(r),Math.floor(Math.random()*(r-n+1))+n),i=e.splice(s,1)[0];c.push(i)}return c},oldest:function(e,t){return e.sort(E()).slice(0,t)},newest:function(e,t){return e.sort(E(!0)).slice(0,t)},likes:function(e,t){return e.sort((function(e,t){return Number(t.favorite_count)-Number(e.favorite_count)})).slice(0,t)}},y={newest:{name:"Newest",fn:D.newest},oldest:{name:"Oldest",fn:D.oldest},random:{name:"Random",fn:D.random},likes:{name:"Likes",fn:D.likes}};var M,k,P,C,R,L,A=864e5,I=h.c.div(M||(M=Object(O.a)(["\n  display: flex;\n  align-items: center;\n  margin: 0.8rem 0;\n\n  & > * + * {\n    margin-left: 0.5rem;\n  }\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n"]))),B=n(0),S=Object(h.c)(I)(k||(k=Object(O.a)(["\n  & > input[type='number'] {\n    width: 5rem;\n  }\n\n  & > input[type='range'] {\n    flex: 1;\n    width: 100%;\n  }\n"]))),U=h.c.input(P||(P=Object(O.a)(["\n  width: 100%;\n"]))),W=function(e){var t=e.tweets,n=e.tweetsPerDay,r=e.handleQueryTweets,c=Object(o.useState)(1),a=Object(j.a)(c,2),s=a[0],i=a[1],_=Object(o.useState)(1),u=Object(j.a)(_,2),l=u[0],d=u[1],b=Object(o.useState)("newest"),O=Object(j.a)(b,2),h=O[0],p=O[1],m=Object(o.useState)(!0),x=Object(j.a)(m,2),w=x[0],g=x[1],v=Object(o.useState)(!0),E=Object(j.a)(v,2),D=E[0],M=E[1],k=Object(o.useRef)(),P=Object(o.useRef)(),C=Object(o.useRef)(),R=function(e){i(e),e>0&&d(e),g(e<30),M(e<100)},L=function(e){return R(e.target.valueAsNumber||Number(e.target.value))},W=new Date(t[0].created_at).getTime(),K=new Date(t[t.length-1].created_at).getTime(),F=Object(o.useState)(W),q=Object(j.a)(F,2),N=q[0],z=q[1],J=Object(o.useState)(K),H=Object(j.a)(J,2),Z=H[0],Q=H[1],Y=function(e,t,n){return isNaN(t)&&e(n)};Object(o.useEffect)((function(){return Y(z,N,W)}),[N,W]),Object(o.useEffect)((function(){return Y(Q,Z,K)}),[Z,K]);var G=Object(o.useMemo)((function(){return Object.keys(n).filter((function(e){var t=new Date(e).getTime();return t+A>=N&&t-A<=Z})).map((function(e){return n[e]})).reduce((function(e,t){return e+t}),0)}),[n,N,Z]);Object(o.useEffect)((function(){G<s&&R(G),0===s&&G>0&&R(l)}),[G,s,l]),Object(o.useEffect)((function(){W>k.current.valueAsNumber&&z(W)}),[W]),Object(o.useEffect)((function(){K<P.current.valueAsNumber&&Q(K)}),[K]);return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)("label",{children:["Since"," ",Object(B.jsx)("input",{type:"date",value:T(N||W),ref:k,onChange:function(e){return z(e.target.valueAsNumber)}})]}),Object(B.jsx)(U,{type:"range",min:W,max:K,value:N||W,step:A,onChange:function(e){return z(Number(e.target.value))}}),Object(B.jsxs)("label",{children:["Until"," ",Object(B.jsx)("input",{type:"date",value:T(Z||K),ref:P,onChange:function(e){return Q(e.target.valueAsNumber)}})]}),Object(B.jsx)(U,{type:"range",min:W,max:K,value:Z||K,step:A,onChange:function(e){Q(Number(e.target.value))}}),Object(B.jsx)(f,{}),Object(B.jsxs)(S,{htmlFor:"amount",children:[Object(B.jsx)("label",{htmlFor:"amount",children:"Amount:"}),Object(B.jsx)("input",{type:"number",id:"amount",min:G>0?1:0,max:G,step:"1",value:s,onChange:L}),Object(B.jsx)("p",{children:"out\xa0of"}),Object(B.jsxs)("button",{onClick:function(){return R(G)},children:["all ",G]}),Object(B.jsx)("input",{type:"range",min:G>0?1:0,max:Math.min(G,99),value:s,ref:C,onChange:L})]}),Object(B.jsx)(f,{}),Object(B.jsxs)(I,{children:[Object(B.jsx)("span",{children:"Sort by"}),Object.keys(y).map((function(e,t){return Object(B.jsxs)("label",{htmlFor:"query-".concat(e),children:[Object(B.jsx)("input",{type:"radio",id:"query-".concat(e),name:"query-type",onChange:function(){return p(e)},value:e,checked:h===e}),y[e].name]},"".concat(t,"-").concat(e))}))]}),Object(B.jsx)(f,{}),Object(B.jsxs)(I,{children:[Object(B.jsx)("input",{type:"submit",onClick:function(){var e=t.filter((function(e){var t=k.current.valueAsDate,n=P.current.valueAsDate;if(!t||!n)return!1;var r=new Date(e.created_at),c=new Date(t.getTime());c.setUTCHours(0,0,0,0);var a=new Date(n.getTime()+A);return a.setUTCHours(0,0,0,0),!(c.getTime()>=r.getTime())&&!(a.getTime()<=r.getTime())}));r(y[h].fn(e,s),D),w&&function(){var e=document.createElement("script");e.src="https://platform.twitter.com/widgets.js",document.head.appendChild(e)}()},value:"Query"}),Object(B.jsxs)("label",{htmlFor:"show-tweets",children:[Object(B.jsx)("input",{id:"show-tweets",type:"checkbox",checked:D,onChange:function(e){return M(Boolean(e.target.checked))}})," ","Show tweets"]})," ",Object(B.jsxs)("label",{htmlFor:"embed-tweets",children:[Object(B.jsx)("input",{id:"embed-tweets",type:"checkbox",checked:w,onChange:function(e){return g(Boolean(e.target.checked))}})," ","Embed tweets"]})]})]})},K=h.c.input(C||(C=Object(O.a)(["\n  width: 100%;\n  margin-bottom: 1rem;\n"]))),F=function(e){var t=e.setFilterText,n=Object(o.useState)(""),r=Object(j.a)(n,2),c=r[0],a=r[1];return Object(B.jsx)(K,{type:"text",value:c,onChange:function(e){a(e.target.value),t(e.target.value)},placeholder:"Type to filter\u2026"})},q=n(13),N=n(5),z=n.n(N),J=n(6);function H(e,t){var n,r=(n="ct0",document.cookie.split(";").map((function(e){return e.trim()})).filter((function(e){return e.startsWith(n)}))[0].slice(n.length+1)),c=/https:\/\/twitter.com\/.+\/status\/(\d+)/,a=function(e){if(e.statusText.length>0)return e.statusText;return{200:"OK",404:"Not Found",403:"Forbidden",401:"Unauthorized"}[e.status]||"HTTP ".concat(e.status)},s={getBearerToken:function(){return Object(J.a)(z.a.mark((function e(){var t,n,r,c,a;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.querySelector("script[src*=\\/main]").src,e.next=3,fetch(t);case 3:return e.next=5,e.sent.text();case 5:for(n=e.sent,r=/="([A-Za-z0-9%]+)"/g,c=null,a="";c=r.exec(n);)c[1].length>a.length&&(a=c[1]);return e.abrupt("return",a);case 11:case"end":return e.stop()}}),e)})))()},makeRequest:function(e,t,n){var c=this;return Object(J.a)(z.a.mark((function a(){var s;return z.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.t0=n,a.t0){a.next=5;break}return a.next=4,c.getBearerToken();case 4:a.t0=a.sent;case 5:return s=a.t0,a.next=8,fetch(e,{credentials:"include",headers:{Accept:"*/*","Content-Type":"application/x-www-form-urlencoded","x-csrf-token":r,authorization:"Bearer ".concat(s)},body:t,method:"POST",mode:"cors"});case 8:return a.abrupt("return",a.sent);case 9:case"end":return a.stop()}}),a)})))()},deleteTweet:function(e,t){var n=this;return Object(J.a)(z.a.mark((function r(){return z.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",n.makeRequest("https://twitter.com/i/api/1.1/statuses/destroy.json","tweet_mode=extended&id=".concat((a=e,c.test(a)?a.match(c)[1]:a)),t));case 1:case"end":return r.stop()}var a}),r)})))()},deleteTweets:function(e){var t=this;return Object(J.a)(z.a.mark((function n(){var r;return z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.getBearerToken();case 2:return r=n.sent,n.abrupt("return",Promise.all(e.map((function(e){return t.deleteTweet(e,r)}))));case 4:case"end":return n.stop()}}),n)})))()},promptDeleteTweets:function(){var e=this;return Object(J.a)(z.a.mark((function t(){var n,r;return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=prompt("delete tweet\n(use commas to delete multiple tweets)"))){t.next=8;break}return t.next=4,e.deleteTweets(n.split(",").map((function(e){return e.trim()})));case 4:return r=t.sent,console.log(r),t.next=8,e.alertResponses(r);case 8:case"end":return t.stop()}}),t)})))()},alertResponses:function(e){return Object(J.a)(z.a.mark((function t(){var n,r;return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.map((function(e){return e.json()})));case 2:n=t.sent,console.log(n),r=e.reduce((function(e,t){var n=a(t);return Object(b.a)(Object(b.a)({},e),{},Object(d.a)({},n,(e[n]||0)+1))}),{}),alert("Done!\n"+Object.keys(r).map((function(e){return"".concat(e," \xd7 ").concat(r[e])})).join("\n"));case 6:case"end":return t.stop()}}),t)})))()}};return e(s,t),s}var Z,Q,Y,G,$,V,X=Object(h.c)(I)(R||(R=Object(O.a)(["\n  & > input {\n    flex: 1;\n    width: 100%;\n  }\n"]))),ee=window.location.hostname+window.location.pathname,te=function(e){var t=e.value,n=e.name,r=Object(o.useRef)();return Object(B.jsxs)(X,{children:[Object(B.jsxs)("div",{children:[n,":"]}),Object(B.jsx)("input",{type:"text",disabled:!0,ref:r,value:t}),Object(B.jsx)("button",{onClick:function(){return navigator.clipboard.writeText(r.current.value)},children:"Copy"})]})},ne=h.c.div(L||(L=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n\n  & > * + * {\n    margin-top: 0.5rem;\n  }\n"]))),re=function(e){var t,n=e.tweets,r=n.map((function(e){return e.id})),c=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=(t={ids:r},function(e){return"!(".concat(H,")(").concat(e,", ").concat(JSON.stringify(t),") /* via ").concat(ee," */")})((function(e,t){var n=t.ids;return e.deleteTweets(n).then(e.alertResponses)}));return Object(B.jsxs)(ne,{children:[Object(B.jsxs)(X,{children:[Object(B.jsx)("div",{children:"Tweet IDs:"}),Object(B.jsx)("input",{type:"text",disabled:!0,value:r.join(",")})]}),Object(B.jsx)("small",{children:'Copy one of these scripts into your Twitter tab\'s browser console (Chrome and Firefox: CTRL/CMD+Shift+I, then click on "Console")'}),Object(B.jsx)(te,{name:"Delete tweets",value:a}),Object(B.jsx)(f,{}),Object(B.jsx)(x,{children:"Download data"}),Object(B.jsx)("a",{download:"tweets.json",href:URL.createObjectURL(c),children:"Download queried tweets as JSON"})]})},ce=Object(h.a)(Z||(Z=Object(O.a)(["\n  html, body, #root {\n    height: 100%;\n    margin: 0;\n    font-family: sans-serif;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  :root {\n    --border: 1px solid #ccc;\n    --border-strong: 1.3px solid #666;\n  }\n"]))),ae=h.c.blockquote(Q||(Q=Object(O.a)(["\n  white-space: pre-wrap;\n  word-break: break-word;\n"]))),se=h.c.main(Y||(Y=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 35rem;\n  margin: 0 auto;\n  max-width: 100%;\n  align-items: center;\n  padding: 1rem;\n  padding-top: 2rem;\n\n  & > input {\n    width: 100%;\n  }\n"]))),ie=h.c.p(G||(G=Object(O.a)(["\n  margin-bottom: 0;\n"]))),oe=h.c.hr($||($=Object(O.a)(["\n  border: none;\n  border-top: var(--border-strong);\n  width: 60%;\n  margin: 1.5rem;\n"]))),_e=h.c.label(V||(V=Object(O.a)(["\n  display: flex;\n  width: 100%;\n  align-items: baseline;\n  & > input {\n    margin-left: 0.5rem;\n    flex: 1;\n  }\n"]))),ue={regular:"Regular tweets",replies:"Replies",retweets:"Retweets"},le=function(){var e=Object(o.useState)([]),t=Object(j.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)([]),a=Object(j.a)(c,2),s=a[0],i=a[1],_=Object(o.useState)(""),u=Object(j.a)(_,2),l=u[0],O=u[1],h=Object(o.useState)(!0),p=Object(j.a)(h,2),m=p[0],E=p[1],T=Object(o.useState)(""),D=Object(j.a)(T,2),M=D[0],k=D[1],P=Object(o.useState)(""),C=Object(j.a)(P,2),R=C[0],L=C[1],A=Object(o.useState)(!1),S=Object(j.a)(A,2),U=S[0],K=S[1],N=Object(o.useState)(!1),z=Object(j.a)(N,2),J=z[0],H=z[1],Z=Object(o.useState)(null),Q=Object(j.a)(Z,2),Y=Q[0],G=Q[1],$=Object(o.useState)({regular:!0,replies:!0,retweets:!0}),V=Object(j.a)($,2),X=V[0],ee=V[1],te=Object(o.useMemo)((function(){return y.oldest.fn(n)}),[n]),ne=Object(o.useMemo)((function(){try{var e=U?new RegExp(M,J?"":"i"):null,t=R.trim().length>0;(U||t)&&G(null);var n=t?new Function("t","return ".concat(R)):null;return te.filter((function(t){if(U)return e.test(t.full_text);var n=J?t.full_text:t.full_text.toLowerCase(),r=J?M:M.toLowerCase();return n.includes(r)})).filter((function(e){var t="in_reply_to_screen_name"in e,n=function(e){return e.full_text.startsWith("RT @")}(e);return!t&&!n&&X.regular||t&&X.replies||n&&X.retweets})).filter((function(e){return!t||n(e)}))}catch(r){return G(r.toString()),[]}}),[te,M,J,U,X,R]),le=Object(o.useMemo)((function(){var e={};return ne.forEach((function(t){var n,r=(n=t.created_at).slice(4,11)+n.slice(-4);e[r]=(e[r]||0)+1})),e}),[ne]),de=function(e){return!e.full_text.toLowerCase().includes(l.toLowerCase())},be=Object(o.useRef)(Object(q.debounce)((function(e){return L(e.target.value)}),600)).current,je=Object(o.useRef)(Object(q.debounce)((function(e){return k(e.target.value)}),600)).current;return Object(B.jsxs)(se,{children:[Object(B.jsx)(ce,{}),Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Load Tweet archive"}),0===n.length&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)("p",{children:["Use the file picker to upload your Twitter archive ZIP file, or just the contained ",Object(B.jsx)("code",{children:"tweet.js"})," file."]}),Object(B.jsxs)("p",{children:["If you don't have a Twitter archive yet, you can request and download it in your"," ",Object(B.jsx)("a",{href:"https://twitter.com/settings/download_your_data",children:"Twitter settings"}),". In this case, see you in a few hours! (Or days, depending on your Twitter usage)"]})]}),Object(B.jsx)(v.a,{setTweets:r}),n.length>0&&Object(B.jsxs)(ie,{children:[n.length," tweets loaded"]})]}),n.length>0&&Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Query tweets"}),Object(B.jsx)(I,{children:Object(B.jsxs)(_e,{children:["Search"," ",Object(B.jsx)("input",{type:"text",placeholder:U?"Enter a regular expression, e.g. ^Hello, .+!$":"Enter text\u2026",onChange:je})]})}),Object(B.jsxs)(I,{children:[Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",checked:U,onChange:function(e){return Boolean(K(e.target.checked))}})," ",Object(B.jsx)("abbr",{title:"Advanced. Lets you define a regular expression, allowing to search for more specific text patterns.",children:"Regular expression"})]}),Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",checked:J,onChange:function(e){return Boolean(H(e.target.checked))}})," ",Object(B.jsx)("abbr",{title:'Case sensitive search makes the search sensitive to lower- and uppercase letters, such as "a" and "A"',children:"Case sensitive"})]})]}),Object(B.jsx)(f,{}),Object(B.jsxs)(_e,{children:[Object(B.jsx)("abbr",{title:'Advanced. Optionally provide a JavaScript expression to filter tweets. The tweet object is provided as variable "t" and the expression can be as simple as "true" or "false".',children:"JavaScript"})," ",Object(B.jsx)("input",{type:"text",placeholder:"Optional; example: t.in_reply_to_user_id !== '12345'",onChange:be})]}),Object(B.jsx)(f,{}),Object(B.jsxs)(I,{children:[Object(B.jsx)("span",{children:"Include"}),Object.keys(ue).map((function(e){return Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",name:"replies",onChange:function(t){return ee((function(n){return Object(b.a)(Object(b.a)({},n),{},Object(d.a)({},e,t.target.checked))}))},checked:X[e]})," ",ue[e]]},e)}))]}),Object(B.jsx)(f,{}),ne.length>0?Object(B.jsx)(W,{tweets:ne,tweetsPerDay:le,handleQueryTweets:function(e,t){i(e),E(t)}}):Object(B.jsx)("p",{children:Y||"No matching tweets found"})]})}),s.length>0&&Object(B.jsxs)(B.Fragment,{children:[m&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(oe,{}),Object(B.jsx)(F,{filterText:l,setFilterText:function(e){return O(e)}})]}),m&&s.map((function(e){return Object(B.jsx)(w,{style:de(e)?{display:"none"}:{},children:Object(B.jsxs)(ae,{className:"twitter-tweet",children:[Object(B.jsx)("p",{dangerouslySetInnerHTML:{__html:e.full_text}}),Object(B.jsx)("a",{href:"https://twitter.com/_/status/".concat(e.id),children:e.created_at})]})},e.id)})),Object(B.jsx)(oe,{}),Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Tweet utils"}),Object(B.jsx)(re,{tweets:s})]})]})]})};l.a.render(Object(B.jsx)(_.a.StrictMode,{children:Object(B.jsx)(le,{})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.b6d10e02.chunk.js.map