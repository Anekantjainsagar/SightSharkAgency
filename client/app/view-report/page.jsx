"use client";
import React, { useContext, useEffect } from "react";
import Context from "../Context/Context";
import Leftbar from "../Components/Utils/Leftbar";
import Navbar from "../Components/Utils/Navbar";
import { useRouter } from "next/navigation";

let lookerstudio =
  "https://lookerstudio.google.com/embed/reporting/create?c.reportId=cc6801a3-c549-4c01-9939-3aaa22f9629c&r.reportName=Geocon_WOVA_2024-12-17&ds.%2A.keepDatasourceName=True&ds.%2A.refreshFields=False&ds.ds756.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.google_keywordmetrics_vw%60%20WHERE%20Client=%20%22Geocon_WOVA%22%20and%20%28REGEXP_CONTAINS%28campaignName%2Cr%27WOVA%27%29%29&ds.ds603.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.platform_urban%60%20where%20client_name%20=%22Geocon_WOVA%22&ds.ds757.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.google_performancebycampaignadGroup_vw%60%20where%20Client=%22Geocon_WOVA%22%20and%20%28REGEXP_CONTAINS%28campaignName%2Cr%27WOVA%27%29%29&ds.ds608.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.linkedin_vw%60%20where%20client%20=%22Geocon_WOVA%22&ds.ds605.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.programmatic_five_stones_vw%60%20where%20client%20=%20%22Geocon_WOVA%22&ds.ds707.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.google_analytics_ua_vw%60%20WHERE%20client%20=%22Geocon_WOVA%22&ds.ds706.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.facebook_instagram_vw%60%20where%20client=%22Geocon_WOVA%22&ds.ds606.sql=select%20platform%2Ccase%20when%20sum%28january_month_Enquiries%29%3C%3E0%20then%20sum%28january_month_Spend%29/sum%28january_month_Enquiries%29%20else%200%20end%20as%20january_month_CPE%2Ccase%20when%20sum%28february_month_Enquiries%29%3C%3E0%20then%20sum%28february_month_Spend%29/sum%28february_month_Enquiries%29%20else%200%20end%20as%20february_month_CPE%2Ccase%20when%20sum%28march_month_Enquiries%29%3C%3E0%20then%20sum%28march_month_Spend%29/sum%28march_month_Enquiries%29%20else%200%20end%20as%20march_month_CPE%2Ccase%20when%20sum%28april_month_Enquiries%29%3C%3E0%20then%20sum%28april_month_Spend%29/sum%28april_month_Enquiries%29%20else%200%20end%20as%20april_month_CPE%2Ccase%20when%20sum%28may_month_Enquiries%29%3C%3E0%20then%20sum%28may_month_Spend%29/sum%28may_month_Enquiries%29%20else%200%20end%20as%20may_month_CPE%2Ccase%20when%20sum%28june_month_Enquiries%29%3C%3E0%20then%20sum%28june_month_Spend%29/sum%28june_month_Enquiries%29%20else%200%20end%20as%20june_month_CPE%2Ccase%20when%20sum%28july_month_Enquiries%29%3C%3E0%20then%20sum%28july_month_Spend%29/sum%28july_month_Enquiries%29%20else%200%20end%20as%20july_month_CPE%2Ccase%20when%20sum%28august_month_Enquiries%29%3C%3E0%20then%20sum%28august_month_Spend%29/sum%28august_month_Enquiries%29%20else%200%20end%20as%20august_month_CPE%2Ccase%20when%20sum%28september_month_Enquiries%29%3C%3E0%20then%20sum%28september_month_Spend%29/sum%28september_month_Enquiries%29%20else%200%20end%20as%20september_month_CPE%2Ccase%20when%20sum%28october_month_Enquiries%29%3C%3E0%20then%20sum%28october_month_Spend%29/sum%28october_month_Enquiries%29%20else%200%20end%20as%20october_month_CPE%2Ccase%20when%20sum%28november_month_Enquiries%29%3C%3E0%20then%20sum%28november_month_Spend%29/sum%28november_month_Enquiries%29%20else%200%20end%20as%20november_month_CPE%2Ccase%20when%20sum%28december_month_Enquiries%29%3C%3E0%20then%20sum%28december_month_Spend%29/sum%28december_month_Enquiries%29%20else%200%20end%20as%20december_month_CPE%20from%20%60metropolis-digital.marketing_analytics.monthly_enquiries_spend_by_platform_vw%60%20where%20client=%22Geocon_WOVA%22%20and%20%28%28filter_flag=1%20and%20REGEXP_CONTAINS%28campaign_name%2Cr%27WOVA%27%29%29%20OR%20%28filter_flag=0%29%29%20group%20by%20platform%20order%20by%20platform&ds.ds780.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.monthly_summary_by_platform_vw%60%20where%20client=%22Geocon_WOVA%22%20and%20%28%28filter_flag=1%20and%20REGEXP_CONTAINS%28campaign_name%2Cr%27WOVA%27%29%29%20OR%20%28filter_flag=0%29%29&ds.ds602.sql=select%20platform%2Csum%28january_month_Enquiries%29%20as%20january_month_Enquiries%2Csum%28february_month_Enquiries%29%20as%20february_month_Enquiries%2Csum%28march_month_Enquiries%29%20as%20march_month_Enquiries%2Csum%28april_month_Enquiries%29%20as%20april_month_Enquiries%2Csum%28may_month_Enquiries%29%20as%20may_month_Enquiries%2Csum%28june_month_Enquiries%29%20as%20june_month_Enquiries%2Csum%28july_month_Enquiries%29%20as%20july_month_Enquiries%2Csum%28august_month_Enquiries%29%20as%20august_month_Enquiries%2Csum%28september_month_Enquiries%29%20as%20september_month_Enquiries%2Csum%28october_month_Enquiries%29%20as%20october_month_Enquiries%2Csum%28november_month_Enquiries%29%20as%20november_month_Enquiries%2Csum%28december_month_Enquiries%29%20as%20december_month_Enquiries%20from%20%60metropolis-digital.marketing_analytics.monthly_enquiries_spend_by_platform_vw%60%20where%20client=%22Geocon_WOVA%22%20and%20%28%28filter_flag=1%20and%20REGEXP_CONTAINS%28campaign_name%2Cr%27WOVA%27%29%29%20OR%20%28filter_flag=0%29%29%20group%20by%20platform%20order%20by%20platform&ds.ds708.sql=SELECT%20platform%2C%20sum%28case%20when%20months_gap=0%20then%20Spend%20else%200%20end%29%20as%20current_month_spend%2C%20sum%28case%20when%20months_gap=0%20then%20Enquiries%20else%200%20end%29%20as%20current_month_Enquiries%2C%20case%20when%20sum%28case%20when%20months_gap=0%20then%20Enquiries%20else%200%20end%29%3C%3E0%20then%20sum%28case%20when%20months_gap=0%20then%20Spend%20else%200%20end%29/sum%28case%20when%20months_gap=0%20then%20Enquiries%20else%200%20end%29%20else%200%20end%20as%20current_month_cpe%2C%20sum%28case%20when%20months_gap=1%20then%20Spend%20else%200%20end%29%20as%20previous_month_Spend%2C%20sum%28case%20when%20months_gap=1%20then%20Enquiries%20else%200%20end%29%20as%20previous_month_Enquiries%2C%20case%20when%20sum%28case%20when%20months_gap=1%20then%20Enquiries%20else%200%20end%29%3C%3E0%20then%20sum%28case%20when%20months_gap=1%20then%20Spend%20else%200%20end%29/sum%28case%20when%20months_gap=1%20then%20Enquiries%20else%200%20end%29%20else%200%20end%20as%20previous_month_cpe%2C%20sum%28Spend%29%20as%20lifetime_spend%2C%20sum%28Enquiries%29%20as%20lifetime_Enquiries%2C%20case%20when%20sum%28Enquiries%29%3C%3E0%20then%20sum%28Spend%29/sum%28Enquiries%29%20else%200%20end%20as%20lifetime_cpe%20FROM%20%60metropolis-digital.marketing_analytics.full_year_master_vw%60%20where%20months_gap%3E=0%20and%20client=%22Geocon_WOVA%22%20and%20%28%28filter_flag=1%20and%20REGEXP_CONTAINS%28campaign_name%2Cr%27WOVA%27%29%29%20OR%20%28filter_flag=0%29%29%20group%20by%201&ds.ds705.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.google_analytics_ga4_vw%60%20WHERE%20client=%22Geocon_WOVA%22&ds.ds609.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.domain_vw%60%20where%20account_id%20=%22Geocon_WOVA%22&ds.ds607.sql=select%20%2Afrom%20%60metropolis-digital.marketing_analytics.platform_a_and_d%60%20where%20client_name%20=%22Geocon_WOVA%22&ds.ds601.sql=select%20%2A%20from%20%60metropolis-digital.marketing_analytics.rea_vw%60%20where%20account_id%20=%20%22Geocon_WOVA%22&ds.ds709.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.tiktok_vw%60%20WHERE%20client=%22Geocon_WOVA%22&ds.ds1132.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.platform_uber%60%20WHERE%20client_name=%22Geocon_WOVA%22&ds.ds1124.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.platform_blis%60%20WHERE%20client_name=%22Geocon_WOVA%22&ds.ds1129.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.platform_azira%60%20WHERE%20client_name=%22Geocon_WOVA%22&ds.ds1131.sql=SELECT%20%2A%20FROM%20%60metropolis-digital.marketing_analytics.platform_spotify%60%20WHERE%20client_name=%22Geocon_WOVA%22";

let reportTEmplate =
  "https://lookerstudio.google.com/u/0/embed/reporting/f6948fcd-2d77-4547-97b3-10a3512d7428/page/p_z70rwqfhsc";

const ViewReport = () => {
  const history = useRouter();
  const { linkToEmbed } = useContext(Context);

  useEffect(() => {
    if (!linkToEmbed) {
      history.push("/");
    }
  }, [linkToEmbed]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="px-6">
            <iframe
              src={
                reportTEmplate
                // linkToEmbed
              }
              title="Report Details"
              className="w-full h-[86vh]"
              allowFullScreen={true}
            ></iframe>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
