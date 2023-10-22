const parsePage = () => {
	let a = document.querySelectorAll('table td a')
	let title = document.title
	
	if ( title.indexOf('Index of') == -1) 
	    return 0
		
	var total = 0;
	
	a.forEach(a =>{
	    var parts = a.href.split('.')
	    if ( parts.length ){

	        [ '.jpg', '.png', '.webp', '.gif' ].forEach( xt =>{
	        
	            if ( a.href.toLowerCase().lastIndexOf( xt ) > -1 && !a.classList.contains('done')  ){
	                a.classList.add('done');
	                a.innerHTML = `<img src="${a.href}">`
	                a.setAttribute('download','download')
	                total++
	            }
	        })
	    }
	    
	})
	return total;
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Execute Script");
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: parsePage
  }, (result) => {
        let total = result[0].result
        if ( total ){
            let h3 = document.querySelector('h3')
            h3.innerHTML = `<span>Index Links Converted</span>
                            <BR>
                            <span class='success'>${total}</span>`
        }
    }
  );
});
