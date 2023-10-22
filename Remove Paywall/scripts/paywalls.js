let paywalls = [ 
					{'site':'www.washingtonpost.com', 
					 'elements': [
					                {'selector':'div[data-qa="overlay-container"]', 'action':'remove'},
					                {'selector':'body', 'action':'position:initial'}
					            ]
					} ,
					
					{'site':'www.nytimes.com', 
					'elements': [ 
					              {'selector':'div[data-testid="gateway-container"]', 'action':'remove'}, 
					              {'selector':'.css-gx5sib', 'action':'remove'},
					              {'selector':'div[data-testid="vi-gateway-container"]', 'action':'position:initial;overflow:initial' }
					            ] 
					} ,
					
				];
