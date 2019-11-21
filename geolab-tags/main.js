console.log(`
(Everything works with database)
    Features:
    • Add tag
    • Remove tag
    • Update tag(Doubleclick the tag)
    • Check if an inputted tagname is already in the tag list
    • Improvements to make features glitchless.
`);
let updateID = 0;

// Create elements 
let container = document.createElement('div');
let tagsWrapper = document.createElement('div');
let input = document.createElement('input')
let ul = document.createElement('ul');


// Attach IDs to elements
container.id = 'container';
tagsWrapper.id = 'tagsWrapper';
input.type = 'text';

// Append elements into body
tagsWrapper.appendChild(ul);
tagsWrapper.appendChild(input);
container.appendChild(tagsWrapper);
document.body.appendChild(container);

// Add event listener on input
input.addEventListener('keydown', inputEvent);

// Get list items from database
function getTags(){
    return axios.get('http://localhost:3000/tags');
}

axios.all([getTags()])
  .then(axios.spread(res => {
    let items = res.data;
    items.forEach(element => {
        drawLi(element.title, element.id);
    });
  }));



// Draw list item
function drawLi(inputValue, id){
    let li = document.createElement('li');    // Create li element with given inputValue and id
    li.classList.add('tag');
    li.id = id;
    li.innerText = inputValue;

    li.addEventListener('dblclick', updateTag);    // Add event listener on li

    let delSpan = document.createElement('span');    // Create span element to remove tag
    delSpan.innerText = ' [X]';

    delSpan.addEventListener('click', delSpanEvent);    // Add event listener on span

    li.appendChild(delSpan);
    ul.appendChild(li);
};

// delSpan click event function
function delSpanEvent(event){
    axios.delete(`http://localhost:3000/tags/${event.target.parentNode.id}`)    // Remove item from database
    .then(res => {
        event.target.parentNode.remove();   // Remove tag from the list
    })
    .catch(err => {
        console.log(err);
    })
}

// input keydown event function
function inputEvent(event){
    if (event.which === 13){    // Check if pressed key is enter
        let inputValue = event.target.value;    // Save input value
            if (event.target.value == 0){   // Check if input is empty
                alert('Input is empty');
            }
            else {
                // Check if the value is already in the tags list
                let tags = getTags();   // Call getTags function to get items from the database
                tags.then(res => {
                    let sameTag = 0;    // Variable to know if the input value matched any of the element title in the database
                    let items = res.data;
                    items.forEach(element => {  // Loop through each element in the database
                        if(element.title == inputValue){ // Check if the input value matches any of the element titles
                            sameTag += 1;  
                        }
                    })
                    if (sameTag == 0){  // If the input wasn't found in the tag list
                        if(updateID == 0){  // Check if user updates tag or adds a new one
                            axios.post('http://localhost:3000/tags', {   // Post item in the database
                            title: inputValue
                            })
                            .then(res => {
                                drawLi(inputValue, res.data.id);    // Make list item with DOM
                            })
                            .catch(err => {
                                console.log(err);
                            });
                            event.target.value = '';    // Clear input
                        }
                        else {
                            axios.put('http://localhost:3000/tags/' + updateID, {   // Update tag in the database
                                title: inputValue
                            })
                            .then(res => {
                                let tag = document.getElementById(res.id);
                                tag.innerText = res.title;
                                updateID = 0;
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                        
                    }
                    else {  // If the input was found in the tag list
                        alert('Tag is already in the list');
                    }
                })    
                .catch(err => {
                    console.log(err);
                })
        }
    }
}

// tag doubleclick event function
function updateTag(event){
    if(updateID == 0){
        let span = document.createElement('span');
        span.innerText = ' [X]';
        span.style.color = '#465881';
        span.addEventListener('click', stopUpdate);
        tagsWrapper.appendChild(span);
        updateID = event.target.id;
        let tagTitle = event.target.childNodes[0].nodeValue;
        input.value = tagTitle;
        input.style.borderColor = '#465881';
        event.target.style.backgroundColor = '#465881';        
    }
}

// span click event function to stop updating tag
function stopUpdate(){
    let target = this;
    input.style.borderColor = '';
    let tags = document.querySelectorAll('.tag');
    tags.forEach(element => {
        element.style.backgroundColor = '';
    })
    input.value = '';
    updateID = 0;
    target.remove();
}