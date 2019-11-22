import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

function TalkList() {
  const {
    gcms: { talks },
  } = useStaticQuery(graphql`
    query AllTalks {
      gcms {
        talks(orderBy: date_DESC) {
          date
          deckUrl
          description
          repositoryUrl
          title
          videoUrl
        }
      }
    }
  `)

  return (
    <section>
      <h2 className="font-semibold mb-4 text-2xl md:text-3xl">Talks</h2>
      {talks.map((talk, index) => {
        const talkLinks = [
          ...(talk.deckUrl
            ? [
                {
                  label: 'Deck',
                  url: talk.deckUrl,
                },
              ]
            : []),
          ...(talk.repositoryUrl
            ? [
                {
                  label: 'Code',
                  url: talk.repositoryUrl,
                },
              ]
            : []),
          ...(talk.videoUrl
            ? [
                {
                  label: 'Video',
                  url: talk.videoUrl,
                },
              ]
            : []),
        ]

        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(talk.date))

        return (
          <article key={index} className="mb-8 last:mb-0">
            <div className="mb-4">
              <h3 className="font-medium text-xl">{talk.title}</h3>
              <span className="text-sm text-gray-600">{formattedDate}</span>
            </div>
            <p className="mb-4">{talk.description}</p>
            {talkLinks.length > 0 && (
              <ul className="flex list-none -mx-2 p-0">
                {talkLinks.map(link => {
                  return (
                    <li key={link.label} className="mx-2">
                      <a
                        className="text-gray-600 text-sm hover:text-gray-900 hover:underline"
                        href={link.url}
                        target="blank"
                        norel={true}
                        nofollow={true}
                      >
                        {link.label} &#x2192;
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </article>
        )
      })}
    </section>
  )
}

export default TalkList
