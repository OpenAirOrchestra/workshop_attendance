(this.webpackJsonptake_attendance=this.webpackJsonptake_attendance||[]).push([[0],{18:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(13),c=n.n(a),s=(n(18),n(1)),i=n.n(s),o=n(5),u=n(4),d=n(3),l=n(8),h=n(9),j={attendanceService:null,eventService:null,userService:null},p=n(6),f=n(7),b=function(){function e(){Object(p.a)(this,e),this.deleteUnsupported=!1}return Object(f.a)(e,[{key:"serviceLocation",value:function(){var e=window.location.pathname.split("/");return"../../../../?rest_route=/"+e[e.length-3]+"/v1/attendees"}},{key:"restNonce",value:function(){var e=window.location.search;return new URLSearchParams(e).get("_wpnonce")}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n,r){var a,c,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new URLSearchParams({page:t,per_page:n,_wpnonce:this.restNonce()}),r&&a.set("search",r),c=this.serviceLocation()+"&"+a.toString(),e.next=5,fetch(c);case 5:if((s=e.sent).ok){e.next=8;break}throw new Error("Failed to get attendees Response: "+s.status+" "+s.statusText);case 8:return e.abrupt("return",s.json());case 9:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URLSearchParams({_wpnonce:this.restNonce()}),r=this.serviceLocation()+"/"+t+"&"+n.toString(),e.next=4,fetch(r);case 4:if((a=e.sent).ok){e.next=7;break}throw new Error("Failed to get attendee Response: "+a.status+" "+a.statusText);case 7:return e.abrupt("return",a.json());case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URLSearchParams({_wpnonce:this.restNonce()}),r=this.serviceLocation()+"&"+n.toString(),e.next=4,fetch(r,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 4:if((a=e.sent).ok){e.next=7;break}throw new Error("Failed to create attendance record Response: "+a.status+" "+a.statusText);case 7:return e.abrupt("return",a.json());case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a,c,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.id,r=null,this.deleteUnsupported){e.next=9;break}return a=new URLSearchParams({_wpnonce:this.restNonce()}),c=this.serviceLocation()+"/"+n+"&"+a.toString(),e.next=7,fetch(c,{method:"DELETE",mode:"cors"});case 7:(r=e.sent).ok||(this.deleteUnsupported=!0);case 9:if(!this.deleteUnsupported){e.next=15;break}return s=new URLSearchParams({method:"DELETE",_wpnonce:this.restNonce()}),o=this.serviceLocation()+"/"+n+"&"+s.toString(),e.next=14,fetch(o,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 14:r=e.sent;case 15:if(r.ok){e.next=17;break}throw new Error("Failed to delete attendee Response: "+r.status+" "+r.statusText);case 17:return e.abrupt("return",Promise.resolve(r));case 18:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),v=b,O=function(){function e(){Object(p.a)(this,e)}return Object(f.a)(e,[{key:"serviceLocation",value:function(){var e=window.location.pathname.split("/");return"../../../../?rest_route=/"+e[e.length-3]+"/v1/events"}},{key:"restNonce",value:function(){var e=window.location.search;return new URLSearchParams(e).get("_wpnonce")}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n,r){var a,c,s,o,u,d;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new URLSearchParams({page:t,per_page:n,_wpnonce:this.restNonce()}),r&&(c=r.getTimezoneOffset(),s=new Date(r.getTime()-60*c*1e3),o=s.toISOString().substring(0,10),a.set("search",o)),u=this.serviceLocation()+"&"+a.toString(),e.next=5,fetch(u);case 5:if((d=e.sent).ok){e.next=8;break}throw new Error("Failed to get workshops Response: "+d.status+" "+d.statusText);case 8:return e.abrupt("return",d.json());case 9:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URLSearchParams({_wpnonce:this.restNonce()}),r=this.serviceLocation()+"/"+t+"&"+n.toString(),e.next=4,fetch(r);case 4:if((a=e.sent).ok){e.next=7;break}throw new Error("Failed to get workshop Response: "+a.status+" "+a.statusText);case 7:return e.abrupt("return",a.json());case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(d.a)(i.a.mark((function e(t){var n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URLSearchParams({_wpnonce:this.restNonce()}),r=this.serviceLocation()+"&"+n.toString(),e.next=4,fetch(r,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 4:if((a=e.sent).ok){e.next=7;break}throw new Error("Failed to create workshop Response: "+a.status+" "+a.statusText);case 7:return e.abrupt("return",a.json());case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),m=O,x=function(){function e(){Object(p.a)(this,e)}return Object(f.a)(e,[{key:"serviceLocation",value:function(){return"../../../../?rest_route=/wp/v2/users"}},{key:"retrieve",value:function(){var e=Object(d.a)(i.a.mark((function e(t,n){var r,a,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URLSearchParams({page:t,per_page:n}),a=this.serviceLocation()+"&"+r.toString(),e.next=4,fetch(a);case 4:if((c=e.sent).ok){e.next=7;break}throw new Error("Failed to list users Response: "+c.status+" "+c.statusText);case 7:return e.abrupt("return",c.json());case 8:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),w=x,g=n(0),k=function(e){var t=e.name,n=e.url,r=Object(g.jsx)("h1",{children:"Loading..."});t&&(r=Object(g.jsxs)("h1",{children:[">Attendance for ",t]}));n&&t&&(r=Object(g.jsxs)("h1",{children:["Attendance for ",Object(g.jsx)("a",{href:n,children:t})]}));return Object(g.jsx)("div",{className:"Header",children:r})};var S=function(e){var t=e.searchTerm,n=e.setSearchTerm,r=e.filterRecent,a=e.setFilterRecent,c=e.filterOld,s=e.setFilterOld,i=e.filterNew,o=e.setFilterNew,u=e.filterPresent,d=e.setFilterPresent;return Object(g.jsx)("div",{className:"SearchBar",children:Object(g.jsxs)("form",{children:[Object(g.jsx)("input",{type:"text",name:"search",placeholder:"\ud83d\udd0d",value:t,onChange:function(e){return n(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("input",{type:"checkbox",name:"recent",id:"recent",checked:!!r,onChange:function(e){return a(e.target.checked)}}),Object(g.jsx)("label",{htmlFor:"recent",children:"recent"}),Object(g.jsx)("input",{type:"checkbox",name:"old",id:"old",checked:!!c,onChange:function(e){return s(e.target.checked)}}),Object(g.jsx)("label",{htmlFor:"old",children:"rusty"}),Object(g.jsx)("input",{type:"checkbox",name:"new",id:"new",checked:!!i,onChange:function(e){return o(e.target.checked)}}),Object(g.jsx)("label",{htmlFor:"new",children:"new folks"}),Object(g.jsx)("input",{type:"checkbox",name:"attendees",id:"attendees",checked:!!u,onChange:function(e){return d(e.target.checked)}}),Object(g.jsx)("label",{htmlFor:"attendees",children:"attendees"})]})})};var y=function(e){var t=e.attendee,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,c=e.deleteAttendanceRecord,s=_(t),i=n[s],o=t.event_id&&t.event_id===r,u=t.notes?Object(g.jsxs)("div",{children:[" ",t.notes," "]}):"",d=t.phone?Object(g.jsxs)("span",{children:[" ",t.phone," "]}):"",l=t.email?Object(g.jsxs)("span",{children:[" ",t.email," "]}):"",h=o?"\u2714":"\u274c",j=o?"present":"absent",p=i?"pending":"",f=Object(g.jsxs)("div",{children:[u,l,d]}),b=i?Object(g.jsx)("span",{className:"pending-spinner"}):"",v=t.lastname;return Object(g.jsxs)("tr",{className:"AttendanceRecord  "+j+" "+p,onClick:function(){o&&!i?c(t):i||a(t)},children:[Object(g.jsxs)("td",{className:"attendee",children:[t.firstname+" "+v,Object(g.jsx)("div",{className:"details",children:f})]}),Object(g.jsxs)("td",{className:"presence",children:[b,Object(g.jsx)("span",{className:"presenceIcon",children:h})]})]})};function _(e){var t=e.user_id;return t&&"0"!==t||(t=e.firstname+"."+e.lastname),t.toString()}var L=function(e){var t=e.attendees,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,c=e.deleteAttendanceRecord,s=t.sort((function(e,t){var n=e.firstname.toLowerCase(),r=t.firstname.toLowerCase();if(n.toLowerCase()>r.toLowerCase())return 1;if(n.toLowerCase()<r.toLowerCase())return-1;var a=e.lastname?e.lastname.toLowerCase():"",c=t.lastname?t.lastname.toLowerCase():"";return a.toLowerCase()>c.toLowerCase()?1:a.toLowerCase()<c.toLowerCase()?-1:0})).map((function(e){return Object(g.jsx)(y,{attendee:e,event_id:r,pendingMap:n,addAttendanceRecord:a,deleteAttendanceRecord:c},_(e))}));return Object(g.jsx)("div",{className:"AttendanceList",children:Object(g.jsx)("table",{children:Object(g.jsx)("tbody",{children:s})})})};var R=function(e){var t=e.hideAttendeeForm,n=e.addAttendanceRecord,a=Object(r.useState)(""),c=Object(u.a)(a,2),s=c[0],i=c[1],o=Object(r.useState)(""),d=Object(u.a)(o,2),l=d[0],h=d[1],j=Object(r.useState)(""),p=Object(u.a)(j,2),f=p[0],b=p[1],v=Object(r.useState)(""),O=Object(u.a)(v,2),m=O[0],x=O[1],w=Object(r.useState)(""),k=Object(u.a)(w,2),S=k[0],y=k[1];if(t)return null;return Object(g.jsxs)("div",{className:"NewAttendeeForm",children:[Object(g.jsx)("h2",{children:"Add New Attendee"}),Object(g.jsxs)("form",{action:"",children:[Object(g.jsx)("label",{htmlFor:"firstname",children:"First Name (required):"}),Object(g.jsx)("input",{type:"text",name:"firstname",id:"firstname",className:"required",value:s,onChange:function(e){return i(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("label",{htmlFor:"lastname",children:"Last Name (required): "}),Object(g.jsx)("input",{type:"text",name:"lastname",id:"lastname",className:"required",value:l,onChange:function(e){return h(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(g.jsx)("input",{type:"text",name:"email",id:"email",value:f,onChange:function(e){return b(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("label",{htmlFor:"phone",children:"Phone:"}),Object(g.jsx)("input",{type:"text",name:"phone",id:"phone",value:m,onChange:function(e){return x(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("label",{htmlFor:"notes",children:"Notes:"}),Object(g.jsx)("br",{}),Object(g.jsx)("textarea",{name:"notes",id:"notes",value:S,onChange:function(e){return y(e.target.value)}}),Object(g.jsx)("br",{}),Object(g.jsx)("div",{className:"centered",children:Object(g.jsx)("input",{type:"submit",value:"Add",disabled:!(s&&l),onClick:function(){!function(e,t,n,r,a,c,s,i,o,u,d,l){e({firstname:t,lastname:r,email:c,phone:i,notes:u}),n(""),a(""),s(""),o(""),d("")}(n,s,i,l,h,f,b,m,x,S,y)}})})]})]})};var N=function(e){if(!e.isLoading)return null;return Object(g.jsx)("div",{className:"Loading",children:Object(g.jsx)("div",{className:"inner",children:Object(g.jsx)("div",{className:"spinner"})})})};var C=function(e){var t,n=Object(r.useState)(0),a=Object(u.a)(n,2),c=a[0],s=a[1],i=Object(r.useState)(!0),o=Object(u.a)(i,2),d=o[0],j=o[1],p=Object(r.useState)(""),f=Object(u.a)(p,2),b=f[0],v=f[1],O=Object(r.useState)(!1),m=Object(u.a)(O,2),x=m[0],w=m[1],y=Object(r.useState)(!1),C=Object(u.a)(y,2),F=C[0],A=C[1],M=Object(r.useState)(!1),J=Object(u.a)(M,2),q=J[0],I=J[1],z=Object(r.useState)(!1),B=Object(u.a)(z,2),H=B[0],W=B[1],G=Object(r.useState)(null),K=Object(u.a)(G,2),Q=K[0],V=K[1],X=Object(r.useState)([]),Y=Object(u.a)(X,2),Z=Y[0],$=Y[1],ee=Object(r.useState)([]),te=Object(u.a)(ee,2),ne=te[0],re=te[1],ae=Object(r.useState)(null),ce=Object(u.a)(ae,2),se=ce[0],ie=ce[1],oe=Object(r.useState)([]),ue=Object(u.a)(oe,2),de=ue[0],le=ue[1],he=Object(r.useState)([]),je=Object(u.a)(he,2),pe=je[0],fe=je[1],be=Object(r.useState)(null),ve=Object(u.a)(be,2),Oe=ve[0],me=ve[1],xe={},we=Object(h.a)(pe);try{for(we.s();!(t=we.n()).done;){var ge=t.value,ke=_(ge);xe[ke]=ge}}catch(Re){we.e(Re)}finally{we.f()}Object(r.useEffect)((function(){U()})),Object(r.useEffect)((function(){c||function(e){D.apply(this,arguments)}(s)}),[c]),Object(r.useEffect)((function(){d&&c&&function(e,t,n,r,a,c,s){P.apply(this,arguments)}(c,j,V,$,re,ie,le)}),[d,c]);var Se=function(e,t){var n=t?t.toLowerCase().replace(/\s+/g,""):null,r=e;n&&(r=r.filter((function(e){return Object.values(e).map((function(e){return String(e).toLowerCase()})).join().replace(/\s+/g,"").includes(n)})));return r}(function(e,t,n,r,a){var c,s={},i=Object(h.a)(t);try{for(i.s();!(c=i.n()).done;){var o=c.value,u={user_id:o.id,firstname:"",lastname:""};o.first_name?(u.firstname=o.first_name,o.last_name&&(u.lastname=o.last_name)):o.nickname?u.firstname=o.nickname:o.name&&(u.firstname=o.name),o.description&&(u.notes=o.description),s[_(u)]=u}}catch(Re){i.e(Re)}finally{i.f()}var d,j=Object(h.a)(n);try{for(j.s();!(d=j.n()).done;){var p=d.value;if(p.event_id!==e){var f=_(p),b=s[f];(b=b?Object(l.a)({},b):Object(l.a)({},p)).id=p.id,b.notes||(b.notes=p.notes),b.event_id=p.event_id,s[f]=b}}}catch(Re){j.e(Re)}finally{j.f()}var v,O=Object(h.a)(r);try{for(O.s();!(v=O.n()).done;){var m=v.value,x=_(m),w=s[x];(w=w?Object(l.a)({},w):Object(l.a)({},m)).id=m.id,w.event_id=m.event_id,m.phone&&!w.phone&&(w.phone=m.phone),m.user_id&&!w.user_id&&(w.user_id=m.user_id),m.user_id&&!w.user_id&&(w.user_id=m.user_id),m.firstname&&!w.firstname&&(w.firstname=m.firstname),m.lastname&&!w.lastname&&(w.lastname=m.lastname),m.notes&&!w.notes&&(w.notes=m.notes),s[x]=w}}catch(Re){O.e(Re)}finally{O.f()}var g,k=Object(h.a)(a);try{for(k.s();!(g=k.n()).done;){var S=g.value,y=_(S),L=s[y];L=L?Object(l.a)({},L):Object(l.a)({},S),s[y]=L}}catch(Re){k.e(Re)}finally{k.f()}var R=Object.values(s);return R||[]}(c,Z,ne,de,pe),b),ye=function(e,t,n,r,a,c,s){var i=t;(r||c||a||s)&&(i=i.filter((function(t){if(c&&(!t.user_id||"0"===t.user_id))return!0;if(s&&t.event_id&&t.event_id===e)return!0;if(r||a){var i=_(t),o=n.has(i);if(r&&o)return!0;if(a&&!o)return!0}return!1})));return i}(c,Se,se,x,F,q,H),_e=!d&&(q||H||!x),Le=c?"../../../../wp-admin/admin.php?page=workshop&workshop="+c:null;return Object(g.jsxs)("div",{className:"AttendanceSheet",children:[Object(g.jsx)(k,{name:Q?Q.title:"",url:Le}),Object(g.jsx)(S,{searchTerm:b,setSearchTerm:v,filterRecent:x,setFilterRecent:w,filterOld:F,setFilterOld:A,filterNew:q,setFilterNew:I,filterPresent:H,setFilterPresent:W}),Object(g.jsx)(L,{attendees:ye,event_id:c,pendingMap:xe,addAttendanceRecord:function(e){me(T(c,e,Oe,pe,fe,le))},deleteAttendanceRecord:function(e){me(function(e,t,n,r,a,c,s){return E.apply(this,arguments)}(c,e,Oe,pe,fe,re,le))}}),Object(g.jsx)(R,{hideAttendeeForm:!_e,addAttendanceRecord:function(e){me(T(c,e,Oe,pe,fe,le))}}),Object(g.jsx)(N,{isLoading:d})]})};function F(e){window.confirm(e+"\nReload?")&&window.location.reload()}function P(){return(P=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s,u){var d,l,p,f,b,v,O,m,x,w,g,k,S,y,L,R,N;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,d=j.eventService,l=j.userService,p=j.attendanceService,e.next=6,d.get(t);case 6:f=e.sent,r(f),b=1,v=[],O=!0;case 11:return e.next=13,l.retrieve(b,100);case 13:m=e.sent,v=[].concat(Object(o.a)(v),Object(o.a)(m)),O=m.length>0,++b;case 17:if(O){e.next=11;break}case 18:return a(v),e.next=21,p.retrieve(1,50);case 21:x=e.sent,c(x),w=new Set,g=Object(h.a)(x);try{for(g.s();!(k=g.n()).done;)S=k.value,y=_(S),w.add(y)}catch(i){g.e(i)}finally{g.f()}s(w),b=1,L=[],R=!0;case 30:return e.next=32,p.retrieve(b,100,t);case 32:N=e.sent,L=[].concat(Object(o.a)(L),Object(o.a)(N)),R=N.length>0,++b;case 36:if(R){e.next=30;break}case 37:u(L),n(!1),e.next=44;break;case 41:e.prev=41,e.t0=e.catch(0),F(e.t0);case 44:case"end":return e.stop()}}),e,null,[[0,41]])})))).apply(this,arguments)}function T(e,t,n,r,a,c){return A.apply(this,arguments)}function A(){return(A=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s){var u,d,h,p,f,b,v;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u=j.attendanceService,(d=Object(o.a)(a)).push(n),c(d),u.pendingRecords=d,(h=Object(l.a)({},n)).event_id=t,h.id=void 0,e.next=11,u.create(h);case 11:return e.next=13,r;case 13:p=1,f=[],b=!0;case 16:return e.next=18,u.retrieve(p,100,t);case 18:v=e.sent,f=[].concat(Object(o.a)(f),Object(o.a)(v)),s(f),b=v.length>0,++p;case 23:if(b){e.next=16;break}case 24:d=Object(o.a)(u.pendingRecords).filter((function(e){return e!==n})),c(d),u.pendingRecords=d,Promise.resolve(n),e.next=33;break;case 30:e.prev=30,e.t0=e.catch(0),F(e.t0);case 33:case"end":return e.stop()}}),e,null,[[0,30]])})))).apply(this,arguments)}function E(){return(E=Object(d.a)(i.a.mark((function e(t,n,r,a,c,s,u){var d,l,h,p,f,b,v;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,d=j.attendanceService,(l=Object(o.a)(a)).push(n),c(l),d.pendingRecords=l,e.next=8,d.delete(n);case 8:return e.next=10,r;case 10:return e.next=12,d.retrieve(1,50);case 12:h=e.sent,s(h),p=1,f=[],b=!0;case 17:return e.next=19,d.retrieve(p,100,t);case 19:v=e.sent,f=[].concat(Object(o.a)(f),Object(o.a)(v)),u(f),b=v.length>0,++p;case 24:if(b){e.next=17;break}case 25:l=Object(o.a)(d.pendingRecords).filter((function(e){return e!==n})),c(l),d.pendingRecords=l,Promise.resolve(n),e.next=34;break;case 31:e.prev=31,e.t0=e.catch(0),F(e.t0);case 34:case"end":return e.stop()}}),e,null,[[0,31]])})))).apply(this,arguments)}function U(){j.userService||(j.eventService=new m,j.userService=new w,j.attendanceService=new v)}function D(){return(D=Object(d.a)(i.a.mark((function e(t){var n,r,a,c,s,o,u,d,l,h,p,f,b,v;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,(n=null)||(r=window.location.search,a=new URLSearchParams(r),n=a.get("event_id")),n){e.next=11;break}return U(),c=j.eventService,e.next=9,c.retrieve(1,100,new Date);case 9:1===(s=e.sent).length&&(n=s[0].id);case 11:if(n){e.next=25;break}return U(),o=j.eventService,u=new Date,d=u.getTimezoneOffset(),l=new Date(u.getTime()-60*d*1e3),h=l.toISOString().substring(0,10),p=navigator.languages[0],f=l.toLocaleDateString(p,{weekday:"long"})+" Workshop "+l.toLocaleDateString(p,{day:"numeric",month:"long",year:"numeric"}),b={date:h,title:f},e.next=23,o.create(b);case 23:v=e.sent,n=v.id;case 25:return t(n),e.abrupt("return",Promise.resolve(n));case 29:e.prev=29,e.t0=e.catch(0),F(e.t0);case 32:case"end":return e.stop()}}),e,null,[[0,29]])})))).apply(this,arguments)}function M(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(C,{})})}c.a.render(Object(g.jsx)(M,{}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.d8ae5138.chunk.js.map