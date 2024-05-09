const SUPASE_URL = "https://hqkxrqlkwwujtetszlgc.supabase.co";
const SUPASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3hycWxrd3d1anRldHN6bGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDA2NjYsImV4cCI6MjAzMDc3NjY2Nn0.7jQxuFfH-SF-RSeiqEOAmvt9jCAYLw_8o6aZ9_wfrow";
const _supabase = supabase.createClient(SUPASE_URL, SUPASE_ANON_KEY);
const addComments = document.querySelector("#addComments");
const items = document.querySelector('.items');
const yorumKismi = document.querySelector('.yorumKismi');


async function getData(){
    const { data, error } = await _supabase
    .from('twitterApp')
    .select()
    if(error){
        return []
    }
    return data
}
async function getForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { error } = await _supabase
    .from('twitterApp')
    .insert({
        comments: formObj.comments,
        kullaniciAdi: formObj.kullaniciAdi,
        yorumlar: formObj.yorumlar
    })
    init();
    yorumEkle();
    addComments.reset();
}
const yorumlar = document.querySelector('.yorumlar');
const yorumİnput = document.querySelector('.yorumİnput');
async function yorumEkle(){
    const yorumBtn = document.querySelectorAll('.yorumBtn');
    for (const yorum of yorumBtn) {
        yorum.addEventListener('click', async function(){
            yorumlar.innerHTML = yorumİnput.value === yorumlar.value
        })

        
    }
}
async function deleteComment(){
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    for (const btn of deleteBtn) {
        btn.addEventListener('click', async function() {
            const { error } = await _supabase 
                .from('twitterApp')
                .delete()
                .eq('id', Number(this.parentElement.dataset.commentid)) 
                return init();


        })
    }
    
}

const addYorum = document.querySelectorAll('#addYorum');
async function init(){
    const data = await getData();
    items.innerHTML = "";
    data.forEach(item => {
        items.innerHTML += `<li data-commentid="${item.id}">${item.kullaniciAdi} - ${item.comments} <button class="deleteBtn">Delete</button><button class="yorumBtn">yorum yap</button></li>
        <div class="yorumKismi"></div>`
        
    }); 
    yorumEkle();
    deleteComment();

}



addComments.addEventListener('submit', getForm);


init();
