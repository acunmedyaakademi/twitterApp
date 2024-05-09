const SUPASE_URL = "https://hqkxrqlkwwujtetszlgc.supabase.co";
const SUPASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxa3hycWxrd3d1anRldHN6bGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMDA2NjYsImV4cCI6MjAzMDc3NjY2Nn0.7jQxuFfH-SF-RSeiqEOAmvt9jCAYLw_8o6aZ9_wfrow";
const _supabase = supabase.createClient(SUPASE_URL, SUPASE_ANON_KEY);
const addComments = document.querySelector("#addComments");
const items = document.querySelector('.items');


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
        kullaniciAdi: formObj.kullaniciAdi
    })
    init();
    addComments.reset();
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
async function yorumEkle(){
    const yorumBtn = document.querySelectorAll('.yorumBtn');
    for (const yorum of yorumBtn) {
        yorum.addEventListener('click', async function(){
            const { error } = await _supabase
                .from('twitterApp')
                .update({ name: '' })
                .eq('id', )

            return init();
        })

    }
}
async function init(){
    const data = await getData();
    items.innerHTML = "";
    data.forEach(item => {
        items.innerHTML += `<li data-commentid="${item.id}">${item.kullaniciAdi} - ${item.comments} <button class="deleteBtn">Delete</button><button class="yorumBtn">yorum yap</button></li>`
        
    }); 
    deleteComment();
}



addComments.addEventListener('submit', getForm);


init();
