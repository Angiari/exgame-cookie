import {Table , Button, Tooltip} from '@mui/joy';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export const Exams: React.FC = () => {
  return <>
  <Box>
    
    <Sheet>
    <Typography level="h2">Esami</Typography>
    <Tooltip title="Add" placement="right">
      <Button   variant="plain" size="lg">Large</Button>
    </Tooltip>
        <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Exams</th>
            <th>Classi</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>Titolo</td>
            <td><Chip>Coockie</Chip> <Chip>Suse</Chip></td>
            <td>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="sm" variant="soft" color="primary">
                  Modifica
                </Button>
                <Button size="sm" variant="soft" color="primary">
                  Sessioni
                </Button>
              </Box>
            </td>
            </tr>
          </tbody>
          </Table>
        </Sheet>
    </Box>
  </>;
};
