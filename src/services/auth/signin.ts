import { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type SigninParams = {
  /**
   * ユーザー名
   * サンプルユーザーのユーザー名は"user"
   */
  username: string
  /**
   * パスワード
   * サンプルユーザーのパスワードは"password"
   */
  password: string
}

/**
 * 認証API（サインイン）
 * @param context APIコンテキスト
 * @param param パラメータ
 * @returns ログインユーザー
 */
const sigin = async (
  context: ApiContext,
  params: SigninParams,
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  )
}

export default sigin
