(this["webpackJsonptwitter-archive-browser"]=this["webpackJsonptwitter-archive-browser"]||[]).push([[0],{30:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__),_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6),jszip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(31),jszip__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_2__),react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(1),react__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__),TweetsLoader=function TweetsLoader(_ref){var setTweets=_ref.setTweets,inputRef=Object(react__WEBPACK_IMPORTED_MODULE_3__.createRef)(),handleTweets=function(e){var t=e.tweet,n=Object.keys(t).flatMap((function(e){return t[e]})).filter((function(e){return Boolean(e.tweet)})).map((function(e){return e.tweet}));setTweets(n)},handleTweetJs=function handleTweetJs(jsText){window.YTD={tweet:{}},eval(jsText),handleTweets(window.YTD)},handleFileChange=function(){var e=Object(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a)(_home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark((function e(){var t,n,r,c,a;return _home_sk22_code_twitter_archive_explorer_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!inputRef.current){e.next=18;break}if(!(t=inputRef.current.files[0])||!t.name.endsWith(".js")){e.next=9;break}(n=new FileReader).readAsText(t,"utf-8"),n.addEventListener("load",(function(e){handleTweetJs(e.target.result)})),n.addEventListener("error",(function(){console.error("error reading file :/")})),e.next=18;break;case 9:if(!t||!t.name.endsWith(".zip")){e.next=18;break}return e.next=12,jszip__WEBPACK_IMPORTED_MODULE_2___default.a.loadAsync(t);case 12:return r=e.sent,c=r.file(/data\/tweet.js/),e.next=16,c[0].async("string");case 16:a=e.sent,handleTweetJs(a);case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment,{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input",{type:"file",ref:inputRef,onChange:handleFileChange})})};__webpack_exports__.a=TweetsLoader},75:function(e,t,n){"use strict";n.r(t);var r,c,a,s,i,o=n(1),u=n.n(o),l=n(26),_=n.n(l),b=n(8),j=n(9),d=n(4),O=n(2),h=n(3),f=Object(h.b)(r||(r=Object(O.a)(["\n  width: 100%;\n  padding: 1.5rem;\n  background: white;\n  border-radius: 0.5rem;\n  border: var(--border);\n  margin: 10px 0;\n"]))),p=h.c.section(c||(c=Object(O.a)(["\n  ","\n"])),f),m=h.c.hr(a||(a=Object(O.a)(["\n  border: var(--border);\n  border-top: none;\n  width: calc(100% + 2 * 1.5rem);\n  margin: 1rem 0;\n  margin-left: -1.5rem;\n"]))),x=h.c.h2(s||(s=Object(O.a)(["\n  text-transform: uppercase;\n  font-size: 0.9rem;\n  font-weight: bold;\n  margin: 0;\n  margin-bottom: 1rem;\n"]))),w=h.c.section(i||(i=Object(O.a)(["\n  width: 100%;\n  & > .twitter-tweet:not(.twitter-tweet-rendered) {\n    ","\n    margin-left: 0;\n    p {\n      margin-top: 0;\n    }\n  }\n"])),f),g=p,v=n(30);var T=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return function(t,n){var r=function(e){return new Date(e.created_at).getTime()};return r(e?n:t)-r(e?t:n)}},y=function(e){var t=e instanceof Date?e:new Date(e),n=function(e){return 1===e.toString().length?"0".concat(e):e.toString()},r=t.getDate(),c=t.getMonth()+1,a=t.getFullYear();return"".concat(a,"-").concat(n(c),"-").concat(n(r))},E={random:function(e,t){for(var n,r,c=[],a=0;a<t&&a<e.length;a++){var s=(n=0,r=e.length-1,n=Math.ceil(n),r=Math.floor(r),Math.floor(Math.random()*(r-n+1))+n),i=e.splice(s,1)[0];c.push(i)}return c},oldest:function(e,t){return e.sort(T()).slice(0,t)},newest:function(e,t){return e.sort(T(!0)).slice(0,t)},likes:function(e,t){return e.sort((function(e,t){return Number(t.favorite_count)-Number(e.favorite_count)})).slice(0,t)}},k={newest:{name:"Newest",fn:E.newest},oldest:{name:"Oldest",fn:E.oldest},random:{name:"Random",fn:E.random},likes:{name:"Likes",fn:E.likes}};var D,C,M,P,R,L,A=864e5,S=h.c.div(D||(D=Object(O.a)(["\n  display: flex;\n  align-items: center;\n  margin: 0.8rem 0;\n\n  & > * + * {\n    margin-left: 0.5rem;\n  }\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n"]))),B=n(0),I=Object(h.c)(S)(C||(C=Object(O.a)(["\n  & > input[type='number'] {\n    width: 5rem;\n  }\n\n  & > input[type='range'] {\n    flex: 1;\n    width: 100%;\n  }\n"]))),U=h.c.input(M||(M=Object(O.a)(["\n  width: 100%;\n"]))),W=function(e){var t=e.tweets,n=e.tweetsPerDay,r=e.handleQueryTweets,c=Object(o.useState)(1),a=Object(d.a)(c,2),s=a[0],i=a[1],u=Object(o.useState)(1),l=Object(d.a)(u,2),_=l[0],b=l[1],j=Object(o.useState)("newest"),O=Object(d.a)(j,2),h=O[0],f=O[1],p=Object(o.useState)(!0),x=Object(d.a)(p,2),w=x[0],g=x[1],v=Object(o.useState)(!0),T=Object(d.a)(v,2),E=T[0],D=T[1],C=Object(o.useRef)(),M=Object(o.useRef)(),P=Object(o.useRef)(),R=function(e){i(e),e>0&&b(e),g(e<30),D(e<100)},L=function(e){return R(e.target.valueAsNumber||Number(e.target.value))},W=new Date(t[0].created_at).getTime(),K=new Date(t[t.length-1].created_at).getTime(),q=Object(o.useState)(W),F=Object(d.a)(q,2),N=F[0],J=F[1],z=Object(o.useState)(K),H=Object(d.a)(z,2),Q=H[0],Y=H[1],G=function(e,t,n){return isNaN(t)&&e(n)};Object(o.useEffect)((function(){return G(J,N,W)}),[N,W]),Object(o.useEffect)((function(){return G(Y,Q,K)}),[Q,K]);var Z=Object(o.useMemo)((function(){return Object.keys(n).filter((function(e){var t=new Date(e).getTime();return t+A>=N&&t-A<=Q})).map((function(e){return n[e]})).reduce((function(e,t){return e+t}),0)}),[n,N,Q]);Object(o.useEffect)((function(){Z<s&&R(Z),0===s&&Z>0&&R(_)}),[Z,s,_]),Object(o.useEffect)((function(){W>C.current.valueAsNumber&&J(W)}),[W]),Object(o.useEffect)((function(){K<M.current.valueAsNumber&&Y(K)}),[K]);return Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)("label",{children:["Since"," ",Object(B.jsx)("input",{type:"date",value:y(N||W),ref:C,onChange:function(e){return J(e.target.valueAsNumber)}})]}),Object(B.jsx)(U,{type:"range",min:W,max:K,value:N||W,step:A,onChange:function(e){return J(Number(e.target.value))}}),Object(B.jsxs)("label",{children:["Until"," ",Object(B.jsx)("input",{type:"date",value:y(Q||K),ref:M,onChange:function(e){return Y(e.target.valueAsNumber)}})]}),Object(B.jsx)(U,{type:"range",min:W,max:K,value:Q||K,step:A,onChange:function(e){Y(Number(e.target.value))}}),Object(B.jsx)(m,{}),Object(B.jsxs)(I,{htmlFor:"amount",children:[Object(B.jsx)("label",{htmlFor:"amount",children:"Amount:"}),Object(B.jsx)("input",{type:"number",id:"amount",min:Z>0?1:0,max:Z,step:"1",value:s,onChange:L}),Object(B.jsx)("p",{children:"out\xa0of"}),Object(B.jsxs)("button",{onClick:function(){return R(Z)},children:["all ",Z]}),Object(B.jsx)("input",{type:"range",min:Z>0?1:0,max:Math.min(Z,99),value:s,ref:P,onChange:L})]}),Object(B.jsx)(m,{}),Object(B.jsxs)(S,{children:[Object(B.jsx)("span",{children:"Sort by"}),Object.keys(k).map((function(e,t){return Object(B.jsxs)("label",{htmlFor:"query-".concat(e),children:[Object(B.jsx)("input",{type:"radio",id:"query-".concat(e),name:"query-type",onChange:function(){return f(e)},value:e,checked:h===e}),k[e].name]},"".concat(t,"-").concat(e))}))]}),Object(B.jsx)(m,{}),Object(B.jsxs)(S,{children:[Object(B.jsx)("input",{type:"submit",onClick:function(){var e=t.filter((function(e){var t=C.current.valueAsDate,n=M.current.valueAsDate;if(!t||!n)return!1;var r=new Date(e.created_at),c=new Date(t.getTime());c.setUTCHours(0,0,0,0);var a=new Date(n.getTime()+A);return a.setUTCHours(0,0,0,0),!(c.getTime()>=r.getTime())&&!(a.getTime()<=r.getTime())}));r(k[h].fn(e,s),E),w&&function(){var e=document.createElement("script");e.src="https://platform.twitter.com/widgets.js",document.head.appendChild(e)}()},value:"Query"}),Object(B.jsxs)("label",{htmlFor:"show-tweets",children:[Object(B.jsx)("input",{id:"show-tweets",type:"checkbox",checked:E,onChange:function(e){return D(Boolean(e.target.checked))}})," ","Show tweets"]})," ",Object(B.jsxs)("label",{htmlFor:"embed-tweets",children:[Object(B.jsx)("input",{id:"embed-tweets",type:"checkbox",checked:w,onChange:function(e){return g(Boolean(e.target.checked))}})," ","Embed tweets"]})]})]})},K=h.c.input(P||(P=Object(O.a)(["\n  width: 100%;\n  margin-bottom: 1rem;\n"]))),q=function(e){var t=e.setFilterText,n=Object(o.useState)(""),r=Object(d.a)(n,2),c=r[0],a=r[1];return Object(B.jsx)(K,{type:"text",value:c,onChange:function(e){a(e.target.value),t(e.target.value)},placeholder:"Type to filter\u2026"})},F=n(16),N=n(32),J=n(5),z=n.n(J),H=n(6);function Q(e){var t,n=(t="ct0",document.cookie.split(";").map((function(e){return e.trim()})).filter((function(e){return e.startsWith(t)}))[0].slice(t.length+1)),r=/https:\/\/twitter.com\/.+\/status\/(\d+)/,c=window.tweetUtils={getBearerToken:function(){return Object(H.a)(z.a.mark((function e(){var t,n,r,c,a;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=document.querySelector("script[src*=\\/main]").src,e.next=3,fetch(t);case 3:return e.next=5,e.sent.text();case 5:for(n=e.sent,r=/="([A-Za-z0-9%]+)"/g,c=null,a="";c=r.exec(n);)c[1].length>a.length&&(a=c[1]);return e.abrupt("return",a);case 11:case"end":return e.stop()}}),e)})))()},makeRequest:function(e,t,r){var c=this;return Object(H.a)(z.a.mark((function a(){var s;return z.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.t0=r,a.t0){a.next=5;break}return a.next=4,c.getBearerToken();case 4:a.t0=a.sent;case 5:return s=a.t0,a.next=8,fetch(e,{credentials:"include",headers:{Accept:"*/*","Content-Type":"application/x-www-form-urlencoded","x-csrf-token":n,authorization:"Bearer ".concat(s)},body:t,method:"POST",mode:"cors"});case 8:return a.abrupt("return",a.sent);case 9:case"end":return a.stop()}}),a)})))()},deleteTweet:function(e,t){var n=this;return Object(H.a)(z.a.mark((function c(){return z.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.abrupt("return",n.makeRequest("https://twitter.com/i/api/1.1/statuses/destroy.json","tweet_mode=extended&id=".concat((a=e,r.test(a)?a.match(r)[1]:a)),t));case 1:case"end":return c.stop()}var a}),c)})))()},deleteTweets:function(e){var t=this;return Object(H.a)(z.a.mark((function n(){var r;return z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.getBearerToken();case 2:return r=n.sent,n.abrupt("return",Promise.all(e.map((function(e){return t.deleteTweet(e,r)}))));case 4:case"end":return n.stop()}}),n)})))()},promptDeleteTweets:function(){var e=this;return Object(H.a)(z.a.mark((function t(){var n,r;return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n=prompt("delete tweet\n(use commas to delete multiple tweets)"))){t.next=8;break}return t.next=4,e.deleteTweets(n.split(",").map((function(e){return e.trim()})));case 4:return r=t.sent,console.log(r),t.next=8,e.alertResponses(r);case 8:case"end":return t.stop()}}),t)})))()},alertResponses:function(e){return Object(H.a)(z.a.mark((function t(){var n,r;return z.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.map((function(e){return e.json()})));case 2:n=t.sent,console.log(n),r=e.reduce((function(e,t){return Object(j.a)(Object(j.a)({},e),{},Object(b.a)({},t.statusText,(e[t.statusText]||0)+1))}),{}),alert("Done!\n"+Object.keys(r).map((function(e){return"".concat(e,": ").concat(r[e])})).join("\n"));case 6:case"end":return t.stop()}}),t)})))()}};return e(c),c}var Y,G,Z,$,V,X,ee=Object(h.c)(S)(R||(R=Object(O.a)(["\n  & > input {\n    flex: 1;\n    width: 100%;\n  }\n"]))),te=function(e){var t=e.value,n=e.name,r=Object(o.useRef)();return Object(B.jsxs)(ee,{children:[Object(B.jsxs)("div",{children:[n,":"]}),Object(B.jsx)("input",{type:"text",disabled:!0,ref:r,value:t}),Object(B.jsx)("button",{onClick:function(){return navigator.clipboard.writeText(r.current.value)},children:"Copy"})]})},ne=h.c.div(L||(L=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n\n  & > * + * {\n    margin-top: 0.5rem;\n  }\n"]))),re=function(e){var t=e.tweets,n=t.map((function(e){return e.id})),r=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),c=Object(N.minify)("\n    ".concat(Q.toString(),"\n    tweetUtils(utils => utils\n      .deleteTweets(").concat(JSON.stringify(n),")\n      .then(utils.alertResponses))\n  ")).code;return Object(B.jsxs)(ne,{children:[Object(B.jsxs)(ee,{children:[Object(B.jsx)("div",{children:"Tweet IDs:"}),Object(B.jsx)("input",{type:"text",disabled:!0,value:n.join(",")})]}),Object(B.jsx)("small",{children:'Copy one of these scripts into your Twitter tab\'s browser console (Chrome and Firefox: CTRL/CMD+Shift+I, then click on "Console")'}),Object(B.jsx)(te,{name:"Delete tweets",value:c}),Object(B.jsx)(m,{}),Object(B.jsx)(x,{children:"Download data"}),Object(B.jsx)("a",{download:"tweets.json",href:URL.createObjectURL(r),children:"Download queried tweets as JSON"})]})},ce=Object(h.a)(Y||(Y=Object(O.a)(["\n  html, body, #root {\n    height: 100%;\n    margin: 0;\n    font-family: sans-serif;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  :root {\n    --border: 1px solid #ccc;\n    --border-strong: 1.3px solid #666;\n  }\n"]))),ae=h.c.blockquote(G||(G=Object(O.a)(["\n  white-space: pre-wrap;\n  word-break: break-word;\n"]))),se=h.c.main(Z||(Z=Object(O.a)(["\n  display: flex;\n  flex-direction: column;\n  width: 35rem;\n  margin: 0 auto;\n  max-width: 100%;\n  align-items: center;\n  padding: 1rem;\n  padding-top: 2rem;\n\n  & > input {\n    width: 100%;\n  }\n"]))),ie=h.c.p($||($=Object(O.a)(["\n  margin-bottom: 0;\n"]))),oe=h.c.hr(V||(V=Object(O.a)(["\n  border: none;\n  border-top: var(--border-strong);\n  width: 60%;\n  margin: 1.5rem;\n"]))),ue=h.c.label(X||(X=Object(O.a)(["\n  display: flex;\n  width: 100%;\n  align-items: baseline;\n  & > input {\n    margin-left: 0.5rem;\n    flex: 1;\n  }\n"]))),le={regular:"Regular tweets",replies:"Replies",retweets:"Retweets"},_e=function(){var e=Object(o.useState)([]),t=Object(d.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)([]),a=Object(d.a)(c,2),s=a[0],i=a[1],u=Object(o.useState)(""),l=Object(d.a)(u,2),_=l[0],O=l[1],h=Object(o.useState)(!0),f=Object(d.a)(h,2),p=f[0],T=f[1],y=Object(o.useState)(""),E=Object(d.a)(y,2),D=E[0],C=E[1],M=Object(o.useState)(""),P=Object(d.a)(M,2),R=P[0],L=P[1],A=Object(o.useState)(!1),I=Object(d.a)(A,2),U=I[0],K=I[1],N=Object(o.useState)(!1),J=Object(d.a)(N,2),z=J[0],H=J[1],Q=Object(o.useState)(null),Y=Object(d.a)(Q,2),G=Y[0],Z=Y[1],$=Object(o.useState)({regular:!0,replies:!0,retweets:!0}),V=Object(d.a)($,2),X=V[0],ee=V[1],te=Object(o.useMemo)((function(){return k.oldest.fn(n)}),[n]),ne=Object(o.useMemo)((function(){try{var e=U?new RegExp(D,z?"":"i"):null,t=R.trim().length>0;(U||t)&&Z(null);var n=t?new Function("t","return ".concat(R)):null;return te.filter((function(t){if(U)return e.test(t.full_text);var n=z?t.full_text:t.full_text.toLowerCase(),r=z?D:D.toLowerCase();return n.includes(r)})).filter((function(e){var t="in_reply_to_screen_name"in e,n=function(e){return e.full_text.startsWith("RT @")}(e);return!t&&!n&&X.regular||t&&X.replies||n&&X.retweets})).filter((function(e){return!t||n(e)}))}catch(r){return Z(r.toString()),[]}}),[te,D,z,U,X,R]),_e=Object(o.useMemo)((function(){var e={};return ne.forEach((function(t){var n,r=(n=t.created_at).slice(4,11)+n.slice(-4);e[r]=(e[r]||0)+1})),e}),[ne]),be=function(e){return!e.full_text.toLowerCase().includes(_.toLowerCase())},je=Object(o.useRef)(Object(F.debounce)((function(e){return L(e.target.value)}),600)).current,de=Object(o.useRef)(Object(F.debounce)((function(e){return C(e.target.value)}),600)).current;return Object(B.jsxs)(se,{children:[Object(B.jsx)(ce,{}),Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Load Tweet archive"}),0===n.length&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsxs)("p",{children:["Use the file picker to upload your Twitter archive ZIP file, or just the contained ",Object(B.jsx)("code",{children:"tweet.js"})," file."]}),Object(B.jsxs)("p",{children:["If you don't have a Twitter archive yet, you can request and download it in your"," ",Object(B.jsx)("a",{href:"https://twitter.com/settings/download_your_data",children:"Twitter settings"}),". In this case, see you in a few hours! (Or days, depending on your Twitter usage)"]})]}),Object(B.jsx)(v.a,{setTweets:r}),n.length>0&&Object(B.jsxs)(ie,{children:[n.length," tweets loaded"]})]}),n.length>0&&Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Query tweets"}),Object(B.jsx)(S,{children:Object(B.jsxs)(ue,{children:["Search"," ",Object(B.jsx)("input",{type:"text",placeholder:U?"Enter a regular expression, e.g. ^Hello, .+!$":"Enter text\u2026",onChange:de})]})}),Object(B.jsxs)(S,{children:[Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",checked:U,onChange:function(e){return Boolean(K(e.target.checked))}})," ",Object(B.jsx)("abbr",{title:"Advanced. Lets you define a regular expression, allowing to search for more specific text patterns.",children:"Regular expression"})]}),Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",checked:z,onChange:function(e){return Boolean(H(e.target.checked))}})," ",Object(B.jsx)("abbr",{title:'Case sensitive search makes the search sensitive to lower- and uppercase letters, such as "a" and "A"',children:"Case sensitive"})]})]}),Object(B.jsx)(m,{}),Object(B.jsxs)(ue,{children:[Object(B.jsx)("abbr",{title:'Advanced. Optionally provide a JavaScript expression to filter tweets. The tweet object is provided as variable "t" and the expression can be as simple as "true" or "false".',children:"JavaScript"})," ",Object(B.jsx)("input",{type:"text",placeholder:"Optional; example: t.in_reply_to_user_id !== '12345'",onChange:je})]}),Object(B.jsx)(m,{}),Object(B.jsxs)(S,{children:[Object(B.jsx)("span",{children:"Include"}),Object.keys(le).map((function(e){return Object(B.jsxs)("label",{children:[Object(B.jsx)("input",{type:"checkbox",name:"replies",onChange:function(t){return ee((function(n){return Object(j.a)(Object(j.a)({},n),{},Object(b.a)({},e,t.target.checked))}))},checked:X[e]})," ",le[e]]},e)}))]}),Object(B.jsx)(m,{}),ne.length>0?Object(B.jsx)(W,{tweets:ne,tweetsPerDay:_e,handleQueryTweets:function(e,t){i(e),T(t)}}):Object(B.jsx)("p",{children:G||"No matching tweets found"})]})}),s.length>0&&Object(B.jsxs)(B.Fragment,{children:[p&&Object(B.jsxs)(B.Fragment,{children:[Object(B.jsx)(oe,{}),Object(B.jsx)(q,{filterText:_,setFilterText:function(e){return O(e)}})]}),p&&s.map((function(e){return Object(B.jsx)(w,{style:be(e)?{display:"none"}:{},children:Object(B.jsxs)(ae,{className:"twitter-tweet",children:[Object(B.jsx)("p",{dangerouslySetInnerHTML:{__html:e.full_text}}),Object(B.jsx)("a",{href:"https://twitter.com/_/status/".concat(e.id),children:e.created_at})]})},e.id)})),Object(B.jsx)(oe,{}),Object(B.jsxs)(g,{children:[Object(B.jsx)(x,{children:"Tweet utils"}),Object(B.jsx)(re,{tweets:s})]})]})]})};_.a.render(Object(B.jsx)(u.a.StrictMode,{children:Object(B.jsx)(_e,{})}),document.getElementById("root"))}},[[75,1,2]]]);
//# sourceMappingURL=main.ea785028.chunk.js.map