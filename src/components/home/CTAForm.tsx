"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const COUNTRIES = [
  // América do Sul
  { code: "+55",  flag: "🇧🇷", name: "Brasil" },
  { code: "+54",  flag: "🇦🇷", name: "Argentina" },
  { code: "+591", flag: "🇧🇴", name: "Bolívia" },
  { code: "+56",  flag: "🇨🇱", name: "Chile" },
  { code: "+57",  flag: "🇨🇴", name: "Colômbia" },
  { code: "+593", flag: "🇪🇨", name: "Equador" },
  { code: "+592", flag: "🇬🇾", name: "Guiana" },
  { code: "+595", flag: "🇵🇾", name: "Paraguai" },
  { code: "+51",  flag: "🇵🇪", name: "Peru" },
  { code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "+598", flag: "🇺🇾", name: "Uruguai" },
  { code: "+58",  flag: "🇻🇪", name: "Venezuela" },
  // América do Norte e Central
  { code: "+1",   flag: "🇺🇸", name: "EUA" },
  { code: "+1",   flag: "🇨🇦", name: "Canadá" },
  { code: "+52",  flag: "🇲🇽", name: "México" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+505", flag: "🇳🇮", name: "Nicarágua" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+507", flag: "🇵🇦", name: "Panamá" },
  { code: "+53",  flag: "🇨🇺", name: "Cuba" },
  { code: "+1",   flag: "🇵🇷", name: "Porto Rico" },
  { code: "+1",   flag: "🇩🇴", name: "Rep. Dominicana" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+1",   flag: "🇯🇲", name: "Jamaica" },
  { code: "+1",   flag: "🇹🇹", name: "Trinidad e Tobago" },
  // Europa
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+34",  flag: "🇪🇸", name: "Espanha" },
  { code: "+44",  flag: "🇬🇧", name: "Reino Unido" },
  { code: "+49",  flag: "🇩🇪", name: "Alemanha" },
  { code: "+33",  flag: "🇫🇷", name: "França" },
  { code: "+39",  flag: "🇮🇹", name: "Itália" },
  { code: "+31",  flag: "🇳🇱", name: "Holanda" },
  { code: "+32",  flag: "🇧🇪", name: "Bélgica" },
  { code: "+41",  flag: "🇨🇭", name: "Suíça" },
  { code: "+43",  flag: "🇦🇹", name: "Áustria" },
  { code: "+46",  flag: "🇸🇪", name: "Suécia" },
  { code: "+47",  flag: "🇳🇴", name: "Noruega" },
  { code: "+45",  flag: "🇩🇰", name: "Dinamarca" },
  { code: "+358", flag: "🇫🇮", name: "Finlândia" },
  { code: "+48",  flag: "🇵🇱", name: "Polônia" },
  { code: "+420", flag: "🇨🇿", name: "República Tcheca" },
  { code: "+36",  flag: "🇭🇺", name: "Hungria" },
  { code: "+40",  flag: "🇷🇴", name: "Romênia" },
  { code: "+30",  flag: "🇬🇷", name: "Grécia" },
  { code: "+380", flag: "🇺🇦", name: "Ucrânia" },
  { code: "+7",   flag: "🇷🇺", name: "Rússia" },
  { code: "+90",  flag: "🇹🇷", name: "Turquia" },
  { code: "+353", flag: "🇮🇪", name: "Irlanda" },
  { code: "+354", flag: "🇮🇸", name: "Islândia" },
  { code: "+352", flag: "🇱🇺", name: "Luxemburgo" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+357", flag: "🇨🇾", name: "Chipre" },
  { code: "+421", flag: "🇸🇰", name: "Eslováquia" },
  { code: "+386", flag: "🇸🇮", name: "Eslovênia" },
  { code: "+385", flag: "🇭🇷", name: "Croácia" },
  { code: "+381", flag: "🇷🇸", name: "Sérvia" },
  { code: "+387", flag: "🇧🇦", name: "Bósnia" },
  { code: "+359", flag: "🇧🇬", name: "Bulgária" },
  { code: "+370", flag: "🇱🇹", name: "Lituânia" },
  { code: "+371", flag: "🇱🇻", name: "Letônia" },
  { code: "+372", flag: "🇪🇪", name: "Estônia" },
  { code: "+373", flag: "🇲🇩", name: "Moldávia" },
  { code: "+375", flag: "🇧🇾", name: "Bielo-Rússia" },
  { code: "+389", flag: "🇲🇰", name: "Macedônia do Norte" },
  { code: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "+355", flag: "🇦🇱", name: "Albânia" },
  // Ásia e Oriente Médio
  { code: "+81",  flag: "🇯🇵", name: "Japão" },
  { code: "+82",  flag: "🇰🇷", name: "Coreia do Sul" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+91",  flag: "🇮🇳", name: "Índia" },
  { code: "+65",  flag: "🇸🇬", name: "Singapura" },
  { code: "+60",  flag: "🇲🇾", name: "Malásia" },
  { code: "+62",  flag: "🇮🇩", name: "Indonésia" },
  { code: "+63",  flag: "🇵🇭", name: "Filipinas" },
  { code: "+66",  flag: "🇹🇭", name: "Tailândia" },
  { code: "+84",  flag: "🇻🇳", name: "Vietnã" },
  { code: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "+853", flag: "🇲🇴", name: "Macau" },
  { code: "+971", flag: "🇦🇪", name: "Emirados Árabes" },
  { code: "+966", flag: "🇸🇦", name: "Arábia Saudita" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+20",  flag: "🇪🇬", name: "Egito" },
  { code: "+98",  flag: "🇮🇷", name: "Irã" },
  { code: "+964", flag: "🇮🇶", name: "Iraque" },
  { code: "+961", flag: "🇱🇧", name: "Líbano" },
  { code: "+962", flag: "🇯🇴", name: "Jordânia" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+974", flag: "🇶🇦", name: "Catar" },
  { code: "+973", flag: "🇧🇭", name: "Bahrein" },
  { code: "+968", flag: "🇴🇲", name: "Omã" },
  { code: "+92",  flag: "🇵🇰", name: "Paquistão" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+95",  flag: "🇲🇲", name: "Myanmar" },
  { code: "+855", flag: "🇰🇭", name: "Camboja" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+976", flag: "🇲🇳", name: "Mongólia" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+975", flag: "🇧🇹", name: "Butão" },
  { code: "+960", flag: "🇲🇻", name: "Maldivas" },
  { code: "+7",   flag: "🇰🇿", name: "Cazaquistão" },
  { code: "+998", flag: "🇺🇿", name: "Uzbequistão" },
  { code: "+993", flag: "🇹🇲", name: "Turcomenistão" },
  { code: "+996", flag: "🇰🇬", name: "Quirguistão" },
  { code: "+992", flag: "🇹🇯", name: "Tajiquistão" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijão" },
  { code: "+995", flag: "🇬🇪", name: "Geórgia" },
  { code: "+374", flag: "🇦🇲", name: "Armênia" },
  { code: "+967", flag: "🇾🇪", name: "Iêmen" },
  { code: "+963", flag: "🇸🇾", name: "Síria" },
  { code: "+93",  flag: "🇦🇫", name: "Afeganistão" },
  // África
  { code: "+27",  flag: "🇿🇦", name: "África do Sul" },
  { code: "+234", flag: "🇳🇬", name: "Nigéria" },
  { code: "+254", flag: "🇰🇪", name: "Quênia" },
  { code: "+233", flag: "🇬🇭", name: "Gana" },
  { code: "+212", flag: "🇲🇦", name: "Marrocos" },
  { code: "+213", flag: "🇩🇿", name: "Argélia" },
  { code: "+216", flag: "🇹🇳", name: "Tunísia" },
  { code: "+218", flag: "🇱🇾", name: "Líbia" },
  { code: "+251", flag: "🇪🇹", name: "Etiópia" },
  { code: "+255", flag: "🇹🇿", name: "Tanzânia" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+260", flag: "🇿🇲", name: "Zâmbia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbábue" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+258", flag: "🇲🇿", name: "Moçambique" },
  { code: "+238", flag: "🇨🇻", name: "Cabo Verde" },
  { code: "+239", flag: "🇸🇹", name: "São Tomé e Príncipe" },
  { code: "+245", flag: "🇬🇼", name: "Guiné-Bissau" },
  { code: "+240", flag: "🇬🇶", name: "Guiné Equatorial" },
  { code: "+241", flag: "🇬🇦", name: "Gabão" },
  { code: "+237", flag: "🇨🇲", name: "Camarões" },
  { code: "+236", flag: "🇨🇫", name: "Rep. Centro-Africana" },
  { code: "+235", flag: "🇹🇩", name: "Chade" },
  { code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "+243", flag: "🇨🇩", name: "RD Congo" },
  { code: "+250", flag: "🇷🇼", name: "Ruanda" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+252", flag: "🇸🇴", name: "Somália" },
  { code: "+253", flag: "🇩🇯", name: "Djibuti" },
  { code: "+291", flag: "🇪🇷", name: "Eritreia" },
  { code: "+249", flag: "🇸🇩", name: "Sudão" },
  { code: "+211", flag: "🇸🇸", name: "Sudão do Sul" },
  { code: "+266", flag: "🇱🇸", name: "Lesoto" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+264", flag: "🇳🇦", name: "Namíbia" },
  { code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+230", flag: "🇲🇺", name: "Maurícia" },
  { code: "+248", flag: "🇸🇨", name: "Seicheles" },
  { code: "+220", flag: "🇬🇲", name: "Gâmbia" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+222", flag: "🇲🇷", name: "Mauritânia" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+224", flag: "🇬🇳", name: "Guiné" },
  { code: "+225", flag: "🇨🇮", name: "Costa do Marfim" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+227", flag: "🇳🇪", name: "Níger" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+232", flag: "🇸🇱", name: "Serra Leoa" },
  { code: "+231", flag: "🇱🇷", name: "Libéria" },
  // Oceania
  { code: "+61",  flag: "🇦🇺", name: "Austrália" },
  { code: "+64",  flag: "🇳🇿", name: "Nova Zelândia" },
  { code: "+675", flag: "🇵🇬", name: "Papua Nova Guiné" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+677", flag: "🇸🇧", name: "Ilhas Salomão" },
  { code: "+678", flag: "🇻🇺", name: "Vanuatu" },
  { code: "+686", flag: "🇰🇮", name: "Kiribati" },
  { code: "+685", flag: "🇼🇸", name: "Samoa" },
  { code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "+674", flag: "🇳🇷", name: "Nauru" },
  { code: "+688", flag: "🇹🇻", name: "Tuvalu" },
  { code: "+680", flag: "🇵🇼", name: "Palau" },
  { code: "+691", flag: "🇫🇲", name: "Micronésia" },
  { code: "+692", flag: "🇲🇭", name: "Ilhas Marshall" },
];

const MAX_CHARS = 500;

type Country = { code: string; flag: string; name: string };

function CountrySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value) ?? COUNTRIES[0];
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const select = (c: Country) => {
    onChange(c.code);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label="Selecionar código do país"
        aria-expanded={open}
        className="h-full flex items-center gap-1.5 bg-white/5 border border-gold/20 rounded-sm px-3 text-ivory text-sm focus:outline-none focus:border-gold/50 transition-colors duration-200 hover:border-gold/40 whitespace-nowrap"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="text-xs text-muted">{selected.code}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gold/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-64 rounded-sm border border-gold/20 bg-[#111827] shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gold/10">
            <input
              type="text"
              placeholder="Buscar país..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full bg-white/5 border border-gold/10 rounded-sm px-3 py-1.5 text-ivory text-xs focus:outline-none focus:border-gold/40 placeholder-muted/50"
            />
          </div>
          <ul
            role="listbox"
            className="max-h-52 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#C9A84C33 transparent" }}
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-xs text-muted text-center">Nenhum país encontrado</li>
            ) : (
              filtered.map((c) => (
                <li
                  key={c.code + c.name}
                  role="option"
                  aria-selected={c.code === value && c.name === selected.name}
                  onClick={() => select(c)}
                  className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm transition-colors hover:bg-white/5 ${
                    c.code === value && c.name === selected.name
                      ? "text-gold bg-gold/5"
                      : "text-ivory/80"
                  }`}
                >
                  <span className="text-base leading-none w-6 text-center">{c.flag}</span>
                  <span className="flex-1 text-xs">{c.name}</span>
                  <span className="text-[11px] text-muted/70">{c.code}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function SubjectSelect({
  value,
  onChange,
  placeholder,
  subjects,
  required,
  hasError,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  subjects: string[];
  required?: boolean;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between bg-white/5 border rounded-sm px-4 py-3.5 text-sm focus:outline-none transition-colors duration-200 hover:border-gold/40 ${
          hasError ? "border-red-400/60" : "border-gold/20 focus:border-gold/50"
        } ${value ? "text-ivory" : "text-muted"}`}
      >
        <span>
          {value || placeholder}
          {required && !value && <span className="text-gold/70 ml-1">*</span>}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gold/50 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full mt-1 z-50 w-full rounded-sm border border-gold/20 bg-[#111827] shadow-xl overflow-hidden"
        >
          {subjects.map((s) => (
            <li
              key={s}
              role="option"
              aria-selected={s === value}
              onClick={() => { onChange(s); setOpen(false); }}
              className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                s === value
                  ? "text-gold bg-gold/10"
                  : "text-ivory/80 hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const inputBase =
  "peer w-full bg-white/5 border border-gold/20 rounded-sm px-4 pt-6 pb-2 text-ivory text-sm focus:outline-none focus:border-gold/50 transition-colors duration-200 placeholder-transparent";

const labelBase =
  "absolute left-4 text-muted pointer-events-none transition-all duration-200 " +
  "peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm " +
  "top-2 -translate-y-0 text-[10px] tracking-wide peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:text-gold/80";

const labelTextarea =
  "absolute left-4 text-muted pointer-events-none transition-all duration-200 " +
  "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm " +
  "top-2 text-[10px] tracking-wide peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-gold/80";

export default function CTAForm() {
  const t = useTranslations("cta");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    countryCode: "+55",
    telefone: "",
    assunto: "",
    mensagem: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = () => {
    const v = t.raw("form.validation") as Record<string, string>;
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.nome.trim())                          e.nome = v.nameRequired;
    if (!form.email.trim())                         e.email = v.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = v.emailInvalid;
    if (!form.assunto)                              e.assunto = v.subjectRequired;
    if (!form.mensagem.trim())                      e.mensagem = v.messageRequired;
    if (!form.consent)                              e.consent = v.consentRequired;
    return e;
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_CHARS) return;
    setForm((prev) => ({ ...prev, mensagem: value }));
    const el = e.target;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: `${form.countryCode} ${form.telefone}`,
          assunto: form.assunto,
          mensagem: form.mensagem,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-8 text-center py-10 px-6 border border-gold/20 rounded-sm bg-white/5">
        <div
          className="mx-auto mb-4 w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-ivory text-xl mb-2">{t("form.successTitle")}</h3>
        <p className="text-muted text-sm">{t("form.successMessage")}</p>
      </div>
    );
  }

  const subjects = t.raw("form.subjects") as string[];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-8 space-y-4 text-left"
      aria-label="Formulário de contato"
    >
      {/* Nome completo */}
      <div>
        <div className="relative">
          <input
            type="text"
            id="cta-nome"
            placeholder=" "
            autoComplete="name"
            value={form.nome}
            onChange={set("nome")}
            className={`${inputBase} ${errors.nome ? "border-red-400/60" : ""}`}
          />
          <label htmlFor="cta-nome" className={labelBase}>
            {t("form.nameLabel")} <span className="text-gold/70">*</span>
          </label>
        </div>
        {errors.nome && <p className="mt-1 ml-1 text-[11px] text-red-400">{errors.nome}</p>}
      </div>

      {/* Email + Telefone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="relative">
            <input
              type="email"
              id="cta-email"
              placeholder=" "
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              className={`${inputBase} ${errors.email ? "border-red-400/60" : ""}`}
            />
            <label htmlFor="cta-email" className={labelBase}>
              {t("form.emailLabel")} <span className="text-gold/70">*</span>
            </label>
          </div>
          {errors.email && <p className="mt-1 ml-1 text-[11px] text-red-400">{errors.email}</p>}
        </div>

        <div className="flex gap-2">
          <CountrySelect
            value={form.countryCode}
            onChange={(code) => setForm((prev) => ({ ...prev, countryCode: code }))}
          />

          <div className="relative flex-1">
            <input
              type="tel"
              id="cta-telefone"
              placeholder=" "
              autoComplete="tel"
              value={form.telefone}
              onChange={set("telefone")}
              className={inputBase}
            />
            <label htmlFor="cta-telefone" className={labelBase}>
              {t("form.phoneLabel")}
            </label>
          </div>
        </div>
      </div>

      {/* Assunto */}
      <div>
        <SubjectSelect
          value={form.assunto}
          onChange={(val) => { setForm((prev) => ({ ...prev, assunto: val })); setErrors((prev) => ({ ...prev, assunto: undefined })); }}
          placeholder={t("form.subjectDefault")}
          subjects={subjects}
          required
          hasError={!!errors.assunto}
        />
        {errors.assunto && <p className="mt-1 ml-1 text-[11px] text-red-400">{errors.assunto}</p>}
      </div>

      {/* Mensagem */}
      <div>
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="cta-mensagem"
          placeholder=" "
          rows={3}
          value={form.mensagem}
          onChange={(e) => { handleMessageChange(e); if (errors.mensagem) setErrors((prev) => ({ ...prev, mensagem: undefined })); }}
          className={`${inputBase} resize-y overflow-auto pb-7 ${errors.mensagem ? "border-red-400/60" : ""}`}
          style={{ minHeight: "96px" }}
        />
        <label htmlFor="cta-mensagem" className={labelTextarea}>
          {t("form.messageLabel")} <span className="text-gold/70">*</span>
        </label>

        {/* Contador de caracteres */}
        <span
          className={`absolute bottom-2 left-4 text-[10px] transition-colors ${
            MAX_CHARS - form.mensagem.length < 50 ? "text-amber-400/80" : "text-muted/50"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {MAX_CHARS - form.mensagem.length} {t("form.charCount")}
        </span>

        {/* Indicador de resize — visível em mobile */}
        <span
          className="absolute bottom-1.5 right-[1px] pointer-events-none select-none"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="10" x2="10" y2="2" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="5" y1="10" x2="10" y2="5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8" y1="10" x2="10" y2="8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </div>
      {errors.mensagem && <p className="mt-1 ml-1 text-[11px] text-red-400">{errors.mensagem}</p>}
      </div>

      {/* Consentimento */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => { setForm((prev) => ({ ...prev, consent: e.target.checked })); if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined })); }}
            className={`mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer accent-gold ${errors.consent ? "outline outline-1 outline-red-400/60 rounded-sm" : ""}`}
          />
          <span className="text-[12px] text-muted/80 group-hover:text-muted transition-colors leading-relaxed">
            {t("form.consentLabel")}
          </span>
        </label>
        {errors.consent && <p className="mt-1 ml-7 text-[11px] text-red-400">{errors.consent}</p>}
      </div>

      {/* Botão enviar */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-primary font-medium text-[12px] tracking-[1.5px] uppercase px-8 py-4 rounded-sm hover:bg-gold-light transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t("form.sending") : t("form.submitBtn")}
      </button>

      {status === "error" && (
        <p role="alert" className="text-red-400 text-xs text-center">
          {t("form.errorMessage")}
        </p>
      )}
    </form>
  );
}
