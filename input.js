'use strict'

let isFromUpdate = false;
let updatedObjectId = null;

function AddPlace() {
    let inputForm = document.getElementById('inputform');
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let rating = document.getElementById('rating').value;
    let type = document.getElementById('type').value;
    let imageSrc = document.getElementById('picture');

    // while(imageSrc.files[0] == null || imageSrc.files[0] == undefined) {
    //     alert('please select an image');
    // }
    if(imageSrc.files[0] != null || imageSrc.files[0] != undefined) {
        imageSrc = imageSrc.files[0].name;
    } else {
        imageSrc = null;
    }

    let updateItem = localStorage['updateItem'];
    // alert('updateItem: ' + updateItem);
    if(updateItem != null || updateItem != undefined) {
        // alert('came for an update');
        isFromUpdate = true;
        updateItem = JSON.parse(updateItem);
        let id = parseInt(updateItem['id']);
        id = updateItem['id'];
        updatedObjectId = id;

        if(imageSrc == null || imageSrc == undefined) {
            imageSrc = updateItem['imageSrc'];
        } else {
            imageSrc = `images/${imageSrc}`;
        }
        let list = localStorage['placeList'];
        list = JSON.parse(list);
        // alert(list.length);
        let item = {
            id: id,
            name: name,
            address: address,
            rating: rating,
            type: type,
            imageSrc: `${imageSrc}`
        }
        // let counter = 0;
        for(let i=0; i<list.length; i++) {
            if(JSON.parse(list[i])['id'] == id) {
                // alert('id: ' + id);
                // alert('JSON.parse(list[i])["id"]: ' + JSON.parse(list[i])['id']);
                // if(i==list.length-1) {
                //     list.push(JSON.stringify(item));
                // }
                // else if(i>0) {
                //     // alert('i>0');
                //     let firstId = parseInt(JSON.parse(list[0])['id'])-1;
                //     let temp = JSON.parse(list[i-1])['id'];
                //     alert('temp: ' + temp);
                //     temp = parseInt(temp - firstId);
                //     list[temp] = JSON.stringify(item);
                // } /*else if(i==list.length-1) {
                    
                // }*/ else {
                //     // alert('else');
                //     list[0] = JSON.stringify(item);
                // }
                list[i] = JSON.stringify(item);
                break;
            }
        }
        // list[id-1] = JSON.stringify(item);
        // alert(list[id-1]);
        localStorage['placeList'] = JSON.stringify(list);
        localStorage.removeItem('updateItem');
        return;
    }
    let id = localStorage['id'];
    if(id == null || id == undefined) {
        // alert("first time");
        id = '01';
    }
    localStorage['id'] = `0${parseInt(id) + 1}`;

    let newPlace = {
        id: id,
        name: name,
        address: address,
        rating: rating,
        type: type,
        imageSrc: `images/${imageSrc}`
    }

    let placeList = (localStorage.getItem('placeList'));
    // console.log(placeList);
    placeList = JSON.parse(placeList);
    if(placeList == undefined || placeList == null) {
        placeList = [];
    }
    placeList.push(JSON.stringify(newPlace));
    localStorage.setItem('placeList', JSON.stringify(placeList));
}

if(document.URL.includes('input.html')) {
    // let defaultValues = JSON.parse(localStorage.getItem('updateName'));
    let nameVal = document.getElementById('name');
    let addressVal = document.getElementById('address');
    let ratingVal = document.getElementById('rating');
    let typeVal = document.getElementById('type');
    let pictureVal = document.getElementById('picture');

    let defaultValues = localStorage['updateItem'];
    if(defaultValues == null || defaultValues == undefined) {
        isFromUpdate = true;
        updatedObjectId = defaultValues['id'];
        nameVal.setAttribute('value', 'name');
        addressVal.setAttribute('value', 'address');
        ratingVal.setAttribute('value', 1);
        typeVal.setAttribute('value', 'type');
        // pictureVal.setAttribute('value', 'Image');
    } else {
        defaultValues = JSON.parse(defaultValues);
        nameVal.setAttribute('value', defaultValues['name']);
        addressVal.setAttribute('value', defaultValues['address']);
        ratingVal.setAttribute('value', parseInt(defaultValues['rating']));
        typeVal.setAttribute('value', defaultValues['type']);
        pictureVal.setAttribute('value', defaultValues['imageSrc']);
    }
    let submitBtn = document.getElementById('submit');
    submitBtn.setAttribute('onclick', 'AddPlace()');

    let newBtn = document.getElementById('newbtn');
    newBtn.setAttribute('onclick', 'AddPlace()');
}

