(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],{92:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c),s=(a(92),a(18)),o=a(64),l=a.n(o),d=a(147),j=a(148),b=a(149),p=a(150),u=a(142),h=a(69),O=a.n(h),x=a(68),g=a.n(x),m=a(65),f=a(16),v=a(77),y=a(5),w=a(146),C=a(145),k=a(141),B=a(143),N=a(144),S=a(67),T=a.n(S),F=a(36),E=a(57),R=a.n(E),I=a(66),P="FETCHING",D="FETCHED",H="FETCH_ERROR",L=a(4),W=Object(y.a)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,a=e.classes,n=e.onClose,r=Object(v.a)(e,["children","classes","onClose"]);return Object(L.jsxs)(k.a,Object(f.a)(Object(f.a)({disableTypography:!0,className:a.root},r),{},{children:[Object(L.jsx)(F.a,{variant:"h6",children:t}),n?Object(L.jsx)(u.a,{"aria-label":"close",className:a.closeButton,onClick:n,children:Object(L.jsx)(T.a,{})}):null]}))})),_=Object(y.a)((function(e){return{root:{padding:e.spacing(2)}}}))(B.a),z=Object(y.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(N.a);function G(e){var t=e.game,a=void 0===t?{}:t,r=Object(n.useState)(!1),c=Object(s.a)(r,2),i=c[0],o=c[1],l=function(e){var t=Object(n.useRef)({}),a={status:"idle",error:null,data:[]},r=Object(n.useReducer)((function(e,t){switch(t.type){case P:return Object(f.a)(Object(f.a)({},a),{},{status:P});case D:return Object(f.a)(Object(f.a)({},a),{},{status:D,data:t.payload});case H:return Object(f.a)(Object(f.a)({},a),{},{status:H,error:t.payload});default:return e}}),a),c=Object(s.a)(r,2),i=c[0],o=c[1];return Object(n.useEffect)((function(){var a=!1;if(e)return function(){var n=Object(I.a)(R.a.mark((function n(){var r,c,i;return R.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o({type:P}),!t.current[e]){n.next=6;break}r=t.current[e],o({type:D,payload:r}),n.next=24;break;case 6:return n.prev=6,n.next=9,fetch(e);case 9:return c=n.sent,n.next=12,c.json();case 12:if(i=n.sent,t.current[e]=i,!a){n.next=16;break}return n.abrupt("return");case 16:o({type:D,payload:i}),n.next=24;break;case 19:if(n.prev=19,n.t0=n.catch(6),!a){n.next=23;break}return n.abrupt("return");case 23:o({type:H,payload:n.t0.message});case 24:case"end":return n.stop()}}),n,null,[[6,19]])})));return function(){return n.apply(this,arguments)}}()(),function(){a=!0}}),[e]),i}("https://store.steampowered.com/api/appdetails?appids=".concat(a.appid||217920,"&key=546BFB646C593E45E6A294F26BF60C07")),d=l.status,j=l.data,b=l.error;Object(n.useEffect)((function(){o(null!=a.appid)}),[a]);var p=function(){o(!1)};return console.log(d,j,b),Object(L.jsxs)(C.a,{onClose:p,"aria-labelledby":"customized-dialog-title",open:i,children:[Object(L.jsx)(W,{id:"customized-dialog-title",onClose:p,children:j.name}),Object(L.jsx)(_,{dividers:!0,children:Object(L.jsx)(F.a,{gutterBottom:!0,children:j.detailed_description})}),Object(L.jsx)(z,{children:Object(L.jsx)(w.a,{autoFocus:!0,onClick:p,color:"primary",children:"Close"})})]})}var J=Object(d.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper,width:"100%"},gridList:{width:"100%",height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 60px)")},icon:{color:"rgba(255, 255, 255, 0.54)"},topTitleBar:{background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"}}}));function U(e){var t=e.gameData,a=J(),r=Object(n.useState)({}),c=Object(s.a)(r,2),i=c[0],o=c[1];return Object(L.jsxs)("div",{className:a.root,children:[Object(L.jsx)(j.a,{cellHeight:240,className:a.gridList,cols:4,spacing:12,children:t.map((function(e){return Object(L.jsxs)(b.a,{children:[Object(L.jsx)(m.LazyLoadImage,{alt:e.Title,height:240,src:"https://cdn.akamai.steamstatic.com/steam/apps/".concat(e.appid,"/header.jpg?t=1599172963"),width:"auto"}),Object(L.jsx)(p.a,{titlePosition:"top",actionIcon:Object(L.jsx)(u.a,{"aria-label":"star ".concat(e.Title),className:a.icon,children:Object(L.jsx)(g.a,{})}),actionPosition:"left",className:a.topTitleBar}),Object(L.jsx)(p.a,{title:e.Title,subtitle:Object(L.jsxs)("span",{children:["Released:"," ","1970"===e.Release_Date.substring(0,4)?"Unknown":e.Release_Date.substring(0,4),", Price: ","0"===e.Price?"Free":"".concat(e.Price,"$")]}),actionIcon:Object(L.jsx)(u.a,{"aria-label":"info about ".concat(e.Title),className:a.icon,onClick:function(){return o(e.appid)},children:Object(L.jsx)(O.a,{})})})]},e.appid)}))}),Object(L.jsx)(G,{game:i})]})}var A=Object(d.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper,width:"100%"}}}));var M=function(){var e=A(),t=Object(n.useState)([]),a=Object(s.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){l.a.parse("/app_id_info.csv",{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){console.log(e),c(e.data)}})}),[]),Object(L.jsx)("div",{className:e.root,children:Object(L.jsx)(U,{gameData:r.slice(0,20)})})},X=a(46),Y=a(3),$=a(158),q=a(166),K=a(167),Q=a(165),V=a(159),Z=a(160),ee=a(163),te=a(162),ae=a(161),ne=a(164),re=a(154),ce=a(73),ie=a.n(ce),se=a(75),oe=a.n(se),le=a(74),de=a.n(le),je=a(151),be=a(152),pe=a(153),ue=a(70),he=a.n(ue),Oe=a(71),xe=a.n(Oe),ge=a(72),me=a.n(ge),fe=Object(L.jsxs)("div",{children:[Object(L.jsxs)(je.a,{button:!0,children:[Object(L.jsx)(be.a,{children:Object(L.jsx)(he.a,{})}),Object(L.jsx)(pe.a,{primary:"Games"})]}),Object(L.jsxs)(je.a,{button:!0,children:[Object(L.jsx)(be.a,{children:Object(L.jsx)(xe.a,{})}),Object(L.jsx)(pe.a,{primary:"Users"})]}),Object(L.jsxs)(je.a,{button:!0,children:[Object(L.jsx)(be.a,{children:Object(L.jsx)(me.a,{})}),Object(L.jsx)(pe.a,{primary:"Stats"})]})]}),ve=Object(L.jsx)("div",{}),ye=a(54),we=a(155),Ce=a(53),ke=a(156),Be=a(76),Ne=a(157);function Se(){return Object(L.jsxs)(F.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyrights \xa9 ",Object(L.jsx)(re.a,{color:"inherit",href:"https://github.com/tugot17/Recommendation-With-Transformers",children:"Recommendation With Transformers"})," ",(new Date).getFullYear(),"."]})}var Te=Object(d.a)((function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(f.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(X.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{padding:0,height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 60px)")},stickyCopyright:{position:"fixed",bottom:0,left:"50%",transform:"translate(-50%, -8px)"}}}));function Fe(e){var t=e.children,a=Object(n.useState)(!1),r=Object(s.a)(a,2),c=r[0],i=r[1],o=Object(n.useState)(!0),l=Object(s.a)(o,2),d=l[0],j=l[1],b=d?"dark":"light",p=d?ye.a[900]:we.a[600],h=d?Ce.a[900]:ke.a[500],O=Object(Be.a)({palette:{type:b,primary:{main:p},secondary:{main:h}}}),x=Te();return Object(L.jsx)(Ne.a,{theme:O,children:Object(L.jsxs)("div",{className:x.root,children:[Object(L.jsx)($.a,{}),Object(L.jsx)(V.a,{position:"absolute",className:Object(Y.a)(x.appBar,c&&x.appBarShift),children:Object(L.jsxs)(Z.a,{className:x.toolbar,children:[Object(L.jsx)(u.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){i(!0)},className:Object(Y.a)(x.menuButton,c&&x.menuButtonHidden),children:Object(L.jsx)(ie.a,{})}),Object(L.jsx)(F.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:x.title,children:"Dashboard"}),Object(L.jsx)(q.a,{checked:d,onChange:function(){j(!d)}}),Object(L.jsx)(u.a,{color:"inherit",children:Object(L.jsx)(ae.a,{badgeContent:4,color:"secondary",children:Object(L.jsx)(de.a,{})})})]})}),Object(L.jsxs)(K.a,{variant:"permanent",classes:{paper:Object(Y.a)(x.drawerPaper,!c&&x.drawerPaperClose)},open:c,children:[Object(L.jsx)("div",{className:x.toolbarIcon,children:Object(L.jsx)(u.a,{onClick:function(){i(!1)},children:Object(L.jsx)(oe.a,{})})}),Object(L.jsx)(te.a,{}),Object(L.jsx)(ee.a,{children:fe}),Object(L.jsx)(te.a,{}),Object(L.jsx)(ee.a,{children:ve})]}),Object(L.jsxs)("main",{className:x.content,children:[Object(L.jsx)("div",{className:x.appBarSpacer}),Object(L.jsx)(ne.a,{maxWidth:"xl",className:x.container,children:t}),Object(L.jsx)(Q.a,{pt:4,className:x.stickyCopyright,children:Object(L.jsx)(Se,{})})]})]})})}var Ee=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,169)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))};i.a.render(Object(L.jsx)(r.a.StrictMode,{children:Object(L.jsx)(Fe,{children:Object(L.jsx)(M,{})})}),document.getElementById("root")),Ee()}},[[99,1,2]]]);
//# sourceMappingURL=main.02411c9c.chunk.js.map