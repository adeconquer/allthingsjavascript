const data = [{
        name: "John Doe",
        age: 32,
        gender: 'male',
        lookingFor: 'female',
        location: 'Boston MA',
        image: 'https://randomuser.me/api/portraits/men/83.jpg'
    },
    {
        name: "Jane Doe",
        age: 28,
        gender: 'female',
        lookingFor: 'female',
        location: 'NewYork NY',
        image: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
        name: "Bill Finglas",
        age: 34,
        gender: 'male',
        lookingFor: 'female',
        location: 'Miami FL',
        image: 'https://randomuser.me/api/portraits/men/34.jpg'
    }
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

//Next Event
document.querySelector('#next').addEventListener('click', nextProfile);

//Next Profile Display
function nextProfile() {
    const currentProfile = profiles.next().value;
    if (currentProfile !== undefined) {
        document.querySelector('#profileDisplay').innerHTML = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Preference: ${currentProfile.gender} looking For: ${currentProfile.lookingFor}</li>
    </ul>
    `;
        document.querySelector('#imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
    } else {
        window.location.reload();
    };

}

//Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0
    return {
        next: function() {
            return nextIndex < profiles.length ? { value: profiles[nextIndex++], done: false } : { done: true }
        }
    }
}



// console.log(profiles.next())