import React from 'react';
import { Container, Grid, Group, Text, ThemeIcon, Anchor } from '@mantine/core';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { icon: Instagram, link: '#' },
    { icon: Twitter, link: '#' },
    { icon: Facebook, link: '#' },
    { icon: Linkedin, link: '#' },
  ];

  return (
    <footer className="bg-gray-alpha-2 mt-20 p-10">
      <Container>
        <Grid>
          <Grid.Col xs={12} sm={4}>
            <Text size="lg" weight={900} mb="md">
              Job Finder
            </Text>
            <Text size="sm"  mb="xs">
              Connect with us
            </Text>
            <Group spacing="sm">
              {socialIcons.map((social, index) => (
                <ThemeIcon
                  key={index}
                  variant="gradient"
                  size="lg"
                  radius="xl"
                  component="a"
                  href={social.link}
                  target="_blank"
                  style={{ color: '#fff', borderColor: '#555' }}
                >
                  <social.icon size={24} />
                </ThemeIcon>
              ))}
            </Group>
          </Grid.Col>

          <Grid.Col xs={12} sm={4}>
            <Text size="lg" weight={700} mb="md">
              About us
            </Text>
            <Group direction="column" spacing="xs">
              <Anchor href="#" size="sm">
                Careers
              </Anchor>
              <Anchor href="#" size="sm">
                Employer home
              </Anchor>
              <Anchor href="#" size="sm">
                Sitemap
              </Anchor>
              <Anchor href="#" size="sm">
                Credits
              </Anchor>
            </Group>
          </Grid.Col>

          <Grid.Col xs={12} sm={4}>
            <Text size="lg" weight={700} mb="md">
              Support
            </Text>
            <Group direction="column" spacing="xs">
              <Anchor href="#" size="sm">
                Help center
              </Anchor>
              <Anchor href="#" size="sm">
                Summons/Notices
              </Anchor>
              <Anchor href="#" size="sm">
                Grievances
              </Anchor>
              <Anchor href="#" size="sm">
                Report issue
              </Anchor>
            </Group>
          </Grid.Col>
        </Grid>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Text size="sm">
            © 2024 Job Finder. All rights reserved. Privacy Policy | Terms &
            Conditions | Fraud Alert
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
