import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, telefone, assunto, mensagem } = body;

    if (!nome || !email || !assunto || !mensagem) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // TODO: integrar com serviço de e-mail (ex: Resend, Nodemailer, SendGrid)
    // Exemplo com Resend:
    // await resend.emails.send({
    //   from: "site@escritorio.adv.br",
    //   to: "contato@escritorio.adv.br",
    //   subject: `[Site] ${assunto} — ${nome}`,
    //   html: `<p><b>Nome:</b> ${nome}</p>
    //          <p><b>E-mail:</b> ${email}</p>
    //          <p><b>Telefone:</b> ${telefone}</p>
    //          <p><b>Assunto:</b> ${assunto}</p>
    //          <p><b>Mensagem:</b><br/>${mensagem}</p>`,
    // });

    console.log("[contato]", { nome, email, telefone, assunto, mensagem });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao processar a solicitação." },
      { status: 500 }
    );
  }
}
