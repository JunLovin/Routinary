import type { Article, Category } from '../models/article.model';
import ICSToGoogleCalendar from '@/assets/images/icsToGoogle.webp';
import ICSToOutlookCalendar from '@/assets/images/icsToOutlook.webp';

export const articles: Article[] = [
  {
    id: 'how-to-import-ics-files-into-google-calendar',
    title: 'How To Import ICS Files Into Google Calendar',
    description: 'Learn how to easily import ICS files into your Google Calendar and stay organized with your schedule.',
    content: `
      <div class="prose prose-invert max-w-none">
        <p class="lead">ICS files are a common format for calendar data, and Google Calendar allows you to import them to keep all your events in one place. Follow these simple steps to import your ICS file.</p>
        
        <h2>Step 1: Access Google Calendar Settings</h2>
        <p>Open Google Calendar in your web browser and click on the <strong>Settings</strong> gear icon in the top right corner. Then select <strong>"Settings"</strong> from the dropdown menu.</p>
        
        <h2>Step 2: Navigate to Import & Export</h2>
        <p>In the left sidebar, scroll down and click on <strong>"Import & export"</strong>. This will take you to the import/export page where you can manage your calendar data.</p>
        
        <h2>Step 3: Select Your ICS File</h2>
        <p>Under the "Import" section, click on <strong>"Select file from your computer"</strong>. Browse your computer and locate the ICS file you want to import.</p>
        
        <h2>Step 4: Choose the Destination Calendar</h2>
        <p>After selecting your file, choose which calendar you want to import the events into from the dropdown menu. You can select your primary calendar or any other calendar you've created.</p>
        
        <h2>Step 5: Import the File</h2>
        <p>Click the <strong>"Import"</strong> button to begin the import process. Google Calendar will process your ICS file and add all events to the selected calendar.</p>
        
        <h2>Step 6: Verify Your Events</h2>
        <p>Once the import is complete, you'll see a confirmation message showing how many events were imported. Navigate to your calendar view to verify that all events have been added correctly.</p>
        
        <div class="bg-orange-900/30 border border-orange-700 rounded-lg p-4 my-6">
          <h3 class="text-orange-300 mt-0">💡 Pro Tip</h3>
          <p class="mb-0">If you need to regularly sync events from an ICS file, consider using the "From URL" option instead. This allows Google Calendar to automatically update with changes from the source calendar.</p>
        </div>
        
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>File format issues:</strong> Ensure your file has the .ics extension and is properly formatted</li>
          <li><strong>Duplicate events:</strong> Importing the same file multiple times will create duplicate events</li>
          <li><strong>Large files:</strong> Very large ICS files may take longer to process or may need to be split into smaller files</li>
        </ul>
      </div>
    `,
    category: 'How To',
    image: ICSToGoogleCalendar,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'how-to-import-ics-files-into-outlook-calendar',
    title: 'How To Import ICS Files Into Outlook Calendar',
    description: 'Learn how to easily import ICS files into your Outlook Calendar and stay organized with your schedule.',
    content: `
      <div class="prose prose-invert max-w-none">
        <p class="lead">ICS files are a universal calendar format that Outlook Calendar fully supports. Follow these simple steps to import your ICS file and keep all your events synchronized.</p>
        
        <h2>Step 1: Open Outlook Calendar</h2>
        <p>Launch Outlook and navigate to the <strong>Calendar</strong> view by clicking on the calendar icon in the bottom left corner or pressing <strong>Ctrl+2</strong>.</p>
        
        <h2>Step 2: Access the Import Function</h2>
        <p>Click on <strong>File</strong> in the top menu bar, then select <strong>"Open & Export"</strong> followed by <strong>"Import/Export"</strong>. This will open the Import and Export Wizard.</p>
        
        <h2>Step 3: Select Import Option</h2>
        <p>In the wizard, choose <strong>"Import an iCalendar (.ics) or vCalendar file (.vcs)"</strong> from the list of actions and click <strong>Next</strong>.</p>
        
        <h2>Step 4: Locate Your ICS File</h2>
        <p>Click <strong>"Browse"</strong> and navigate to the location where your ICS file is saved. Select the file and click <strong>OK</strong>.</p>
        
        <h2>Step 5: Choose Import Method</h2>
        <p>Outlook will ask how you want to import the file. You can either:</p>
        <ul>
          <li><strong>Import:</strong> Add events to your existing calendar</li>
          <li><strong>Open as New:</strong> Create a separate calendar for these events</li>
        </ul>
        <p>Select your preferred option based on your organizational needs.</p>
        
        <h2>Step 6: Verify Your Events</h2>
        <p>Once imported, navigate to your calendar view to verify that all events have been added correctly. You should see all the imported events displayed in your calendar.</p>
        
        <div class="bg-orange-900/30 border border-orange-700 rounded-lg p-4 my-6">
          <h3 class="text-orange-300 mt-0">💡 Pro Tip</h3>
          <p class="mb-0">For Outlook.com (web version), simply drag and drop your ICS file directly onto the calendar view, or use the "Add calendar" option and select "Upload from file" for a quicker import process.</p>
        </div>
        
        <h2>Troubleshooting</h2>
        <ul>
          <li><strong>File format issues:</strong> Ensure your file has the .ics extension and is properly formatted</li>
          <li><strong>Duplicate events:</strong> Importing the same file multiple times will create duplicate events</li>
          <li><strong>Time zone discrepancies:</strong> Check that events appear at the correct time in your local time zone</li>
        </ul>
      </div>
    `,
    category: 'How To',
    image: ICSToOutlookCalendar,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const categories: Category[] = [
  {
    id: 'how-to',
    type: 'How To',
    articles: articles.filter((a) => a.category === 'How To'),
    description: 'Step-by-step guides to help you accomplish specific tasks and learn new skills.',
    order: 1,
  },
  {
    id: 'troubleshooting',
    type: 'Troubleshooting',
    articles: [],
    description: 'Solutions to common problems and issues you may encounter while using our product.',
    order: 2,
  },
  {
    id: 'best-practices',
    type: 'Best Practices',
    articles: [],
    description: 'Tips and recommendations to help you get the most out of our product and improve your workflow.',
    order: 3,
  },
];
