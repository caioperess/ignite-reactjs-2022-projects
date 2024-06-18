import { Button, Heading, MultiStep, Text } from '@ignite-call-ui-docs/react'
import { ArrowRight, Check } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { destroyCookie } from 'nookies'

import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => {
    await signIn('google')
  }

  const handleNavigateToNextStep = async () => {
    destroyCookie(null, '@ignitecall:userId', { path: '/' })
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>

          <Text size="sm">
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            <Button
              variant={isSignedIn ? 'primary' : 'secondary'}
              size="sm"
              onClick={handleConnectCalendar}
              disabled={isSignedIn}
            >
              {isSignedIn ? (
                <>
                  Conectado <Check />
                </>
              ) : (
                <>
                  Conectar <ArrowRight />
                </>
              )}
            </Button>
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google,verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </AuthError>
          )}

          <Button
            type="button"
            disabled={!isSignedIn}
            onClick={handleNavigateToNextStep}
          >
            Próximo passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
