const renderGift = async () => {
  const response = await fetch('/gifts')
  const data = await response.json()

  const giftContent = document.getElementById('gift-content')
  const requestedID = parseInt(window.location.href.split('/').pop())

  let gift = data.find(gift => gift.id === requestedID)

  if (gift) {
    document.getElementById('image').src = gift.image
    document.getElementById('name').textContent = gift.name
    document.getElementById('description').textContent = gift.description
    document.getElementById('population').textContent = gift.population
    document.title = `Largest Cities in the US - ${gift.name}`
  } else {
    const message = document.createElement('h2')
    message.textContent = 'No Cities Available 😞'
    giftContent.appendChild(message)
  }
}

renderGift()