const parsePage = () => {
	
	let host = document.location.hostname

	var found = '';
	
	for (var idx = 0; idx < paywalls.length; idx++){
		console.log('here',idx)
		
		let pw = paywalls[ idx ];
		if (pw.site.indexOf( host ) > -1){
			console.log('Found', host, pw.selector)
			let div = document.querySelector( `${pw.selector}` );
			console.log('Selector', (div ? 'found' : 'not found'))
			
			if (div){
				document.body.removeChild( div );
				document.body.style.position = 'initial'
				found = pw.site;
			} else {
				console.log('Not found', pw.selector)
			}		
		}	
	}
	
	
	return found;
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log("Execute Script");
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: parsePage
  }, (result) => {
  		console.log(result[0].result  )
  		let url = result[0].result
    	if ( url ) {
	        document.querySelector('img#check').style.display = 'initial'
			let h3 = document.querySelector('h3')
			if (h3) {
				h3.innerHTML = `<span class='success'>PayWall Removed</span> <BR> <span>${url}</span>`
			}
    	}
  });
});

/*
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

getCurrentTab().then(tab=>{
	let url = tab.url.trim()
	let host = url.split('/')[2]
	
	console.log(`'${url}'`, `'${host}'`)
	
	paywalls.forEach(pw=>{
		if (pw.site.indexOf( host ) > -1){
			console.log('Found', host, pw.selector)
			let div = document.querySelector( `${pw.selector}` );
			console.log('Selector', (div ? 'found' : 'not found'))
			
			if (div){
				document.body.removeChild( div );
				document.body.style.position = 'initial'
				spinner.src = '../images/check.png'
			}			
		}
	})
})*/
