import sequelize from "@/lib/sequelize";
import FacebookTag from "@/models/FacebookTag";
import GoogleTag from "@/models/GoogleAnalyticsTag";
import { NextResponse } from "next/server";

export async function GET() {
  await sequelize.sync();
  try {
    const facebookTagInfo = await FacebookTag.findOne();
    const googleTagInfo = await GoogleTag.findOne();
    const respond = {
      facebookTag: facebookTagInfo,
      googleTag: googleTagInfo,
    };
    return NextResponse.json(respond);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(params) {
  await sequelize.sync();
  try {
    const data = await params.json();
    const facebook = await manageFacebookTag(data.facebookTag);
    const google = await manageGoogleTag(data.googleTag);

    return NextResponse.json({ status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

async function manageGoogleTag(data) {
  try {
    const googleTagInfo = await GoogleTag.findOne();
    console.log(data);
    if (googleTagInfo) {
      await GoogleTag.update(
        {
          htmlSiteVerification: data.htmlSiteVerification,
          tagHead: data.tagHead,
          tagBody: data.tagBody,
          googleAnalytics: data.googleAnalytics,
          status: data.isGoogleEnabled,
        },
        {
          where: { id: googleTagInfo.id },
        }
      );
      return { message: "Google Tag updated successfully" };
    } else {
      await GoogleTag.create({
        htmlSiteVerification: data.htmlSiteVerification,
        tagHead: data.tagHead,
        tagBody: data.tagBody,
        googleAnalytics: data.googleAnalytics,
        status: true,
      });
      return { message: "Google Tag created successfully" };
    }
  } catch (e) {
    return e;
  }
}

async function manageFacebookTag(data) {
  try {
    const facebookTagInfo = await FacebookTag.findOne();
    if (facebookTagInfo) {
      await FacebookTag.update(
        {
          htmlVerification: data.htmlVerification,
          pixel: data.pixel,
          siteTitle: data.siteTitle,
          siteUrl: data.siteUrl,
          description: data.description,
          metakeywords: data.metakeywords,
          status: data.isFacebookEnabled,
        },
        {
          where: { id: facebookTagInfo.id },
        }
      );
      return { message: "Facebook Tag updated successfully" };
    } else {
      await FacebookTag.create({
        htmlVerification: data.htmlVerification,
        pixel: data.pixel,
        siteTitle: data.siteTitle,
        siteUr: data.siteUrll,
        description: data.description,
        metakeywords: data.metakeywords,
        status: true,
      });
      return { message: "Facebook Tag created successfully" };
    }
  } catch (e) {
    return e;
  }
}
