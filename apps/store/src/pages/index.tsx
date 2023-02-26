import Head from 'next/head'
import Image from 'next/image'
import type { GetStaticProps } from 'next'
import { FeaturedCarousel, Button, GameCard, Typography } from '@hyperplay/ui'
import styles from '@/styles/Home.module.scss'
import { getGames } from '@/api/games'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Background } from '@hyperplay/ui'

const { Body } = Typography

type Item = {
  title: string
  image: string
  link: string
}

type FeaturedItem = {
  title: string
  description: string
  image: string
  link: string
}

interface HomeProps {
  featuredItems: FeaturedItem[]
  items: Item[]
}

export default function Home({ featuredItems, items }: HomeProps) {
  const router = useRouter()

  const parsedFeaturedItems = featuredItems.map((item) => ({
    title: item.title,
    description: item.description,
    buttonElement: (
      <Link href={item.link}>
        <Button type="primary" size="small" fixedWidth={167}>
          Test!
        </Button>
      </Link>
    ),
    imageElement: (
      <Image
        fill={true}
        src={item.image}
        alt={'test'}
        style={{ objectFit: 'cover' }}
      />
    )
  }))

  return (
    <>
      <Background className={styles.background} />

      <Head>
        <title>HyperPlay Store</title>
      </Head>
      {featuredItems.length && (
        <div className={styles.carouselContainer}>
          <FeaturedCarousel fullWidth={true} items={parsedFeaturedItems} />
        </div>
      )}

      <main className="main">
        <div className="content">
          <Body style={{ paddingTop: 44, paddingBottom: 26 }}>
            Alphabetically A-Z
          </Body>
          <div className={styles.items}>
            {items.map(({ title, image, link }, index) => (
              <Link href={link} key={index}>
                <GameCard
                  title={title}
                  image={
                    <Image
                      src={image}
                      fill={true}
                      alt={`${title} image`}
                      style={{ objectFit: 'cover' }}
                    />
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const games = await getGames({})

  const featuredItems = games.map((game) => ({
    title: game.projectMeta.name,
    description: game.projectMeta.short_description,
    image: game.projectMeta.image,
    link: `/game/${game.projectName}`
  }))

  const items = games.map((game) => ({
    title: game.projectMeta.name,
    image: game.releaseMeta.image,
    link: `/game/${game.projectName}`
  }))

  return {
    props: {
      featuredItems: featuredItems,
      items: items
    },
    revalidate: 60 * 5
  }
}
