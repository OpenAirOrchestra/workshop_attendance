(this.webpackJsonptake_attendance=this.webpackJsonptake_attendance||[]).push([[0],{18:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(13),c=n.n(a),s=(n(18),n(1)),i=n.n(s),u=n(5),o=n(4),d=n(3),l=n(8),j=n(9),b={attendanceService:null,eventService:null,userService:null},f=n(6),p=n(7),h=function(){function e(){Object(f.a)(this,e)}return Object(p.a)(e,[{key:"serviceLocation",value:function(){return"../../../../?rest_route=/workshop_attendance/v1/attendees"}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n,r){var a,c,s,u;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new URLSearchParams({page:t,per_page:n}),r&&a.set("search",r),c=this.serviceLocation()+"&"+a.toString(),e.next=5,fetch(c);case 5:if((s=e.sent).ok){e.next=12;break}return e.next=9,s.text();case 9:return u=e.sent,alert("Failed to get attendees Response: "+s.status+" "+s.statusText+"\n"+u),e.abrupt("return",s.error());case 12:return e.abrupt("return",s.json());case 13:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.serviceLocation()+"/"+t,e.next=3,fetch(n);case 3:if((r=e.sent).ok){e.next=10;break}return e.next=7,r.text();case 7:return a=e.sent,alert("Failed to get attendee "+t+", Response: "+r.status+" "+r.statusText+"\n"+a),e.abrupt("return",r.error());case 10:return e.abrupt("return",r.json());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.serviceLocation(),e.next=3,fetch(n,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 3:if((r=e.sent).ok){e.next=10;break}return e.next=7,r.text();case 7:return a=e.sent,alert("Failed to create attendance record, Response: "+r.status+" "+r.statusText+"\n"+a),e.abrupt("return",r.error());case 10:return e.abrupt("return",r.json());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.serviceLocation()+"/"+t,e.next=3,fetch(n,{method:"DELETE",mode:"cors"});case 3:if((r=e.sent).ok){e.next=10;break}return e.next=7,r.text();case 7:return a=e.sent,alert("Failed to create attendance record, Response: "+r.status+" "+r.statusText+"\n"+a),e.abrupt("return",r.error());case 10:return e.abrupt("return",Promise.resolve(r));case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),v=h,O=function(){function e(){Object(f.a)(this,e)}return Object(p.a)(e,[{key:"serviceLocation",value:function(){return"../../../../?rest_route=/workshop_attendance/v1/events"}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n,r){var a,c,s,u,o,d,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new URLSearchParams({page:t,per_page:n}),r&&(c=r.getTimezoneOffset(),s=new Date(r.getTime()-60*c*1e3),u=s.toISOString().substring(0,10),a.set("search",u)),o=this.serviceLocation()+"&"+a.toString(),e.next=5,fetch(o);case 5:if((d=e.sent).ok){e.next=12;break}return e.next=9,d.text();case 9:return l=e.sent,alert("Failed to get workshops Response: "+d.status+" "+d.statusText+"\n"+l),e.abrupt("return",d.error());case 12:return e.abrupt("return",d.json());case 13:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.serviceLocation()+"/"+t,e.next=3,fetch(n);case 3:if((r=e.sent).ok){e.next=10;break}return e.next=7,r.text();case 7:return a=e.sent,alert("Failed to get workshop "+t+", Response: "+r.status+" "+r.statusText+"\n"+a),e.abrupt("return",r.error());case 10:return e.abrupt("return",r.json());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.serviceLocation(),e.next=3,fetch(n,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 3:if((r=e.sent).ok){e.next=10;break}return e.next=7,r.text();case 7:return a=e.sent,alert("Failed to create workshop, Response: "+r.status+" "+r.statusText+"\n"+a),e.abrupt("return",r.error());case 10:return e.abrupt("return",r.json());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),x=O,m=function(){function e(){Object(f.a)(this,e)}return Object(p.a)(e,[{key:"serviceLocation",value:function(){return"../../../../?rest_route=/wp/v2/users"}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n){var r,a,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URLSearchParams({page:t,per_page:n}),a=this.serviceLocation()+"&"+r.toString(),e.next=4,fetch(a);case 4:if((c=e.sent).ok){e.next=11;break}return e.next=8,c.text();case 8:return s=e.sent,alert("Failed to list users, Response: "+c.status+" "+c.statusText+"\n"+s),e.abrupt("return",c.error());case 11:return e.abrupt("return",c.json());case 12:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),g=m,k=n(0),w=function(e){var t=e.name,n=t?"Attendance for "+t:"Loading...";return Object(k.jsx)("div",{className:"Header",children:Object(k.jsx)("h1",{children:n})})};var y=function(e){var t=e.searchTerm,n=e.setSearchTerm,r=e.filterRecent,a=e.setFilterRecent,c=e.filterOld,s=e.setFilterOld,i=e.filterNew,u=e.setFilterNew,o=e.filterPresent,d=e.setFilterPresent;return Object(k.jsx)("div",{className:"SearchBar",children:Object(k.jsxs)("form",{children:[Object(k.jsx)("input",{type:"text",name:"search",placeholder:"\ud83d\udd0d",value:t,onChange:function(e){return n(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("input",{type:"checkbox",name:"recent",id:"recent",checked:!!r,onChange:function(e){return a(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"recent",children:"recent"}),Object(k.jsx)("input",{type:"checkbox",name:"old",id:"old",checked:!!c,onChange:function(e){return s(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"old",children:"rusty"}),Object(k.jsx)("input",{type:"checkbox",name:"new",id:"new",checked:!!i,onChange:function(e){return u(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"new",children:"new folks"}),Object(k.jsx)("input",{type:"checkbox",name:"attendees",id:"attendees",checked:!!o,onChange:function(e){return d(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"attendees",children:"attendees"})]})})};var S=function(e){var t=e.attendee,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,c=e.deleteAttendanceRecord,s=_(t),i=n[s],u=t.event_id&&t.event_id===r,o=t.notes?Object(k.jsxs)("div",{children:[" ",t.notes," "]}):"",d=t.phone?Object(k.jsxs)("span",{children:[" ",t.phone," "]}):"",l=t.email?Object(k.jsxs)("span",{children:[" ",t.email," "]}):"",j=u?"\u2714":"\u274c",b=u?"present":"absent",f=i?"pending":"",p=Object(k.jsxs)("div",{children:[o,l,d]}),h=i?Object(k.jsx)("span",{className:"pending-spinner"}):"",v=t.user_id&&t.lastname?t.lastname.charAt(0):t.lastname;return Object(k.jsxs)("tr",{className:"AttendanceRecord  "+b+" "+f,onClick:function(){u&&!i?c(t):i||a(t)},children:[Object(k.jsxs)("td",{className:"attendee",children:[t.firstname+" "+v,Object(k.jsx)("div",{className:"details",children:p})]}),Object(k.jsxs)("td",{className:"presence",children:[h,Object(k.jsx)("span",{className:"presenceIcon",children:j})]})]})};function _(e){var t=e.user_id;return t&&"0"!==t||(t=e.firstname+"."+e.lastname),t}var L=function(e){var t=e.attendees,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,c=e.deleteAttendanceRecord,s=t.sort((function(e,t){var n=e.firstname.toLowerCase(),r=t.firstname.toLowerCase();if(n.toLowerCase()>r.toLowerCase())return 1;if(n.toLowerCase()>r.toLowerCase())return-1;var a=e.lastname?e.lastname.toLowerCase():"",c=t.lastname?t.lastname.toLowerCase():"";return a.toLowerCase()>c.toLowerCase()?1:a.toLowerCase()>c.toLowerCase()?-1:0})).map((function(e){return Object(k.jsx)(S,{attendee:e,event_id:r,pendingMap:n,addAttendanceRecord:a,deleteAttendanceRecord:c},_(e))}));return Object(k.jsx)("div",{className:"AttendanceList",children:Object(k.jsx)("table",{children:Object(k.jsx)("tbody",{children:s})})})};var R=function(e){var t=e.hideAttendeeForm,n=e.addAttendanceRecord,a=Object(r.useState)(""),c=Object(o.a)(a,2),s=c[0],i=c[1],u=Object(r.useState)(""),d=Object(o.a)(u,2),l=d[0],j=d[1],b=Object(r.useState)(""),f=Object(o.a)(b,2),p=f[0],h=f[1],v=Object(r.useState)(""),O=Object(o.a)(v,2),x=O[0],m=O[1],g=Object(r.useState)(""),w=Object(o.a)(g,2),y=w[0],S=w[1];if(t)return null;return Object(k.jsxs)("div",{className:"NewAttendeeForm",children:[Object(k.jsx)("h2",{children:"Add New Attendee"}),Object(k.jsxs)("form",{action:"",children:[Object(k.jsx)("label",{htmlFor:"firstname",children:"First Name (required):"}),Object(k.jsx)("input",{type:"text",name:"firstname",id:"firstname",className:"required",value:s,onChange:function(e){return i(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"lastname",children:"Last Name (required): "}),Object(k.jsx)("input",{type:"text",name:"lastname",id:"lastname",className:"required",value:l,onChange:function(e){return j(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(k.jsx)("input",{type:"text",name:"email",id:"email",value:p,onChange:function(e){return h(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"phone",children:"Phone:"}),Object(k.jsx)("input",{type:"text",name:"phone",id:"phone",value:x,onChange:function(e){return m(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"notes",children:"Notes:"}),Object(k.jsx)("br",{}),Object(k.jsx)("textarea",{name:"notes",id:"notes",value:y,onChange:function(e){return S(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("div",{className:"centered",children:Object(k.jsx)("input",{type:"submit",value:"Add",disabled:!(s&&l),onClick:function(){!function(e,t,n,r,a,c,s,i,u,o,d,l){e({firstname:t,lastname:r,email:c,phone:i,notes:o}),n(""),a(""),s(""),u(""),d("")}(n,s,i,l,j,p,h,x,m,y,S)}})})]})]})};var F=function(e){if(!e.isLoading)return null;return Object(k.jsx)("div",{className:"Loading",children:Object(k.jsx)("div",{className:"inner",children:Object(k.jsx)("div",{className:"spinner"})})})};var N=function(e){var t,n=Object(r.useState)(0),a=Object(o.a)(n,2),c=a[0],s=a[1],i=Object(r.useState)(!0),u=Object(o.a)(i,2),d=u[0],b=u[1],f=Object(r.useState)(""),p=Object(o.a)(f,2),h=p[0],v=p[1],O=Object(r.useState)(!1),x=Object(o.a)(O,2),m=x[0],g=x[1],S=Object(r.useState)(!1),N=Object(o.a)(S,2),T=N[0],M=N[1],q=Object(r.useState)(!1),I=Object(o.a)(q,2),J=I[0],U=I[1],z=Object(r.useState)(!1),B=Object(o.a)(z,2),H=B[0],W=B[1],G=Object(r.useState)(null),K=Object(o.a)(G,2),Q=K[0],V=K[1],X=Object(r.useState)([]),Y=Object(o.a)(X,2),Z=Y[0],$=Y[1],ee=Object(r.useState)([]),te=Object(o.a)(ee,2),ne=te[0],re=te[1],ae=Object(r.useState)(null),ce=Object(o.a)(ae,2),se=ce[0],ie=ce[1],ue=Object(r.useState)([]),oe=Object(o.a)(ue,2),de=oe[0],le=oe[1],je=Object(r.useState)([]),be=Object(o.a)(je,2),fe=be[0],pe=be[1],he=Object(r.useState)(null),ve=Object(o.a)(he,2),Oe=ve[0],xe=ve[1],me={},ge=Object(j.a)(fe);try{for(ge.s();!(t=ge.n()).done;){var ke=t.value,we=_(ke);me[we]=ke}}catch(Le){ge.e(Le)}finally{ge.f()}Object(r.useEffect)((function(){E()})),Object(r.useEffect)((function(){c||function(e){D.apply(this,arguments)}(s)}),[c]),Object(r.useEffect)((function(){d&&c&&function(e,t,n,r,a,c,s){C.apply(this,arguments)}(c,b,V,$,re,ie,le)}),[d,c]);var ye=function(e,t){var n=t?t.toLowerCase().replace(/\s+/g,""):null,r=e;n&&(r=r.filter((function(e){return Object.values(e).map((function(e){return String(e).toLowerCase()})).join().replace(/\s+/g,"").includes(n)})));return r}(function(e,t,n,r,a){var c,s={},i=Object(j.a)(t);try{for(i.s();!(c=i.n()).done;){var u=c.value,o={user_id:u.id,firstname:"",lastname:""};u.nickname?o.firstname=u.nickname:u.first_name?(o.firstname=u.first_name,u.last_name&&(o.lastname=u.last_name)):u.name&&(o.firstname=u.name),u.description&&(o.notes=u.description),s[u.id]=o}}catch(Le){i.e(Le)}finally{i.f()}var d,b=Object(j.a)(n);try{for(b.s();!(d=b.n()).done;){var f=d.value;if(f.event_id!==e){var p=_(f),h=s[p];(h=h?Object(l.a)({},h):Object(l.a)({},f)).id=f.id,h.notes||(h.notes=f.notes),h.event_id=f.event_id,s[p]=h}}}catch(Le){b.e(Le)}finally{b.f()}var v,O=Object(j.a)(r);try{for(O.s();!(v=O.n()).done;){var x=v.value,m=_(x),g=s[m];(g=g?Object(l.a)({},g):Object(l.a)({},x)).id=x.id,g.event_id=x.event_id,x.phone&&!g.phone&&(g.phone=x.phone),x.user_id&&!g.user_id&&(g.user_id=x.user_id),x.user_id&&!g.user_id&&(g.user_id=x.user_id),x.firstname&&!g.firstname&&(g.firstname=x.firstname),x.lastname&&!g.lastname&&(g.lastname=x.lastname),x.notes&&!g.notes&&(g.notes=x.notes),s[m]=g}}catch(Le){O.e(Le)}finally{O.f()}var k,w=Object(j.a)(a);try{for(w.s();!(k=w.n()).done;){var y=k.value,S=_(y),L=s[S];L=L?Object(l.a)({},L):Object(l.a)({},y),s[S]=L}}catch(Le){w.e(Le)}finally{w.f()}var R=Object.values(s);return R||[]}(c,Z,ne,de,fe),h),Se=function(e,t,n,r,a,c,s){var i=t;(r||c||a||s)&&(i=i.filter((function(t){if(c&&(!t.user_id||"0"===t.user_id))return!0;if(s&&t.event_id&&t.event_id===e)return!0;if(r||a){var i=_(t),u=n.has(i);if(r&&u)return!0;if(a&&!u)return!0}return!1})));return i}(c,ye,se,m,T,J,H),_e=!d&&(J||H||!m);return Object(k.jsxs)("div",{className:"AttendanceSheet",children:[Object(k.jsx)(w,{name:Q?Q.title:""}),Object(k.jsx)(y,{searchTerm:h,setSearchTerm:v,filterRecent:m,setFilterRecent:g,filterOld:T,setFilterOld:M,filterNew:J,setFilterNew:U,filterPresent:H,setFilterPresent:W}),Object(k.jsx)(L,{attendees:Se,event_id:c,pendingMap:me,addAttendanceRecord:function(e){xe(A(c,e,Oe,fe,pe,le))},deleteAttendanceRecord:function(e){xe(function(e,t,n,r,a,c,s){return P.apply(this,arguments)}(c,e,Oe,fe,pe,re,le))}}),Object(k.jsx)(R,{hideAttendeeForm:!_e,addAttendanceRecord:function(e){xe(A(c,e,Oe,fe,pe,le))}}),Object(k.jsx)(F,{isLoading:d})]})};function C(){return(C=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s,o){var d,l,f,p,h,v,O,x,m,g,k,w,y,S,L,R,F;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d=b.eventService,l=b.userService,f=b.attendanceService,e.next=5,d.get(t);case 5:p=e.sent,r(p),h=1,v=[],O=!0;case 10:return e.next=12,l.retrieve(h,100);case 12:x=e.sent,v=[].concat(Object(u.a)(v),Object(u.a)(x)),a(v),O=x.length>0,++h;case 17:if(O){e.next=10;break}case 18:return e.next=20,f.retrieve(1,50);case 20:m=e.sent,c(m),g=new Set,k=Object(j.a)(m);try{for(k.s();!(w=k.n()).done;)y=w.value,S=_(y),g.add(S)}catch(i){k.e(i)}finally{k.f()}s(g),h=1,L=[],R=!0;case 29:return e.next=31,f.retrieve(h,100,t);case 31:F=e.sent,L=[].concat(Object(u.a)(L),Object(u.a)(F)),o(L),R=F.length>0,++h;case 36:if(R){e.next=29;break}case 37:n(!1);case 38:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(e,t,n,r,a,c){return T.apply(this,arguments)}function T(){return(T=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s){var o,d,j,f,p,h,v;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=b.attendanceService,(d=Object(u.a)(a)).push(n),c(d),o.pendingRecords=d,(j=Object(l.a)({},n)).event_id=t,j.id=void 0,e.next=10,o.create(j);case 10:return e.next=12,r;case 12:f=1,p=[],h=!0;case 15:return e.next=17,o.retrieve(f,100,t);case 17:v=e.sent,p=[].concat(Object(u.a)(p),Object(u.a)(v)),s(p),h=v.length>0,++f;case 22:if(h){e.next=15;break}case 23:d=Object(u.a)(o.pendingRecords).filter((function(e){return e!==n})),c(d),o.pendingRecords=d,Promise.resolve(n);case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s,o){var d,l,j,f,p,h,v,O;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d=b.attendanceService,(l=Object(u.a)(a)).push(n),c(l),d.pendingRecords=l,j=n.id,e.next=8,d.delete(j);case 8:return e.next=10,r;case 10:return e.next=12,d.retrieve(1,50);case 12:f=e.sent,s(f),p=1,h=[],v=!0;case 17:return e.next=19,d.retrieve(p,100,t);case 19:O=e.sent,h=[].concat(Object(u.a)(h),Object(u.a)(O)),o(h),v=O.length>0,++p;case 24:if(v){e.next=17;break}case 25:l=Object(u.a)(d.pendingRecords).filter((function(e){return e!==n})),c(l),d.pendingRecords=l,Promise.resolve(n);case 29:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){b.userService||(b.eventService=new x,b.userService=new g,b.attendanceService=new v)}function D(){return(D=Object(d.a)(i.a.mark((function e(t){var n,r,a,c,s,u,o,d,l,j,f,p,h,v;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=null)||(r=window.location.search,a=new URLSearchParams(r),n=a.get("event_id")),n){e.next=10;break}return E(),c=b.eventService,e.next=8,c.retrieve(1,100,new Date);case 8:1===(s=e.sent).length&&(n=s[0].id);case 10:if(n){e.next=24;break}return E(),u=b.eventService,o=new Date,d=o.getTimezoneOffset(),l=new Date(o.getTime()-60*d*1e3),j=l.toISOString().substring(0,10),f=navigator.languages[0],p=l.toLocaleDateString(f,{weekday:"long"})+" Workshop "+l.toLocaleDateString(f,{day:"numeric",month:"long",year:"numeric"}),h={date:j,title:p},e.next=22,u.create(h);case 22:v=e.sent,n=v.id;case 24:return t(n),e.abrupt("return",Promise.resolve(n));case 26:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(N,{})})}c.a.render(Object(k.jsx)(M,{}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.2ebf4891.chunk.js.map