const parsePage = () => {
	
	let host = document.location.hostname

	var found = '';
	console.warn('RemovePayWall', paywalls.length)
	
	for (var idx = 0; idx < paywalls.length; idx++){
		let pw = paywalls[ idx ];
		
		if (pw.site.indexOf( host ) > -1){
			console.warn(idx, 'Found', pw.site, pw.elements)
			pw.elements.forEach( (el,inc)=>{
			    let div = document.querySelector( el.selector );
			    if (div){
			        console.warn(inc, 'Selector matched element', el.selector)
			        
				    if (el.action == 'remove')
				        div.parentElement.removeChild( div );
				        
				    else {
				        var styles = el.action.split(';')
				        console.log(styles)
				        styles.forEach( s=>{
				            let attr = s.split(':')
				            console.warn('Setting style',attr[0] , ':', attr[1])
				            
				            div.style[attr[0]] = attr[1]
				        })
				    }
				    
				    // default action
				    //document.body.style.position = 'initial'
				    found = pw.site;
			    } else {
				    console.warn(inc,'Not matched', el.selector )
			    }			
			})		
		} else {
		    console.log( idx, pw.site, 'ignored because', host)
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
