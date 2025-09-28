import { useMemo, useState, type FC, type FormEvent } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { guestbookMessages } from '../../data/guestbook';
import type { GuestbookMessage } from '../../types';
import { MapPin, MessageSquare, Smile } from 'lucide-react';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxl};
`;

const HeroCard = styled(motion.section)`
  background: linear-gradient(145deg, #f4f4f5 0%, #e3e4e8 50%, #cfd1d8 100%);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.lg};
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 2.2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const HeroSubtitle = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  max-width: 520px;
`;

const HeroAccent = styled.div`
  position: absolute;
  right: ${theme.spacing.xxl};
  top: ${theme.spacing.xl};
  width: 120px;
  height: 120px;
  border-radius: 32px;
  background: radial-gradient(circle at top, rgba(255, 255, 255, 0.7), transparent 60%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
`;

const MessagesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: ${theme.colors.text.primary};
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const MessageCard = styled(motion.article)<{ $highlight?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: ${theme.spacing.lg};
  background-color: ${props => props.$highlight ? '#f1f1f5' : theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.lg};
  box-shadow: ${props => props.$highlight ? theme.shadows.md : theme.shadows.sm};
  border: 1px solid ${props => props.$highlight ? '#cfd1d8' : theme.colors.border};

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 32px;
    bottom: -${theme.spacing.lg};
    width: 2px;
    height: ${theme.spacing.xl};
    background: linear-gradient(180deg, rgba(55, 65, 81, 0.18), rgba(107, 114, 128, 0));
  }
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.round};
  background: linear-gradient(145deg, #d5d6dc 0%, #bbbcc7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #394150;
  box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.4);
`;

const MessageMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MessageTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.lg};
`;

const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const AuthorName = styled.span`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const AuthorRole = styled.span`
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.md};
  background-color: #eceff1;
  color: #394150;
  font-size: 0.75rem;
  font-weight: 600;
`;

const FloorBadge = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  font-weight: 600;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
  font-size: 0.85rem;
`;

const MessageBody = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.7;
  font-size: 0.98rem;
`;

const ReplyBlock = styled.div`
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  font-size: 0.95rem;
`;

const FormCard = styled(motion.form)`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.sm};
  display: grid;
  gap: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border};
`;

const FieldGroup = styled.div`
  display: grid;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: ${theme.colors.text.secondary};
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text.primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #b4b5bc;
    background-color: ${theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text.primary};
  resize: vertical;
  min-height: 140px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #b4b5bc;
    background-color: ${theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  justify-self: flex-start;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(135deg, #d9dadf 0%, #c0c2cb 100%);
  color: ${theme.colors.text.primary};
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: ${theme.shadows.sm};

  &:hover {
    filter: brightness(1.05);
  }
`;

const FormHint = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.text.muted};
  margin-top: -${theme.spacing.sm};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.secondary};
`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

export const GuestbookPage: FC = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>(() => guestbookMessages);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');

  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) => {
      if (a.highlight === b.highlight) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return a.highlight ? -1 : 1;
    });
  }, [messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !content.trim()) {
      return;
    }

    const newMessage: GuestbookMessage = {
      id: `guestbook-${Date.now()}`,
      name: name.trim(),
      message: content.trim(),
      createdAt: new Date().toISOString(),
      location: location.trim() || undefined,
      mood: mood.trim() || undefined
    };

    setMessages((prev) => [newMessage, ...prev]);
    setName('');
    setLocation('');
    setMood('');
    setContent('');
  };

  return (
    <PageContainer>
      <HeroCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroTitle>留言板</HeroTitle>
        <HeroSubtitle>
          这里是小小的“灵感交换区”。欢迎告诉我你正在关注的话题、想合作的项目，
          或者单纯分享此刻的心情。每一条留言都会认真阅读并尽力回复。
        </HeroSubtitle>
        <HeroAccent />
      </HeroCard>

      <MessagesSection>
        <SectionHeader>
          <SectionTitle>最新留言</SectionTitle>
          <span style={{ color: theme.colors.text.muted, fontSize: '0.85rem' }}>
            共 {messages.length} 条互动
          </span>
        </SectionHeader>

        <AnimatePresence mode="popLayout">
          {sortedMessages.length > 0 ? (
            <MessageList>
              {sortedMessages.map((message, index) => {
                const floor = sortedMessages.length - index;
                const initial = message.name.trim().charAt(0).toUpperCase();
                return (
                  <MessageCard
                    key={message.id}
                    $highlight={message.highlight}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    id={`floor-${floor}`}
                  >
                    <Avatar>{initial || '访'}</Avatar>

                    <MessageMain>
                      <MessageTopRow>
                        <AuthorBlock>
                          <AuthorName>{message.name}</AuthorName>
                          {message.highlight && <AuthorRole>楼主</AuthorRole>}
                        </AuthorBlock>
                        <FloorBadge>{floor} 楼</FloorBadge>
                      </MessageTopRow>

                      <MetaRow>
                        <span>
                          <MessageSquare size={14} style={{ marginRight: 4 }} />
                          {formatDate(message.createdAt)}
                        </span>
                        {message.location && (
                          <span>
                            <MapPin size={14} style={{ marginRight: 4 }} />
                            {message.location}
                          </span>
                        )}
                        {message.mood && (
                          <span>
                            <Smile size={14} style={{ marginRight: 4 }} />
                            {message.mood}
                          </span>
                        )}
                      </MetaRow>

                      <MessageBody>{message.message}</MessageBody>

                      {message.reply && (
                        <ReplyBlock>
                          <strong>我的回复：</strong>
                          <br />
                          {message.reply}
                        </ReplyBlock>
                      )}
                    </MessageMain>
                  </MessageCard>
                );
              })}
            </MessageList>
          ) : (
            <EmptyState>还没有留言，期待你的第一条问候。</EmptyState>
          )}
        </AnimatePresence>
      </MessagesSection>

      <FormCard
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <SectionTitle>写下一段留言</SectionTitle>

        <FieldGroup>
          <Label htmlFor="guestbook-name">署名</Label>
          <Input
            id="guestbook-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例如：小林 / Lillian"
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="guestbook-location">所在城市（可选）</Label>
          <Input
            id="guestbook-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="东京 / 广州 / 线上"
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="guestbook-mood">此刻心情关键词（可选）</Label>
          <Input
            id="guestbook-mood"
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            placeholder="期待合作 / 偶遇灵感"
          />
        </FieldGroup>

        <FieldGroup>
          <Label htmlFor="guestbook-content">留言内容</Label>
          <Textarea
            id="guestbook-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="写下你的想法、问题或一句话问候…"
          />
          <FormHint>内容会直接展示在页面上，请避免包含隐私信息。</FormHint>
        </FieldGroup>

        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          留下足迹
        </SubmitButton>
      </FormCard>
    </PageContainer>
  );
};
