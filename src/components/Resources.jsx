import React from 'react'

export default function Resources() {
  // Example books and links
  const books = [
    { title: "Light on Yoga", author: "B.K.S. Iyengar", file: "books/Light on Yoga - B.K.S. Iyengar.pdf" },
    { title: "Hatha Yoga Pradipika", author: "Swami Muktibodhananda", file: "books/Hatha Yoga Pradipika.pdf" }
  ]
  const websites = [
    { name: "Shlokam", url: "https://shlokam.org/" },
    { name: "Patanjali Yoga Sutra", url: "https://patanjaliyogasutra.in/" },
    { name: "TeachMeAnatomy", url: "https://teachmeanatomy.info/" }
  ]
  const channels = [
    { name: "Patanjali Yoga Sutra", url: "https://www.youtube.com/playlist?list=PLAPrVB8wngPnXpf5OhUqYgE_i6JlhtL8a"},
    { name: "the Yogic lens", url: "https://www.youtube.com/@theyogiclens9118" }
  ]
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <h3 className="text-lg font-semibold mt-6 mb-2">Books</h3>
      <ul className="mb-4 list-disc pl-6">
        {books.map(book => (
          <li key={book.title}>
            <a href={book.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {book.title}
            </a> by {book.author}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mt-6 mb-2">Websites</h3>
      <ul className="list-disc pl-6">
        {websites.map(site => (
          <li key={site.url}>
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {site.name}
            </a>
          </li>
        ))}
      </ul>
            <h3 className="text-lg font-semibold mt-6 mb-2">Youtube Channels</h3>
      <ul className="list-disc pl-6">
        {channels.map(channel => (
          <li key={channel.url}>
            <a href={channel.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {channel.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}