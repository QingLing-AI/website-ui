"use client"

import { useTranslation } from "react-i18next";
import PageTitle from "../../components/PageTitle"

const TitleSection = () => {
  const { t } = useTranslation();

  return <PageTitle title={t('news.title')} description={t('news.titleDesc')} />
}

export default TitleSection;
