(this.webpackJsonpwebapp=this.webpackJsonpwebapp||[]).push([[0],{158:function(e,t,a){},212:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(15),s=a.n(r),i=(a(158),a(14)),o=a(20),l=a(118),d=a.n(l),j=a(131),u=a(69),b={apiKey:"AIzaSyDB1BZ57CP7sNO99jmY8UzlQfAR_dsKI2g",authDomain:"steam-transformer-recommend.firebaseapp.com",projectId:"steam-transformer-recommend",storageBucket:"steam-transformer-recommend.appspot.com",messagingSenderId:"725264507275",appId:"1:725264507275:web:e63671021282e65b128f8e"},p="APPS",h="USERS",g="STATS",m="PROFILE",O=a(276),x=a(282),f=a(283),v=a(284),y=a(214),C=a(122),w=a.n(C),k=a(87),S=a.n(k),N=a(86),I=a.n(N),P=a(120),T=a(133),B=a(90),D=a(7),R=a(278),E=a(277),L=a(273),W=a(274),_=a(275),z=a(121),F=a.n(z),G=a(40),H=a(89);var U=a(4),A={menu:p},M=Object(n.createContext)(A),Y=M.Provider,J="SET_MENU",K="ADD_USER_GAME",q="REMOVE_USER_GAME",Q="UPDATE_USER";var V=function(e){var t=e.children,a=function(e,t){var a=Object(n.useState)((function(){try{var a=window.localStorage.getItem(e);return a?JSON.parse(a):t}catch(n){return console.log(n),t}})),c=Object(o.a)(a,2),r=c[0],s=c[1];return[r,function(t){try{var a=t instanceof Function?t(r):t;s(a),window.localStorage.setItem(e,JSON.stringify(a))}catch(n){console.log(n)}}]}("user",{games:[],userId:"xxxxxxxx-xxxx-4xxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})),name:"",color:"#7b1fa2",created:(new Date).toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),c=Object(o.a)(a,2),r=c[0],s=c[1],l=Object(n.useReducer)((function(e,t){var a={};switch(t.type){case J:return Object(i.a)(Object(i.a)({},e),{},{menu:t.value,user:r});case Q:return a=Object(i.a)(Object(i.a)({},e.user),t.value),s(a),Object(i.a)(Object(i.a)({},e),{},{user:a});case K:return a=Object(i.a)(Object(i.a)({},e.user),{},{games:[].concat(Object(H.a)(e.user.games),[t.value])}),s(a),Object(i.a)(Object(i.a)({},e),{},{user:a});case q:return a=Object(i.a)(Object(i.a)({},e.user),{},{games:e.user.games.filter((function(e){return e!==t.value}))}),s(a),Object(i.a)(Object(i.a)({},e),{},{user:a});default:throw new Error}}),Object(i.a)(Object(i.a)({},A),{},{user:r})),d=Object(o.a)(l,2),j=d[0],u=d[1];return Object(U.jsx)(Y,{value:{state:j,dispatch:u},children:t})},X=function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},iframe:{transform:"translate(25%, 25%) scale(1.5)"},title:{color:"#fff"}}},Z=Object(D.a)(X)((function(e){var t=e.children,a=e.classes,n=e.onClose,c=Object(B.a)(e,["children","classes","onClose"]);return Object(U.jsxs)(L.a,Object(i.a)(Object(i.a)({disableTypography:!0,className:a.root},c),{},{children:[Object(U.jsx)(G.a,{variant:"h6",children:t}),n?Object(U.jsx)(y.a,{"aria-label":"close",className:a.closeButton,onClick:n,children:Object(U.jsx)(F.a,{})}):null]}))})),$=Object(D.a)((function(e){return{root:{padding:e.spacing(2),width:646*1.55,height:304}}}))(W.a),ee=Object(D.a)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(_.a),te=Object(O.a)(X);function ae(e){var t=e.game,a=void 0===t?{}:t,c=e.onClose,r=void 0===c?function(){}:c,s=e.onSelect,i=void 0===s?function(){}:s,l=te(),d=Object(n.useContext)(M).state,j=Object(n.useState)(!1),u=Object(o.a)(j,2),b=u[0],p=u[1];Object(n.useEffect)((function(){p(null!=a.appid)}),[a]);var h=function(){r({})};return null!=a.appid&&Object(U.jsxs)(E.a,{onClose:h,"aria-labelledby":"customized-dialog-title",maxWidth:"lg",open:b,PaperProps:{style:{backgroundImage:"url('https://cdn.akamai.steamstatic.com/steam/apps/".concat(a.appid,"/page_bg_generated_v6b.jpg')")}},children:[Object(U.jsx)(Z,{id:"customized-dialog-title",onClose:h,children:Object(U.jsx)("span",{className:l.title,children:a.Title})}),Object(U.jsx)($,{dividers:!0,children:Object(U.jsx)("iframe",{title:a.Title,className:l.iframe,width:"646",height:"190",frameBorder:"0",src:"https://store.steampowered.com/widget/".concat(a.appid)})}),Object(U.jsxs)(ee,{children:[Object(U.jsx)(R.a,{startIcon:d.user.games.includes(a.appid)?Object(U.jsx)(I.a,{}):Object(U.jsx)(S.a,{}),onClick:function(){i(a.appid)},color:"secondary",variant:"outlined",children:d.user.games.includes(a.appid)?"Remove from my list":"Add to my list"}),Object(U.jsx)(R.a,{autoFocus:!0,onClick:h,children:Object(U.jsx)("span",{className:l.title,children:"Close"})})]})]})}var ne=a(6),ce=a(279),re=a(280),se=Object(O.a)((function(e){return{root:{position:"relative",display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper,width:"100%"},gridList:{width:"100%"},gridListFullHeight:{height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 60px)")},gridListPaddingTop:{paddingTop:"".concat(e.spacing(12),"px !important")},icon:{color:"rgba(255, 255, 255, 0.54)"},topTitleBar:{background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"},searchContainer:{padding:e.spacing(2),height:e.spacing(12),position:"absolute",width:"100%",zIndex:1,backgroundColor:"".concat(e.palette.background.default,"aa"),fontWeight:"bold"}}}));function ie(e){var t=e.gameData,a=e.fixedHeight,c=void 0===a||a,r=e.elPerRow,s=void 0===r?4:r,i=e.showSearch,l=void 0!==i&&i,d=se(),j=Object(n.useContext)(M),u=j.state,b=j.dispatch,p=Object(n.useState)({}),h=Object(o.a)(p,2),g=h[0],m=h[1],O=Object(n.useState)(""),C=Object(o.a)(O,2),k=C[0],N=C[1],B=Object(n.useState)(),D=Object(o.a)(B,2),R=D[0],E=D[1],L=Object(n.useState)(0),W=Object(o.a)(L,2),_=W[0],z=W[1],F=Object(T.a)(R).isIntersecting;Object(n.useEffect)((function(){F&&z((function(e){return e+20}))}),[F]),Object(n.useEffect)((function(){z(20)}),[t]);var G=function(e){b({type:u.user.games.includes(e)?q:K,value:e})},H=new RegExp(k,"ig");return Object(U.jsxs)("div",{className:d.root,id:"main-grid",children:[l&&Object(U.jsx)(ce.a,{container:!0,spacing:3,className:d.searchContainer,children:Object(U.jsx)(ce.a,{item:!0,xs:12,children:Object(U.jsx)(re.a,{id:"search",value:k,color:"secondary",name:"search",label:"Search",fullWidth:!0,style:{fontWeight:"bold"},onChange:function(e){N(e.target.value)}})})}),Object(U.jsxs)(x.a,{cellHeight:240,className:Object(ne.a)(d.gridList,!!c&&d.gridListFullHeight,!!l&&d.gridListPaddingTop),cols:s,spacing:12,children:[t.filter((function(e){return null!=e.Title.match(H)})).slice(0,_).map((function(e){return Object(U.jsxs)(f.a,{children:[Object(U.jsx)(P.LazyLoadImage,{alt:e.Title,height:240,src:"https://cdn.akamai.steamstatic.com/steam/apps/".concat(e.appid,"/header.jpg?t=1599172963"),width:"auto"}),Object(U.jsx)(v.a,{titlePosition:"top",actionIcon:Object(U.jsx)(y.a,{"aria-label":"star ".concat(e.Title),className:d.icon,onClick:function(){return G(e.appid)},children:u.user.games.includes(e.appid)?Object(U.jsx)(I.a,{color:"secondary"}):Object(U.jsx)(S.a,{})}),actionPosition:"left",className:d.topTitleBar}),Object(U.jsx)(v.a,{title:e.Title,subtitle:Object(U.jsxs)("span",{children:["1970"===e.Release_Date.substring(0,4)?"":"Released: ".concat(e.Release_Date.substring(0,4),", "),"0"===e.Price?"":"Price: ".concat(e.Price,"$")]}),actionIcon:Object(U.jsx)(y.a,{"aria-label":"info about ".concat(e.Title),className:d.icon,onClick:function(){return m(e)},children:Object(U.jsx)(w.a,{})})})]},e.appid)})),Object(U.jsx)("div",{ref:E})]}),Object(U.jsx)(ae,{game:g,onClose:m,onSelect:G})]})}var oe=a(281),le=a(220),de=a(291),je=a(290),ue=a(106),be=a(292),pe=a(289),he=a(124),ge=a.n(he),me=a(285),Oe=a(286),xe=a(309),fe=a(305),ve=a(287),ye=a(288),Ce=a(91),we=a(105),ke=a.n(we),Se=a(123),Ne=a.n(Se),Ie=Object(O.a)((function(e){return{root:{width:"70%"},media:{height:300,width:500},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},avatar:{backgroundColor:Ce.a[500]},heading:{fontSize:e.typography.pxToRem(15),fontWeight:e.typography.fontWeightRegular}}}));function Pe(e){var t=e.user,a=e.games,c=Ie(),r=Object(n.useState)(["games"]),s=Object(o.a)(r,2),i=s[0],l=s[1],d=function(e){return function(t,a){l(a?[].concat(Object(H.a)(i),[e]):i.filter((function(t){return t!==e})))}};return Object(U.jsxs)(me.a,{className:c.root,children:[Object(U.jsx)(Oe.a,{avatar:Object(U.jsx)(xe.a,{"aria-label":"recipe",className:c.avatar,style:{backgroundColor:t.color},children:t.name?t.name.substring(0,1):t.userId}),action:Object(U.jsx)(y.a,{"aria-label":"settings",children:Object(U.jsx)(Ne.a,{})}),title:t.name||t.userId,subheader:(new Date).toLocaleDateString("en-GB",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}),Object(U.jsxs)(fe.a,{expanded:i.includes("games"),onChange:d("games"),children:[Object(U.jsx)(ve.a,{expandIcon:Object(U.jsx)(ke.a,{color:"secondary",fontSize:"large"}),"aria-controls":"panel-games-content",id:"panel-games-header",children:Object(U.jsx)(G.a,{className:c.heading,children:"Games"})}),Object(U.jsx)(ye.a,{children:Object(U.jsx)(ie,{fixedHeight:!1,elPerRow:8,gameData:a.filter((function(e){return t.games.includes(e.appid)}))})})]}),Object(U.jsxs)(fe.a,{expanded:i.includes("recommendations"),onChange:d("recommendations"),children:[Object(U.jsx)(ve.a,{expandIcon:Object(U.jsx)(ke.a,{color:"secondary",fontSize:"large"}),"aria-controls":"panel-recommendations-content",id:"panel-recommendations-header",children:Object(U.jsx)(G.a,{className:c.heading,children:"Recommendations"})}),Object(U.jsx)(ye.a,{children:Object(U.jsx)(G.a,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."})})]})]})}var Te=Object(O.a)((function(e){return{root:{width:"100%",display:"flex",paddingTop:e.spacing(4),paddingBottom:e.spacing(8),justifyContent:"center",alignItems:"top",background:e.palette.background.default},listContainer:{width:"100%",display:"flex",justifyContent:"center"},listContainerNarrow:{width:"25%",display:"flex",justifyContent:"center"},list:{backgroundColor:e.palette.background.paper},paper:{padding:e.spacing(2),width:"95%",display:"flex",overflow:"auto",flexDirection:"column"},avatar:{height:50}}}));function Be(e){var t=e.gameData,a=Te(),c=Object(n.useState)(null),r=Object(o.a)(c,2),s=r[0],i=r[1];return Object(U.jsxs)("div",{className:a.root,children:[Object(U.jsx)("div",{className:s?a.listContainerNarrow:a.listContainer,children:Object(U.jsx)(ue.a,{className:a.paper,elevation:3,children:Object(U.jsx)(oe.a,{dense:!0,className:a.list,children:Object(U.jsx)(u.a,{path:"/users/",children:function(e){return null==e.value?Object(U.jsx)(pe.a,{color:"secondary"}):e.value.map((function(e){var t=e.userId,c=e.name,r=e.games,o=e.color,l="checkbox-list-secondary-label-".concat(t);return Object(U.jsxs)(n.Fragment,{children:[Object(U.jsxs)(le.a,{button:!0,onClick:function(){return i(e)},selected:null!=s&&s.userId===t,children:[Object(U.jsx)(je.a,{children:Object(U.jsx)(ge.a,{className:a.avatar,style:{color:o}})}),Object(U.jsx)(de.a,{id:l,primary:(c?"".concat(c,", "):" ")+"User ID: ".concat(t)}),Object(U.jsx)(de.a,{primary:"Games: ".concat(r.length)})]},t),Object(U.jsx)(be.a,{variant:"inset",component:"li"})]},{userId:t})}))}})})})}),null!=s&&Object(U.jsx)(Pe,{user:s,games:t})]})}var De=a(58),Re=a(218),Ee=a(224),Le=a(222),We=a(293),_e=a(219),ze=Object(O.a)((function(e){return{paper:Object(De.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)}),stepper:{padding:e.spacing(3,0,5)},buttons:{display:"flex",justifyContent:"flex-end"},button:{marginTop:e.spacing(3),marginLeft:e.spacing(1)},grid:{marginBottom:e.spacing(3)},formControl:{margin:e.spacing(1)}}}));function Fe(e){var t=e.gameData,a=ze(),c=Object(n.useContext)(M),r=c.state,s=c.dispatch;return Object(U.jsxs)(ue.a,{className:a.paper,children:[Object(U.jsxs)(ce.a,{container:!0,spacing:3,className:a.grid,children:[Object(U.jsx)(ce.a,{item:!0,xs:12,children:Object(U.jsxs)(G.a,{component:"h1",variant:"h6",align:"center",children:["ID: ",r.user.userId,", Created at: ",r.user.created]})}),Object(U.jsx)(ce.a,{item:!0,xs:12,sm:6,children:Object(U.jsx)(re.a,{required:!0,id:"name",error:""===r.user.name,value:r.user.name,color:"secondary",name:"name",label:"Your Name",fullWidth:!0,autoComplete:"given-name",helperText:"Please provide some kind of username",onChange:function(e){s({type:Q,value:Object(i.a)(Object(i.a)({},r.user),{},{name:e.target.value})})}})}),Object(U.jsx)(ce.a,{item:!0,xs:12,sm:6,children:Object(U.jsxs)(Re.a,{className:a.formControl,children:[Object(U.jsx)(Ee.a,{id:"color-select-label",color:"secondary",children:"Color"}),Object(U.jsxs)(Le.a,{labelId:"color-select-label",id:"color-select",color:"secondary",value:r.user.color,style:{backgroundColor:r.user.color},onChange:function(e){s({type:Q,value:Object(i.a)(Object(i.a)({},r.user),{},{color:e.target.value})})},children:[Object(U.jsx)(We.a,{value:"#d32f2f",style:{backgroundColor:"#d32f2f"},children:Object(U.jsx)("span",{children:"Red"})}),Object(U.jsx)(We.a,{value:"#c2185b",style:{backgroundColor:"#c2185b"},children:Object(U.jsx)("span",{children:"Pink"})}),Object(U.jsx)(We.a,{value:"#7b1fa2",style:{backgroundColor:"#7b1fa2"},children:Object(U.jsx)("span",{children:"Purple"})}),Object(U.jsx)(We.a,{value:"#512da8",style:{backgroundColor:"#512da8"},children:Object(U.jsx)("span",{children:"Deep Purple"})}),Object(U.jsx)(We.a,{value:"#303f9f",style:{backgroundColor:"#303f9f"},children:Object(U.jsx)("span",{children:"Indigo"})}),Object(U.jsx)(We.a,{value:"#1976d2",style:{backgroundColor:"#1976d2"},children:Object(U.jsx)("span",{children:"Blue"})}),Object(U.jsx)(We.a,{value:"#0288d1",style:{backgroundColor:"#0288d1"},children:Object(U.jsx)("span",{children:"Light Blue"})}),Object(U.jsx)(We.a,{value:"#0097a7",style:{backgroundColor:"#0097a7"},children:Object(U.jsx)("span",{children:"Cyan"})}),Object(U.jsx)(We.a,{value:"#00796b",style:{backgroundColor:"#00796b"},children:Object(U.jsx)("span",{children:"Teal"})}),Object(U.jsx)(We.a,{value:"#388e3c",style:{backgroundColor:"#388e3c"},children:Object(U.jsx)("span",{children:"Green"})}),Object(U.jsx)(We.a,{value:"#fbc02d",style:{backgroundColor:"#fbc02d"},children:Object(U.jsx)("span",{children:"Yellow"})}),Object(U.jsx)(We.a,{value:"#f57c00",style:{backgroundColor:"#f57c00"},children:Object(U.jsx)("span",{children:"Orange"})}),Object(U.jsx)(We.a,{value:"#e64a19",style:{backgroundColor:"#e64a19"},children:Object(U.jsx)("span",{children:"Deep Orange"})})]}),Object(U.jsx)(_e.a,{children:"Color assigned to your user"})]})})]}),Object(U.jsx)(G.a,{component:"h1",variant:"h6",align:"center",children:"Your games"}),Object(U.jsx)(ie,{fixedHeight:!1,elPerRow:8,gameData:t.filter((function(e){return r.user.games.includes(e.appid)}))})]})}function Ge(e){var t=e.runMutation,a=Object(n.useContext)(M).state;return Object(n.useEffect)((function(){t(Object(i.a)({},a.user))}),[a.user,t]),""}var He=Object(O.a)((function(e){return{root:{display:"flex",flexWrap:"wrap",justifyContent:"space-around",overflow:"hidden",backgroundColor:e.palette.background.paper,width:"100%"}}}));var Ue=function(){var e=He(),t=Object(n.useContext)(M).state,a=Object(n.useState)([]),c=Object(o.a)(a,2),r=c[0],s=c[1];return Object(n.useEffect)((function(){d.a.parse("/Recommendation-With-Transformers/app_id_info.csv",{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){s(e.data)}})}),[]),Object(U.jsxs)(u.c,Object(i.a)(Object(i.a)({},b),{},{firebase:j.a,children:[Object(U.jsxs)("div",{className:e.root,children:[t.menu===p&&Object(U.jsx)(ie,{gameData:r,showSearch:!0}),t.menu===h&&Object(U.jsx)(Be,{gameData:r}),t.menu===m&&Object(U.jsx)(Fe,{gameData:r})]}),Object(U.jsx)(u.b,{type:"set",path:"/users/".concat(t.user.userId),children:function(e){var t=e.runMutation;return Object(U.jsx)(Ge,{runMutation:t})}})]}))},Ae=a(298),Me=a(306),Ye=a(307),Je=a(304),Ke=a(299),qe=a(300),Qe=a(303),Ve=a(294),Xe=a(301),Ze=a(125),$e=a.n(Ze),et=a(127),tt=a.n(et),at=a(126),nt=a.n(at),ct=a(93),rt=a(295),st=a(92),it=a(296),ot=a(132),lt=a(297),dt=a(302),jt=a(128),ut=a.n(jt),bt=a(129),pt=a.n(bt),ht=a(130),gt=a.n(ht);function mt(){return Object(U.jsxs)(G.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyrights \xa9 ",Object(U.jsx)(Ve.a,{color:"inherit",href:"https://github.com/tugot17/Recommendation-With-Transformers",children:"Recommendation With Transformers"})," ",(new Date).getFullYear(),"."]})}var Ot=Object(O.a)((function(e){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(i.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(De.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:e.spacing(7)},e.breakpoints.up("sm"),{width:e.spacing(9)}),appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{padding:0,height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 60px)")},stickyCopyright:{position:"fixed",bottom:0,left:"50%",transform:"translate(-50%, -8px)"}}}));function xt(e){var t=e.children,a=Object(n.useState)(!1),c=Object(o.a)(a,2),r=c[0],s=c[1],i=Object(n.useState)(!0),l=Object(o.a)(i,2),d=l[0],j=l[1],u=Object(n.useContext)(M),b=u.state,O=u.dispatch,x=d?"dark":"light",f=d?ct.a[900]:rt.a[600],v=d?st.a[900]:it.a[500],C=Object(ot.a)({palette:{type:x,primary:{main:f},secondary:{main:v}}}),w=Ot();return Object(U.jsx)(lt.a,{theme:C,children:Object(U.jsxs)("div",{className:w.root,children:[Object(U.jsx)(Ae.a,{}),Object(U.jsx)(Ke.a,{position:"absolute",className:Object(ne.a)(w.appBar,r&&w.appBarShift),children:Object(U.jsxs)(qe.a,{className:w.toolbar,children:[Object(U.jsx)(y.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){s(!0)},className:Object(ne.a)(w.menuButton,r&&w.menuButtonHidden),children:Object(U.jsx)($e.a,{})}),Object(U.jsxs)(G.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:w.title,children:[b.menu===p&&"Games",b.menu===h&&"Users",b.menu===g&&"Dashboard",b.menu===m&&"Profile"]}),Object(U.jsx)(Me.a,{checked:d,onChange:function(){j(!d)}}),Object(U.jsx)(y.a,{color:"inherit",onClick:function(){O({type:J,value:m})},children:Object(U.jsx)(Xe.a,{badgeContent:b.user.games.length,color:"secondary",children:Object(U.jsx)(nt.a,{})})})]})}),Object(U.jsxs)(Ye.a,{variant:"permanent",classes:{paper:Object(ne.a)(w.drawerPaper,!r&&w.drawerPaperClose)},open:r,children:[Object(U.jsx)("div",{className:w.toolbarIcon,children:Object(U.jsx)(y.a,{onClick:function(){s(!1)},children:Object(U.jsx)(tt.a,{})})}),Object(U.jsx)(be.a,{}),Object(U.jsx)(oe.a,{children:Object(U.jsxs)("div",{children:[Object(U.jsxs)(le.a,{button:!0,selected:b.menu===p,onClick:function(){O({type:J,value:p})},children:[Object(U.jsx)(dt.a,{children:Object(U.jsx)(ut.a,{})}),Object(U.jsx)(de.a,{primary:"Games"})]}),Object(U.jsxs)(le.a,{button:!0,selected:b.menu===h,onClick:function(){O({type:J,value:h})},children:[Object(U.jsx)(dt.a,{children:Object(U.jsx)(pt.a,{})}),Object(U.jsx)(de.a,{primary:"Users"})]}),Object(U.jsxs)(le.a,{button:!0,selected:b.menu===g,onClick:function(){O({type:J,value:g})},children:[Object(U.jsx)(dt.a,{children:Object(U.jsx)(gt.a,{})}),Object(U.jsx)(de.a,{primary:"Stats"})]})]})}),Object(U.jsx)(be.a,{})]}),Object(U.jsxs)("main",{className:w.content,children:[Object(U.jsx)("div",{className:w.appBarSpacer}),Object(U.jsx)(Qe.a,{maxWidth:"xl",className:w.container,children:t}),Object(U.jsx)(Je.a,{pt:4,className:w.stickyCopyright,children:Object(U.jsx)(mt,{})})]})]})})}var ft=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,310)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(U.jsx)(c.a.StrictMode,{children:Object(U.jsx)(V,{children:Object(U.jsx)(xt,{children:Object(U.jsx)(Ue,{})})})}),document.getElementById("root")),ft()}},[[212,1,2]]]);
//# sourceMappingURL=main.f2876d9e.chunk.js.map