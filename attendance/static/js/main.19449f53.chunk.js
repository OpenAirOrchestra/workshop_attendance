(this.webpackJsonptake_attendance=this.webpackJsonptake_attendance||[]).push([[0],{18:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(13),s=n.n(a),i=(n(18),n(2)),c=n.n(i),u=n(8),o=n(3),d=n(4),l=n(5),j=n(10),m={attendanceService:null,eventService:null,userService:null},b=n(6),h=n(7),f=function(){function e(){Object(b.a)(this,e),this.maxRecordId=1e3,this.pendingRecords=[],this.attendanceRecords=[{user_id:99,firstname:"Zaphod",lastname:"Beeblebrox",phone:"",email:"",notes:"Presedent of the Galaxy",event_id:300,id:199},{user_id:100,firstname:"Alice",lastname:"Atalan",phone:"",email:"",notes:"A Tuba",event_id:1e3,id:200},{user_id:101,firstname:"Bob",lastname:"Shamilov",phone:"",email:"",notes:"Bob is a fella",event_id:1e3,id:201},{user_id:102,firstname:"Charlie",lastname:"Khalil",phone:"",email:"",notes:"C Saxophone",event_id:1e3,id:202},{user_id:103,firstname:"Denise",lastname:"Usoyan",phone:"",email:"",notes:"",event_id:1e3,id:203},{user_id:104,firstname:"Ethan",lastname:"Adi",phone:"",email:"",notes:"F Flute",event_id:1e3,id:204},{user_id:105,firstname:"Francine",lastname:"Shavershian",phone:"",email:"",notes:"C Flute",id:205},{user_id:106,firstname:"Greg",lastname:"Mori",phone:"",email:"",notes:"Clarinet",id:206},{user_id:107,firstname:"Harry",lastname:"Tamoyan",phone:"",email:"",notes:"Bassoon",id:207},{user_id:108,firstname:"Ichabod",lastname:"Crane",phone:"",email:"",notes:"Trombone",id:208},{user_id:110,firstname:"Niel",lastname:"Armstrong",phone:"",email:"",notes:"Astronaut",event_id:10,id:300},{user_id:111,firstname:"Oprah",lastname:"Khario",phone:"",email:"",notes:"Celebrety",event_id:10,id:310},{user_id:112,firstname:"Peter",lastname:"Serdar",phone:"",email:"",notes:"Dude",event_id:10,id:320},{user_id:113,firstname:"Quinn",lastname:"Evdal",phone:"",email:"",notes:"Beatles",event_id:10,id:330},{firstname:"Sonny",lastname:"Bono",phone:"",email:"",notes:"Celebrity husband",event_id:1e3,id:340},{firstname:"Frank",lastname:"Zappa",phone:"",email:"",notes:"Guitar",event_id:1004,id:350}]}return Object(h.a)(e,[{key:"retrieve",value:function(){var e=Object(d.a)(c.a.mark((function e(t,n){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.attendanceRecords,t&&(r=r.filter((function(e){return e.event_id===t}))),n&&(r=r.slice(0,n)),e.next=5,new Promise((function(e){return setTimeout(e,1e3*Math.random())}));case 5:return e.abrupt("return",Promise.resolve(r));case 6:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<this.items.length)){e.next=7;break}if(this.attendanceRecords[n].id!==t){e.next=4;break}return e.abrupt("return",Promise.resolve(this.items[n]));case 4:n++,e.next=1;break;case 7:return e.abrupt("return",null);case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(d.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,1e3*Math.random())}));case 2:return++this.maxRecordId,(n=Object(l.a)({},t)).id=this.maxRecordId,this.attendanceRecords.push(n),e.abrupt("return",Promise.resolve(t));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(d.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,1e3*Math.random())}));case 2:return this.attendanceRecords=this.attendanceRecords.filter((function(e){return t!==e.id})),e.abrupt("return",Promise.resolve(t));case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),p=f,v=function(){function e(){Object(b.a)(this,e),this.events=[{id:1e3,title:"Workshop for 23 03 2011",date:"23 03 2011"},{id:205,title:"Workshop for 23 03 2011",date:"30 03 2011"},{id:206,title:"Workshop for 23 03 2011",date:"07 04 2011"},{id:207,title:"Workshop for 23 03 2011",date:"14 04 2011"}]}return Object(h.a)(e,[{key:"retrieve",value:function(){var e=Object(d.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.resolve(this.events));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(d.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=null,r=0;case 2:if(!(r<this.events.length)){e.next=9;break}if(this.events[r].id!==t){e.next=6;break}return n=this.events[r],e.abrupt("break",9);case 6:r++,e.next=2;break;case 9:if(!n){e.next=13;break}return e.next=12,new Promise((function(e){return setTimeout(e,1e3*Math.random())}));case 12:return e.abrupt("return",Promise.resolve(n));case 13:return e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),O=v,x=function(){function e(){Object(b.a)(this,e)}return Object(h.a)(e,[{key:"serviceLocation",value:function(){return"../../../../?rest_route=/wp/v2/users"}},{key:"retrieve",value:function(){var e=Object(d.a)(c.a.mark((function e(t,n){var r,a,s,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URLSearchParams({page:t,per_page:n}),a=this.serviceLocation()+"&"+r.toString(),e.next=4,fetch(a);case 4:if((s=e.sent).ok){e.next=11;break}return e.next=8,s.text();case 8:return i=e.sent,alert("Failed to list users, Response: "+s.status+" "+s.statusText+"\n"+i),e.abrupt("return",Promise.resolve([]));case 11:return e.abrupt("return",s.json());case 12:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),_=x,k=n(0),g=function(e){var t=e.name,n=t?"Attendance for "+t:"Loading...";return Object(k.jsx)("div",{className:"Header",children:Object(k.jsx)("h1",{children:n})})};var y=function(e){var t=e.searchTerm,n=e.setSearchTerm,r=e.filterRecent,a=e.setFilterRecent,s=e.filterOld,i=e.setFilterOld,c=e.filterNew,u=e.setFilterNew,o=e.filterPresent,d=e.setFilterPresent;return Object(k.jsx)("div",{className:"SearchBar",children:Object(k.jsxs)("form",{children:[Object(k.jsx)("input",{type:"text",name:"search",placeholder:"\ud83d\udd0d",value:t,onChange:function(e){return n(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("input",{type:"checkbox",name:"recent",id:"recent",checked:!!r,onChange:function(e){return a(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"recent",children:"recent"}),Object(k.jsx)("input",{type:"checkbox",name:"old",id:"old",checked:!!s,onChange:function(e){return i(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"old",children:"rusty"}),Object(k.jsx)("input",{type:"checkbox",name:"new",id:"new",checked:!!c,onChange:function(e){return u(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"new",children:"new folks"}),Object(k.jsx)("input",{type:"checkbox",name:"attendees",id:"attendees",checked:!!o,onChange:function(e){return d(e.target.checked)}}),Object(k.jsx)("label",{htmlFor:"attendees",children:"attendees"})]})})};var w=function(e){var t=e.attendee,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,s=e.deleteAttendanceRecord,i=S(t),c=n[i],u=t.event_id&&t.event_id===r,o=t.notes?Object(k.jsxs)("div",{children:[" ",t.notes," "]}):"",d=t.phone?Object(k.jsxs)("span",{children:[" ",t.phone," "]}):"",l=t.email?Object(k.jsxs)("span",{children:[" ",t.email," "]}):"",j=u?"\u2714":"\u274c",m=u?"present":"absent",b=c?"pending":"",h=Object(k.jsxs)("div",{children:[o,l,d]}),f=c?Object(k.jsx)("span",{className:"pending-spinner"}):"",p=t.user_id&&t.lastname?t.lastname.charAt(0):t.lastname;return Object(k.jsxs)("tr",{className:"AttendanceRecord  "+m+" "+b,onClick:function(){u&&!c?s(t):c||a(t)},children:[Object(k.jsxs)("td",{className:"attendee",children:[t.firstname+" "+p,Object(k.jsx)("div",{className:"details",children:h})]}),Object(k.jsxs)("td",{className:"presence",children:[f,Object(k.jsx)("span",{className:"presenceIcon",children:j})]})]})};function S(e){return e.user_id?e.user_id:e.firstname+"."+e.lastname}var R=function(e){var t=e.attendees,n=e.pendingMap?e.pendingMap:{},r=e.event_id,a=e.addAttendanceRecord,s=e.deleteAttendanceRecord,i=t.sort((function(e,t){return e.firstname.toLowerCase()>t.firstname.toLowerCase()||e.firstname.toLowerCase()===t.firstname.toLowerCase()&&e.lastname.toLowerCase()>t.lastname.toLowerCase()?1:-1})).map((function(e){return Object(k.jsx)(w,{attendee:e,event_id:r,pendingMap:n,addAttendanceRecord:a,deleteAttendanceRecord:s},S(e))}));return Object(k.jsx)("div",{className:"AttendanceList",children:Object(k.jsx)("table",{children:Object(k.jsx)("tbody",{children:i})})})};var A=function(e){var t=e.hideAttendeeForm,n=e.addAttendanceRecord,a=Object(r.useState)(""),s=Object(o.a)(a,2),i=s[0],c=s[1],u=Object(r.useState)(""),d=Object(o.a)(u,2),l=d[0],j=d[1],m=Object(r.useState)(""),b=Object(o.a)(m,2),h=b[0],f=b[1],p=Object(r.useState)(""),v=Object(o.a)(p,2),O=v[0],x=v[1],_=Object(r.useState)(""),g=Object(o.a)(_,2),y=g[0],w=g[1];if(t)return null;return Object(k.jsxs)("div",{className:"NewAttendeeForm",children:[Object(k.jsx)("h2",{children:"Add New Attendee"}),Object(k.jsxs)("form",{action:"",children:[Object(k.jsx)("label",{htmlFor:"firstname",children:"First Name (required):"}),Object(k.jsx)("input",{type:"text",name:"firstname",id:"firstname",className:"required",value:i,onChange:function(e){return c(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"lastname",children:"Last Name (required): "}),Object(k.jsx)("input",{type:"text",name:"lastname",id:"lastname",className:"required",value:l,onChange:function(e){return j(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"email",children:"Email:"}),Object(k.jsx)("input",{type:"text",name:"email",id:"email",value:h,onChange:function(e){return f(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"phone",children:"Phone:"}),Object(k.jsx)("input",{type:"text",name:"phone",id:"phone",value:O,onChange:function(e){return x(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("label",{htmlFor:"notes",children:"Notes:"}),Object(k.jsx)("br",{}),Object(k.jsx)("textarea",{name:"notes",id:"notes",value:y,onChange:function(e){return w(e.target.value)}}),Object(k.jsx)("br",{}),Object(k.jsx)("div",{className:"centered",children:Object(k.jsx)("input",{type:"submit",value:"Add",disabled:!(i&&l),onClick:function(){!function(e,t,n,r,a,s,i,c,u,o,d,l){e({firstname:t,lastname:r,email:s,phone:c,notes:o}),n(""),a(""),i(""),u(""),d("")}(n,i,c,l,j,h,f,O,x,y,w)}})})]})]})};var N=function(e){if(!e.isLoading)return null;return Object(k.jsx)("div",{className:"Loading",children:Object(k.jsx)("div",{className:"inner",children:Object(k.jsx)("div",{className:"spinner"})})})};var C=function(e){var t,n=Object(r.useState)(!0),a=Object(o.a)(n,2),s=a[0],i=a[1],c=Object(r.useState)(""),u=Object(o.a)(c,2),d=u[0],b=u[1],h=Object(r.useState)(!1),f=Object(o.a)(h,2),v=f[0],x=f[1],w=Object(r.useState)(!1),C=Object(o.a)(w,2),L=C[0],B=C[1],E=Object(r.useState)(!1),I=Object(o.a)(E,2),q=I[0],W=I[1],G=Object(r.useState)(!1),D=Object(o.a)(G,2),H=D[0],J=D[1],K=Object(r.useState)(null),U=Object(o.a)(K,2),Z=U[0],Q=U[1],z=Object(r.useState)([]),V=Object(o.a)(z,2),X=V[0],Y=V[1],$=Object(r.useState)([]),ee=Object(o.a)($,2),te=ee[0],ne=ee[1],re=Object(r.useState)([]),ae=Object(o.a)(re,2),se=ae[0],ie=ae[1],ce=Object(r.useState)([]),ue=Object(o.a)(ce,2),oe=ue[0],de=ue[1],le=Object(r.useState)(null),je=Object(o.a)(le,2),me=je[0],be=je[1],he={},fe=Object(j.a)(oe);try{for(fe.s();!(t=fe.n()).done;){var pe=t.value,ve=S(pe);he[ve]=pe}}catch(_e){fe.e(_e)}finally{fe.f()}Object(r.useEffect)((function(){m.userService||(m.eventService=new O,m.userService=new _,m.attendanceService=new p)})),Object(r.useEffect)((function(){s&&function(e,t,n,r,a){F.apply(this,arguments)}(i,Q,Y,ne,ie)}),[s]);var Oe=function(e,t,n,r,a){var s=e;(t||r||n||a)&&(s=s.filter((function(e){return!(!t||!e.event_id)||(!(!n||e.event_id)||(!(!r||e.user_id)||!(!a||!e.event_id||e.event_id!==M)))})));return s}(function(e,t){var n=t?t.toLowerCase().replace(/\s+/g,""):null,r=e;n&&(r=r.filter((function(e){return Object.values(e).map((function(e){return String(e).toLowerCase()})).join().replace(/\s+/g,"").includes(n)})));return r}(function(e,t,n,r){var a,s={},i=Object(j.a)(e);try{for(i.s();!(a=i.n()).done;){var c=a.value,u={user_id:c.id,firstname:"",lastname:""};c.nickname?u.firstname=c.nickname:c.first_name?(u.firstname=c.first_name,c.last_name&&(u.lastname=c.last_name)):c.name&&(u.firstname=c.name),c.description&&(u.notes=c.description),s[c.id]=u}}catch(_e){i.e(_e)}finally{i.f()}var o,d=Object(j.a)(t);try{for(d.s();!(o=d.n()).done;){var m=o.value,b=S(m),h=s[b];(h=h?Object(l.a)({},h):Object(l.a)({},m)).id=m.id,h.notes||(h.notes=m.notes),h.event_id=m.event_id,s[b]=h}}catch(_e){d.e(_e)}finally{d.f()}var f,p=Object(j.a)(n);try{for(p.s();!(f=p.n()).done;){var v=f.value,O=S(v),x=s[O];(x=x?Object(l.a)({},x):Object(l.a)({},v)).id=v.id,x.event_id=v.event_id,v.phone&&!x.phone&&(x.phone=v.phone),v.user_id&&!x.user_id&&(x.user_id=v.user_id),v.user_id&&!x.user_id&&(x.user_id=v.user_id),v.firstname&&!x.firstname&&(x.firstname=v.firstname),v.lastname&&!x.lastname&&(x.lastname=v.lastname),v.notes&&!x.notes&&(x.notes=v.notes),s[O]=x}}catch(_e){p.e(_e)}finally{p.f()}var _,k=Object(j.a)(r);try{for(k.s();!(_=k.n()).done;){var g=_.value,y=S(g),w=s[y];w=w?Object(l.a)({},w):Object(l.a)({},g),s[y]=w}}catch(_e){k.e(_e)}finally{k.f()}var R=Object.values(s);return R||[]}(X,te,se,oe),d),v,L,q,H),xe=!s&&(q||H||!v);return Object(k.jsxs)("div",{className:"AttendanceSheet",children:[Object(k.jsx)(g,{name:Z?Z.title:""}),Object(k.jsx)(y,{searchTerm:d,setSearchTerm:b,filterRecent:v,setFilterRecent:x,filterOld:L,setFilterOld:B,filterNew:q,setFilterNew:W,filterPresent:H,setFilterPresent:J}),Object(k.jsx)(R,{attendees:Oe,event_id:M,pendingMap:he,addAttendanceRecord:function(e){be(P(e,me,oe,de,ie))},deleteAttendanceRecord:function(e){be(function(e,t,n,r,a,s){return T.apply(this,arguments)}(e,me,oe,de,ne,ie))}}),Object(k.jsx)(A,{hideAttendeeForm:!xe,addAttendanceRecord:function(e){be(P(e,me,oe,de,ie))}}),Object(k.jsx)(N,{isLoading:s})]})};function F(){return(F=Object(d.a)(c.a.mark((function e(t,n,r,a,s){var i,o,d,l,j,b,h,f,p,v;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=m.eventService,o=m.userService,d=m.attendanceService,e.next=5,i.get(M);case 5:l=e.sent,n(l),j=1,b=[],h=!0;case 10:return e.next=12,o.retrieve(j,100);case 12:f=e.sent,b=[].concat(Object(u.a)(b),Object(u.a)(f)),r(b),h=f.length>0,++j;case 17:if(h){e.next=10;break}case 18:return e.next=20,d.retrieve(null,256);case 20:return p=e.sent,a(p),e.next=24,d.retrieve(M,0);case 24:v=e.sent,s(v),t(!1);case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,t,n,r,a){return L.apply(this,arguments)}function L(){return(L=Object(d.a)(c.a.mark((function e(t,n,r,a,s){var i,o,d,j;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=m.attendanceService,(o=Object(u.a)(r)).push(t),a(o),i.pendingRecords=o,(d=Object(l.a)({},t)).event_id=M,e.next=9,i.create(d);case 9:return e.next=11,n;case 11:return e.next=13,i.retrieve(M,0);case 13:j=e.sent,s(j),o=Object(u.a)(i.pendingRecords).filter((function(e){return e!==t})),a(o),i.pendingRecords=o,Promise.resolve(t);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(){return(T=Object(d.a)(c.a.mark((function e(t,n,r,a,s,i){var o,d,l,j,b;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=m.attendanceService,(d=Object(u.a)(r)).push(t),a(d),o.pendingRecords=d,l=t.id,e.next=8,o.delete(l);case 8:return e.next=10,n;case 10:return e.next=12,o.retrieve(null,256);case 12:return j=e.sent,s(j),e.next=16,o.retrieve(M,0);case 16:b=e.sent,i(b),d=Object(u.a)(o.pendingRecords).filter((function(e){return e!==t})),a(d),o.pendingRecords=d,Promise.resolve(t);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M=1e3;function B(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(C,{})})}s.a.render(Object(k.jsx)(B,{}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.19449f53.chunk.js.map