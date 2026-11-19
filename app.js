const WHATSAPP_NUMBER = "918015176236"; // Country code + number, no plus sign.
const rupees = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
const $ = id => document.getElementById(id);
let cart = JSON.parse(localStorage.getItem("anbuMartCart") || "{}");

function saveCart(){localStorage.setItem("anbuMartCart",JSON.stringify(cart));renderCart();}
function productImage(p){return p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">` : `<span>${p.emoji || "🎁"}</span>`;}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderProducts(){
 const q=$("searchInput").value.trim().toLowerCase(),cat=$("categoryFilter").value;
 const products=(window.PRODUCTS||[]).filter(p=>(cat==="All"||p.category===cat)&&(`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)));
 $("productGrid").innerHTML=products.length?products.map(p=>`<article class="product-card"><div class="product-image">${productImage(p)}</div><div class="product-info"><span class="product-category">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description)}</p><div class="product-bottom"><span class="price">${rupees(p.price)}</span><button class="add-button" data-add="${escapeHtml(p.id)}">+ Add</button></div></div></article>`).join(""):`<p>No products found. Try another search.</p>`;
 document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.add;cart[id]=(cart[id]||0)+1;saveCart();b.textContent="Added ✓";setTimeout(()=>b.textContent="+ Add",900);}));
}
function cartProducts(){return Object.entries(cart).map(([id,qty])=>({product:PRODUCTS.find(p=>p.id===id),qty})).filter(x=>x.product&&x.qty>0);}
function renderCart(){
 const rows=cartProducts(),count=rows.reduce((s,x)=>s+x.qty,0),total=rows.reduce((s,x)=>s+x.product.price*x.qty,0);
 $("cartCount").textContent=count;$("cartTotal").textContent=rupees(total);$("checkoutButton").disabled=!count;
 $("cartItems").innerHTML=rows.length?rows.map(({product:p,qty})=>`<div class="cart-row"><div><strong>${escapeHtml(p.name)}</strong><small>${rupees(p.price)} each</small></div><div class="qty"><button data-minus="${p.id}" aria-label="Decrease quantity">−</button><b>${qty}</b><button data-plus="${p.id}" aria-label="Increase quantity">+</button></div></div>`).join(""):`<p class="small-note">Your cart is empty. Add something lovely!</p>`;
 document.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>{const id=b.dataset.minus;cart[id]--;if(cart[id]<=0)delete cart[id];saveCart();});
 document.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>{const id=b.dataset.plus;cart[id]++;saveCart();});
}
function openCart(){ $("cartDrawer").classList.add("open");$("backdrop").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){ $("cartDrawer").classList.remove("open");$("backdrop").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");}
$("cartToggle").onclick=openCart;$("closeCart").onclick=closeCart;$("backdrop").onclick=closeCart;
$("searchInput").addEventListener("input",renderProducts);$("categoryFilter").addEventListener("change",renderProducts);
$("checkoutButton").onclick=()=>{closeCart();$("checkoutDialog").showModal();};
$("closeCheckout").onclick=()=>$("checkoutDialog").close();
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();if(!e.currentTarget.reportValidity())return;
 const data=new FormData(e.currentTarget),rows=cartProducts(),total=rows.reduce((s,x)=>s+x.product.price*x.qty,0);
 const lines=rows.map(({product:p,qty})=>`• ${p.name} x ${qty} = ${rupees(p.price*qty)}`).join("\n");
 const msg=`Hello Anbu Mart! I would like to place an order:\n\n${lines}\n\nSubtotal: ${rupees(total)}\n\nName: ${data.get("customerName")}\nMobile: ${data.get("phone")}\nAddress: ${data.get("address")}\nAdditional note: ${data.get("note")||"None"}\n\nPlease confirm availability, delivery charges and payment details.`;
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
});
$("year").textContent=new Date().getFullYear();renderProducts();renderCart();
if("serviceWorker" in navigator && location.protocol.startsWith("http")){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(console.warn));}
