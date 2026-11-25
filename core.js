const SB='https://arjynvmpnrimjqupnllu.supabase.co/rest/v1/',KEY='sb_publishable_XzvTeWYX5VZklJ9AK1vPpg_G0xCSdI7';
const ST={new:['جديدة','#6b7a99'],pick:['تم الاستلام','#0b7bd1'],out:['خرجت للتسليم','#ff8a00'],done:['تم التسليم','#1a9f5a'],ret:['مرتجع','#d33']};
const GOV=['القاهرة','الجيزة','الإسكندرية','المنصورة','طنطا','أسيوط','الأقصر'];
async function api(path,method='GET',body){const r=await fetch(SB+path,{method,headers:{apikey:KEY,Authorization:'Bearer '+KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:body?JSON.stringify(body):undefined});if(!r.ok)throw new Error(await r.text());return method=='GET'?r.json():null}
let D={ship:[],cust:[],cour:[],exp:[]};
async function load(){try{const[a,b,c,d]=await Promise.all([api('shipments?select=*&order=created_at.desc'),api('customers?select=*&order=id'),api('couriers?select=*&order=id'),api('expenses?select=*&order=id')]);D={ship:a,cust:b,cour:c,exp:d};document.body.classList.remove('off')}catch(e){document.body.classList.add('off')}}
const $=s=>document.querySelector(s),A=$('#app');
const tag=s=>`<span class="tag" style="background:${(ST[s]||ST.new)[1]}">${(ST[s]||ST.new)[0]}</span>`;
const opts=(a,sel)=>a.map(x=>`<option value="${x.id}" ${x.id==sel?'selected':''}>${x.name}</option>`).join('');
const cn=i=>(D.cour.find(c=>c.id==i)||{name:'—'}).name;
const busy=()=>/INPUT|SELECT|TEXTAREA/.test((document.activeElement||{}).tagName||'');
function start(render,every=6000){const go=async()=>{await load();render()};go();setInterval(async()=>{if(busy())return;await load();if(!busy())render()},every)}
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
