import { Heading, Text } from '@ignite-call-ui-docs/react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'

import previewImg from '@/assets/app_preview.png'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>

          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image src={previewImg} alt="" height={400} quality={100} priority />
        </Preview>
      </Container>
    </>
  )
}
