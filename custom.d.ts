declare module 'jsonwebtoken' {
    import { RequestHandler } from 'express';
  
    export interface SignOptions {
      expiresIn?: string | number | undefined;
      notBefore?: string | number | undefined;
      audience?: string | string[] | undefined;
      issuer?: string | string[] | undefined;
      jwtid?: string | undefined;
      subject?: string | undefined;
      noTimestamp?: boolean | undefined;
      header?: object | undefined;
      encoding?: string | undefined;
    }
  
    export interface VerifyOptions {
      algorithms?: string[] | undefined;
      audience?: string | RegExp | (string | RegExp)[] | undefined;
      clockTimestamp?: number | undefined;
      clockTolerance?: number | undefined;
      complete?: boolean | undefined;
      issuer?: string | string[] | undefined;
      ignoreExpiration?: boolean | undefined;
      ignoreNotBefore?: boolean | undefined;
      jwtid?: string | undefined;
      subject?: string | undefined;
      nonce?: string | undefined;
    }
  
    export interface DecodeOptions {
      complete?: boolean | undefined;
      json?: boolean | undefined;
    }
  
    export interface JwtPayload {
      [key: string]: any;
    }
  
    export function sign(
      payload: string | Buffer | object,
      secretOrPrivateKey: string | Buffer,
      options?: SignOptions
    ): string;
  
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: VerifyOptions
    ): JwtPayload | string;
  
    export function decode(
      token: string,
      options?: DecodeOptions
    ): null | { [key: string]: any } | string;
  }
  