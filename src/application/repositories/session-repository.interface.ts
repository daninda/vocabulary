import { Session } from 'src/domain/entities/session';

export abstract class ISessionRepository {
  abstract save(session: Session): Promise<Session>;
  abstract findByUserIdAndFingerprint(
    userId: string,
    fingerprint: string,
  ): Promise<Session | null>;
  abstract deleteByUserIdAndFingerprint(
    userId: string,
    fingerprint: string,
  ): Promise<void>;
}
