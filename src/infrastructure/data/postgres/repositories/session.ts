import { ISessionRepository } from '@application/repositories/session.interface';
import { Session } from '@domain/session';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from '@infrastructure/data/postgres/entities/session';
import { Repository } from 'typeorm';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async save(session: Session): Promise<Session> {
    const sessionEntity = this.toSessionEntity(session);

    const savedSessionEntity = await this.sessionRepository.save({
      ...sessionEntity,
      user: { id: session.userId },
    });
    return this.toSession(savedSessionEntity);
  }

  async findByUserIdAndFingerprint(
    userId: string,
    fingerprint: string,
  ): Promise<Session | null> {
    const sessionEntity = await this.sessionRepository.findOne({
      relations: ['user'],
      where: { user: { id: userId }, fingerprint },
    });
    return sessionEntity ? this.toSession(sessionEntity) : null;
  }

  async deleteByUserIdAndFingerprint(
    userId: string,
    fingerprint: string,
  ): Promise<void> {
    await this.sessionRepository.delete({
      user: { id: userId },
      fingerprint,
    });
  }

  private toSessionEntity(session: Session): SessionEntity {
    const sessionEntity = new SessionEntity();
    sessionEntity.id = session.id;
    sessionEntity.fingerprint = session.fingerprint;
    sessionEntity.refreshToken = session.refreshToken;
    sessionEntity.createAt = session.createAt;
    sessionEntity.updateAt = session.updateAt;
    return sessionEntity;
  }

  private toSession(sessionEntity: SessionEntity): Session {
    const session: Session = new Session(
      sessionEntity.id,
      sessionEntity.user.id,
      sessionEntity.fingerprint,
      sessionEntity.refreshToken,
      sessionEntity.createAt,
      sessionEntity.updateAt,
    );
    return session;
  }
}