function showItems(ids, names, addresses, ratings, types, pictures) {
    
}

// Adding html tags in output.html
function addSearchBar() {

    // Adding search-bar
    let searchBar = document.createElement('input');
    searchBar.setAttribute('id', 'search-bar');
    searchBar.setAttribute('name', 'search-bar');
    searchBar.setAttribute('placeholder','Enter name to search');
    searchBar.setAttribute('size', '100px');
    document.body.appendChild(searchBar);
}

function addContainerDiv() {

    let container = document.createElement('div');
    container.setAttribute('class', 'container');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
}

function addHeadingDivs() {
    
    let odd = true;
    let headings = ['NAME', 'ADDRESS', 'RATING', 'PICTURE', 'ACTION'];
    for(let i=0; i<headings.length; i++) {
        let tempDiv = document.createElement('div');
        if(odd == true) {
            tempDiv.setAttribute('class', 'header odd');
        } else {
            tempDiv.setAttribute('class', 'header even');
        }
        tempDiv.innerHTML = `${headings[i]}`;
        let c = document.getElementById('container');
        c.appendChild(tempDiv);
    }
}

function addDefaultDivs() {
    addSearchBar();
    addContainerDiv();
    addHeadingDivs();
}

function addItemDivs(ids, names, addresses, ratings, types, pictures) {

    let odd = true;
    for(let i=0; i<names.length; i++) {
        let nameDiv = document.createElement('div');
        let addressDiv = document.createElement('div');
        let ratingDiv = document.createElement('div');
        let pictureDiv = document.createElement('div');
        let btnDiv = document.createElement('div');
        let img = document.createElement('img');

        // let id = localStorage['counter'];

        if(odd == true) {
            nameDiv.setAttribute('class', 'item odd');
            addressDiv.setAttribute('class', 'item odd');
            ratingDiv.setAttribute('class', 'item odd');
            pictureDiv.setAttribute('class', 'item odd');
            btnDiv.setAttribute('class', 'item odd button');
            odd = false;
        } else if(odd == false) {
            nameDiv.setAttribute('class', 'item even');
            addressDiv.setAttribute('class', 'item even');
            ratingDiv.setAttribute('class', 'item even');
            pictureDiv.setAttribute('class', 'item even');
            btnDiv.setAttribute('class', 'item even button');
            odd = true;
        }

        // alert(`${pictures[i]}`);
        img.setAttribute('id', `${ids[i]}_image`);
        img.setAttribute('class', 'image');
        img.setAttribute('src', `${pictures[i]}`)
        // img.setAttribute('src', `${pictures[i]}`);

        nameDiv.setAttribute('id', `${ids[i]}`);
        addressDiv.setAttribute('id', `${ids[i]}_address`);
        ratingDiv.setAttribute('id', `${ids[i]}_rating`);
        pictureDiv.setAttribute('id', `${ids[i]}_picture`);
        btnDiv.setAttribute('id', `${ids[i]}_btn`);

        nameDiv.innerHTML = `${names[i]}`;
        addressDiv.innerHTML = `${addresses[i]}`;
        ratingDiv.innerHTML = `${ratings[i]}`;
        pictureDiv.appendChild(img);

        let upBtn = document.createElement('input');
        let delBtn = document.createElement('input');
        upBtn.setAttribute('id', `${ids[i]}_update`);
        delBtn.setAttribute('id', `${ids[i]}_delete`);
        upBtn.setAttribute('type', 'submit');
        delBtn.setAttribute('type', 'submit');
        upBtn.setAttribute('name', 'submit');
        delBtn.setAttribute('name', 'submit');
        upBtn.setAttribute('value', 'Update');
        delBtn.setAttribute('value', 'Delete');
        // upBtn.setAttribute('onclick',`updateFunc(upBtn.getAttribute("id"))`);
        upBtn.addEventListener('click', function() {
            let idStart = upBtn.getAttribute('id').trim().split('_')[0];
            let Name = document.getElementById(`${ids[i]}`).innerHTML;
            let Address = document.getElementById(`${ids[i]}_address`).innerHTML;
            let Rating = document.getElementById(`${ids[i]}_rating`).innerHTML;
            // let Type = document.getElementById(`${idStart}_type`).innerHTML;
            let Type = types[parseInt(ids[i]) - 1];
            // alert("Types: " + types.length + " and id: " + parseInt(ids[i]));
            let picture = document.getElementById(`${ids[i]}_image`).getAttribute('src');
            // alert(picture);
            let updateItem = localStorage.getItem('updateItem');
            // updateItem = JSON.parse(updateName);
            let newItem = {
                id: ids[i],
                name: Name,
                address: Address,
                rating: Rating,
                type: Type,
                imageSrc: picture
            }
            localStorage['updateItem'] = JSON.stringify(newItem);

            // let list = JSON.parse(localStorage['placeList']);


            window.open('input.html', '_self');
            // alert(localStorage['updateItem']);
        })

        delBtn.addEventListener('click', function() {
            // return;
            let list = localStorage['placeList'];
            // console.log(JSON.parse(list));
            list = JSON.parse(list);
            for(let j=0; j<list.length; j++) {
                if(list[j] == null || list[j] == undefined) {
                    continue;
                }
                if(JSON.parse(list[j])['id'] == ids[i]) {
                    // console.log(JSON.parse(list[j])['id']);
                    list.splice(j, 1);
                    // console.log(JSON.parse(list[j]));
                    break;
                }
                // JSON.parse(list[j])['id'] = `0${j+1}`
            }
            localStorage['placeList'] = JSON.stringify(list);
            location.reload();
            // window.open('output.html', '_self');
        })
        upBtn.innerHTML = 'Update';
        delBtn.innerHTML = 'Delete';

        let c = document.getElementById('container');
        c.appendChild(nameDiv);
        c.appendChild(addressDiv);
        c.appendChild(ratingDiv);
        c.appendChild(pictureDiv);
        c.appendChild(btnDiv);
        btnDiv.appendChild(upBtn);
        btnDiv.appendChild(delBtn);
    }
}

function addFooter() {
    let a = document.createElement('a');
    a.setAttribute('href', 'input.html');
    a.setAttribute('id', 'go-to-input');
    let btn = document.createElement('button');
    btn.innerHTML = 'Create New Tourist Place';
    a.appendChild(btn);
    document.body.appendChild(a);
}


if(document.URL.includes('output.html')) {

    // Add Search Bar + Container + Cointer.Heading
    addDefaultDivs();

    let ids = [], names = [], addresses = [], ratings = [], types = [], pictures = [];
    let items = localStorage.getItem('placeList');
    items = JSON.parse(items);
    if(items != null && items != undefined) {
        for(let i=0; i<items.length; i++) {
            let item = JSON.parse(items[i]);
            if(item == undefined || item == null) {
                continue;
            }
            ids.push(item['id']);
            names.push(item['name']);
            addresses.push(item['address']);
            ratings.push(item['rating']);
            types.push(item['type']);
            pictures.push(item['imageSrc']);
        }
    }

    addItemDivs(ids, names, addresses, ratings, types, pictures);
    addFooter();

}